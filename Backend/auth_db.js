const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sahil@123",
  database: "auth_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database Error:", err);
    return;
  }

  console.log("MySQL Connected");
});

// SIGNUP 
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // CHECK EMAIL EXISTS
    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users(firstName,lastName,email,password) VALUES (?,?,?,?)";

      db.query(
        insertSql,
        [firstName, lastName, email, hashedPassword],
        (err, data) => {
          if (err) {
            return res.status(500).json({
              message: "Signup failed",
            });
          }

          res.json({
            message: "Signup Successful",
            alert: "Signup Successful",
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

//  SIGNIN 
app.post("/signin", (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const match = await bcrypt.compare(
        password,
        user.password
      );

      if (match) {
        res.json({
          message: "Login Success",
        });
      } else {
        res.status(401).json({
          message: "Wrong Password",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

//  FORGOT PASSWORD 
app.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    const sql =
      "UPDATE users SET password = ? WHERE email = ?";

    db.query(
      sql,
      [hashedPassword, email],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "Email not found",
          });
        }

        res.json({
          message: "Password Updated Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

//START SERVER 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
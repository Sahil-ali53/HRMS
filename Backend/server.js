const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sahil@123",
    database: "hrms"
});

db.connect((err) => {
    if (err) {
        console.log(" Error");
    } else {
        console.log("MySQL Connected");
    }
});

app.post("/leave-requests", (req, res) => {
    console.log("Body", req.body);
    if (!req.body) {
        return res.send("not data reviced")
    }



    const fullName = req.body.fullName;
    const email = req.body.email;
    const phone = req.body.phone;
    const department = req.body.department;
    const role = req.body.role;
    const days = parseInt(req.body.days);    
    const leaveDate = req.body.leaveDate;
    const leaveType = req.body.leaveType;
    const reason = req.body.reason;

    const sql = `
 INSERT INTO leave_requests
 (fullName,email,phone,department,role,days,leaveDate,leaveType,reason)
 VALUES (?,?,?,?,?,?,?,?,?)
 `;

    db.query(sql,
        [
            fullName, email, phone, department, role, days, leaveDate, leaveType, reason
        ],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Leave Request Submitted");
            }
        });

});
app.get("/leave-requests",(req,res)=>{
 db.query("SELECT * FROM leave_requests",(err,result)=>{
   if(err) return res.send(err);
   res.json(result);
 });
});


 
app.get("/leave-requests/:id",(req,res)=>{
 db.query(
   "SELECT * FROM leave_requests WHERE id=?",
   [req.params.id],
   (err,result)=>{
     if(err) return res.send(err);
     res.json(result);
   }
 );
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});
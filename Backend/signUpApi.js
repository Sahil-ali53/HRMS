app.post("/signup", async (req,res)=>{

 const {firstName,lastName,email,password} = req.body;

 const hashedPassword = await bcrypt.hash(password,10);

 const sql = "INSERT INTO users(first_name,last_name,email,password) VALUES (?,?,?,?)";

 db.query(sql,[firstName,lastName,email,hashedPassword],(err,result)=>{
   if(err) return res.send(err);

   res.send("Signup Successful");
 });

});
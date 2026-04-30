import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";  

export default function ListForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    days: "",
    leaveDate: "",
    leaveType: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
      await axios.post("http://localhost:5000/leave-requests", formData);
      alert("Submitted Successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Check console.");
    }
  };

  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const inputClass =
    "w-full bg-gray- text-black border border-gray-700 p-4 rounded-xl focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition duration-200 placeholder:text-black text-black";

  return (
    
    <div className="p-4 md:p-10  min-h-screen   flex flex-col items-center">
      
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl flex items-center justify-between mb-10 pb-4 border-b border-gry-800"
      >
        <div className="flex items-center gap-2">
            
           
            <h2 className="text-4xl font-extrabold tracking-tighter">
              Leave<span className="text-yellow-400">Portal</span>
            </h2>
        </div>
        <div className="text-sm text-gray-400">Request Leave</div>
      </motion.div>

     
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-[#fff4f4] border -gray-800 rounded-3xl shadow-2xl p-8 grid md:grid-cols-2 gap-6 relative overflow-hidden"
        onSubmit={handleSubmit}
      >
         
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-2 md:col-span-2 text-black flex items-center gap-3">
            <span className="text-yellow-400">⚡</span> New Leave Application
        </motion.h3>

         
        
        <motion.div variants={itemVariants}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="number"
            placeholder="Phone Number (e.g. 9876543210)"
            name="phone"
            className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="text"
            placeholder="Department"
            name="department"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="text"
            placeholder="Job Role"
            name="role"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="number"
            placeholder="Duration (Days)"
            name="days"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <label className="text-xs text-gray-400 mb-1 block ml-1">Leave Start Date</label>
          <input
            type="date"
            name="leaveDate"
            className={`${inputClass} color-black`} // color-scheme-dark helps style the calendar picker icon
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <select
            className={`${inputClass}  `}  
            onChange={handleChange}
            name="leaveType"
            required
            defaultValue=""
          >
            <option value=""   className="text-black">
              Select Leave Type
            </option>
            <option value="Sick Leave" className="bg-white text-black">Sick Leave (Medical)</option>
            <option value="Casual" className="bg-white text-black">Casual Leave (Personal)</option>
            <option value="paid leave" className="bg-white text-black">Paid Leave (Annual)</option>
          </select>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <textarea
            placeholder="Reason for Leave (Optional)"
            name="reason"
            className={`${inputClass} resize-none`}
            rows="4"
            onChange={handleChange}
          ></textarea>
        </motion.div>

        
        <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
          <button
            type="submit"
            className="w-full bg-blue-500 text-black font-endless font-bold text-lg p-4 cursor-pointer rounded-xl transition duration-300 hover:bg-blue-400 shadow-[0_4px_20px_rgba(250,204,21,0.3)]"
          >
            Submit Application
          </button>
        </motion.div>

      </motion.form>

       
      <div className="text-gray-600 text-xs mt-12 pb-6">
        © 2026  viva.org All rights reserved.
      </div>
    </div>
  );
}
import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Form() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    days: "",
    leaveDate: "",
    leaveType: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/leave-requests", formData);
    await axios.get("http://localhost:5000/leave-requests", formData);

    alert("Submitted Successfully");
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Leave Request</h2>


      <form className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full_Name"
          name="fullName"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          placeholder="Phone Number"
          name="phone"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="department"
          name="department"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Role"
          name="role"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          placeholder="How many days"
          name="days"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="leaveDate"
          className="border p-3 rounded-xl md:col-span-2"
          onChange={handleChange}
          required
        />
        <select className=" w-full p-3 text-1xl border rounded text-black " onChange={handleChange} name="leaveType" >
          <option className="text-black" value="Select Leave Type"> Select Leave Type</option>
          <option value="Sick Leave" > Sick Leave</option>
          <option value="Casual"> Casual Leave</option>
          <option value="paid leave"> paid Leave</option>
        </select>

        <textarea
          placeholder="Reason"
          name="reason"
          className="border p-3 rounded-xl md:col-span-2"
          rows="3"
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="bg-blue-600 text-white p-3 cursor-pointer  rounded-xl md:col-span-2 hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>

  );
}
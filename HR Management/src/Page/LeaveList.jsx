import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LeaveList() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:5000/leave-requests"
    );

    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Leave Requests
      </h1>

      <div className="bg-white shadow-2xl md:flex   rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Days</th>
              <th className="p-3">Date</th> 
              <th className="p-3">LeaveType</th> 
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t    text-center">
                <td className=" ">{item.id}</td>
                <td className="p-3">{item.fullName}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.department}</td>
                <td className="p-3">{item.days}</td>
                <td className="p-3">{new Date(item.leaveDate).toLocaleDateString()}</td>
                <td className="p-3">{item.leaveType}</td>
                <td className="p-3 text-green-600 font-bold">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
import React from 'react'

function Attendance() {
  return (
    <>
    
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Attendance</h2>

        <div className="space-y-4">
          <div className="border p-4 rounded-xl">
            <p className="font-semibold">Today's Status</p>
            <p className="text-green-600 text-lg">Present</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-semibold">Check In</p>
            <p>09:05 AM</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-semibold">Check Out</p>
            <p>06:00 PM</p>
          </div>

          <button className="w-full cursor-pointer bg-green-600 text-white p-3 rounded-xl hover:bg-green-700">
            Mark Present
          </button>
        </div>
      </div>
    </>
  )
}

export default Attendance
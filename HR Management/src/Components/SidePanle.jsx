import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  Briefcase,
  DollarSign,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

export default function SidePanle({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  // const [activePage, setActivePage] = useState("dashboard");

  const [menuOpen, setMenuOpen] = useState({
    employee: false,
    attendance: false,
    leave: false,
    payroll: false,
    recruitment: false,
    settings: false,
  });

  const toggleMenu = (name) => {
    setMenuOpen({
      ...menuOpen,
      [name]: !menuOpen[name],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="w-full bg-yellow-500 sticky top-0 z-50 shadow-lg">
        <div className="flex justify-between items-center px-4 md:px-6 py-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30"
            >
              <Menu className="text-white" size={22} />
            </button>

            {!collapsed && (
              <h1 className="text-xl font-bold text-white">HRMS</h1>
            )}
          </div>

          {/* Center */}
          <h2 className="text-white font-semibold text-sm md:text-lg">
            Human Resource Management System
          </h2>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3 text-white">
            <Bell size={20} />
            <span>Welcome Admin</span>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg min-h-screen transition-all duration-300 ${
            collapsed ? "w-20" : "w-72"
          }`}
        >
          <div className="p-3 space-y-2">

            {/* Dashboard */}
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              collapsed={collapsed}
              onClick={() => setActivePage("dashboard")}
            />

            {/* Employees */}
            <DropdownMenu
              icon={<Users size={20} />}
              text="Employees"
              collapsed={collapsed}
              open={menuOpen.employee}
              toggle={() => toggleMenu("employee")}
              items={[
                "All Employees",
                "Add Employee",
                "Departments",
                "Designation",
              ]}
            />

            {/* Attendance */}
            <DropdownMenu
              icon={<UserCheck size={20} />}
              text="Attendance"
              collapsed={collapsed}
              open={menuOpen.attendance}
              toggle={() => toggleMenu("attendance")}
              items={[
                "Daily Attendance",
                "Monthly Attendance",
                "Late Entries",
              ]}
            />

            {/* Leave */}
            <DropdownMenu
              icon={<CalendarDays size={20} />}
              text="Leave Management"
              collapsed={collapsed}
              open={menuOpen.leave}
              toggle={() => toggleMenu("leave")}
              items={[
                "Apply Leave",
                "Pending Leaves",
                "Leave Balance",
              ]}
            />

            {/* Payroll */}
            <DropdownMenu
              icon={<DollarSign size={20} />}
              text="Payroll"
              collapsed={collapsed}
              open={menuOpen.payroll}
              toggle={() => toggleMenu("payroll")}
              items={[
                "Generate Salary",
                "Salary Slip",
                "Bonus",
              ]}
            />

            {/* Recruitment */}
            <DropdownMenu
              icon={<Briefcase size={20} />}
              text="Recruitment"
              collapsed={collapsed}
              open={menuOpen.recruitment}
              toggle={() => toggleMenu("recruitment")}
              items={[
                "Job Openings",
                "Candidates",
                "Interviews",
              ]}
            />

            {/* Settings */}
            <DropdownMenu
              icon={<Settings size={20} />}
              text="Settings"
              collapsed={collapsed}
              open={menuOpen.settings}
              toggle={() => toggleMenu("settings")}
              items={[
                "Profile",
                "Change Password",
                "System Settings",
              ]}
            />

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition mt-4"
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        
      </div>
    </div>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, text, collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
    >
      {icon}
      {!collapsed && <span>{text}</span>}
    </button>
  );
}

/* Dropdown Menu */
function DropdownMenu({
  icon,
  text,
  collapsed,
  open,
  toggle,
  items,
}) {
  return (
    <div>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-yellow-100"
      >
        <div className="flex items-center gap-3">
          {icon}
          {!collapsed && <span>{text}</span>}
        </div>

        {!collapsed && (
          <ChevronDown
            size={18}
            className={`${open ? "rotate-180" : ""} transition`}
          />
        )}
      </button>

      {!collapsed && open && (
        <div className="ml-10 mt-1 space-y-1 text-sm text-gray-600">
          {items.map((item, index) => (
            <p
              key={index}
              className="cursor-pointer hover:text-black"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* Card */
function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
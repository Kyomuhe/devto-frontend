import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FileText, Bookmark, Users, BarChart3, Menu, X, Plus, ArrowLeft} from "lucide-react";
import defaultAvatar from "../assets/default.png";

const DashboardLayout = ({ user }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: FileText, label: "My Posts", path: "/my-posts", color: "text-blue-600" },
    { icon: Bookmark, label: "Bookmarks", path: "/bookmarks", color: "text-green-600" },
    { icon: Users, label: "Followers", color: "text-purple-600" },
    { icon: BarChart3, label: "Analytics", color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex">
              <button
              onClick={() => navigate('/main-loggedin')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
            </button>

            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-50 rounded-lg">
            <img
              src={
                user?.id
                  ? `http://localhost:8081/api/auth/user/${user.id}/profile-image`
                  : defaultAvatar
              }
              alt={user?.Name || "User"}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
            <div>
              <p className="font-medium text-gray-900">{user?.Name || "User"}</p>
              <p className="text-sm text-gray-600">{user?.email || "user@example.com"}</p>
            </div>
          </div>

          {/* Sidebar nav */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.Name?.split(" ")[0] || "User"}!
            </h1>
          </div>
          <button
            onClick={() => navigate("/create-post")}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </button>
        </div>

        {/* Main content changes here */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

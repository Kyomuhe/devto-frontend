import { useState, useEffect } from "react";
import { FileText, Eye, Users, Bookmark, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalFollowers: 0,
    totalBookmarks: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetching posts
      const postsResponse = await fetch(`http://localhost:8081/api/v1/posts/user/${user.id}`);
      if (postsResponse.ok) {
        const userPosts = await postsResponse.json();
        setStats((prev) => ({ ...prev, totalPosts: userPosts.length }));
        setRecentPosts(userPosts.slice(0, 3));
      }

      // Placeholder values
      setStats((prev) => ({
        ...prev,
        totalViews: 13,
        totalFollowers: 6,
        totalBookmarks: 3,
      }));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
      });
    } catch {
      return dateString;
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? "..." : value.toLocaleString()}
          </p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{change > 0 ? "+" : ""}{change}%</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            color === "blue"
              ? "bg-blue-100"
              : color === "green"
              ? "bg-green-100"
              : color === "purple"
              ? "bg-purple-100"
              : "bg-orange-100"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              color === "blue"
                ? "text-blue-600"
                : color === "green"
                ? "text-green-600"
                : color === "purple"
                ? "text-purple-600"
                : "text-orange-600"
            }`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FileText} title="Total Posts" value={stats.totalPosts} change={12} color="blue" />
        <StatCard icon={Eye} title="Total Views" value={stats.totalViews} change={8} color="green" />
        <StatCard icon={Users} title="Followers" value={stats.totalFollowers} change={5} color="purple" />
        <StatCard icon={Bookmark} title="Bookmarks" value={stats.totalBookmarks} change={-2} color="orange" />
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
            <button
              onClick={() => navigate("/my-posts")}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View all posts
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentPosts.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No posts yet</p>
              <button
                onClick={() => navigate("/create-post")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first post
              </button>
            </div>
          ) : (
            recentPosts.map((post) => (
              <div
                key={post.postId}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  {post.coverImage && (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={`http://localhost:8081/api/v1/posts/image/${post.postId}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                    {post.description && (
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {post.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>0 views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

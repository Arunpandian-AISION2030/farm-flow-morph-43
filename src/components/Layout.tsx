import { Link, useLocation } from "react-router-dom";
import { Sprout, BarChart3, MessageSquare, PlusCircle, Eye, Heart } from "lucide-react";
import AIChatbot from "./AIChatbot";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: Sprout },
    { name: "Agriculture", path: "/dashboard", icon: BarChart3 },
    { name: "Input Data", path: "/input", icon: PlusCircle },
    { name: "Healthcare", path: "/healthcare", icon: Heart },
    { name: "AI Recommendations", path: "/recommendations", icon: MessageSquare },
    { name: "Visual Insights", path: "/insights", icon: Eye },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-card m-4 sticky top-4 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="circular-widget !w-12 !h-12">
                <Sprout className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-primary">Smart Farm Assistant</span>
            </Link>
            
            <div className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`morph-button flex items-center space-x-2 ${
                      isActive(item.path) 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                        : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:block">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 pb-8">
        {children}
      </main>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Layout;
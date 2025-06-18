import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Users, Sparkles, Moon, Sun, BarChart3, Briefcase } from 'lucide-react';
import BottomTabNavigation from './BottomTabNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105";
    const activeClasses = "bg-blue-600 text-white shadow-md";
    const inactiveClasses = "text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700";
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-3 focus:outline-none group"
                style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                aria-label="Go to homepage"
              >
                <div className="relative group-hover:scale-105 transition-all duration-200">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
                    Techcruit AI
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Recruit the Right</p>
                </div>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/dashboard" className={getLinkClasses('/dashboard')}>
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Dash</span>
              </Link>
              
              <Link to="/batch" className={getLinkClasses('/batch')}>
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Batch</span>
                <span className="sm:hidden">Batch</span>
              </Link>
              
              <Link to="/ai-analysis" className={getLinkClasses('/ai-analysis')}>
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI Analysis</span>
                <span className="sm:hidden">AI</span>
              </Link>
              
              <Link to="/pricing" className={getLinkClasses('/pricing')}>
                <span className="hidden sm:inline">💰 Pricing</span>
                <span className="sm:hidden">💰</span>
              </Link>
              
              <button
                onClick={() => setIsDark(d => !d)}
                className="ml-2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Transition */}
      <main className="transition-all duration-300 ease-in-out pb-20 md:pb-0">
        {children}
      </main>

      {/* Bottom Tab Navigation (Mobile Only) */}
      <BottomTabNavigation />
    </div>
  );
};

export default Layout; 
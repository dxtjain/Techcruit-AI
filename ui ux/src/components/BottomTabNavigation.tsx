import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Users, Sparkles, CreditCard } from 'lucide-react';

const BottomTabNavigation: React.FC = () => {
  const location = useLocation();

  const tabs = [
    {
      path: '/',
      icon: Home,
      label: 'Home',
      exactMatch: true
    },
    {
      path: '/dashboard',
      icon: BarChart3,
      label: 'Dashboard',
      exactMatch: false
    },
    {
      path: '/batch',
      icon: Users,
      label: 'Batch',
      exactMatch: false
    },
    {
      path: '/ai-analysis',
      icon: Sparkles,
      label: 'AI Analysis',
      exactMatch: false
    },
    {
      path: '/pricing',
      icon: CreditCard,
      label: 'Pricing',
      exactMatch: false
    }
  ];

  const isActiveTab = (path: string, exactMatch: boolean) => {
    if (exactMatch) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Background with blur effect */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = isActiveTab(tab.path, tab.exactMatch);
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 relative
                  ${isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 scale-105' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                )}
                
                {/* Icon with animation */}
                <div className={`transition-all duration-200 ${isActive ? 'transform scale-110' : ''}`}>
                  <Icon className="h-5 w-5 mb-1" />
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium transition-all duration-200 ${
                  isActive ? 'font-semibold' : ''
                }`}>
                  {tab.label}
                </span>
                
                {/* Active background glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-xl -z-10" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/95 dark:bg-slate-900/95" />
    </div>
  );
};

export default BottomTabNavigation; 
import { LayoutDashboard, ShoppingBag, Package, Users, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminBottomNavProps {
  activeTab: 'dashboard' | 'orders' | 'products' | 'customers' | 'settings';
  onNavigate: (tab: 'dashboard' | 'orders' | 'products' | 'customers' | 'settings') => void;
}

export function AdminBottomNav({ activeTab, onNavigate }: AdminBottomNavProps) {
  const tabs = [
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders' as const, icon: ShoppingBag, label: 'Đơn hàng' },
    { id: 'products' as const, icon: Package, label: 'Sản phẩm' },
    { id: 'customers' as const, icon: Users, label: 'Khách' },
    { id: 'settings' as const, icon: Settings, label: 'Cài đặt' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="adminActiveTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#FF6B35] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[#FF6B35]' : 'text-muted-foreground'
                }`}
              />

              <span
                className={`text-xs transition-colors ${
                  isActive ? 'text-[#FF6B35] font-medium' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

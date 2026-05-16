import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomerBottomNavProps {
  activeTab: 'home' | 'search' | 'cart' | 'profile';
  onNavigate: (tab: 'home' | 'search' | 'cart' | 'profile') => void;
  cartCount: number;
}

export function CustomerBottomNav({ activeTab, onNavigate, cartCount }: CustomerBottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Trang chủ' },
    { id: 'search' as const, icon: Heart, label: 'Yêu thích' },
    { id: 'cart' as const, icon: ShoppingCart, label: 'Giỏ hàng' },
    { id: 'profile' as const, icon: User, label: 'Tôi' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50">
      <div className="flex items-center justify-around px-4 py-2 safe-area-bottom">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 py-2 px-4 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FF6B35] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-[#FF6B35]' : 'text-muted-foreground'
                  }`}
                />
                {tab.id === 'cart' && cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </div>
                )}
              </div>

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

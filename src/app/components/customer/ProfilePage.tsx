import { useState } from 'react';
import { User, MapPin, Phone, Mail, Bell, Lock, CreditCard, Heart, Package, HelpCircle, LogOut, ChevronRight, Edit2, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface ProfilePageProps {
  onLogout: () => void;
  onNavigateToOrders: () => void;
  onNavigateToWishlist: () => void;
  onNavigateToPaymentMethods: () => void;
  onNavigateToAddresses: () => void;
}

export function ProfilePage({ onLogout, onNavigateToOrders, onNavigateToWishlist, onNavigateToPaymentMethods, onNavigateToAddresses }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM'
  });

  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
    toast.success('Cập nhật thông tin thành công!');
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const menuSections = [
    {
      title: 'Đơn hàng',
      items: [
        { icon: Package, label: 'Đơn hàng của tôi', onClick: onNavigateToOrders, badge: '3' },
        { icon: Heart, label: 'Danh sách yêu thích', onClick: onNavigateToWishlist }
      ]
    },
    {
      title: 'Tài khoản',
      items: [
        { icon: CreditCard, label: 'Phương thức thanh toán', onClick: onNavigateToPaymentMethods },
        { icon: MapPin, label: 'Địa chỉ giao hàng', onClick: onNavigateToAddresses }
      ]
    },
    {
      title: 'Cài đặt',
      items: [
        { icon: Bell, label: 'Thông báo', onClick: () => toast.info('Chức năng đang phát triển') },
        { icon: Lock, label: 'Bảo mật', onClick: () => toast.info('Chức năng đang phát triển') },
        { icon: HelpCircle, label: 'Trợ giúp & Hỗ trợ', onClick: () => toast.info('Chức năng đang phát triển') }
      ]
    }
  ];

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header with Avatar */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] px-6 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-[#FF6B35] shadow-lg">
              {userInfo.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Camera className="w-4 h-4 text-[#FF6B35]" />
            </button>
          </div>
          <h2 className="text-white text-2xl mb-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            {userInfo.name}
          </h2>
          <p className="text-white/80 text-sm mb-4">{userInfo.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      {/* User Info Card */}
      <div className="px-4 -mt-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-lg mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <User className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Họ và tên</p>
                <p className="font-medium">{userInfo.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Số điện thoại</p>
                <p className="font-medium">{userInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Địa chỉ</p>
                <p className="font-medium">{userInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 space-y-6 mb-6">
        {menuSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-[#FF6B35] text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 mb-8">
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-destructive text-destructive bg-destructive/5"
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5" />
          <span style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>Đăng xuất</span>
        </motion.button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={handleCancel}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-background rounded-t-3xl p-6 w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              Chỉnh sửa thông tin
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Họ và tên</label>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={tempUserInfo.name}
                    onChange={(e) => setTempUserInfo({ ...tempUserInfo, name: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={tempUserInfo.email}
                    onChange={(e) => setTempUserInfo({ ...tempUserInfo, email: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={tempUserInfo.phone}
                    onChange={(e) => setTempUserInfo({ ...tempUserInfo, phone: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <textarea
                    value={tempUserInfo.address}
                    onChange={(e) => setTempUserInfo({ ...tempUserInfo, address: e.target.value })}
                    className="flex-1 bg-transparent outline-none resize-none"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl border-2 border-border"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
              >
                Lưu thay đổi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

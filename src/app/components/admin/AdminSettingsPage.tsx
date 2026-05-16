import { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, Palette, Globe, Shield, LogOut, Edit2, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface AdminSettingsPageProps {
  onLogout: () => void;
}

export function AdminSettingsPage({ onLogout }: AdminSettingsPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin SPORTSTORE',
    email: 'admin@sportstore.vn',
    phone: '0901234567',
    role: 'Quản trị viên'
  });

  const [tempAdminInfo, setTempAdminInfo] = useState(adminInfo);

  const handleSave = () => {
    setAdminInfo(tempAdminInfo);
    setIsEditing(false);
    toast.success('Cập nhật thông tin thành công!');
  };

  const handleCancel = () => {
    setTempAdminInfo(adminInfo);
    setIsEditing(false);
  };

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header with Avatar */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] px-6 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-[#FF6B35] shadow-lg">
              A
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Camera className="w-4 h-4 text-[#FF6B35]" />
            </button>
          </div>
          <h2 className="text-white text-2xl mb-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            {adminInfo.name}
          </h2>
          <p className="text-white/80 text-sm mb-1">{adminInfo.role}</p>
          <p className="text-white/70 text-sm mb-4">{adminInfo.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="px-4 -mt-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-lg mb-6">
          <h3 className="font-medium mb-3">Thông tin quản trị viên</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <User className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Họ và tên</p>
                <p className="font-medium">{adminInfo.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{adminInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Số điện thoại</p>
                <p className="font-medium">{adminInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Shield className="w-5 h-5 text-[#FF6B35]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Vai trò</p>
                <p className="font-medium">{adminInfo.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-4 space-y-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
            Cài đặt hệ thống
          </h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toast.info('Cài đặt thông báo')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Thông báo</p>
                  <p className="text-xs text-muted-foreground">Quản lý thông báo hệ thống</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-green-500"></div>
            </button>

            <button
              onClick={() => toast.info('Cài đặt giao diện')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Giao diện</p>
                  <p className="text-xs text-muted-foreground">Tùy chỉnh theme và màu sắc</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => toast.info('Cài đặt ngôn ngữ')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Ngôn ngữ</p>
                  <p className="text-xs text-muted-foreground">Tiếng Việt</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => toast.info('Cài đặt bảo mật')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Bảo mật</p>
                  <p className="text-xs text-muted-foreground">Đổi mật khẩu, xác thực 2 lớp</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
            Thông tin ứng dụng
          </h3>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phiên bản</span>
                <span className="text-sm font-medium">1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Build</span>
                <span className="text-sm font-medium">2026.04.29</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Server</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium text-green-600">Hoạt động</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                    value={tempAdminInfo.name}
                    onChange={(e) => setTempAdminInfo({ ...tempAdminInfo, name: e.target.value })}
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
                    value={tempAdminInfo.email}
                    onChange={(e) => setTempAdminInfo({ ...tempAdminInfo, email: e.target.value })}
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
                    value={tempAdminInfo.phone}
                    onChange={(e) => setTempAdminInfo({ ...tempAdminInfo, phone: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
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

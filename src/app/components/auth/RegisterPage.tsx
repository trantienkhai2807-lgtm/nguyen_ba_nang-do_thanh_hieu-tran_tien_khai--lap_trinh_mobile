import { useState } from 'react';
import { UserCircle, Lock, Mail, Eye, EyeOff, User, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface RegisterPageProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!agreeTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng!');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ!');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Số điện thoại phải có 10 chữ số!');
      return;
    }

    toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      onRegister();
    }, 1000);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-auto" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] pt-12 pb-24 px-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>

          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl text-white mb-2" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              ĐĂNG KÝ TÀI KHOẢN
            </h1>
            <p className="text-white/90 text-sm">Tạo tài khoản mới để bắt đầu mua sắm</p>
          </div>
        </motion.div>
      </div>

      {/* Register form card */}
      <div className="flex-1 px-6 -mt-16 relative z-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-3xl shadow-2xl p-6 max-w-md mx-auto"
        >
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[#FF6B35] outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[#FF6B35] outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0912345678"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[#FF6B35] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Ít nhất 6 ký tự"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[#FF6B35] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[#FF6B35] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 rounded accent-[#FF6B35] mt-0.5"
              />
              <label className="text-sm text-muted-foreground flex-1">
                Tôi đồng ý với{' '}
                <button type="button" className="text-[#FF6B35] font-medium">
                  Điều khoản sử dụng
                </button>
                {' '}và{' '}
                <button type="button" className="text-[#FF6B35] font-medium">
                  Chính sách bảo mật
                </button>
              </label>
            </div>

            {/* Register button */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg text-lg"
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
            >
              ĐĂNG KÝ
            </motion.button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Đã có tài khoản?{' '}
              <button onClick={onBackToLogin} className="text-[#FF6B35] font-medium">
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

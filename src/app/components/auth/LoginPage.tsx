import { useState } from 'react';
import { UserCircle, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface LoginPageProps {
  onLogin: (role: 'customer' | 'admin') => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Simple validation for demo
    if (loginType === 'customer') {
      if (email === 'customer@sportstore.com' && password === '123456') {
        toast.success('Đăng nhập thành công!');
        onLogin('customer');
      } else {
        toast.error('Tài khoản hoặc mật khẩu không đúng!');
      }
    } else {
      if (email === 'admin@sportstore.com' && password === 'admin123') {
        toast.success('Đăng nhập thành công!');
        onLogin('admin');
      } else {
        toast.error('Tài khoản hoặc mật khẩu không đúng!');
      }
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] pt-16 pb-32 px-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center">
            <UserCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl text-white mb-2" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            SPORTSTORE
          </h1>
          <p className="text-white/90 text-sm">Cửa hàng thể thao hiện đại</p>
        </motion.div>
      </div>

      {/* Login form card */}
      <div className="flex-1 px-6 -mt-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-3xl shadow-2xl p-6 max-w-md mx-auto"
        >
          {/* Login type toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl mb-6">
            <button
              onClick={() => setLoginType('customer')}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                loginType === 'customer'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-md'
                  : 'text-muted-foreground'
              }`}
              style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
            >
              KHÁCH HÀNG
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                loginType === 'admin'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-md'
                  : 'text-muted-foreground'
              }`}
              style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
            >
              QUẢN TRỊ VIÊN
            </button>
          </div>

          <h2 className="text-2xl mb-6 text-center" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Đăng Nhập
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Email / Tài khoản
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={loginType === 'customer' ? 'customer@sportstore.com' : 'admin@sportstore.com'}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted border-2 border-transparent focus:border-[#FF6B35] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={loginType === 'customer' ? '123456' : 'admin123'}
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#FF6B35]" />
                <span className="text-muted-foreground">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-[#FF6B35] font-medium">
                Quên mật khẩu?
              </button>
            </div>

            {/* Login button */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg text-lg"
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
            >
              ĐĂNG NHẬP
            </motion.button>
          </form>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
              Tài khoản demo:
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                <span className="font-medium">Khách hàng:</span> customer@sportstore.com / 123456
              </p>
              <p>
                <span className="font-medium">Admin:</span> admin@sportstore.com / admin123
              </p>
            </div>
          </div>

          {/* Register link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Chưa có tài khoản?{' '}
              <button onClick={onNavigateToRegister} className="text-[#FF6B35] font-medium">
                Đăng ký ngay
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

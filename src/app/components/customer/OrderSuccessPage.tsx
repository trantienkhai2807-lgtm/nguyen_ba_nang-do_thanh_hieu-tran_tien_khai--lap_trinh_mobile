import { useEffect } from 'react';
import { CheckCircle, Package, Home } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface OrderSuccessPageProps {
  onBackToHome: () => void;
  onViewOrders: () => void;
  onViewOrderDetail: () => void;
}

export function OrderSuccessPage({ onBackToHome, onViewOrders, onViewOrderDetail }: OrderSuccessPageProps) {
  useEffect(() => {
    // Fire confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }, []);

  // Use first order from mock data as the newly created order
  const orderId = 'ORD001';
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 shadow-2xl"
      >
        <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl mb-3 text-center"
        style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
      >
        Đặt Hàng Thành Công!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-muted-foreground mb-8"
      >
        Cảm ơn bạn đã mua sắm tại SPORTSTORE
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <span className="text-muted-foreground">Mã đơn hàng</span>
          <span className="font-bold text-[#FF6B35]">{orderId}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#FF6B35]" />
          </div>
          <div className="flex-1">
            <p className="font-medium mb-1">Đơn hàng đang được xử lý</p>
            <p className="text-sm text-muted-foreground">
              Dự kiến giao: {estimatedDelivery.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-center text-muted-foreground">
            Chúng tôi sẽ gửi thông báo cập nhật trạng thái đơn hàng cho bạn
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md space-y-3"
      >
        <button
          onClick={onViewOrderDetail}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg"
          style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
        >
          XEM CHI TIẾT ĐƠN HÀNG
        </button>

        <button
          onClick={onViewOrders}
          className="w-full py-4 rounded-xl border-2 border-border bg-background"
          style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
        >
          XEM TẤT CẢ ĐƠN HÀNG
        </button>

        <button
          onClick={onBackToHome}
          className="w-full py-4 rounded-xl border-2 border-[#FF6B35] text-[#FF6B35] flex items-center justify-center gap-2"
          style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
        >
          <Home className="w-5 h-5" />
          VỀ TRANG CHỦ
        </button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-20 left-10 text-4xl"
      >
        🎉
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute top-32 right-12 text-4xl"
      >
        🎊
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-32 left-16 text-4xl"
      >
        ✨
      </motion.div>
    </div>
  );
}

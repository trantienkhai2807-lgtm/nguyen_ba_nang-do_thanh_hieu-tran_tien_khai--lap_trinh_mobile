import { ArrowLeft, MapPin, CreditCard, Package, Truck, CheckCircle, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../../data/mockData';

interface OrderDetailPageProps {
  order: Order | undefined;
  onBack: () => void;
  onBackToHome: () => void;
}

export function OrderDetailPage({ order, onBack, onBackToHome }: OrderDetailPageProps) {

  if (!order) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-xl mb-4">Không tìm thấy đơn hàng</h2>
        <button onClick={onBack} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
          Quay lại
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const trackingSteps = [
    { status: 'pending', label: 'Đặt hàng', icon: Package, completed: true },
    { status: 'processing', label: 'Xác nhận', icon: CheckCircle, completed: ['processing', 'shipped', 'delivered'].includes(order.status) },
    { status: 'shipped', label: 'Đang giao', icon: Truck, completed: ['shipped', 'delivered'].includes(order.status) },
    { status: 'delivered', label: 'Hoàn thành', icon: CheckCircle, completed: order.status === 'delivered' }
  ];

  return (
    <div className="h-screen bg-background overflow-auto pb-6" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              Chi Tiết Đơn Hàng
            </h1>
            <p className="text-sm text-muted-foreground">#{order.id}</p>
          </div>
          <button onClick={onBackToHome} className="p-2 hover:bg-muted rounded-lg">
            <Home className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order Status */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Trạng thái đơn hàng</h2>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></span>
              <span className="font-medium text-sm">{getStatusText(order.status)}</span>
            </div>
          </div>

          {/* Tracking Timeline */}
          {order.status !== 'cancelled' && (
            <div className="relative">
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border"></div>
              <div className="space-y-6">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${
                        step.completed
                          ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 pt-2">
                        <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {step.completed && index === trackingSteps.findIndex(s => s.completed) && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(order.createdAt).toLocaleString('vi-VN')}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Delivery Address */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Địa chỉ giao hàng</h3>
              <p className="text-sm text-muted-foreground mb-1">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">
                123 Nguyễn Văn Linh, Phường 10, Quận 7, TP.HCM
              </p>
              <p className="text-sm text-muted-foreground mt-1">SĐT: 0901234567</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Phương thức thanh toán</h3>
              <p className="text-sm text-muted-foreground">Thanh toán khi nhận hàng (COD)</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-medium mb-4">Sản phẩm ({order.items.length})</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.nameVi}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 truncate">{item.product.nameVi}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.selectedSize} • {item.selectedColor}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                    <span className="font-bold text-[#FF6B35]">
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-medium mb-4">Tóm tắt đơn hàng</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span>{(order.total - 30000).toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span>30.000₫</span>
            </div>
            <div className="h-px bg-border"></div>
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Tổng cộng</span>
              <span className="font-bold text-[#FF6B35]">
                {order.total.toLocaleString('vi-VN')}₫
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={onBack}
            className="flex-1 py-4 rounded-xl border-2 border-border bg-background"
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
          >
            Quay lại
          </motion.button>
          <motion.button
            onClick={onBackToHome}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
          >
            Về trang chủ
          </motion.button>
        </div>
      </div>
    </div>
  );
}

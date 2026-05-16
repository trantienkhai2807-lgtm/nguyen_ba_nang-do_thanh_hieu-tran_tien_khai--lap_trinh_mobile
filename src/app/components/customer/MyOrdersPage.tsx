import { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, Eye, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../data/mockData';

interface MyOrdersPageProps {
  orders: Order[];
  onBack: () => void;
  onViewOrderDetail: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onReorder: (orderId: string) => void;
}

export function MyOrdersPage({ orders, onBack, onViewOrderDetail, onCancelOrder, onReorder }: MyOrdersPageProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ xử lý' },
    { id: 'processing', label: 'Đang xử lý' },
    { id: 'shipped', label: 'Đang giao' },
    { id: 'delivered', label: 'Đã giao' }
  ];

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => order.status === activeTab);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-screen bg-background overflow-auto" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Đơn Hàng Của Tôi
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4 pb-24 space-y-3">
        {filteredOrders.map(order => (
          <motion.div
            key={order.id}
            className="bg-card border border-border rounded-xl overflow-hidden"
            whileTap={{ scale: 0.98 }}
          >
            {/* Order Header */}
            <div className="p-4 border-b border-border bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="font-medium">#{order.id}</span>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.nameVi}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate mb-1">{item.product.nameVi}</p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.selectedSize} • {item.selectedColor}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#FF6B35] font-medium">
                          {item.product.price.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-border mb-3">
                <span className="text-sm text-muted-foreground">Tổng cộng:</span>
                <span className="text-lg font-bold text-[#FF6B35]">
                  {order.total.toLocaleString('vi-VN')}₫
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewOrderDetail(order.id)}
                  className="flex-1 py-2 rounded-lg border-2 border-border text-sm flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Chi tiết
                </button>
                {order.status === 'delivered' && (
                  <button
                    onClick={() => onReorder(order.id)}
                    className="flex-1 py-2 rounded-lg bg-[#FF6B35] text-white text-sm"
                  >
                    Mua lại
                  </button>
                )}
                {(order.status === 'pending' || order.status === 'processing') && (
                  <button
                    onClick={() => {
                      setOrderToCancel(order.id);
                      setShowCancelModal(true);
                    }}
                    className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm"
                  >
                    Hủy đơn
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button
                    onClick={() => onViewOrderDetail(order.id)}
                    className="flex-1 py-2 rounded-lg bg-blue-500 text-white text-sm"
                  >
                    Theo dõi
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Chưa có đơn hàng</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bạn chưa có đơn hàng nào trong mục này
            </p>
            <button
              onClick={onBack}
              className="px-6 py-2 rounded-lg bg-[#FF6B35] text-white"
            >
              Mua sắm ngay
            </button>
          </div>
        )}
      </div>

      {/* Cancel Order Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
                  Hủy đơn hàng
                </h3>
                <p className="text-muted-foreground text-sm">
                  Bạn có chắc chắn muốn hủy đơn hàng #{orderToCancel}? Hành động này không thể hoàn tác.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border"
                  style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
                >
                  Không
                </button>
                <button
                  onClick={() => {
                    if (orderToCancel) {
                      onCancelOrder(orderToCancel);
                    }
                    setShowCancelModal(false);
                    setOrderToCancel(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white"
                  style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
                >
                  Hủy đơn
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

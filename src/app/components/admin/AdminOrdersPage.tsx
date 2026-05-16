import { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Truck, CheckCircle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockOrders } from '../../data/mockData';
import { toast } from 'sonner';

export function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [tempStatusFilter, setTempStatusFilter] = useState<string>('all');

  const statusOptions = [
    { value: 'all', label: 'Tất cả', color: 'bg-gray-500' },
    { value: 'pending', label: 'Chờ xử lý', color: 'bg-orange-500' },
    { value: 'processing', label: 'Đang xử lý', color: 'bg-blue-500' },
    { value: 'shipped', label: 'Đang giao', color: 'bg-purple-500' },
    { value: 'delivered', label: 'Đã giao', color: 'bg-green-500' },
    { value: 'cancelled', label: 'Đã hủy', color: 'bg-red-500' }
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option?.label || status;
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast.success(`Cập nhật trạng thái đơn hàng ${orderId} thành "${getStatusText(newStatus)}"`);
    setSelectedOrder(null);
  };

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              Quản Lý Đơn Hàng
            </h1>
            <button onClick={() => setShowFilterModal(true)} className="p-2 hover:bg-muted rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4">
            {statusOptions.map(status => (
              <button
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  statusFilter === status.value
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                {status.label}
                {status.value === 'all' && ` (${mockOrders.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4 space-y-3">
        {filteredOrders.map(order => (
          <motion.div
            key={order.id}
            className="bg-card border border-border rounded-xl p-4"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">#{order.id}</h3>
                  <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></span>
                  <span className="text-sm text-muted-foreground">{getStatusText(order.status)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{order.customerName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                className="p-2 hover:bg-muted rounded-lg relative"
              >
                <MoreVertical className="w-5 h-5" />

                {/* Dropdown Menu */}
                {selectedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 top-10 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[180px]"
                  >
                    <button
                      onClick={() => toast.info('Xem chi tiết đơn hàng')}
                      className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Xem chi tiết
                    </button>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'processing')}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                      >
                        <Truck className="w-4 h-4" />
                        Xác nhận đơn
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'shipped')}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                      >
                        <Truck className="w-4 h-4" />
                        Giao hàng
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm text-green-600"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Đã giao hàng
                      </button>
                    )}
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm text-red-600"
                      >
                        <XCircle className="w-4 h-4" />
                        Hủy đơn
                      </button>
                    )}
                  </motion.div>
                )}
              </button>
            </div>

            {/* Order Items */}
            <div className="space-y-2 mb-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
                  <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs">{item.product.nameVi}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.selectedSize} • {item.selectedColor} • x{item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#FF6B35]">
                    {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm text-muted-foreground">Tổng cộng:</span>
              <span className="text-lg font-bold text-[#FF6B35]">
                {order.total.toLocaleString('vi-VN')}₫
              </span>
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Không tìm thấy đơn hàng</h3>
            <p className="text-sm text-muted-foreground">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-background rounded-t-3xl p-6 w-full max-h-[70vh] overflow-auto pb-28"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
                  Lọc đơn hàng
                </h3>
                <button onClick={() => setShowFilterModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {statusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setTempStatusFilter(option.value)}
                    className={`w-full py-3 rounded-lg text-left px-4 flex items-center gap-3 transition-all ${
                      tempStatusFilter === option.value
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setStatusFilter(tempStatusFilter);
                  setShowFilterModal(false);
                  toast.success('Đã áp dụng bộ lọc');
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
              >
                Áp dụng bộ lọc
              </button>
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

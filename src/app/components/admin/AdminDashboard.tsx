import { useState } from 'react';
import { Plus, TrendingUp, ShoppingBag, Users, Package, MoreVertical, Download, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockOrders, mockProducts } from '../../data/mockData';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onAddProduct: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ onAddProduct, onLogout }: AdminDashboardProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showMenu, setShowMenu] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'clothes',
    stock: ''
  });

  // Calculate metrics
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const newCustomers = 12; // Mock data
  const activeProducts = mockProducts.length;

  // Mock revenue data for chart
  const revenueData = [
    { day: 'T2', revenue: 2400000 },
    { day: 'T3', revenue: 1800000 },
    { day: 'T4', revenue: 3200000 },
    { day: 'T5', revenue: 2800000 },
    { day: 'T6', revenue: 3800000 },
    { day: 'T7', revenue: 4200000 },
    { day: 'CN', revenue: 3500000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === statusFilter);

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl mb-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative"
          >
            <MoreVertical className="w-5 h-5" />

            {/* Dropdown Menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-12 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[200px]"
              >
                <button
                  onClick={() => {
                    toast.info('Tải xuống báo cáo');
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Xuất báo cáo
                </button>
                <button
                  onClick={() => {
                    setShowAddProductModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Thêm sản phẩm nhanh
                </button>
                <button
                  onClick={() => {
                    toast.info('Cài đặt hệ thống');
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Cài đặt
                </button>
                <div className="h-px bg-border" />
                <button
                  onClick={() => {
                    setShowMenu(false);
                    if (confirm('Bạn có muốn đăng xuất?')) {
                      onLogout();
                    }
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </motion.div>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Total Revenue */}
          <motion.div
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white"
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-sm opacity-90 mb-1">Doanh thu</h3>
            <p className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M₫</p>
            <div className="mt-2 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="white"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Total Orders */}
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-4 text-white"
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+8</span>
            </div>
            <h3 className="text-sm opacity-90 mb-1">Đơn hàng</h3>
            <p className="text-2xl font-bold">{totalOrders}</p>
            <p className="text-xs opacity-75 mt-2">Hôm nay</p>
          </motion.div>

          {/* New Customers */}
          <motion.div
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 text-white"
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+5</span>
            </div>
            <h3 className="text-sm opacity-90 mb-1">Khách hàng mới</h3>
            <p className="text-2xl font-bold">{newCustomers}</p>
            <p className="text-xs opacity-75 mt-2">Tuần này</p>
          </motion.div>

          {/* Active Products */}
          <motion.div
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 text-white"
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-sm opacity-90 mb-1">Sản phẩm</h3>
            <p className="text-2xl font-bold">{activeProducts}</p>
            <p className="text-xs opacity-75 mt-2">Đang hoạt động</p>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              Đơn hàng gần đây
            </h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-muted rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                className="bg-card border border-border rounded-xl p-4"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium mb-1">#{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                  </div>
                  <button className="p-2">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></span>
                    <span className="text-sm text-muted-foreground">
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <span className="font-bold text-[#FF6B35]">
                    {order.total.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString('vi-VN')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowAddProductModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-2xl flex items-center justify-center z-40"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <Plus className="w-7 h-7" />
      </motion.button>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowAddProductModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-background rounded-t-3xl p-6 w-full max-h-[85vh] overflow-auto pb-28"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl mb-6" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
                Thêm Sản Phẩm Nhanh
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên sản phẩm</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Nhập tên sản phẩm"
                    className="w-full p-3 rounded-lg bg-muted outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Danh mục</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full p-3 rounded-lg bg-muted outline-none"
                  >
                    <option value="clothes">Quần áo</option>
                    <option value="shoes">Giày dép</option>
                    <option value="equipment">Dụng cụ</option>
                    <option value="accessories">Phụ kiện</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Giá (₫)</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0"
                      className="w-full p-3 rounded-lg bg-muted outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Số lượng</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="0"
                      className="w-full p-3 rounded-lg bg-muted outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hình ảnh</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-[#FF6B35] transition-colors">
                    <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Nhấn để tải lên hình ảnh</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
                      toast.error('Vui lòng điền đầy đủ thông tin');
                      return;
                    }
                    toast.success('Đã thêm sản phẩm thành công!');
                    setNewProduct({ name: '', price: '', category: 'clothes', stock: '' });
                    setShowAddProductModal(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

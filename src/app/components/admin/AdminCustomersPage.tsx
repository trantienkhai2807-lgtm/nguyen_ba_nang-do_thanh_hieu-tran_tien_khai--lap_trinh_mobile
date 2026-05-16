import { useState } from 'react';
import { Search, MoreVertical, Eye, Ban, Mail, Phone, Package, Heart, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockCustomers } from '../../data/mockData';
import { toast } from 'sonner';

export function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<string | null>(null);

  const customers = mockCustomers.map(customer => ({
    ...customer,
    totalOrders: Math.floor(Math.random() * 20) + 1,
    totalSpent: Math.floor(Math.random() * 10000000) + 500000,
    joinedDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
    phone: '012345678' + Math.floor(Math.random() * 10),
    address: '123 Đường ABC, Quận ' + (Math.floor(Math.random() * 12) + 1) + ', TP.HCM'
  }));

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customerDetail = showDetailModal
    ? customers.find(c => c.id === showDetailModal)
    : null;

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl mb-4" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Quản Lý Khách Hàng
          </h1>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#FF6B35]">{customers.length}</p>
            <p className="text-xs text-muted-foreground">Tổng KH</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">
              {customers.filter(c => c.totalOrders > 5).length}
            </p>
            <p className="text-xs text-muted-foreground">VIP</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {customers.filter(c => {
                const daysSinceJoined = (Date.now() - c.joinedDate.getTime()) / (1000 * 60 * 60 * 24);
                return daysSinceJoined < 30;
              }).length}
            </p>
            <p className="text-xs text-muted-foreground">Mới</p>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="px-4 space-y-3">
        {filteredCustomers.map(customer => (
          <motion.div
            key={customer.id}
            className="bg-card border border-border rounded-xl p-4"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-white font-bold flex-shrink-0">
                {customer.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium truncate">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                  </div>

                  <button
                    onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}
                    className="p-2 hover:bg-muted rounded-lg relative"
                  >
                    <MoreVertical className="w-5 h-5" />

                    {/* Dropdown */}
                    {selectedCustomer === customer.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 top-10 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[160px]"
                      >
                        <button
                          onClick={() => {
                            setShowDetailModal(customer.id);
                            setSelectedCustomer(null);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Xem chi tiết
                        </button>
                        <button
                          onClick={() => {
                            toast.info(`Gửi email đến ${customer.email}`);
                            setSelectedCustomer(null);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          Gửi email
                        </button>
                        <button
                          onClick={() => {
                            toast.warning('Chặn khách hàng');
                            setSelectedCustomer(null);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm text-red-600"
                        >
                          <Ban className="w-4 h-4" />
                          Chặn
                        </button>
                      </motion.div>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    <span>{customer.totalOrders} đơn</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[#FF6B35]">
                      {(customer.totalSpent / 1000000).toFixed(1)}M₫
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Không tìm thấy khách hàng</h3>
            <p className="text-sm text-muted-foreground">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      <AnimatePresence>
        {showDetailModal && customerDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowDetailModal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-background rounded-t-3xl p-6 w-full max-h-[85vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  {customerDetail.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-1">{customerDetail.name}</h3>
                <p className="text-sm text-muted-foreground">{customerDetail.email}</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5" />
                    <span className="text-sm opacity-90">Tổng đơn hàng</span>
                  </div>
                  <p className="text-2xl font-bold">{customerDetail.totalOrders}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm opacity-90">Tổng chi tiêu</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {(customerDetail.totalSpent / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <h4 className="font-medium mb-3">Thông tin liên hệ</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#FF6B35]" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm">{customerDetail.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#FF6B35]" />
                      <div>
                        <p className="text-xs text-muted-foreground">Số điện thoại</p>
                        <p className="text-sm">{customerDetail.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Địa chỉ</p>
                        <p className="text-sm">{customerDetail.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-4">
                  <h4 className="font-medium mb-3">Thông tin khác</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ngày tham gia</span>
                      <span className="text-sm font-medium">
                        {customerDetail.joinedDate.toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Trung bình/đơn</span>
                      <span className="text-sm font-medium text-[#FF6B35]">
                        {(customerDetail.totalSpent / customerDetail.totalOrders / 1000).toFixed(0)}K₫
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDetailModal(null)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

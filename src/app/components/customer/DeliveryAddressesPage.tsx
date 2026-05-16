import { useState } from 'react';
import { ArrowLeft, MapPin, Plus, MoreVertical, Edit, Trash2, CheckCircle, Home, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface DeliveryAddressesPageProps {
  onBack: () => void;
}

interface Address {
  id: string;
  label: string;
  type: 'home' | 'office' | 'other';
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

export function DeliveryAddressesPage({ onBack }: DeliveryAddressesPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Nhà riêng',
      type: 'home',
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
      isDefault: true
    },
    {
      id: '2',
      label: 'Văn phòng',
      type: 'office',
      name: 'Nguyễn Văn A',
      phone: '0987654321',
      address: '456 Đường XYZ, Phường 2, Quận 3, TP.HCM',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    label: '',
    type: 'home' as 'home' | 'office' | 'other',
    name: '',
    phone: '',
    address: ''
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'office':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addrs =>
      addrs.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    setSelectedAddress(null);
    toast.success('Đã đặt làm địa chỉ mặc định');
  };

  const handleDelete = (id: string) => {
    setAddresses(addrs => addrs.filter(a => a.id !== id));
    setSelectedAddress(null);
    toast.success('Đã xóa địa chỉ');
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.name || !newAddress.phone || !newAddress.address) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newAddr: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, newAddr]);
    setNewAddress({
      label: '',
      type: 'home',
      name: '',
      phone: '',
      address: ''
    });
    setShowAddModal(false);
    toast.success('Đã thêm địa chỉ mới');
  };

  return (
    <div className="h-screen bg-background overflow-auto" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              Địa Chỉ Giao Hàng
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-full bg-[#FF6B35] text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Addresses List */}
      <div className="px-4 py-4 pb-24 space-y-3">
        {addresses.map(address => (
          <motion.div
            key={address.id}
            className={`bg-card border-2 rounded-xl p-4 ${
              address.isDefault ? 'border-[#FF6B35]' : 'border-border'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  address.isDefault ? 'bg-orange-100' : 'bg-muted'
                }`}>
                  {getTypeIcon(address.type)}
                  <span className={address.isDefault ? 'text-[#FF6B35]' : 'text-muted-foreground'}>
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{address.label}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded-full">
                        Mặc định
                      </span>
                    )}
                  </div>

                  <p className="text-sm mb-1">{address.name}</p>
                  <p className="text-sm text-muted-foreground mb-1">{address.phone}</p>
                  <p className="text-sm text-muted-foreground">{address.address}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAddress(selectedAddress === address.id ? null : address.id)}
                className="p-2 hover:bg-muted rounded-lg relative"
              >
                <MoreVertical className="w-5 h-5" />

                {/* Dropdown */}
                {selectedAddress === address.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 top-10 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[160px]"
                  >
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Đặt mặc định
                      </button>
                    )}
                    <button
                      onClick={() => toast.info('Chức năng chỉnh sửa')}
                      className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Chỉnh sửa
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </button>
                    )}
                  </motion.div>
                )}
              </button>
            </div>
          </motion.div>
        ))}

        {addresses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Chưa có địa chỉ giao hàng</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Thêm địa chỉ để nhận hàng nhanh hơn
            </p>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-background rounded-t-3xl p-6 w-full max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl mb-6" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
                Thêm Địa Chỉ Mới
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nhãn địa chỉ</label>
                  <input
                    type="text"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    placeholder="VD: Nhà riêng, Văn phòng"
                    className="w-full p-3 rounded-lg bg-muted outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loại địa chỉ</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNewAddress({ ...newAddress, type: 'home' })}
                      className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 ${
                        newAddress.type === 'home' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
                      }`}
                    >
                      <Home className="w-5 h-5" />
                      Nhà
                    </button>
                    <button
                      onClick={() => setNewAddress({ ...newAddress, type: 'office' })}
                      className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 ${
                        newAddress.type === 'office' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
                      }`}
                    >
                      <Briefcase className="w-5 h-5" />
                      Văn phòng
                    </button>
                    <button
                      onClick={() => setNewAddress({ ...newAddress, type: 'other' })}
                      className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 ${
                        newAddress.type === 'other' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                      Khác
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Họ và tên</label>
                  <input
                    type="text"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    placeholder="Nhập họ và tên"
                    className="w-full p-3 rounded-lg bg-muted outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    className="w-full p-3 rounded-lg bg-muted outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Địa chỉ chi tiết</label>
                  <textarea
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className="w-full p-3 rounded-lg bg-muted outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddAddress}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
                >
                  Thêm địa chỉ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

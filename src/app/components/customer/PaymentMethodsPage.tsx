import { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Building2, Plus, MoreVertical, Trash2, Edit, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface PaymentMethodsPageProps {
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'ewallet' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

export function PaymentMethodsPage({ onBack }: PaymentMethodsPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa',
      details: '**** **** **** 1234',
      isDefault: true
    },
    {
      id: '2',
      type: 'ewallet',
      name: 'MoMo',
      details: '0123456789',
      isDefault: false
    },
    {
      id: '3',
      type: 'bank',
      name: 'Vietcombank',
      details: 'TK: 1234567890',
      isDefault: false
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-6 h-6" />;
      case 'ewallet':
        return <Wallet className="w-6 h-6" />;
      case 'bank':
        return <Building2 className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'card':
        return 'from-blue-500 to-cyan-600';
      case 'ewallet':
        return 'from-purple-500 to-pink-600';
      case 'bank':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    setSelectedMethod(null);
    toast.success('Đã đặt làm phương thức mặc định');
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
    setSelectedMethod(null);
    toast.success('Đã xóa phương thức thanh toán');
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
              Phương Thức Thanh Toán
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

      {/* Payment Methods List */}
      <div className="px-4 py-4 pb-24 space-y-3">
        {paymentMethods.map(method => (
          <motion.div
            key={method.id}
            className={`bg-gradient-to-r ${getColor(method.type)} rounded-2xl p-5 text-white relative overflow-hidden`}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {getIcon(method.type)}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{method.name}</p>
                    <p className="text-sm opacity-90">{method.details}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                  className="p-2 hover:bg-white/10 rounded-lg relative"
                >
                  <MoreVertical className="w-5 h-5" />

                  {/* Dropdown */}
                  {selectedMethod === method.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-10 bg-card text-foreground border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px]"
                    >
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
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
                      {!method.isDefault && (
                        <button
                          onClick={() => handleDelete(method.id)}
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

              {method.isDefault && (
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                  <CheckCircle className="w-3 h-3" />
                  Mặc định
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <CreditCard className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Chưa có phương thức thanh toán</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Thêm phương thức thanh toán để thanh toán nhanh hơn
            </p>
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
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
                Thêm Phương Thức Thanh Toán
              </h3>

              <div className="space-y-3 mb-6">
                <button className="w-full p-4 rounded-xl border-2 border-border hover:border-[#FF6B35] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">Thẻ tín dụng/Ghi nợ</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                  </div>
                </button>

                <button className="w-full p-4 rounded-xl border-2 border-border hover:border-[#FF6B35] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">Ví điện tử</p>
                    <p className="text-sm text-muted-foreground">MoMo, ZaloPay, VNPay</p>
                  </div>
                </button>

                <button className="w-full p-4 rounded-xl border-2 border-border hover:border-[#FF6B35] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">Tài khoản ngân hàng</p>
                    <p className="text-sm text-muted-foreground">Liên kết tài khoản</p>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 rounded-xl border-2 border-border"
              >
                Hủy
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

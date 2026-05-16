import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, User, CreditCard, Wallet, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../../data/mockData';
import { toast } from 'sonner';

interface CheckoutPageProps {
  selectedItems: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

export function CheckoutPage({ selectedItems, onBack, onSuccess }: CheckoutPageProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM'
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'ewallet' | 'bank'>('cod');
  const [note, setNote] = useState('');

  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 30000;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Simulate order processing - optimized for faster feedback
    const loadingToast = toast.loading('Đang xử lý đơn hàng...');

    setTimeout(() => {
      toast.dismiss(loadingToast);
      onSuccess();
    }, 800);
  };

  return (
    <div className="h-screen bg-background overflow-auto pb-32" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Thanh Toán
          </h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Shipping Address */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B35]" />
              Địa chỉ nhận hàng
            </h3>
            <button className="text-[#FF6B35] text-sm">Thay đổi</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-muted-foreground mt-0.5" />
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                placeholder="Họ và tên"
              />
            </div>

            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                placeholder="Số điện thoại"
              />
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <textarea
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="flex-1 bg-transparent outline-none resize-none"
                rows={2}
                placeholder="Địa chỉ chi tiết"
              />
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium mb-3">Sản phẩm đã chọn ({selectedItems.length})</h3>
          <div className="space-y-3">
            {selectedItems.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.nameVi}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate mb-1">{item.product.nameVi}</p>
                  <div className="text-xs text-muted-foreground mb-1">
                    {item.selectedSize} • {item.selectedColor}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#FF6B35]">
                      {item.product.price.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium mb-3">Phương thức thanh toán</h3>
          <div className="space-y-2">
            <button
              onClick={() => setPaymentMethod('cod')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                paymentMethod === 'cod' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
              }`}
            >
              <Wallet className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-[#FF6B35]' : 'text-muted-foreground'}`} />
              <div className="flex-1 text-left">
                <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                <p className="text-xs text-muted-foreground">Thanh toán bằng tiền mặt khi nhận hàng</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'cod' ? 'border-[#FF6B35]' : 'border-muted-foreground'
              }`}>
                {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                paymentMethod === 'card' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
              }`}
            >
              <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#FF6B35]' : 'text-muted-foreground'}`} />
              <div className="flex-1 text-left">
                <p className="font-medium">Thẻ tín dụng/Ghi nợ</p>
                <p className="text-xs text-muted-foreground">Visa, Mastercard, JCB</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-[#FF6B35]' : 'border-muted-foreground'
              }`}>
                {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('ewallet')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                paymentMethod === 'ewallet' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
              }`}
            >
              <Wallet className={`w-5 h-5 ${paymentMethod === 'ewallet' ? 'text-[#FF6B35]' : 'text-muted-foreground'}`} />
              <div className="flex-1 text-left">
                <p className="font-medium">Ví điện tử</p>
                <p className="text-xs text-muted-foreground">MoMo, ZaloPay, VNPay</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'ewallet' ? 'border-[#FF6B35]' : 'border-muted-foreground'
              }`}>
                {paymentMethod === 'ewallet' && <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('bank')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                paymentMethod === 'bank' ? 'border-[#FF6B35] bg-orange-50' : 'border-border'
              }`}
            >
              <Building2 className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-[#FF6B35]' : 'text-muted-foreground'}`} />
              <div className="flex-1 text-left">
                <p className="font-medium">Chuyển khoản ngân hàng</p>
                <p className="text-xs text-muted-foreground">Chuyển khoản trực tiếp</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'bank' ? 'border-[#FF6B35]' : 'border-muted-foreground'
              }`}>
                {paymentMethod === 'bank' && <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>}
              </div>
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium mb-3">Ghi chú đơn hàng</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-muted rounded-lg p-3 outline-none resize-none"
            rows={3}
            placeholder="Ghi chú cho người bán (tùy chọn)"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium mb-3">Chi tiết thanh toán</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span>{subtotal.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span>{shipping.toLocaleString('vi-VN')}₫</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giảm giá</span>
                <span className="text-green-500">-{discount.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            <div className="h-px bg-border my-2"></div>
            <div className="flex justify-between text-lg">
              <span>Tổng cộng</span>
              <span className="font-bold text-[#FF6B35]">
                {total.toLocaleString('vi-VN')}₫
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 z-50">
        <motion.button
          onClick={handlePlaceOrder}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg"
          whileTap={{ scale: 0.95 }}
          style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
        >
          ĐẶT HÀNG ({total.toLocaleString('vi-VN')}₫)
        </motion.button>
      </div>
    </div>
  );
}

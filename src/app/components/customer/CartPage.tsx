import { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CheckSquare, Square } from 'lucide-react';
import { motion, PanInfo } from 'motion/react';
import { CartItem } from '../../data/mockData';
import { toast } from 'sonner';

interface CartPageProps {
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (selectedItems: CartItem[]) => void;
}

export function CartPage({ cart, onBack, onUpdateQuantity, onRemoveItem, onCheckout }: CartPageProps) {
  const [swipedItem, setSwipedItem] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set(cart.map((_, i) => i)));
  const [selectAll, setSelectAll] = useState(true);

  const subtotal = cart.reduce((sum, item, index) => {
    if (selectedItems.has(index)) {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  const handleDragEnd = (index: number, _: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) {
      setSwipedItem(index);
    } else {
      setSwipedItem(null);
    }
  };

  const handleDelete = (index: number) => {
    onRemoveItem(index);
    setSwipedItem(null);
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      // Adjust indices after deletion
      const adjustedSet = new Set<number>();
      newSet.forEach(i => {
        if (i > index) {
          adjustedSet.add(i - 1);
        } else {
          adjustedSet.add(i);
        }
      });
      return adjustedSet;
    });
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const toggleSelectItem = (index: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      setSelectAll(newSet.size === cart.length);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      setSelectedItems(new Set(cart.map((_, i) => i)));
      setSelectAll(true);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      toast.error('Vui lòng chọn sản phẩm để thanh toán');
      return;
    }
    const selected = cart.filter((_, index) => selectedItems.has(index));
    onCheckout(selected);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) {
      toast.error('Vui lòng chọn sản phẩm để xóa');
      return;
    }

    // Delete from highest index to lowest to avoid index shifting issues
    const sortedIndices = Array.from(selectedItems).sort((a, b) => b - a);
    sortedIndices.forEach(index => {
      onRemoveItem(index);
    });

    setSelectedItems(new Set());
    setSelectAll(false);
    toast.success(`Đã xóa ${sortedIndices.length} sản phẩm`);
  };

  if (cart.length === 0) {
    return (
      <div className="h-screen bg-background flex flex-col" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Giỏ Hàng
          </h1>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl mb-2" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Giỏ hàng trống
          </h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl flex-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Giỏ Hàng ({cart.length})
          </h1>
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 text-sm"
          >
            {selectAll ? (
              <CheckSquare className="w-5 h-5 text-[#FF6B35]" />
            ) : (
              <Square className="w-5 h-5 text-muted-foreground" />
            )}
            <span>Tất cả</span>
          </button>
        </div>

        {selectedItems.size > 0 && (
          <div className="px-4 pb-3">
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 text-sm text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Xóa đã chọn ({selectedItems.size})
            </button>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto px-4 py-4 pb-64">
        <div className="space-y-3">
          {cart.map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl">
              {/* Delete Background */}
              <div className="absolute inset-0 bg-destructive flex items-center justify-end px-6 rounded-xl">
                <Trash2 className="w-6 h-6 text-white" />
              </div>

              {/* Swipeable Card */}
              <motion.div
                className="bg-card border border-border rounded-xl p-4 relative"
                drag="x"
                dragConstraints={{ left: -120, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, info) => handleDragEnd(index, e, info)}
                animate={{ x: swipedItem === index ? -120 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleSelectItem(index)}
                    className="flex-shrink-0 pt-1"
                  >
                    {selectedItems.has(index) ? (
                      <CheckSquare className="w-5 h-5 text-[#FF6B35]" />
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate mb-1">{item.product.nameVi}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      <span>{item.selectedSize}</span>
                      <span className="mx-2">•</span>
                      <span>{item.selectedColor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#FF6B35]">
                        {item.product.price.toLocaleString('vi-VN')}₫
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded-full bg-background flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-background flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Delete Button (shown when swiped) */}
              {swipedItem === index && (
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          💡 Vuốt sang trái để xóa sản phẩm
        </div>
      </div>

      {/* Summary Section - Fixed at bottom */}
      <div className="fixed bottom-16 left-0 right-0 border-t border-border bg-background p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-10">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Phí vận chuyển</span>
            <span>{shipping.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="h-px bg-border my-2"></div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Tổng cộng</span>
            <span className="font-bold text-[#FF6B35]">
              {total.toLocaleString('vi-VN')}₫
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          onClick={handleCheckout}
          disabled={selectedItems.size === 0}
          className={`w-full py-4 rounded-xl shadow-lg text-lg ${
            selectedItems.size === 0
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white'
          }`}
          whileTap={selectedItems.size > 0 ? { scale: 0.95 } : {}}
          style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
        >
          THANH TOÁN ({selectedItems.size} SẢN PHẨM)
        </motion.button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Share2, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Product } from '../../data/mockData';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  wishlist: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onBuyNow: (product: Product, size: string, color: string) => void;
}

export function ProductDetailPage({
  product,
  onBack,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow
}: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleHeartClick = () => {
    onToggleWishlist(product.id);

    if (!wishlist.has(product.id)) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.9, y: 0.1 },
        colors: ['#FF6B35', '#FF8C42', '#FFB347']
      });
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    toast.success('Đã thêm vào giỏ hàng!', {
      description: `${product.nameVi} - ${selectedSize} - ${selectedColor}`
    });
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="h-screen bg-background overflow-auto pb-32" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[400px] bg-muted">
        <motion.img
          key={currentImageIndex}
          src={product.images[currentImageIndex]}
          alt={product.nameVi}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Pagination Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentImageIndex === index ? 'w-6 bg-[#FF6B35]' : 'w-2 bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 px-4">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                currentImageIndex === index ? 'border-[#FF6B35]' : 'border-white/50'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-background rounded-t-3xl -mt-8 relative z-10 p-6">
        {/* Title & Rating */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-2xl mb-2" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
              {product.nameVi}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-sm">Còn {product.stock} sản phẩm</span>
            </div>
          </div>
          <button
            onClick={handleHeartClick}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
          >
            <motion.div
              animate={wishlist.has(product.id) ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-6 h-6 ${wishlist.has(product.id) ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-400'}`}
              />
            </motion.div>
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-[#FF6B35]">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
              <span className="bg-[#FF6B35] text-white text-sm px-2 py-1 rounded-full">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="mb-3">Chọn Size</h3>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map(size => (
              <motion.button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 rounded-full border-2 transition-all ${
                  selectedSize === size
                    ? 'border-[#FF6B35] bg-[#FF6B35] text-white'
                    : 'border-border bg-background'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <h3 className="mb-3">Chọn Màu: {selectedColor}</h3>
          <div className="flex gap-3">
            {product.colors.map(color => (
              <motion.button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color.name ? 'border-[#FF6B35] scale-110' : 'border-border'
                } transition-transform`}
                style={{ backgroundColor: color.hex }}
                whileTap={{ scale: 0.9 }}
              >
                {selectedColor === color.name && (
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-3">Mô tả sản phẩm</h3>
          <div className={`text-muted-foreground ${!showFullDescription ? 'line-clamp-3' : ''}`}>
            {product.description}
          </div>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-[#FF6B35] mt-2"
          >
            {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 z-50">
        <div className="flex gap-3">
          <motion.button
            onClick={handleAddToCart}
            className="flex-1 py-4 rounded-xl border-2 border-[#FF6B35] text-[#FF6B35] flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5" />
            Thêm vào giỏ
          </motion.button>
          <motion.button
            onClick={handleBuyNow}
            className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg"
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}
          >
            MUA NGAY
          </motion.button>
        </div>
      </div>
    </div>
  );
}

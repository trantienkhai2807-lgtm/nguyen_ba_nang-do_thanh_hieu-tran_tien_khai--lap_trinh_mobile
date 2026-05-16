import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, Heart, ShoppingCart, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { mockProducts, Product } from '../../data/mockData';
import { toast } from 'sonner';

interface AllProductsPageProps {
  onBack: () => void;
  onNavigateToProduct: (productId: string) => void;
  wishlist: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export function AllProductsPage({
  onBack,
  onNavigateToProduct,
  wishlist,
  onToggleWishlist,
  onAddToCart
}: AllProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');

  const categories = [
    { icon: '👕', name: 'Quần áo', value: 'clothes' },
    { icon: '👟', name: 'Giày dép', value: 'shoes' },
    { icon: '🏋️', name: 'Dụng cụ', value: 'equipment' },
    { icon: '🎒', name: 'Phụ kiện', value: 'accessories' }
  ];

  const priceRanges = [
    { label: 'Tất cả', value: 'all', min: 0, max: Infinity },
    { label: 'Dưới 500.000₫', value: 'under-500k', min: 0, max: 500000 },
    { label: '500.000₫ - 1.000.000₫', value: '500k-1m', min: 500000, max: 1000000 },
    { label: '1.000.000₫ - 2.000.000₫', value: '1m-2m', min: 1000000, max: 2000000 },
    { label: 'Trên 2.000.000₫', value: 'over-2m', min: 2000000, max: Infinity }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    const priceRange = priceRanges.find(r => r.value === selectedPriceRange);
    const matchesPrice = !priceRange || (product.price >= priceRange.min && product.price < priceRange.max);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleHeartClick = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(productId);

    if (!wishlist.has(productId)) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 20,
        spread: 50,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ['#FF6B35', '#FF8C42', '#FFB347']
      });
    }
  };

  const handleAddToCartQuick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0], product.colors[0].name);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const applyFilters = () => {
    setShowFilters(false);
    toast.success('Đã áp dụng bộ lọc');
  };

  return (
    <div className="h-screen bg-background overflow-auto pb-24" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl flex-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Tất Cả Sản Phẩm
          </h1>
          <button onClick={() => setShowFilters(true)} className="p-2">
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === 'all' ? 'bg-[#FF6B35] text-white' : 'bg-muted'
            }`}
          >
            Tất cả
          </button>
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === cat.value ? 'bg-[#FF6B35] text-white' : 'bg-muted'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{sortedProducts.length} sản phẩm</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm bg-muted rounded-lg px-3 py-2 outline-none"
          >
            <option value="newest">Mới nhất</option>
            <option value="popular">Phổ biến</option>
            <option value="price-low">Giá thấp - cao</option>
            <option value="price-high">Giá cao - thấp</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          {sortedProducts.map(product => (
            <motion.div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border cursor-pointer"
              onClick={() => onNavigateToProduct(product.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.nameVi}
                  className="w-full h-48 object-cover"
                />
                <button
                  className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center"
                  onClick={(e) => handleHeartClick(product.id, e)}
                >
                  <Heart
                    className={`w-5 h-5 ${wishlist.has(product.id) ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-400'}`}
                  />
                </button>
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-[#FF6B35] text-white text-xs px-2 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm truncate mb-1">{product.nameVi}</p>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-xs text-muted-foreground">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-bold text-[#FF6B35] block">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCartQuick(product, e)}
                    className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Không tìm thấy sản phẩm</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
            </p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-background rounded-t-3xl p-6 w-full max-h-[80vh] overflow-auto pb-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>Bộ lọc</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Khoảng giá</h4>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <button
                        key={range.value}
                        onClick={() => setSelectedPriceRange(range.value)}
                        className={`w-full py-3 rounded-lg text-left px-4 transition-all ${
                          selectedPriceRange === range.value
                            ? 'bg-[#FF6B35] text-white'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
                >
                  Áp dụng bộ lọc
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

import { useState, useEffect } from 'react';
import { Heart, Bell, Menu, Mic, SlidersHorizontal, Search, X, ChevronRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { mockProducts } from '../../data/mockData';
import { Skeleton } from '../ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { toast } from 'sonner';

interface HomePageProps {
  onNavigateToProduct: (productId: string) => void;
  wishlist: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: any, size: string, color: string) => void;
  onNavigateToAllProducts: () => void;
  onNavigateToMyOrders: () => void;
  onNavigateToProfile: () => void;
}

export function HomePage({ onNavigateToProduct, wishlist, onToggleWishlist, onAddToCart, onNavigateToAllProducts, onNavigateToMyOrders, onNavigateToProfile }: HomePageProps) {
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState<string>('all');
  const [appliedPriceRange, setAppliedPriceRange] = useState<string>('all');

  const banners = [
    {
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
      title: 'Flash Sale',
      subtitle: 'Giảm đến 50%'
    },
    {
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80',
      title: 'Giày Thể Thao Nam',
      subtitle: 'Bộ sưu tập mới'
    },
    {
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80',
      title: 'Trang Phục Gym',
      subtitle: 'Thoải mái vận động'
    }
  ];

  const categories = [
    { icon: '👕', name: 'Quần áo', value: 'clothes' },
    { icon: '👟', name: 'Giày dép', value: 'shoes' },
    { icon: '🏋️', name: 'Dụng cụ', value: 'equipment' },
    { icon: '🎒', name: 'Phụ kiện', value: 'accessories' }
  ];

  const notifications = [
    { id: 1, title: 'Đơn hàng đã giao', message: 'Đơn hàng #ORD001 đã được giao thành công', time: '5 phút trước', unread: true },
    { id: 2, title: 'Flash Sale đang diễn ra', message: 'Giảm giá đến 50% cho giày thể thao', time: '1 giờ trước', unread: true },
    { id: 3, title: 'Sản phẩm yêu thích giảm giá', message: 'Nike Air Max giảm còn 1.290.000₫', time: '2 giờ trước', unread: false }
  ];

  const flashSaleProducts = mockProducts.filter(p => p.isFlashSale);

  // Filter products based on search and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleAddToCartQuick = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0], product.colors[0].name);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);

    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);

    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  if (loading) {
    return (
      <div className="h-screen bg-background overflow-auto pb-20">
        <div className="p-4 space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-2" onClick={() => setShowMenuDrawer(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            SPORTSTORE
          </h1>
          <button className="p-2 relative" onClick={() => setShowNotifications(true)}>
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B35] rounded-full"></span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3 shadow-sm">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {searchQuery && (
              <button className="p-1" onClick={() => setSearchQuery('')}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <button className="p-1" onClick={() => setShowVoiceSearch(true)}>
              <Mic className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-1" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Drawer */}
      <Sheet open={showMenuDrawer} onOpenChange={setShowMenuDrawer}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <button
              onClick={() => {
                setShowMenuDrawer(false);
                // Already on home
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted"
            >
              <span>Trang chủ</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowMenuDrawer(false);
                onNavigateToAllProducts();
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted"
            >
              <span>Sản phẩm</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowMenuDrawer(false);
                onNavigateToMyOrders();
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted"
            >
              <span>Đơn hàng của tôi</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowMenuDrawer(false);
                toast.info('Chức năng yêu thích - Vào tab Yêu thích');
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted"
            >
              <span>Yêu thích</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowMenuDrawer(false);
                toast.info('Liên hệ hỗ trợ: support@sportstore.vn');
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted"
            >
              <span>Hỗ trợ</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowMenuDrawer(false);
                onNavigateToProfile();
              }}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted"
            >
              <span>Cài đặt</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Notifications Drawer */}
      <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>Thông báo</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-4 rounded-lg border ${notif.unread ? 'bg-orange-50 border-orange-200' : 'bg-muted'}`}>
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-sm">{notif.title}</h4>
                  {notif.unread && <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                <span className="text-xs text-muted-foreground">{notif.time}</span>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Voice Search Modal */}
      <AnimatePresence>
        {showVoiceSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowVoiceSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-background rounded-2xl p-8 m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] mx-auto mb-4 flex items-center justify-center">
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <p className="text-lg mb-2">Đang lắng nghe...</p>
                <p className="text-sm text-muted-foreground">Hãy nói tên sản phẩm bạn cần tìm</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <h4 className="font-medium mb-3">Danh mục</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-[#FF6B35] text-white' : 'bg-muted'}`}
                    >
                      Tất cả
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-4 py-2 rounded-full ${selectedCategory === cat.value ? 'bg-[#FF6B35] text-white' : 'bg-muted'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Khoảng giá</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTempPriceRange('all')}
                      className={`w-full py-3 rounded-lg text-left px-4 transition-all ${
                        tempPriceRange === 'all'
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setTempPriceRange('under-500k')}
                      className={`w-full py-3 rounded-lg text-left px-4 transition-all ${
                        tempPriceRange === 'under-500k'
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      Dưới 500.000₫
                    </button>
                    <button
                      onClick={() => setTempPriceRange('500k-1m')}
                      className={`w-full py-3 rounded-lg text-left px-4 transition-all ${
                        tempPriceRange === '500k-1m'
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      500.000₫ - 1.000.000₫
                    </button>
                    <button
                      onClick={() => setTempPriceRange('1m-2m')}
                      className={`w-full py-3 rounded-lg text-left px-4 transition-all ${
                        tempPriceRange === '1m-2m'
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      1.000.000₫ - 2.000.000₫
                    </button>
                    <button
                      onClick={() => setTempPriceRange('over-2m')}
                      className={`w-full py-3 rounded-lg text-left px-4 transition-all ${
                        tempPriceRange === 'over-2m'
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      Trên 2.000.000₫
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAppliedPriceRange(tempPriceRange);
                    setShowFilters(false);
                    toast.success('Đã áp dụng bộ lọc');
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
                >
                  Áp dụng bộ lọc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Carousel with Parallax */}
      <div className="relative h-56 overflow-hidden">
        <motion.div
          className="relative h-full"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentBanner === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-3xl mb-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
                  {banner.title}
                </h2>
                <p className="text-white/90 text-lg">{banner.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentBanner === index ? 'w-6 bg-[#FF6B35]' : 'w-2 bg-white/50'
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(cat.value)}
              className="flex flex-col items-center gap-2 min-w-[80px]"
            >
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] scale-110'
                    : 'bg-gradient-to-br from-[#FF6B35]/70 to-[#FF8C42]/70'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {cat.icon}
              </motion.div>
              <span className={`text-sm ${selectedCategory === cat.value ? 'font-semibold text-[#FF6B35]' : ''}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className="px-4 py-4">
        <div className="rounded-xl p-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl mb-1" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
                ⚡ FLASH SALE
              </h3>
              <p className="text-sm opacity-90">Kết thúc sau:</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs">Giờ</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs">Phút</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs">Giây</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {flashSaleProducts.map(product => (
              <div
                key={product.id}
                className="min-w-[160px] bg-white rounded-xl overflow-hidden cursor-pointer"
                onClick={() => onNavigateToProduct(product.id)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.nameVi}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
                    onClick={(e) => handleHeartClick(product.id, e)}
                  >
                    <motion.div
                      animate={wishlist.has(product.id) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-5 h-5 ${wishlist.has(product.id) ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-400'}`}
                      />
                    </motion.div>
                  </button>
                  <div className="absolute top-2 left-2 bg-[#FF6B35] text-white text-xs px-2 py-1 rounded-full">
                    -{Math.round((1 - product.price / (product.originalPrice || product.price)) * 100)}%
                  </div>
                </div>
                <div className="p-3 text-foreground">
                  <p className="text-sm truncate mb-1">{product.nameVi}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FF6B35]">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Products Grid */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            {selectedCategory === 'all' ? 'Sản Phẩm Nổi Bật' :
             selectedCategory === 'clothes' ? 'Quần Áo Thể Thao' :
             selectedCategory === 'shoes' ? 'Giày Dép Thể Thao' :
             selectedCategory === 'equipment' ? 'Dụng Cụ Thể Thao' :
             'Phụ Kiện Thể Thao'}
          </h3>
          <span className="text-sm text-muted-foreground">{filteredProducts.length} sản phẩm</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
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
                  <motion.div
                    animate={wishlist.has(product.id) ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${wishlist.has(product.id) ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-400'}`}
                    />
                  </motion.div>
                </button>
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-1">Không tìm thấy sản phẩm</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? `Không có kết quả cho "${searchQuery}"` : 'Không có sản phẩm trong danh mục này'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 rounded-lg bg-[#FF6B35] text-white"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </div>

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

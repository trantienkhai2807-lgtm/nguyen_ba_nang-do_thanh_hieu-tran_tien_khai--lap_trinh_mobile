import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../data/mockData';

interface WishlistPageProps {
  products: Product[];
  onBack: () => void;
  onNavigateToProduct: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export function WishlistPage({
  products,
  onBack,
  onNavigateToProduct,
  onToggleWishlist,
  onAddToCart
}: WishlistPageProps) {
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0], product.colors[0].name);
  };

  if (products.length === 0) {
    return (
      <div className="h-screen bg-background flex flex-col" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Yêu Thích
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl mb-2" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Chưa có sản phẩm yêu thích
          </h2>
          <p className="text-muted-foreground mb-6">
            Thêm sản phẩm vào danh sách yêu thích để theo dõi
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white"
          >
            Khám phá ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border sticky top-0 bg-background z-10">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
          Yêu Thích ({products.length})
        </h1>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                >
                  <Heart className="w-5 h-5 fill-[#FF6B35] text-[#FF6B35]" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm truncate mb-1">{product.nameVi}</p>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-xs text-muted-foreground">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
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
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-9 h-9 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, MoreVertical, Edit, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockProducts } from '../../data/mockData';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

interface AdminProductsPageProps {
  onAddProduct: () => void;
}

export function AdminProductsPage({ onAddProduct }: AdminProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'clothes',
    stock: ''
  });

  const categories = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Quần áo', value: 'clothes' },
    { label: 'Giày dép', value: 'shoes' },
    { label: 'Phụ kiện', value: 'accessories' },
    { label: 'Dụng cụ', value: 'equipment' }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen bg-background overflow-auto pb-20" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl mb-4" style={{ fontFamily: 'Oswald, Montserrat, sans-serif' }}>
            Quản Lý Sản Phẩm
          </h1>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3 mb-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <div className="flex gap-3">
                  <Skeleton className="w-20 h-20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-20">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                className="bg-card border border-border rounded-xl p-4"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium truncate pr-2">{product.nameVi}</h3>
                      <button
                        onClick={() => setShowMenu(showMenu === product.id ? null : product.id)}
                        className="p-1 relative"
                      >
                        <MoreVertical className="w-5 h-5" />

                        {/* Dropdown Menu */}
                        {showMenu === product.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 top-8 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[140px]"
                          >
                            <button className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm">
                              <Edit className="w-4 h-4" />
                              Chỉnh sửa
                            </button>
                            <button className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Xóa
                            </button>
                          </motion.div>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full capitalize">
                        {product.category === 'clothes' ? 'Quần áo' :
                         product.category === 'shoes' ? 'Giày dép' :
                         product.category === 'accessories' ? 'Phụ kiện' :
                         product.category === 'equipment' ? 'Dụng cụ' : product.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 50 ? 'bg-green-500/20 text-green-500' :
                        product.stock > 20 ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        Kho: {product.stock}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#FF6B35]">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg mb-1">Không tìm thấy sản phẩm</h3>
                <p className="text-sm text-muted-foreground">
                  Thử tìm kiếm với từ khóa khác
                </p>
              </div>
            )}
          </div>
        )}
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

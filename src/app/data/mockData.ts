export interface Product {
  id: string;
  name: string;
  nameVi: string;
  price: number;
  originalPrice?: number;
  category: 'shoes' | 'clothes' | 'equipment' | 'accessories';
  gender: 'male' | 'female' | 'unisex';
  image: string;
  images: string[];
  rating: number;
  description: string;
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  stock: number;
  isFlashSale?: boolean;
  flashSaleEnd?: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max Running Shoes',
    nameVi: 'Giày Chạy Bộ Nike Air Max',
    price: 1290000,
    originalPrice: 1890000,
    category: 'shoes',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80'
    ],
    rating: 4.8,
    description: 'Giày chạy bộ cao cấp với công nghệ đệm Air Max, mang lại sự thoải mái tối đa cho đôi chân.',
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Đen', hex: '#000000' },
      { name: 'Trắng', hex: '#FFFFFF' },
      { name: 'Xanh', hex: '#0066FF' }
    ],
    stock: 45,
    isFlashSale: true,
    flashSaleEnd: new Date(Date.now() + 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'Adidas Performance Shirt',
    nameVi: 'Áo Polo Thể Thao Riki',
    price: 450000,
    originalPrice: 650000,
    category: 'clothes',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
    ],
    rating: 4.5,
    description: 'Áo polo thể thao với chất liệu thoáng khí, thấm hút mồ hôi tốt, phù hợp cho tập luyện.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Đen', hex: '#000000' },
      { name: 'Trắng', hex: '#FFFFFF' },
      { name: 'Cam', hex: '#FF6B35' }
    ],
    stock: 120,
    isFlashSale: true,
    flashSaleEnd: new Date(Date.now() + 2 * 60 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Yoga Mat Pro',
    nameVi: 'Thảm Yoga Cao Cấp',
    price: 350000,
    category: 'equipment',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'
    ],
    rating: 4.7,
    description: 'Thảm yoga chất liệu cao su thiên nhiên, chống trượt, độ dày 6mm.',
    sizes: ['One Size'],
    colors: [
      { name: 'Tím', hex: '#9B59B6' },
      { name: 'Hồng', hex: '#FF69B4' },
      { name: 'Xanh', hex: '#00BCD4' }
    ],
    stock: 80
  },
  {
    id: '4',
    name: 'Women Running Shoes',
    nameVi: 'Giày Thể Thao Nữ',
    price: 990000,
    originalPrice: 1490000,
    category: 'shoes',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80'
    ],
    rating: 4.9,
    description: 'Giày chạy bộ nữ thiết kế năng động, trẻ trung với công nghệ đệm êm ái.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Hồng', hex: '#FF69B4' },
      { name: 'Trắng', hex: '#FFFFFF' }
    ],
    stock: 35,
    isFlashSale: true,
    flashSaleEnd: new Date(Date.now() + 2 * 60 * 60 * 1000)
  },
  {
    id: '5',
    name: 'Sports Water Bottle',
    nameVi: 'Bình Nước Thể Thao',
    price: 150000,
    category: 'accessories',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'
    ],
    rating: 4.3,
    description: 'Bình nước thể thao dung tích 750ml, chất liệu nhựa an toàn.',
    sizes: ['750ml'],
    colors: [
      { name: 'Đen', hex: '#000000' },
      { name: 'Xanh', hex: '#0066FF' },
      { name: 'Cam', hex: '#FF6B35' }
    ],
    stock: 200
  },
  {
    id: '6',
    name: 'Compression Shorts',
    nameVi: 'Quần Tập Gym Nam',
    price: 280000,
    category: 'clothes',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
    ],
    rating: 4.6,
    description: 'Quần tập gym co giãn 4 chiều, thoáng mát, ôm dáng.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Đen', hex: '#000000' },
      { name: 'Xám', hex: '#808080' }
    ],
    stock: 90
  },
  {
    id: '7',
    name: 'Dumbbell Set',
    nameVi: 'Bộ Tạ Đôi 5kg',
    price: 550000,
    category: 'equipment',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'
    ],
    rating: 4.8,
    description: 'Bộ tạ đôi 5kg phủ cao su, chống trượt, phù hợp tập luyện tại nhà.',
    sizes: ['5kg'],
    colors: [
      { name: 'Đen', hex: '#000000' }
    ],
    stock: 40
  },
  {
    id: '8',
    name: 'Sports Backpack',
    nameVi: 'Balo Thể Thao',
    price: 420000,
    category: 'accessories',
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    rating: 4.4,
    description: 'Balo thể thao đa năng, nhiều ngăn tiện lợi, chống nước.',
    sizes: ['One Size'],
    colors: [
      { name: 'Đen', hex: '#000000' },
      { name: 'Xanh', hex: '#0066FF' },
      { name: 'Cam', hex: '#FF6B35' }
    ],
    stock: 65
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'CUST001',
    customerName: 'Nguyễn Văn A',
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
        selectedSize: '42',
        selectedColor: 'Đen'
      }
    ],
    total: 1290000,
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: 'ORD002',
    customerId: 'CUST002',
    customerName: 'Trần Thị B',
    items: [
      {
        product: mockProducts[1],
        quantity: 2,
        selectedSize: 'M',
        selectedColor: 'Trắng'
      },
      {
        product: mockProducts[2],
        quantity: 1,
        selectedSize: 'One Size',
        selectedColor: 'Tím'
      }
    ],
    total: 1250000,
    status: 'processing',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: 'ORD003',
    customerId: 'CUST003',
    customerName: 'Lê Văn C',
    items: [
      {
        product: mockProducts[3],
        quantity: 1,
        selectedSize: '38',
        selectedColor: 'Hồng'
      }
    ],
    total: 990000,
    status: 'delivered',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com'
  },
  {
    id: 'CUST002',
    name: 'Trần Thị B',
    email: 'tranthib@email.com'
  },
  {
    id: 'CUST003',
    name: 'Lê Văn C',
    email: 'levanc@email.com'
  }
];

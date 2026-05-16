"use dom";

import { useState } from "react";
import "../styles/index.css";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./components/customer/HomePage";
import { ProductDetailPage } from "./components/customer/ProductDetailPage";
import { CartPage } from "./components/customer/CartPage";
import { WishlistPage } from "./components/customer/WishlistPage";
import { ProfilePage } from "./components/customer/ProfilePage";
import { CheckoutPage } from "./components/customer/CheckoutPage";
import { OrderSuccessPage } from "./components/customer/OrderSuccessPage";
import { MyOrdersPage } from "./components/customer/MyOrdersPage";
import { OrderDetailPage } from "./components/customer/OrderDetailPage";
import { PaymentMethodsPage } from "./components/customer/PaymentMethodsPage";
import { DeliveryAddressesPage } from "./components/customer/DeliveryAddressesPage";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { AllProductsPage } from "./components/customer/AllProductsPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminProductsPage } from "./components/admin/AdminProductsPage";
import { AdminOrdersPage } from "./components/admin/AdminOrdersPage";
import { AdminCustomersPage } from "./components/admin/AdminCustomersPage";
import { AdminSettingsPage } from "./components/admin/AdminSettingsPage";
import { CustomerBottomNav } from "./components/shared/CustomerBottomNav";
import { AdminBottomNav } from "./components/shared/AdminBottomNav";
import {
  mockProducts,
  mockOrders,
  CartItem,
  Product,
} from "./data/mockData";
import { toast } from "sonner";

type Screen =
  | "home"
  | "all-products"
  | "product-detail"
  | "cart"
  | "wishlist"
  | "profile"
  | "my-orders"
  | "order-detail"
  | "payment-methods"
  | "delivery-addresses"
  | "checkout"
  | "order-success"
  | "admin-dashboard"
  | "admin-products"
  | "admin-orders"
  | "admin-customers"
  | "admin-settings";

type UserRole = "customer" | "admin" | null;

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [selectedProductId, setSelectedProductId] = useState<
    string | null
  >(null);
  const [selectedOrderId, setSelectedOrderId] = useState<
    string | null
  >(null);
  const [wishlist, setWishlist] = useState<Set<string>>(
    new Set(),
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [orders, setOrders] = useState(mockOrders);
  const [showRegister, setShowRegister] = useState(false);

  // Handle navigation
  const handleNavigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen("product-detail");
  };

  const handleBack = () => {
    if (currentScreen === "product-detail") {
      setCurrentScreen("home");
    } else {
      setCurrentScreen("home");
    }
  };

  // Handle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  // Handle cart
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color,
      );

      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (
    index: number,
    quantity: number,
  ) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart[index].quantity = quantity;
      return newCart;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = (selectedItems: CartItem[]) => {
    setCheckoutItems(selectedItems);
    setCurrentScreen("checkout");
  };

  const handleOrderSuccess = () => {
    // Clear cart items that were in checkout
    setCart((prev) =>
      prev.filter((item) => !checkoutItems.includes(item)),
    );
    setCheckoutItems([]);
    setCurrentScreen("order-success");
  };

  const [checkoutItems, setCheckoutItems] = useState<
    CartItem[]
  >([]);

  // Get wishlist products
  const wishlistProducts = mockProducts.filter((p) =>
    wishlist.has(p.id),
  );

  // Get selected product
  const selectedProduct = selectedProductId
    ? mockProducts.find((p) => p.id === selectedProductId)
    : null;

  // Login/Register screen
  if (userRole === null) {
    if (showRegister) {
      return (
        <>
          <RegisterPage
            onRegister={() => {
              setShowRegister(false);
            }}
            onBackToLogin={() => setShowRegister(false)}
          />
          <Toaster position="top-center" />
        </>
      );
    }

    return (
      <>
        <LoginPage
          onLogin={(role) => {
            setUserRole(role);
            if (role === 'admin') {
              setCurrentScreen('admin-dashboard');
            }
          }}
          onNavigateToRegister={() => setShowRegister(true)}
        />
        <Toaster position="top-center" />
      </>
    );
  }

  // Customer screens
  if (userRole === "customer") {
    return (
      <div className="size-full">
        {currentScreen === "home" && (
          <HomePage
            onNavigateToProduct={handleNavigateToProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigateToAllProducts={() =>
              setCurrentScreen("all-products")
            }
            onNavigateToMyOrders={() =>
              setCurrentScreen("my-orders")
            }
            onNavigateToProfile={() =>
              setCurrentScreen("profile")
            }
          />
        )}

        {currentScreen === "all-products" && (
          <AllProductsPage
            onBack={() => setCurrentScreen("home")}
            onNavigateToProduct={handleNavigateToProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentScreen === "product-detail" &&
          selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onBack={handleBack}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onBuyNow={(product, size, color) => {
                const item: CartItem = {
                  product,
                  quantity: 1,
                  selectedSize: size,
                  selectedColor: color,
                };
                setCheckoutItems([item]);
                setCurrentScreen("checkout");
              }}
            />
          )}

        {currentScreen === "cart" && (
          <CartPage
            cart={cart}
            onBack={() => setCurrentScreen("home")}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        )}

        {currentScreen === "wishlist" && (
          <WishlistPage
            products={wishlistProducts}
            onBack={() => setCurrentScreen("home")}
            onNavigateToProduct={handleNavigateToProduct}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentScreen === "profile" && (
          <ProfilePage
            onLogout={() => {
              setUserRole(null);
              setCurrentScreen("home");
              setCart([]);
              setWishlist(new Set());
              setOrders(mockOrders);
              toast.success("Đã đăng xuất");
            }}
            onNavigateToOrders={() =>
              setCurrentScreen("my-orders")
            }
            onNavigateToWishlist={() =>
              setCurrentScreen("wishlist")
            }
            onNavigateToPaymentMethods={() =>
              setCurrentScreen("payment-methods")
            }
            onNavigateToAddresses={() =>
              setCurrentScreen("delivery-addresses")
            }
          />
        )}

        {currentScreen === "my-orders" && (
          <MyOrdersPage
            orders={orders}
            onBack={() => setCurrentScreen("profile")}
            onViewOrderDetail={(orderId) => {
              setSelectedOrderId(orderId);
              setCurrentScreen("order-detail");
            }}
            onCancelOrder={(orderId) => {
              setOrders(prev => prev.map(order =>
                order.id === orderId
                  ? { ...order, status: 'cancelled' as const }
                  : order
              ));
              toast.success(`Đã hủy đơn hàng #${orderId}`);
            }}
            onReorder={(orderId) => {
              const order = orders.find(o => o.id === orderId);
              if (order) {
                // Add all items from the order to cart
                const newItems = order.items.map(item => ({
                  product: item.product,
                  quantity: item.quantity,
                  selectedSize: item.selectedSize,
                  selectedColor: item.selectedColor
                }));

                setCart(prev => {
                  const updatedCart = [...prev];
                  newItems.forEach(newItem => {
                    const existingIndex = updatedCart.findIndex(
                      cartItem =>
                        cartItem.product.id === newItem.product.id &&
                        cartItem.selectedSize === newItem.selectedSize &&
                        cartItem.selectedColor === newItem.selectedColor
                    );

                    if (existingIndex >= 0) {
                      updatedCart[existingIndex].quantity += newItem.quantity;
                    } else {
                      updatedCart.push(newItem);
                    }
                  });
                  return updatedCart;
                });

                toast.success(`Đã thêm ${order.items.length} sản phẩm vào giỏ hàng!`);
                setCurrentScreen("cart");
              }
            }}
          />
        )}

        {currentScreen === "order-detail" &&
          selectedOrderId && (
            <OrderDetailPage
              order={orders.find(o => o.id === selectedOrderId)}
              onBack={() => setCurrentScreen("my-orders")}
              onBackToHome={() => setCurrentScreen("home")}
            />
          )}

        {currentScreen === "payment-methods" && (
          <PaymentMethodsPage
            onBack={() => setCurrentScreen("profile")}
          />
        )}

        {currentScreen === "delivery-addresses" && (
          <DeliveryAddressesPage
            onBack={() => setCurrentScreen("profile")}
          />
        )}

        {currentScreen === "checkout" && (
          <CheckoutPage
            selectedItems={checkoutItems}
            onBack={() => setCurrentScreen("cart")}
            onSuccess={handleOrderSuccess}
          />
        )}

        {currentScreen === "order-success" && (
          <OrderSuccessPage
            onBackToHome={() => setCurrentScreen("home")}
            onViewOrders={() => setCurrentScreen("my-orders")}
            onViewOrderDetail={() => {
              setSelectedOrderId("ORD001");
              setCurrentScreen("order-detail");
            }}
          />
        )}

        {/* Only show bottom nav on main screens, not on checkout/success/sub-pages */}
        {![
          "checkout",
          "order-success",
          "product-detail",
          "my-orders",
          "order-detail",
          "payment-methods",
          "delivery-addresses",
          "all-products",
        ].includes(currentScreen) && (
          <CustomerBottomNav
            activeTab={
              currentScreen === "home"
                ? "home"
                : currentScreen === "cart"
                  ? "cart"
                  : currentScreen === "wishlist"
                    ? "search"
                    : currentScreen === "profile"
                      ? "profile"
                      : "home"
            }
            onNavigate={(tab) => {
              if (tab === "home") setCurrentScreen("home");
              else if (tab === "search")
                setCurrentScreen("wishlist");
              else if (tab === "cart") setCurrentScreen("cart");
              else if (tab === "profile")
                setCurrentScreen("profile");
            }}
            cartCount={cart.length}
          />
        )}

        <Toaster position="top-center" />
      </div>
    );
  }

  // Admin screens
  if (userRole === "admin") {
    return (
      <div className="size-full">
        {currentScreen === "admin-dashboard" && (
          <AdminDashboard
            onAddProduct={() =>
              setCurrentScreen("admin-products")
            }
            onLogout={() => {
              setUserRole(null);
              setCurrentScreen("home");
              toast.success("Đã đăng xuất");
            }}
          />
        )}

        {currentScreen === "admin-products" && (
          <AdminProductsPage
            onAddProduct={() =>
              toast.info("Chức năng thêm sản phẩm")
            }
          />
        )}

        {currentScreen === "admin-orders" && (
          <AdminOrdersPage />
        )}

        {currentScreen === "admin-customers" && (
          <AdminCustomersPage />
        )}

        {currentScreen === "admin-settings" && (
          <AdminSettingsPage
            onLogout={() => {
              setUserRole(null);
              setCurrentScreen("home");
              toast.success("Đã đăng xuất");
            }}
          />
        )}

        <AdminBottomNav
          activeTab={
            currentScreen === "admin-dashboard"
              ? "dashboard"
              : currentScreen === "admin-products"
                ? "products"
                : currentScreen === "admin-orders"
                  ? "orders"
                  : currentScreen === "admin-customers"
                    ? "customers"
                    : currentScreen === "admin-settings"
                      ? "settings"
                      : "dashboard"
          }
          onNavigate={(tab) => {
            if (tab === "dashboard")
              setCurrentScreen("admin-dashboard");
            else if (tab === "products")
              setCurrentScreen("admin-products");
            else if (tab === "orders")
              setCurrentScreen("admin-orders");
            else if (tab === "customers")
              setCurrentScreen("admin-customers");
            else if (tab === "settings")
              setCurrentScreen("admin-settings");
          }}
        />

        <Toaster position="top-center" />
      </div>
    );
  }

  return null;
}

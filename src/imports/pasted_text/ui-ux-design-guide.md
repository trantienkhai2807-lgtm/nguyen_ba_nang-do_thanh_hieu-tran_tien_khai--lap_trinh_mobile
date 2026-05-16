PHẦN 1: ĐỊNH HƯỚNG UI/UX & HIỆU ỨNG (ANIMATIONS) DÀNH CHO MOBILE
Phong cách thiết kế (Design Style):

Chủ đề: Thể thao hiện đại (Modern Sports E-commerce).

Màu sắc: Nền trắng/xám nhạt (Light Mode) hoặc Đen nhám (Dark Mode) kết hợp với màu nhấn nổi bật, tràn đầy năng lượng như Neon Orange (Cam neon) hoặc Electric Blue (Xanh dương đậm).

Font chữ: Tiêu đề dùng font mạnh mẽ (Oswald, Montserrat), nội dung dùng font dễ đọc (Inter, Roboto).

Hình khối: Bo góc nhẹ (Rounded 8px - 12px), sử dụng thẻ (Cards) có đổ bóng nhẹ (Soft Drop Shadow) để tạo chiều sâu.

Hiệu ứng hoạt ảnh (Animations & Micro-interactions):

Skeleton Loading: Khung xương mờ chạy qua lại khi chờ tải dữ liệu ảnh.

Parallax Scroll: Ảnh banner ở trang chủ trượt chậm hơn tốc độ cuộn trang.

Lottie/Micro-interactions: Nút "Thả tim" (Wishlist) đập nhịp nhàng và nổ pháo hoa nhỏ khi bấm. Nút "Thêm vào giỏ" có hiệu ứng thu nhỏ (Scale down) và nảy lên (Bounce) khi chạm.

Swipe to action: Vuốt để xóa sản phẩm trong giỏ hàng (Cart).

Bottom Sheet: Sử dụng menu trượt từ dưới lên cho các bộ lọc (Filter), chọn size/màu sắc thay vì chuyển trang mới.

PHẦN 2: THIẾT KẾ WORKFLOW CHO TỪNG ĐỐI TƯỢNG
Dựa vào Controller và Views trong project của bạn, web có 2 đối tượng chính: Khách hàng (User) và Quản trị viên (Admin).

Đối tượng 1: KHÁCH HÀNG (Customer)
Workflow Mua sắm: Mở app -> Màn hình Home (Banner Deal, Sản phẩm nổi bật) -> Tìm kiếm/Lọc (Theo Nam, Nữ, Giày, Dụng cụ) -> Chi tiết sản phẩm (Xem ảnh, chọn size) -> Thêm vào giỏ -> Thanh toán (Checkout).

Workflow Cá nhân: Đăng nhập -> Trang cá nhân -> Xem danh sách yêu thích (Wishlist) -> Theo dõi đơn hàng.

Đối tượng 2: QUẢN TRỊ VIÊN (Admin)
Workflow Theo dõi & Xử lý đơn: Đăng nhập Admin -> Dashboard (Tổng quan doanh thu, Đơn hàng mới) -> Danh sách đơn hàng (Orders) -> Cập nhật trạng thái đơn.

Workflow Quản lý sản phẩm: Tab Sản phẩm (Products) -> Thêm mới sản phẩm (Chụp ảnh từ điện thoại upload lên) -> Chỉnh sửa.

PHẦN 3: FORMAT PROMPT CHO "FIGMA MAKE" TẠO GIAO DIỆN
Hướng dẫn sử dụng: Hãy copy từng đoạn prompt (tiếng Anh để AI Figma hiểu tốt nhất) dưới đây paste vào công cụ tạo UI của Figma.

1. Cho Khách hàng - Màn hình Trang chủ (Customer Home Screen)
Prompt:

Mobile UI design for a modern sports equipment e-commerce app. > Theme: Energetic, sleek, high-contrast, bold typography.
Structure:

Header: Sticky top with a hamburger menu, brand logo (bold text "SPORTSTORE"), and a bell icon with a red notification dot.

Search Bar: Floating search bar with a microphone icon for voice search and a filter icon. Soft shadow effect.

Hero Section: Horizontal scrolling carousel of large, dynamic banners (showing athletes or shoe deals like "Giày thể thao Nam"). Add pagination dots.

Categories (Horizontal Scroll): Circular icons with text below: "Clothes", "Shoes", "Equipment", "Accessories".

Flash Sale Section: Countdown timer with a fiery neon orange gradient background. Horizontal scroll of product cards.

Product Cards: Each card contains an image, bold title, price, and a floating circular "Heart" icon at the top right.

Bottom Navigation Bar: Sticky at the bottom with 4 icons: Home (active), Search, Cart, Profile. Add a glassmorphism blur effect to the background of the nav bar.

2. Cho Khách hàng - Chi tiết Sản phẩm (Product Detail Screen)
Prompt:

Mobile UI design for a sports product detail page.
Structure:

Header: Transparent with a back button and a share icon.

Image Gallery: Full-width large image taking up the top 40% of the screen. Add pagination indicators.

Product Info: Title (e.g., "Áo Polo Thể Thao Riki"), Star rating, and large bold Price tag.

Variants (Bottom Sheet style but inline): >    - "Select Size" with interactive pill-shaped buttons (S, M, L, XL). Highlight the selected one with a solid energetic color.

"Select Color" with small circular color swatches.

Description Section: Short text with a "Read More" dropdown.

Fixed Bottom Action Bar: Sticky bottom bar containing two elements: a secondary "Add to Cart" outlined button, and a primary, glowing neon "Buy Now" button stretching the rest of the width.

3. Cho Khách hàng - Giỏ hàng & Yêu thích (Cart & Wishlist)
Prompt:

Mobile UI design for a shopping cart screen in a sports app.
Structure:

Header: "My Cart" title.

List of Items: Vertical list of product cards. Each card has a thumbnail on the left, title and price on the right.

Interactions: Include a sleek stepper (+/-) for quantity adjustment. Visually show a "Swipe left to delete" state on one of the items with a red trash can icon revealing behind it.

Summary Section: Subtotal, Shipping fee, and Total cost presented cleanly at the bottom.

Checkout Button: Large, sticky, vibrant colored button at the very bottom saying "Proceed to Checkout ($XXX)".

4. Cho Quản trị viên - Tổng quan (Admin Dashboard)
Prompt:

Mobile UI design for an Admin Dashboard of a sports e-commerce store.
Theme: Clean, analytical, dark mode preferred for professional look.
Structure:

Header: "Dashboard", User Avatar, Date filter dropdown.

Metric Cards (Grid layout): 4 square cards showing "Total Revenue" (with an upward green trend chart), "Total Orders", "New Customers", and "Products Active". Use soft gradients for these cards.

Recent Orders List: A vertical list showing order ID, customer name, price, and a status pill (e.g., "Pending" in orange, "Delivered" in green).

Floating Action Button (FAB): A large, bright "+" button fixed at the bottom right to quickly "Add New Product".

Bottom Navigation: Dashboard (active), Orders, Products, Customers, Settings.

5. Cho Quản trị viên - Quản lý Sản phẩm (Admin Products List)
Prompt:

Mobile UI design for an Admin Product Management screen.
Structure:

Header: "Products", followed by a search bar to quickly find items.

Category Tabs: Scrollable horizontal pills (All, Clothes, Shoes, Accessories) to filter the list.

Product List View: A clean list where each row shows a small image thumbnail, Product Name, Current Stock (in bold), and Price.

Actions: Include a "three-dot" menu icon on each row for Edit/Delete options.

Empty State / Loading: Show a skeleton loading UI for the bottom half of the list to demonstrate the loading state.
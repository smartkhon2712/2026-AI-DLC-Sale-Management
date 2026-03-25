# Các Chữ Ký Phương Thức Hạt Nhân (Component Methods Signatures)

**[RÀNG BUỘC KỸ THUẬT QUAN TRỌNG]**: Toàn bộ Response chung của API phải thống nhất theo chuẩn bao bọc JSON sau:
`{ success: boolean, data: T, message: string, errorCode?: string }`

## 1. Backend Controllers API Signatures
### 1.1 AuthController
- `login(req, res)`: Nhận username/password (Body). Trả về `{ TokenJWT, Role }`.

### 1.2 ProductController
- `getProducts(req, res)`: Query param: page, limit, keyword, category_id. Trả về array Product List.
- `createProduct(req, res)`: Nhận Request Body (sku, name, price, cost, stock). Trả về Product Object sinh ra.
- `updateProduct(req, res)`: Nhận ID qua Param URL và Body Fields cần đổi. Trả về thành công dữ liệu thay đổi.

### 1.3 OrderController
- `createOrder(req, res)`: Nhận JSON Payload `{ customerId, items: [ { productId, quantity } ] }`. Trả về Cấu trúc Order hoàn chỉnh và Total Amount (Backend tự tính Total).
- `updateOrderStatus(req, res)`: Nhận `{ status }`. (Chuyển "Paid" sẽ kích hoạt Event trừ SL Tồn kho). Mở rộng trả về trạng thái Order mới.

### 1.4 ReportController
- `getDashboardMetrics(req, res)`: Nhận Payload dải DateRange startDate - endDate. Trả về tập Dataset Array để vẽ Bar Chart / Line Chart tại Frontend.

## 2. Frontend Services & Store Methods
### 2.1 ApiClient (Axios Interceptor Method)
- `request(config)`: Intercept nhét Auth Token lấy từ `localStorage` vào Header `Authorization: Bearer <token>`. Nếu backend phản hồi HTTP 401 hoặc vỏ bọc `{ success: false }`, tự động ném ra Error Axios toàn cục để báo lỗi Toast Msg.

### 2.2 Pinia Auth Store (auth.store)
- `signIn(credentials)`: Gọi `AuthApiService.login()`. Parse payload, lưu Token + Role Name vào biến State và đồng bộ Storage.
- `logout()`: Xóa rỗng Token biến Local, gọi hook nhảy Redirection về LoginView.

### 2.3 Pinia Order Store (order.store)
- `addItemToCart(product, quantity)`: Push sản phẩm vào mảng Memory. Xử lý cộng dồn Quantity nếu Trùng khớp Product ID.
- `updateQuantity(cartItemId, quantity)` / `removeItem(cartItemId)`: Trạng thái cục bộ giỏ POS.
- `checkout(customerId)`: Parse Giỏ hàng JSON gửi xuống `OrderApiService.submitOrder()`. Sau khi API OK thì Clear nội dung Store.

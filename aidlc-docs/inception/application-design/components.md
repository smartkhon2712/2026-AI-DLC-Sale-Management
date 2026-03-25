# Cấu Trúc Thành Phần Hệ Thống (Application Components)

Hệ thống được thiết kế theo mô hình Client-Server (SPA Vue 3 giao tiếp REST API Node.js).
Theo quyết định hệ thống (Folder Architecture: Type-Based), Frontend được module hóa theo phân loại file tập trung (components, views, store,...).

## 1. Thành phần Frontend (Web App - Vue 3)
### 1.1 Khối Giao Diện Cốt Lõi (Views)
- **HomeView** / **DashboardView**: Tổng hợp Dashboard báo cáo cho Admin.
- **LoginView**: Chịu trách nhiệm nhập liệu thông tin Authenticate (JWT).
- **ProductListView**: Hiển thị danh sách Sản phẩm, thanh tìm kiếm từ khóa, và popup thêm/sửa Sản phẩm.
- **OrderProcessView**: Giao diện POS cốt lõi dành cho Staff tạo Đơn hàng, thêm SP vào giỏ.
- **CustomerListView**: Giao diện tìm kiếm thông tin Khách hàng, tạo mới lý lịch Khách hàng.

### 1.2 Khối UI Component (Shared Components)
- **BaseButton / BaseInput / DataTable**: Component dùng chung không chứa business logic. Ràng buộc các Rule Validation form thông qua thư viện VeeValidate / Zod.
- **NavigationMenu**: Trình đơn Menu điều hướng phân luồng cấp quyền hiển thị theo Vai trò (Admin/Staff).

### 1.3 Khối Trạng Thái Toàn Cục (Pinia Stores)
- **auth.store**: Quản lý Token Auth được gửi từ máy chủ, phân quyền Role hiện hành, thông tin phiên làm việc.
- **product.store**: Quản lý danh sách sản phẩm lấy từ DB (có cache nhẹ) hỗ trợ tra cứu tốc độ cao ngay lúc tạo lập order.
- **order.store**: Nơi quản lý Giỏ hàng (Mảng item memory tạm thời) lúc Staff lên bill duyệt POS.

## 2. Thành phần Backend (REST API - Node.js)
### 2.1 Web Server & API Gateway
- **Express App**: Nơi gắn kết Middleware, Routes chính (bắt đầu bằng `/api/v1/`).
- **Middlewares**: `auth.middleware` (chặn JWT request sai chuẩn, bắt ép Header Bearer), `error.middleware` (gom tất cả lỗi Exception trả về format JSON duy nhất).

### 2.2 Core Business Controllers (Orchestrators)
- **AuthController**: Giao tiếp Endpoint xác thực Authenticate/Login.
- **ProductController**: Tuyến phòng thủ Quản lý Product CRUD, Category CRUD.
- **OrderController**: Tuyến xử lý vòng đời tạo giao dịch, đổi trạng thái Order.
- **CustomerController**: Quản lý Data Record Khách hàng.
- **ReportController**: Tuyến kết xuất Dashboard & Chart Analytics (Endpoint bị Lock Require Quyền Admin).

### 2.3 Data Access (Prisma Model)
- Các cấu trúc Type Mapping cho PostgreSQL DB: `User`, `Customer`, `Product`, `Category`, `Order`, `OrderItem`.

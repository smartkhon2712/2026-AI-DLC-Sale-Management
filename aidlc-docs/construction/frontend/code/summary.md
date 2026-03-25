# Frontend Unit - Code Generation Summary

Quá trình sinh mã nguồn cho Unit giao diện `frontend` đã thành công tốt đẹp, hoàn tất bức tranh toàn hệ thống.

## Công nghệ & Thư Viện
- Sử dụng **Vue 3 (Composition API)** kết hợp quy trình khởi tạo nhanh của **Vite**.
- Thay vì CSS thuần, hệ thống đã cài sẵn **Tailwind CSS**.
- Gọi hàm API mượt mà qua Object `axios.create` có nhúng Interceptor, và quản trị thẻ quy trình bằng **Pinia Store**.

## Các Trụ Cột Đã Cấy Vào Codebase
1. **Routing (`src/router/index.js`)**: Kiểm chứng quyền hạn (Route Guards). Nhân viên bị đẩy thẳng vào màn hình Cửa Hàng POS, Admin được truy cập Dashboard.
2. **State Mangers (`src/store/*.js`)**:
   - `auth.store.js`: Lưu giữ JWT Token và tên User.
   - `order.store.js`: Trục xương sống để Checkout giỏ hàng Offline trong phiên chớp nhoáng (POS Cache).
3. **Views (`src/views/*.vue`)**: Dựng 4 bức tranh chính: `LoginView`, `DashboardView`, `ProductView`, và `OrderPOSView`. Đã áp dụng `data-testid` để đón tự động hóa thao tác.

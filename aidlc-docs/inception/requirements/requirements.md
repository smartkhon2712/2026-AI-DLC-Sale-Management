# Yêu Cầu Sản Phẩm (Requirements)

## 1. Tóm Tắt Phân Tích Mục Tiêu (Intent Analysis)
- **Yêu Cầu (User Request)**: Phát triển website quản lý bán hàng dựa theo các tài liệu mô tả tại màn hình `steering`.
- **Loại Dự Án (Request Type)**: Greenfield / Dự án mới.
- **Phạm Vi (Scope Estimate)**: Toàn bộ hệ thống (System-wide), bao gồm cả Frontend, Backend và Database.
- **Mức Độ Phức Tạp (Complexity Estimate)**: Mức trung bình - cao (Moderate), xử lý nghiệp vụ bán hàng liên quan đến sản phẩm, khách hàng, đơn hàng, và phân quyền người dùng.

## 2. Các Ràng Buộc Theo Quyết Định Mới
- **Cơ Sở Dữ Liệu**: Hệ thống sẽ sử dụng PostgreSQL kết hợp cùng Prisma ORM (Đã chốt qua phân tích yêu cầu).
- **Mở Rộng Bảo Mật (Security Extensions)**: Bỏ qua (Skip) các quy tắc cấu hình bảo mật tiêu chuẩn chuyên sâu để phù hợp với quy trình xây dựng ứng dụng ở dạng nguyên mẫu/MVP (Tuy nhiên vẫn đảm bảo những cấu hình an ninh cơ bản được nhắc tới trong Tech.md).

## 3. Chức Năng Cốt Lõi (Functional Requirements - MVP Phase 1)

### 3.1. Quản lý Sản phẩm & Tồn kho (Product & Inventory)
- Cung cấp các thao tác CRUD cơ bản: Tạo mới, Xem, Sửa, Xóa/Ẩn sản phẩm.
- Dữ liệu lưu trữ: Mã SKU, Tên sản phẩm, Hình ảnh minh họa.
- Quản lý tài chính: Giá nhập kho (Cost) và Giá bán niêm yết.
- Quản lý định lượng: Trạng thái kinh doanh (Mở bán/Ngừng kinh doanh), Số lượng tồn kho.
- Cho phép tìm kiếm và lọc dữ liệu (theo giá, trạng thái, danh mục, từ khóa).
- Sản phẩm được phân loại theo danh mục.

### 3.2. Quản lý Danh mục (Category)
- Quản lý và tạo mới các thẻ danh mục sản phẩm (VD: Đồ điện tử, gia dụng).
- Ánh xạ liên kết mỗi sản phẩm tương ứng với 1 danh mục.

### 3.3. Hồ sơ Khách hàng (Customer CRM)
- Quản lý thông tin: Họ và tên, Điện thoại/Zalo, Email, Địa chỉ giao hàng.
- Lưu vết lịch sử: Tự tổng hợp lượng chi tiêu và thống kê đánh giá tệp người dùng tiềm năng.

### 3.4. Xử Lý Đơn Hàng (Order Processing)
- Tạo đơn hàng linh hoạt gán với người mua cụ thể.
- Đưa sản phẩm vào giỏ hàng bằng mã SKU, tự động cộng tổng giá trị.
- Áp dụng Workflow trạng thái đơn: `Pending` (Chờ xử lý) -> `Paid/Processing` (Đã thanh toán/Đang giao) -> `Completed` (Hoàn thành) -> `Cancelled` (Đã hủy).

### 3.5. Hệ thống Báo Cáo (Analytics/Reports)
- Biểu diễn và tính toán doanh thu theo thời gian (Ngày/Tuần/Tháng).
- Phân tích chi phí/tỷ lệ giao nhận đơn hàng.
- Theo dõi hạng mục mặt hàng bán chạy và tạo tín hiệu cảnh báo nếu kho sắp hết hàng.

### 3.6. Phân Quyền Vai Trò (Role-Based Access Control)
- **Admin**: Khai thác toàn thể các chức năng của hệ thống. Kiểm tra tài khoản Staff, cấu hình tham số, đọc báo cáo phân tích rủi ro/lợi nhuận.
- **Staff (Nhân viên Quầy)**: Giới hạn theo dõi ở khía cạnh thực thi các luồng thao tác: lên đơn, chỉnh trạng thái đơn, lưu trữ hồ sơ thông tin người mua.

## 4. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### 4.1 UI/UX và Performance
- **Giao diện**: Responsive Design phù hợp cho PC, Tablet / iPad cài đặt tại quầy thu ngân. Trải nghiệm Single Page Application mượt mà, hạn chế tối đa việc tải lại trang.
- **Hiệu Năng**: API có tốc độ đáp trả thời gian lý tưởng dưới 250ms. Màn hình Frontend hiện rổ DOM với tốc độ < 1.5 giây.

### 4.2 Thiết Kế Kiến Trúc (Architecture & Tech Stack)
Quản trị qua phương pháp Monorepo với bộ đôi công nghệ chủ đạo:
- **Frontend SPA**: Lõi Vue 3 bằng Composition API và Vite. State quản lý bằng Pinia. Styling qua Tailwind CSS.
- **Backend API**: Xây dựng Restful API với Node.js / Express.js hoạt động dưới kiến trúc 3 class `Controller - Service - Repository`.
- Quản trị DB với DBMS PostgreSQL cùng tiện ích truy vấn bằng dòng lệnh kết nối hướng đối tượng (Prisma ORM).

### 4.3 An Ninh & Vận Hành (DevOps)
- Triển khai xác thực người dùng dựa trên kỹ thuật JSON Web Token.
- Bảo mật cơ bản như hash Bcrypt, bọc Helmet chống HTTP Exploit và phòng thủ DDoS cơ học.
- CI/CD qua GitFlow. Đưa Docker container vào phục vụ đóng gói độc lập cho ứng dụng và sử dụng công nghệ Nginx điều phối request.

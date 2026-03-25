# Kiến Trúc Lớp Dịch Vụ (Service Layer)

## 1. Backend Services (Business Layer)
Các Router / Controller bắt buộc KHÔNG chứa sâu thuật toán Logic. Chúng rẽ nhánh và giao phó hoàn toàn nhiệm vụ cho tầng Service tương ứng xử lý (Lớp Logic có thể dễ dàng Module hóa đem áp dụng cho Worker ngầm hoặc Cron nếu cần).

### 1.1 AuthService
- **Hash/Verify Password**: Sử dụng cơ chế muối của thuật toán mã hóa 1 chiều `Bcrypt.compare()`.
- **Token Generation**: Dùng hạt giống cấu trúc chuẩn `jsonwebtoken` sinh chuỗi mã hóa ký thuật số chứa thông điệp Session và ID người dùng.

### 1.2 ProductService
- **Check SKU Duplication**: Đảm nhiệm truy vấn DB không cho phép 2 sản phẩm trùng mã hàng SKU.
- **Stock Tracking**: Kiểm duyệt logic số lượng xuất kho vật lý (Cấp phát lỗi nếu rơi xuống ngưỡng âm/0 bất hợp lý).

### 1.3 OrderService (Orchestrator Logic hạng nặng nhất)
- **Calculate Total**: Thực hiện kết xuất lấy Đơn giá chuẩn yếu của Product ID DB thay vì nhận rủi ro tin tưởng giá niêm yết do Payload Frontend bơm vào. Tính ra Total Amount làm mốt thanh toán đơn.
- **State Machine Rules**: Chỉ được phép xoay vòng Order từ `Pending` -> `Paid` / `Cancelled`. Block rào cản luồng chặn Request cố tình đảo ngược trạng thái từ `Paid` ngược lại `Pending`.
- **Database Transaction (Prisma \$transaction)**: Bọc khối Transaction cho CSDL. Đảm bảo khi nhân viên bấm Status đơn `Paid`, quá trình (1) "Lưu status Đơn" và (2) "Trừ số dư Inventory Sản Phẩm" phải xảy ra tuyệt đối đồng bộ. Nửa chừng nảy lỗi hệ thống bắt buộc cuộn ngược (`Rollback`), chối bỏ lệnh để bảo vệ sổ sách.

### 1.4 CustomerService
- **Accumulate Spending**: Cộng gộp mức chỉ tiêu vào hạng thẻ `totalSpend` mỗi khi Service Order bắn tín hiệu đơn hàng của cá nhân thuộc diện trạng thái hoàn thành kinh tế `Completed`.

## 2. Frontend Network Services
Tầng trừu tượng API Layer tách biệt khỏi Framework để có thể dễ dàng Unit Test hoặc chuyển đổi Domain URI:
- **AuthApiService**: Chứa Request POST `login()`.
- **ProductApiService**: Chứa Request GET `fetchList()`, POST `create()`, PATCH `update()`.
- **OrderApiService**: Chứa Request POST `submitOrder()`, PATCH `changeStatus()`.
- **ReportApiService**: Chứa Request GET `getRevenueChart()`.

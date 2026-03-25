# Danh Sách User Stories (BDD Format)

## Feature 1: Quản lý Sản Phẩm và Danh Mục (Product & Catalog Management)

### US1.1: Tạo mới danh mục sản phẩm (Create Category)
**Là một** Admin,
**Tôi muốn** có thể tạo các thẻ danh mục lớn,
**Để** phân nhóm hàng nghìn sản phẩm kho một cách logic và dễ tìm.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** người dùng Admin đang ở màn hình Danh mục (Category)
- **When** nhập Tên danh mục mới và mô tả, rồi bấm Lưu
- **Then** danh mục được tạo thành công trên cơ sở dữ liệu và list danh sách cập nhật ngay lập tức mà không cần reload cứng trang web
- **And** nếu trường bắt buộc "Tên" bị bỏ trống sẽ xuất hiện báo lỗi Validation chữ đỏ.

### US1.2: Thêm mới Sản phẩm (Add Product)
**Là một** Admin hoặc Staff,
**Tôi muốn** tạo mới dữ liệu của một hàng hóa vào kho,
**Để** có mã sản phẩm cho quá trình tạo lập hóa đơn POS.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** người dùng có tài khoản đang đứng ở màn hình Danh sách Sản phẩm
- **When** nhấn nút "Thêm mới" và điền mã SKU, Tên, Giá bán, Giá vốn, Số lượng nhập và chọn Danh mục
- **Then** ứng dụng lưu trữ thành công và trả về thông báo Toast xanh
- **And** số lượng tồn kho (stock_quantity) mặc định phải hiển thị là dữ liệu kiểu số lớn hơn hoặc bằng 0.

### US1.3: Xem và Lọc Sản phẩm (Filter Products)
**Là một** Staff,
**Tôi muốn** xem nhanh thông tin của một mặt hàng cụ thể,
**Để** tư vấn giá cả hoặc tồn kho cho khách mua.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** Staff đứng ở màn hình Danh sách Sản phẩm
- **When** gõ chính xác mã SKU hoặc tên chứa từ khóa
- **Then** bảng dữ liệu Data Table ngay lập tức chắt lọc đưa ra các dòng kết quả mang trường tương ứng.

## Feature 2: Tổ Chức Quản trị Đơn hàng (Order Processing)

### US2.1: Lập đơn hàng POS (Create Order POS)
**Là một** Staff,
**Tôi muốn** tạo lập một đơn hàng và nhúng các mặt hàng vào giỏ,
**Để** kích hoạt giao dịch mua bán và làm cơ sở xuất hóa đơn báo tiền.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** Staff đã bấm Tạo đơn hàng mới
- **When** gõ mã SKU hàng vào ô tìm kiếm hàng hóa, sau đó nhập Số lượng mong muốn
- **Then** hệ thống tự truy nhập Tên sản phẩm, tính toán tự động dòng (Số lượng x Đơn giá rẻ), và tổng hợp vào chỉ số Tổng Tiền (Total Amount) của đơn.

### US2.2: Chuyển đổi trạng thái dòng đơn (Order Status Lifecycle)
**Là một** Staff,
**Tôi muốn** di chuyển trạng thái đơn (Từ Pending sang Paid, hoặc Cancelled),
**Để** kết thúc giao dịch và hoàn thiện tồn kho.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** một đơn khởi tạo đang sở hữu label Pending
- **When** người dùng chọn thay đổi trạng thái thành Paid (Đã thu tiền)
- **Then** trạng thái được hệ thống đánh dấu ghi nhận trong CSDL là Paid
- **And** số lượng tồn kho thực tế của các mã sản phẩm con trong kho sẽ bị trừ lùi tự động.
- **And** nếu chuyển thành Cancelled, mức tồn kho phải được trả về nguyên trạng trước khi trừ.

## Feature 3: Hồ sơ Khách hàng (Customer CRM)

### US3.1: Lưu dấu khách hàng thường xuyên (Save Customer Profile)
**Là một** Staff,
**Tôi muốn** ghi lại danh tính (Tên, Email, Điện thoại) của khách hàng mua lẻ liên kết chung với hóa đơn,
**Để** xây dựng báo cáo phân tích tệp người mua trên góc độ Admin.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** Staff có mặt ở popup Tạo đơn
- **When** nhập thông tin cá nhân khách vào form mẫu liên đới (Linked Customer data)
- **Then** profile khách được hệ thống tạo mới (nếu là số điện thoại mới) và tự động cộng dồn "tổng chi tiêu" dựa vào giá trị đơn Completed hiện hành.

## Feature 4: Dashboard và Cơ chế Phân Quyền (Analytics & Role-based Security)

### US4.1: Từ chối kết nối API/UI do không đúng phân quyền (RBAC Deny)
**Là một** Admin,
**Tôi muốn** ẩn toàn vẹn các màn hình có chứa số liệu chi phí nhập hàng (Cost) khỏi Staff,
**Để** bảo vệ bí mật kinh doanh không phân tán trái thẩm quyền.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** session duyệt web đang được auth bằng JWT token của Staff
- **When** người này cố tình gọi HTTP Request bằng postman hoặc hack đổi URI trên trình duyệt vào URL thống kê Lợi nhuận Admin `/admin/reports`
- **Then** Middleware chặn ngay ở vòng gác ngoài, trả về mã trạng thái HTTP 403 Forbidden hoặc 401 Unauthorized kèm error code xác đáng.

### US4.2: Biểu đồ theo dõi tổng quan (Overview Chart)
**Là một** Admin,
**Tôi muốn** thấy biểu diễn đồ thị doanh thu tổng (Revenue) theo Ngày/Tuần trên góc nhìn chính,
**Để** tính lường lợi nhuận nhanh chóng nhất.

**Tiêu Chí Nghiệm Thu (Acceptance Criteria - BDD)**
- **Given** Admin vừa đăng nhập thành công vào màn UI HomeView
- **When** trình duyệt call API lấy dữ liệu report
- **Then** màn hình vẽ một Block Widget hiển thị doanh số đã được cộng dồn của tất cả các đơn hàng thỏa mãn trạng thái `Completed`.

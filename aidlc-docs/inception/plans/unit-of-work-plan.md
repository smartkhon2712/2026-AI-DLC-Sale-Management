# Kế Hoạch Bóc Tách Unit Công Việc (Unit of Work Plan)

Giai đoạn này sẽ giải phẫu hệ thống (bóc tách kiến trúc lớn) thành các cấu phần Code độc lập gọi là *Unit of Work*, có thể phân công cho các team hoặc lập trình viên xử lý làm luồng công việc song song.

## Câu Hỏi Làm Rõ (Questions for Decomposition)
Vui lòng điền chữ cái mà bạn lựa chọn vào NGAY SAU thẻ `[Answer]:` bên dưới.

### Câu Hỏi 1: Chiến lược bóc tách công việc (Decomposition Strategy)?
Hệ thống Quản lý Bán hàng Greenfield này nên phân chia ranh giới code (Unit of Work) ở cấp độ nào?

A) Bóc tách thành 2 Units Cốt lõi: Nhóm Frontend Web App (1 Unit) và Nhóm Backend REST API (1 Unit) sống chung trong 1 cấu trúc thư mục Monorepo. (Khuyên dùng và dễ kiểm soát nhất cho MVP).
B) Bóc tách thành nhiều Units nhỏ theo Domain Backend: Frontend (1 Unit), Backend Order Service (1 Unit), Backend Catalog Service (1 Unit)... (Áp dụng theo Microservices, rườm rà cho MVP).
X) Khác (vui lòng mô tả sau thẻ [Answer]:)

[Answer]: A

### Câu Hỏi 2: Định danh mã nguồn (Code Organization Strategy)?
Giả sử bạn chọn phương án A (Monorepo), bạn muốn cấu trúc thư mục gốc (Root folders) chứa source code của các Unit này được đặt tên phổ thông như thế nào?

A) Tên phân lớp Rõ Sâu: Thư mục `frontend/` và thư mục `backend/` lồng chung trực tiếp vào gốc.
B) Tên ứng dụng Ngắn Nhẹ: Thư mục `web/` và thư mục `api/`.
X) Khác (vui lòng mô tả ý định tên thư mục dự kiến sau thẻ [Answer]:)

[Answer]: A

---

## Các Bước Thực Thi (Execution Plan - AI Mode)
*Phần này hệ thống AI sẽ tự động tick kiểm xuất Checkbox cập nhật tiến độ sau khi bạn phê duyệt.*

- [x] 1. Tạo file `unit-of-work.md`: Định nghĩa cụ thể ranh giới mã lệnh và trách nhiệm tuyệt đối của từng Unit, thiết lập chiến lược tổ chức code (Code Organization Strategy).
- [x] 2. Tạo file `unit-of-work-dependency.md`: Xây dựng ma trận kết nối sự phụ thuộc giữa Unit Frontend (gọi API) và Unit Backend (mở Port HTTPS) trong môi trường phát triển.
- [x] 3. Tạo file `unit-of-work-story-map.md`: Map (Ánh xạ) 09 User Stories gốc rẽ nhánh vào các Unit tương ứng (VD: Story 1 về Quản lý SP đòi hỏi Frontend vẽ UI, Backend phải cung cấp CRUD...).
- [x] 4. Đánh giá tính sẵn sàng của kiến trúc trước khi đổ sang Giai đoạn Dựng CODE (Construction Phase).

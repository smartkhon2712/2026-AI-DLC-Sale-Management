# Kế Hoạch Thiết Kế Ứng Dụng (Application Design Plan)

Kế hoạch này tập trung vào việc xác định các thành phần (components) chính, lớp dịch vụ orchestrator, và luồng dữ liệu (data flow) mức độ tổng quan (High-level) cho cả hệ thống Backend và Frontend.

## Câu Hỏi Làm Rõ (Questions for Design)
Vui lòng điền chữ cái lựa chọn vào sau thẻ `[Answer]:` bên dưới.

### Câu Hỏi 1: Kiến trúc cấu trúc Frontend (Frontend Folder Architecture)?
Dự án sử dụng Vue 3 (dựa theo tech và structure document), bạn muốn tổ chức cấu trúc mã nguồn theo hướng nào?

A) Dựa trên Loại file (Type-Based): Chia rẽ theo `components`, `views`, `store`, `services` (Cách chia truyền thống đã được gợi ý sẵn ở `structure.md`).
B) Dựa trên Tính năng (Feature-Based / Module-Based): Mỗi chức năng (Products, Orders...) sẽ có chung một thư mục tự trị chứa đủ cả view, component, store liên đới.
X) Khác (vui lòng mô tả sau thẻ [Answer]:)

[Answer]: A

### Câu Hỏi 2: Chuẩn định dạng giao tiếp API (API Response Protocol)?
Document `tech.md` đã có nhắc tới gợi ý chuẩn Wrapper JSON. Bạn có muốn thống nhất toàn bộ các API Backend đều phải bọc lại bằng Format định dạng nghiêm ngặt này không?
`{ "success": boolean, "data": object/array, "message": string, "errorCode": string }`

A) Có, thống nhất luôn định dạng đóng gói này làm chuẩn mực duy nhất cho toàn hệ thống để Frontend dễ parse.
B) Không, ứng xử linh hoạt: thành công thì trả thẳng HTTP OK kèm data, lỗi thì trả HTTP Status kèm chuỗi (tiết kiệm payload).
X) Khác (vui lòng mô tả sau thẻ [Answer]:)

[Answer]: A

---

## Các Bước Thực Thi (Execution Plan - AI Mode)
*Hệ thống sẽ tự động cập nhật tiến trình vào các checkbox dưới đây sau khi bạn trả lời.*

- [x] 1. Tạo file `components.md`: Liệt kê các thành phần giao diện Frontend và các Block thành phần Backend.
- [x] 2. Tạo file `component-methods.md`: Định nghĩa chữ ký hàm (Method Signatures) ở mức nhìn tổng quan.
- [x] 3. Tạo file `services.md`: Thiết kế lớp Service (Node.js) và các ApiClient (Vue.js) để điều phối kết nối dữ liệu.
- [x] 4. Tạo file `component-dependency.md`: Xây dựng ma trận phụ thuộc và sơ đồ giao tiếp (Data Flow Diagrams).
- [x] 5. Tạo file `application-design.md`: Tổng hợp toàn bộ các kết quả trên để làm master references.

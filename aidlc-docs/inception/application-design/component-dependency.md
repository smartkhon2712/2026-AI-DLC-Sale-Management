# Ma Trận Phụ Thuộc & Luồng Dữ Liệu (Component Dependency & Data Flow)

## 1. Ma Trận Tầng Hệ Sinh Thái (Architectural Matrix)
| Thành Phần | Tác Nhận Gọi Kế Tiếp | Nguồn Cấp Dữ Liệu & Ràng Buộc |
|:---:|:---:|:---:|
| Vue Layout Views | Các Block View Component con | Tính kế thừa phân mảng (UI Props) |
| Lớp Vue Component | Khối Pinia Store Global | Gắn kết Template Variable Model |
| Khối Pinia Store | Tầng API Service (Axios) | Lệnh gọi tiến trình bất đồng bộ `fetch/axios` |
| Tầng API Service | Target URL Node.js Core Route | Network HTTP/HTTPS protocol |
| Router Layer (Node) | Điều hường trúng vào Cụm Controller | Middleware bắt JWT / Header / URI params |
| Controller Layer | Tham vấn tầng Logic Service | Request Data đã vượt qua trình Validator Zod |
| Service Layer | Mã lệnh Prisma ORM Repository | Cõng theo Context Request / Prisma Transaction |

## 2. Minh Họa Logic Khởi Tạo Biên Lai POS (Checkout Data Flow)

1. **[UI]** OrderProcessView nhận phím Action người dùng click nút `Checkout`.
2. **[Vue]** Trạng thái `order.store` đọc toàn bộ giỏ hàng Memory Array và tham số `customerId`, gói cục bộ ném về cho `OrderApiService.submitOrder()`.
3. **[Network]** Axios phát tín hiệu POST `/api/v1/orders`. Được gắn ngầm Header JWT Bearer tự động lấy AuthStore.
4. **[Express]** Middleware `auth.middleware` gác cổng phát giác Token hợp lệ, phân cấp gán `req.user` cho phép luồng chạy thông.
5. **[Node]** Lớp `OrderController` bắt Request Body.
6. **[Node]** Lớp `OrderService` được khơi màu với chuỗi tác vụ: Càn quét Data DB Product khớp với ProductId để nhân lại đơn giá chốt Total > Ra lệnh Cấp phát DB luồng Transaction.
7. **[DB]** Lớp Mặc sát Prisma ORM Commit truy vấn Table `Orders` & `Order_Items`.
8. **[Node]** Hàm `OrderController` đóng gói Object ra đúng format kiến trúc đã chốt `{ success: true, data: OrderObject_Result }` xả Payload báo mã HTTP 200.
9. **[Vue]** Tầng API Layer Axios giải mã lấy Object `{ data }`. Store `order.store` nhận tín hiệu tốt chèn hành động "Xoá giỏ hàng - Reset View POS".
10. **[UI]** Báo Cáo Thông Soạn Toast thành công trên màn hình Vue, đề cập Print hoá đơn ảo màn hình.

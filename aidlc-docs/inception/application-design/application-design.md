# Thiết Kế Kiến Trúc Ứng Dụng Tổng Thể (Master Application Design)

Tài liệu này tổng hợp toàn bộ các bộ phận cấu thành nên mô hình kỹ thuật (Greenfield System Architecture) trước khi đi vào Coding. Nhờ việc hợp nhất giữa cấu trúc File Type-Based và Giao tiếp chuẩn REST JSON, hệ thống được đảm bảo tính rời rạc cao và dễ dàng bảo trì.

## Danh Sách Các Hồ Sơ Thiết Kế (Design Documents)
Các phần thiết kế đã được phân rã thành các cấu phần chuyên biệt để dễ dàng theo dõi:

1. **[Cấu Trúc Thành Phần Hệ Thống (Components)](components.md)**: Định nghĩa các trang giao diện UI (Views), các module chia sẻ (Shared Components), cây thư mục Pinia State của Vue 3 và ranh giới Controller/Router của Node.js.
2. **[Hệ Thống Chữ Ký Hàm (Methods Signatures)](component-methods.md)**: Ràng buộc các tham số Request Body vào API và chốt chặt Data Model trả về theo một chuẩn gói JSON duy nhất.
3. **[Kiến Trúc Tầng Dịch Vụ (Service Layer)](services.md)**: Định hướng thiết kế lõi Business Logic nằm tại Node.js Services thay vì Controller, giúp áp dụng dễ dàng Database Transaction với Prisma. 
4. **[Ma Trận Phụ Thuộc (Dependency & Data Flow)](component-dependency.md)**: Vẽ ra lộ trình đi của luồng truy xuất (Ví dụ luồng POS Thanh toán - Checkout Flow) từ lúc bấm nút trên Frontend chuyển tới Axios, xuyên qua HTTP và ghi đè vào Postgres DB.

*Hãy tận dụng bộ tài liệu này làm Master Reference (Tài liệu đối chiếu gốc) cho mọi quá trình viết Code cũng như Review lỗi cấu trúc (Refactoring) sau này.*

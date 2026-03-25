# Phân Tích Sự Cần Thiết Của User Stories (User Stories Assessment)

## Phân Tích Yêu Cầu
- **Yêu cầu gốc**: Phát triển website quản lý bán hàng theo nguyên mẫu MVP.
- **Tác động đến người dùng**: Trực tiếp (Direct). Tính chất của website quản lý bán hàng yêu cầu rất nhiều quy trình tương tác UI (Tạo đơn, xem tồn kho...).
- **Độ phức tạp**: Trung bình - Cao (Medium/Complex).
- **Các bên liên quan (Stakeholders)**: Admin (Chủ cửa hàng), Staff (Nhân viên bán hàng), Customer (Khách mua hàng gián tiếp).

## Tiêu Chí Đánh Giá Phù Hợp
- [x] Ưu tiên Cao (High Priority): Dự án có tính năng hướng người dùng mới hoàn toàn; Có nhiều Persona (Admin, Staff). Luồng thao tác phong phú.
- [ ] Ưu tiên Cần Nhắc (Medium Priority): (Không áp dụng vì đã thỏa mãn High Priority).
- [x] Lợi ích đạt được: Làm rõ luồng thao tác của các phân quyền, vạch rõ tiêu chí nghiệm thu cho từng phần nhằm tránh sai sót nghiệp vụ.

## Quyết Định
**Giai đoạn User Stories sẽ được thực hiện**: Có (Yes).
**Lý do**: Đây là hệ thống có hai vai trò người dùng cụ thể là Admin (quản trị, xem báo cáo) và Staff (vận hành vòng đời đơn hàng). Việc làm rõ cốt truyện giúp định hướng tốt cho Team Phát Triển (Dev) và Kiểm Thử (Test) sau này.

## Kết quả mong đợi
- Nắm bắt được rõ vai trò của Staff và Admin qua bộ Persona chi tiết.
- Các cốt truyện (User Stories) được viết theo chuẩn INVEST giúp dễ dàng bóc tách thành các Unit of Work hoặc Ticket để phân chia công việc.

# Kế Hoạch Sinh Mã Nguồn - Backend Unit (Backend Code Generation Plan)

Tài liệu này là Cẩm Nang Nguồn (Single Source of Truth) cho quá trình tự động sinh dòng mã (Code Generation) mảng khối API Cốt lõi của hệ thống.

## Ngữ Cảnh của Unit (Unit Context)
- **Tên Unit**: `backend`
- **Mô hình kiến trúc**: Greenfield Multi-unit (Monolith Module).
- **Vị trí viết mã**: Thư mục `backend/` tại thư mục Root (Workspace gốc).
- **Công nghệ Code**: Node.js / Express / Prisma ORM / PostgreSQL.
- **Trách nhiệm**: Cung cấp RESTful API, giao tiếp R/W thông qua Database, đảm bảo tường thủ bằng JWT RBAC.
- **Sự phụ thuộc (Contracts & Interfaces)**: Không dựa dẫm vào gói Frontend. Nhưng cung cấp JSON có format quy chuẩn `{ success, data, message }` để Frontend tiêu thụ.
- **Stories bao hàm**: Toàn bộ luồng thao tác Data của US1.1, US1.2, US1.3, US2.1, US2.2, US3.1, US4.1, US4.2.
- **Entities thụ lý Database**: `User`, `Customer`, `Product`, `Category`, `Order`, `OrderItem`.

## Các Bước Lập Trình Mã Lệnh (Generation Sequence)
*Lưu ý quan trọng cho AI: Hệ thống phải đánh dấu `[x]` từng bước sau khi chạy script kiến tạo hoặc viết file hoàn tất. Không được tạo biến thể File như `_modified.js`.*

- [x] **Step 1: Khởi tạo Project Structure (Project Setup)**. Khởi chế Repository Node.js bên trong nhánh `backend/`. Điền `.env` tham số chuỗi Connection String Postgres.
- [x] **Step 2: Cài đặt Dependencies (Packages)**. Gọi NPM cài các module: `express`, `prisma`, `@prisma/client`, `jsonwebtoken`, `bcrypt`, `cors`, `zod`, `dotenv`.
- [x] **Step 3: Khai Báo Prisma Schema (Database Entities)**. Code file `prisma/schema.prisma`. Chạy lệnh Prisma Gen để cấp models chuẩn.
- [x] **Step 4: Sinh Utils & Middlewares (API Guards Layer)**. Khắc dòng Code cho `auth.middleware.js` (Bắt lỗi JWT Bearer) và `error.middleware.js` (Gói Exception chung chuẩn JSON).
- [x] **Step 5: Dựng Logic Tầng Dịch Vụ (Business Logic Layer)**. Code file `AuthService`, `ProductService`, `OrderService` (đặc biệt Transaction Trừ kho Database), `CustomerService`, `ReportService`.
- [x] **Step 6: Phơi Xuất Tầng Tuyến API (API Controllers Layer)**. Khắc mã nối Routing `GET`, `POST`, `PATCH` vào Controller gọi hàm Service. Ràng buộc Validation Dữ liệu Thô bằng ngõ vào `Zod`.
- [x] **Step 7: Build & Review Root Server (Execution Endpoint)**. Code file `server.js` hoặc `index.js`, nối các Module lại, gắn Cors, và cho ứng dụng vểnh tai đón nghe Port (ví dụ `3000`).
- [x] **Step 8: Viết Kịch bản Unit Test Backend (Unit Testing)**. Sử dụng `jest` và `supertest` nhắm để làm MOCK Logic xác minh Endpoints Order/Login có chạy chuẩn hay không. (Chạy đánh giá trong Phase 3).

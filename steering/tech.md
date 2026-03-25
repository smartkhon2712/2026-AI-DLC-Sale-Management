# Kiến Trúc Dữ Liệu và Công Nghệ (Tech Stack)

Tài liệu này xác định và thống nhất danh sách công cụ, quy chuẩn phát triển nhằm duy trì tính bền vững, chuyên nghiệp, và khả năng mở rộng của hệ thống Quản lý Bán Hàng.

---

## 1. Cơ chế tổng quan hệ thống (System Overview)

- **Frontend**: Một Ứng dụng Trang Đơn (Single Page Application - SPA), với khả năng tương tác mạnh. SPA hỗ trợ render linh hoạt UI chỉ với một lần kéo HTML duy nhất từ máy chủ, nhờ thế làm mượt thao tác bán hàng.
- **Backend**: Restful API, xử lý business mạnh mẽ giúp hệ thống tách biệt logic, dễ bảo trì và có khả năng tương tác cung cấp chung nguồn dữ liệu nếu sau này mở thêm Mobile App.
- **Database**: Bắt buộc gắn liền Relational Database nhằm đảo bảo tính chuẩn xác và ràng buộc cho các phiên bản giao dịch hóa đơn.
- **Protocol**: HTTP/HTTPS giao tiếp 100% bằng chuẩn JSON qua cơ chế bảo mật xác thực danh tính Authorization Bearer (Token JWT).

---

## 2. Công nghệ Frontend (Vue 3 + Vite)

### 2.1 Lõi hệ thống (Core Framework)
- Nền tảng chọn lọc: **Vue 3** sử dụng cú pháp tiên tiến `Composition API` (từ khóa setup) mang lại lợi ích mô đun hóa cho mã nguồn.
- Toolchain: **Vite** dùng cho bundle, thay thế Webpack để tăng tốc độ khởi tạo server cục bộ.
- Ngôn ngữ hệ thống tĩnh: **TypeScript** (Kiểm soát nghiêm ngặt kiểu dữ liệu để triệt tiêu lỗi thời điểm chạy IDE).

### 2.2 Quản lý View định tuyến và Trạng thái luồng dữ liệu
- Cơ chế Routing: Vue Router chịu trách nhiệm chuyển cảnh không reload.
- State Manager: **Pinia** - Lựa chọn hàng đầu ở gen mới thay cho Vuex để quản lý thông tin phiên làm việc.

### 2.3 Giao diện và Component System (UI/UX)
- Tạo dựng CSS Grid System: **Tailwind CSS** là thư viện utility-first cốt lõi để tùy biến từng khoảng trống một của UI thay vì bị gò ép cấu trúc.
- Component Design System (Tùy chọn): Element Plus / Ant Design Vue phục vụ riêng phần lập trình giao diện Data Tables hay Complex Modal cho hệ thống nội bộ B2B.
- Trình gọi mạng: Thư viện **Axios** hỗ trợ xử lý Interceptor đa luồng cho ứng dụng gán tokens.

### 2.4 Quản lý Form mẫu & Logic kiểm thử dữ liệu Form
- VeeValidate vận hành logic state của Form.
- Yup hoặc Zod triển khai Schema Validation trực quan (phát thông báo lỗi field tự động).

### 2.5 Công cụ và Hỗ trợ (Testing / Utils)
- Chịu trách nhiệm datetime: `Day.js` (rất nhẹ để loại bỏ Momentum rườm rà).
- Chịu trách nhiệm chuỗi/mảng: `Lodash-es` (nhỏ gọn nhất).
- **Kiểm định Unit Test**: `Vitest` hoạt động song sinh với Vite để làm mượt thời gian feedback cho developer.
- **Kiểm thử E2E Test**: `Playwright` tận dụng chạy đa worker test luồng đi hành vi người dùng bằng Chrome engine, kiểm soát lỗi frontend tự động trong tương lai.

---

## 3. Công nghệ Backend (Node.js)

### 3.1 Nền tảng cốt lõi
- Môi trường thực thi: Node.js bản LTS ổn định.
- Server Framework: Express.js mang tính nhẹ nhàng và cấu trúc tùy biến mạnh mẽ, phù hợp RESTful.
- Ngôn ngữ tương trợ: **TypeScript** xuyên suốt các layer.

### 3.2 Cơ sở dữ liệu và lớp Quản trị DB
- Động cơ cốt lõi (DBMS): MySQL 8.0 / PostgreSQL phiên bản tương đương.
- Trình Quản trị (ORM): **Prisma** - Đem hiệu năng truy vấn siêu tốc kết hợp với schema definition thân thiện giúp Migration dễ dàng. Dùng để thay thế cấu hình cũ như Sequelize.

### 3.3 Cơ chế phân chia Tường lửa & Tính toàn vẹn an ninh
- Giải pháp Access Token: Cơ chế JWT (JSON Web Token).
- Hệ mã hóa chứng quản: Mật khẩu xử lý bằng mã hóa 1 chiều chuẩn công nghiệp `Bcrypt` trước khi cắm xuống DB.
- Bộ vệ sĩ HTTP cơ động: Packet `Helmet` tinh chỉnh Header bảo vệ dữ liệu chống khai thác lỗi. 

### 3.4 Phân tách tiện ích trung gian
- express-validator (hoặc Validator trên Zod module): Ngăn chặn rác Data Input ngay từ cửa ngoài Router bằng cấu hình schema.
- Thư viện `Winston` hoặc `Morgan`: Quản lý log giám sát hoạt động hệ thống nội bộ lưu chuẩn cấu trúc theo ngày.

### 3.5 Công cụ Test Hệ thống
- Testing Core Service: Sử dụng bộ đôi **Jest** và **Supertest** để test tích hợp mạnh mẽ trên từng API layer, đo trạng thái phản hồi, mã lỗi statusCode.

---

## 4. Quá trình triển khai theo luồng API

Mọi hoạt động thiết lập API phải tuân thủ chuẩn REST Guidelines nghiêm ngặt sau.
- Prefix Bắt buộc của Endpoints: `/api/v1/[tên domain]` (Ex: `/api/v1/users`).
- Trả về tiêu chuẩn với bọc JSON Object:
```json
{
  "success": true,
  "data": {
    "product": { "id": 1, "status": "ACTIVE" }
  },
  "message": "Cập nhật trạng thái thành công!"
}
```

*Trong kịch bản có mã lỗi*:
```json
{
  "success": false,
  "errorCode": "AUTH_001",
  "message": "Hành vi cấm truy cập, token đã hết hạn do time-out."
}
```

---

## 5. Quy trình hệ thống DevOps Thực Tiễn

- **Quy trình đóng góp (Code Quality)**: Commit rule giới hạn bằng git-hook `Husky`, code layout đồng bộ bằng `ESLint` kết hợp `Prettier`.
- **Kiểm soát phiên bản Git Control**: Github/Gitlab dưới dạng luồng xử lý "Git Flow". Tách nhánh nhánh `feature/xxx` cho việc bổ sung, `develop` nơi hợp lưu, và `main` dành nguyên vẹn để chốt bản Live (Production).
- **Hệ lưu trữ Môi trường Khởi sắc (Deployment Tools)**:
  - Máy chủ: Cloud VPS nhỏ gọn. Áp dụng triển khai phân rã thông qua hạt chứa **Docker Container** - giải quyết rủi ro lệch môi trường code của Developer và Server thực tế.
  - Runtime: Nginx chịu tải Proxy điều hướng. Ứng dụng Backend được theo dõi rủi ro ngắt tiến trình bằng trình quản lý `PM2` chạy daemon.

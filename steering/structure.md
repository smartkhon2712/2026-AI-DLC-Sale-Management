# Cấu Trúc Hệ Thống (Directory Structure)

Tài liệu này định nghĩa cấu trúc thư mục tiêu chuẩn cho dự án. Việc tuân thủ nguyên tắc cấu trúc này giúp source code hiển thị tính rành mạch, dễ bảo trì, mở rộng và thân thiện với việc phát triển đội nhóm (Teamwork).

## 1. Cấu trúc tổng thể (Root Level)

Dự án phát triển qua cấu trúc Monorepo, cho phép gom sát hai nền tảng nhưng tính module vẫn là độc lập.

```text
root/
├── frontend/             # Chứa mã nguồn ứng dụng web UI (Vite + Vue 3)
├── backend/              # Chứa mã nguồn ứng dụng server API (Node.js)
├── docs/                 # Các tài liệu hệ thống, API docs (Swagger), database schemes
├── steering/             # Chứa tài liệu quản trị thiết kế, quy chuẩn định hướng
├── e2e-tests/            # (Tùy chọn) Mã nguồn automation test bao phủ qua Playwright
├── docker-compose.yml    # File cấu hình để dựng môi trường dev cục bộ với một click
├── .gitignore            # Khai báo các tệp cần loại trừ khi đẩy lên Git
└── README.md             # Giới thiệu khởi chạy và thiết lập nhanh kho code cho người mới
```

---

## 2. Cấu trúc Frontend (Vue 3 + Vite)

Áp dụng đúng hệ sinh thái quy chuẩn của Vue: tách biệt các layer cấu thành UI, luồng khai báo Views, và dữ liệu thao tác Store, Logic fetching.

```text
frontend/
├── public/                 # Các tệp tĩnh nguyên bản (favicon, robots.txt)
├── src/
│   ├── assets/             # Tài nguyên chạy qua bundler (Font, SVG, SCSS/CSS global stylesheet)
│   ├── components/         # Các UI component có thể tái sử dụng
│   │   ├── common/         # Trọng tâm UI: Nút (Button), Model (Dialog), Bảng (Table), Inputs
│   │   ├── product/        # Component chuyên biệt cho vùng Sản phẩm
│   │   └── order/          # Component chuyên biệt cho vùng Đơn hàng
│   ├── layouts/            # Cấu trúc khung bao bọc giao diện các trang (vd: DefaultLayout, AuthLayout)
│   ├── views/              # Chứa các Trang thành phần giao cho Router đảm nhiệm luân chuyển
│   │   ├── HomeView.vue         # Bảng biểu Dashboard
│   │   ├── LoginView.vue        # Auth - Đăng nhập
│   │   ├── ProductList.vue      # Giao diện danh mục Sản phẩm
│   │   ├── OrderList.vue        # Giao diện list trạng thái Đơn
│   │   └── CustomerList.vue     # Giao diện danh mục Khách hàng
│   ├── router/             # Cấu hình định tuyến Route của các Menu Navigation
│   │   └── index.ts
│   ├── store/              # Theo dõi các trạng thái sử dụng Pinia (Context State)
│   │   ├── auth.store.ts
│   │   └── app.store.ts
│   ├── services/           # Lớp kết nối ngoại vi API (Networking layer)
│   │   ├── api.client.ts   # Cấu hình Axios instance gốc (Interceptors cho Token)
│   │   ├── product.api.ts  
│   │   └── order.api.ts
│   ├── utils/              # Các hàm logic trợ năng cho UI (formatDate, formatCurrency)
│   ├── App.vue             # Component Root Vue Framework
│   ├── main.ts             # Điểm gắn kết plugins, thiết lập Store và Mount giao diện ra HTML
├── index.html              # Core HTML
├── vite.config.ts          # Thiết lập builder của Vite
├── tsconfig.json           # Ràng buộc chặt Typescript settings
└── package.json            # NPM config
```

---

## 3. Cấu trúc Backend (Node.js + Express)

Tận dụng mô hình chuẩn thiết kế lớp **3-tier Architecture** Controller-Service-Repository nhằm cách ly tầng vận chuyển giao thức mạng (HTTP) với logic quản lý kinh doanh (Business rule).

```text
backend/
├── src/                    # Thư mục mã logic vận hành chính
│   ├── config/             # Điểm giao tiếp các cấu hình môi trường (DB, Server port)
│   │   ├── database.ts
│   │   └── env.ts          
│   ├── controllers/        # Điều hướng HTTP Request, gọi tầng dịch vụ & gửi Response hoàn thiện
│   │   ├── auth.controller.ts
│   │   └── product.controller.ts
│   ├── routes/             # Định tuyến URL dẫn vào Controller
│   │   ├── index.ts        # Kết nối tất cả dải API chia nhỏ
│   │   └── product.routes.ts
│   ├── services/           # Chứa quy tắc cốt lõi về kinh doanh (Thực thi nghiệp vụ, kiểm kho,..)
│   │   ├── auth.service.ts
│   │   └── product.service.ts
│   ├── middlewares/        # Luồng can thiệp Request-Response chuyên kiểm soát (JWT Xác thực auth, Validate)
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/             # Định nghĩa Type / Entity cho Model hoặc ánh xạ với DB
│   │   └── user.model.ts
│   ├── utils/              # Các Helper đa chức năng không chứa logic kinh doanh (Logger, hashing string)
│   │   ├── logger.ts
│   │   └── hash.ts
│   ├── app.ts              # Thiết lập instance Express.js chung
│   └── server.ts           # Khởi chạy Express thực tế qua hàm listen()
├── prisma/                 # Thư mục điều phối cấu trúc CSDL của Prisma (Nếu chọn dùng)
│   ├── schema.prisma       # Toàn bộ cấu trúc thực thể gom gọn trong Prisma schemas
│   └── seed.ts             # Khởi tạo dữ liệu giả mặc định (User Admin gốc)
├── tests/                  # Phân loại Unit tests, Integration tests kiểm soát an bình hệ cơ bản
│   ├── unit/
│   └── integration/
├── .env.example            # Khu vực phác thảo biến môi trường (.env chuẩn)
├── tsconfig.json           
├── package.json
└── README.md
```

---

## 4. Ý nghĩa các lớp kiến trúc xương sống (Backbone Layers)

Để code dễ hiểu, hệ thống đề cao mô hình luân chuyển 1 chiều tuyến tính:

1. **Router Layer**: Điều hướng đường dẫn truy xuất API (GET/POST/PUT) và ủy thác vào một Controller xác định tương ứng.
2. **Controller Layer**: Thu thập mọi tham số Client trả về (Req Body, URL Params, Search Queries, Headers). Triệu gọi Service để giải quyết và tiếp nhận kết quả. Cuối cùng biến đổi chuẩn hóa ra JSON Protocol trả về.
3. **Service Layer**: Nơi đặt não bộ "Logic nghiệp vụ" của hệ thống (Tính tổng hóa đơn, kiểm tra tồn kho, trừ trừ điểm khách hàng). Tuyệt đối **KHÔNG CÓ mặt biến số HTTP (req/res)** ở layer này nhằm đạt mục đích độc lập có thể Reusability.
4. **Repository Layer (Tại Models)**: Nơi trực tiếp ra lệnh kết nối Cơ Sở Dữ Liệu cơ học. Thường dùng qua Prisma Query.
5. **Middleware Layer**: Lớp an ninh hoạt động đứng rào trước Controller. Nếu token sai, Middleware phản hồi quyền cấm truy cập ngay lập tức tiết kiệm tài nguyên cho hệ thống.

# Cấu trúc Phân Rã Unit Công Việc (Units of Work Definitions)

Dự án Hệ thống Quản lý Bán hàng (Sale Management MVP) này tuân theo chiến lược bóc tách **Monorepo Greenfield** và sẽ bao gồm chính xác 2 Units độc lập. Mỗi Unit là một Repository Package hoàn toàn riêng lẻ về mặt quản trị vòng đời (Dependencies NodeJS tách bạch) nhưng nằm chung thân trong không gian code.

## 1. Mảng Backend REST API (Unit: `backend`)
- **Tên thư mục gốc**: `backend/`
- **Công nghệ (Tech Stack)**: Node.js, Express.js, Prisma ORM, PostgreSQL, JsonWebToken.
- **Trách nhiệm của Unit**:
  - Giao tiếp trực tiếp và thao túng hệ cơ sở dữ liệu Postgres.
  - Phơi xuất (Expose) Endpoint thao tác dữ liệu qua HTTP phục vụ Frontend Client.
  - Là Chốt chặn Thẩm định tính nguyên vẹn quyền lực qua Hệ bảo mật RBAC Admin/Staff.
  - Vạch ra và Tính toán các báo cáo Analytics trực tiếp tại Server.
  - Đóng gói Response vào định dạng JSON duy nhất.
  - *Dev note*: Chạy vòng đời Server ở Port cụ thể (ví dụ `:3000`).

## 2. Mảng Frontend Web App (Unit: `frontend`)
- **Tên thư mục gốc**: `frontend/`
- **Công nghệ (Tech Stack)**: Vue 3, Vite, Tailwind CSS, Pinia, Axios.
- **Trách nhiệm của Unit**:
  - Nơi diễn giải toàn bộ quy trình tương tác người dùng (UI/UX) thân thiện.
  - Routing chuyển màn hình SPA.
  - Nơi thu thập dữ liệu thô, cản luồng lỗi nhập liệu bằng (VeeValidate/Zod) trước khi truyền tin API Request xuống mạng.
  - Quản lý trạng thái State người hành, rổ hàng offline liên tục bằng Pinia + LocalStorage.
  - *Dev note*: Chạy quy trình Hot Reload (Vite) trong Port Front (ví dụ `:5173`). Phân bố theo module Type-based layout (`components/`, `views/`, ...).

## Chiến Lược Tổ Chức Mã (Code Organization Strategy)
Lược đồ Cấu trúc Cây Thư mục Gốc (Root Directory Structure):
```
/sale-management
├── .github/          # Thiết lập cấu hình hệ thống
├── aidlc-docs/       # Lưu vết tài liệu kiến trúc AI-DLC (Bạn đang theo dõi)
├── backend/          # (Unit 1) Không gian mã nguồn Node.js/Prisma
│   ├── src/          #     - Cấu trúc các Layer Logic...
│   ├── package.json
│   └── prisma/
├── frontend/         # (Unit 2) Không gian mã nguồn Frontend Vue 3
│   ├── src/          #     - Cấu trúc Layout, Components...
│   ├── index.html
│   └── package.json
└── README.md
```

# 🛒 Sale Management System

Hệ thống quản lý bán hàng (Sale Management System) được phát triển nhằm cung cấp giải pháp toàn diện cho việc quản lý sản phẩm, đơn hàng, khách hàng và báo cáo doanh thu.

Dự án là một hệ thống Full-stack hoàn chỉnh bao gồm:
- **Backend**: API server xử lý logic nghiệp vụ, xác thực người dùng và tương tác cơ sở dữ liệu.
- **Frontend**: Giao diện người dùng trên web để quản lý các tính năng (Admin Dashboard/POS,...).

## 🚀 Công nghệ sử dụng
- **Frontend**: Vite, TailwindCSS (cùng với các framework tích hợp)
- **Backend**: Node.js, Prisma ORM
- **Cơ sở dữ liệu**: Hỗ trợ linh hoạt thông qua Prisma (PostgreSQL, MySQL, SQL Server, v.v.)

## 📁 Cấu trúc thư mục

- `/backend`: Chứa toàn bộ mã nguồn Backend API và cấu hình Prisma.
- `/frontend`: Chứa thông tin giao diện người dùng frontend (Vite configuration).
- `/aidlc-docs`: Tài liệu bao gồm thiết kế kiến trúc, Unit of Work, và các quyết định kỹ thuật khác.
- `/steering`: Các tài liệu định hướng về sản phẩm và công nghệ (product, structure, tech).

## ⚙️ Cài đặt & Chạy dự án (Local Development)

### 1. Khởi chạy Cơ sở dữ liệu (Database bằng Docker)
Dự án cung cấp sẵn file `docker-compose.yml` để bạn có thể chạy PostgreSQL một cách nhanh chóng. Mở Terminal ở thư mục gốc và chạy lệnh sau:
```bash
docker compose up -d
```
> **Lưu ý:** Bạn cần cài đặt ứng dụng Docker / Docker Desktop trên máy tính trước khi dùng lệnh này.

### 2. Cài đặt và Khởi chạy Backend
Di chuyển vào thư mục `backend`, cài đặt các thư viện cần thiết, thiết lập môi trường từ file `.env` và chạy server:
```bash
cd backend
yarn install
# Cấu hình file .env dựa trên .env.example (nếu chưa có)
yarn dev
```

### 3. Khởi chạy Frontend
Di chuyển vào thư mục `frontend` và cài đặt các thư viện frontend:
```bash
cd frontend
yarn install
# Chạy hệ thống Vite Development Server
yarn dev
```

### 4. Thông tin tài khoản đăng nhập (Seed Data)
Hệ thống tự động tạo dữ liệu mẫu (seed data) khi khởi động backend lần đầu tiên. Dưới đây là danh sách tài khoản bạn có thể dùng để kiểm tra hệ thống:

- **Tài khoản Admin (Quản trị viên):**
  - Tên đăng nhập: `admin`
  - Mật khẩu: `admin123`

- **Tài khoản Staff (Nhân viên):**
  - Tên đăng nhập: `staff1`
  - Mật khẩu: `staff123`

## 📜 Thông tin thêm
Vui lòng tham khảo các thư mục `steering` và `aidlc-docs` để đọc chuyên sâu về kiến trúc hệ thống, quy trình nghiệp vụ và đặc tả API.

# Ma Trận Phụ Thuộc Giữa Các Units (Unit Dependency Matrix)

## Mối Quan Hệ Giữa Frontend và Backend
Hệ thống kết nối theo cơ chế Client - Server thông qua ranh giới mạng trực tuyến (Network Boundary). Thiết kế của hai Units hoàn toàn decoupled (liên kết lỏng), không Unit nào được phép Import/trỏ thẳng vào mảng nội dung File của Unit kia trên đĩa cứng. Chúng hiểu nhau tuyệt đối duy nhất bằng tiếng lóng JSON API.

| Tên Unit | Hướng Gọi Hỗ Trợ | Target Unit | Phương Thức Giao Ước | Bối Cảnh Ràng Buộc |
|:---:|:---:|:---:|:---:|:---:|
| `frontend` | **Khởi xướng TCP/IP Call** | `backend` | HTTP/HTTPS Axios Request | Lệ thuộc mạnh vào dạng Response của Backend. Chỉ khi Backend Online mở Port, Frontend mới hoạt động UI Động được. |
| `backend` | **Không gọi Front** | N/A | Lắng nghe qua Port 3000 | Tự lập hoàn toàn, dễ dàng bóc tách ra để chạy Unit Test bằng Jest hoặc Postman HTTP mà không cần màng tới Giao diện Frontend. |

## Quản Lý Phụ Thuộc Nội Bộ Node (Dependencies Management)
1. **NPM Workspaces (Tùy chọn)**: Ở quy mô Greenfield 2 Unit thuần túy này, ta triển khai cấu trúc lệnh truy update môi trường kiểu thủ công, trỏ độc lập vào Folder `frontend` và `backend` để `npm install` tránh conflict phiên bản node modules tổng.
2. **Khai báo biến ảo Cục bộ (.env)**:
   - `backend/.env`: Chốt chặn các tham số ngõ vào `DATABASE_URL`, khóa bí mật chữ ký `JWT_SECRET`, và `PORT`.
   - `frontend/.env`: Móc khóa url `VITE_API_BASE_URL` trỏ tới gốc đường dẫn HTTP backend.
3. **Thứ Tự Khởi Chạy Logic (Deployment Sequence)**:
   - Bước 1: Khởi động **Database** (PostgreSQL Server) đệm.
   - Bước 2: Push schema cho `backend` và mở Start **Backend Unit**.
   - Bước 3: Run vòng lặp nóng cho **Frontend Unit** cuối cùng.

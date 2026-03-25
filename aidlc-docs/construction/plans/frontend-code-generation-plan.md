# Kế Hoạch Sinh Mã Nguồn - Frontend Unit (Frontend Code Generation Plan)

Tài liệu này là chân lý mấu chốt quyết định lộ trình sinh giao diện Vue.js. Giám sát không rò rỉ thao tác.

## Ngữ Cảnh của Unit (Unit Context)
- **Tên Unit**: `frontend`
- **Mô hình kiến trúc**: Greenfield Multi-unit (Frontend Web App).
- **Vị trí viết mã**: Thư mục `frontend/` tại thư mục Root (Workspace gốc).
- **Công nghệ Code**: Vue 3 SPA / Vite / Pinia / TailwindCSS.
- **Trách nhiệm**: Tương tác trực diện UI với Role Admin/Staff, điều hướng Màn hình bảo mật, giữ vòng lặp Giỏ hàng.
- **Sự phụ thuộc (Contracts & Interfaces)**: Ép buộc phải móc vào API Backend ở Port 3000 để bóc lớp Object JSON Data.
- **Stories bao hàm**: Toàn bộ mảng UI tương ứng từ US1.x -> US4.x. (Rẽ nhánh UI vẽ Chart, UI Form đăng nhập, UI Lưới Hàng DataTable, Panel Giỏ Hàng POS).

## Các Bước Lập Trình Mã Lệnh (Generation Sequence)
*Nguyên tắc mã hóa: Các thẻ HTML tương tác chủ chốt phải đính Tag `data-testid` tự động để phục vụ UI Automation (E.g: `data-testid="login-submit-button"`).*

- [x] **Step 1: Khởi tạo Bộ Lõi Front (Project Setup)**. Dùng script scaffolding tạo Vite Vue 3 Framework gốc thư mục `frontend/`, xóa App Boilerplate gốc.
- [x] **Step 2: Ghép nối Thư Viện Kiến Trúc (Package Dependencies)**. Lắp ráp cài `pinia`, `vue-router`, `axios`, `tailwindcss` (Init thiết lập CSS), `vee-validate`, và `chart.js`.
- [x] **Step 3: Cấu hình Tuyến Đường (Router & Route Guards)**. Sinh mã `router/index.js`, chốt chặt Route "/admin/" phải bắt Guard nếu State báo không phải Admin.
- [x] **Step 4: Móc Nối Data Network (API Service Layer)**. Lên File `services/axios.js` bắt Interceptor nhét Token Authorization. Trải File `ProductApiService`, `AuthApiService`.
- [x] **Step 5: Xây kho chứa State Hệ thống (Pinia Stores)**. Code lõi `store/auth.store.js` (Lưu token Client) và `store/order.store.js` (Mảng tạm Cart Memory chờ Submit Checkout).
- [x] **Step 6: Đúc Thành Phần Chia Sẻ (Shared UI Components)**. Khắc HTML components nhúng `data-testid`: `BaseButton`, `BaseInput`, `BaseTable`. Layout chung `MainLayout` gắn Navigation.
- [x] **Step 7: Sinh Mã View Chức Năng (Features Component Generation)**. Viết Màn Hình `LoginView.vue`, `DashboardView.vue` (Nhúng ngàm biểu đồ Chart), `POSView.vue` (Chia 2 panel: bảng List danh mục và Cột hóa đơn nháp). Ràng buộc các rules Form hợp lệ.
- [x] **Step 8: Unit Testing (UI Test)**. Kịch bản Mock Test kiểm duyệt luồng Nhập User Pass cho các thẻ Input test id.

# Ánh Xạ Story Vào Unit (Unit-to-Story Mapping)

Quá trình chia Unit đòi hỏi việc xác định rõ trách nhiệm của mỗi bên Unit khi nhận giải quyết 09 Cốt truyện cốt lõi (User Stories) đã định hình. 

## 1. Feature 1: Quản lý Sản Phẩm và Danh Mục
| ID Story | `frontend` Work (UI/State) | `backend` Work (API/DB) |
|:---|:---|:---|
| **US1.1 Tạo Danh mục** | Xây dựng form nhập Name/Desc, gọi POST API Category. Render danh sách thẻ trên UI. | Tạo API POST `/categories`. Lưu xuống bảng Categories, bắt lỗi Name null. |
| **US1.2 Thêm Sản phẩm** | Thiết kế Form phức tạp (Input File ảnh, Select Enum), Validate số, POST API Product. | API POST `/products`. Truy vấn nhúng khóa ngoại Category ID, Check SKU duy nhất. |
| **US1.3 Lọc Sản phẩm** | Bind Component Datatable, Gọi API GET kèm tham số chuỗi Keyword vào Axios Config. | API GET `/products?keyword=X`. Sử dụng Prisma `contains` theo từ khóa SKU hoặc Tên. |

## 2. Feature 2: Tổ Chức Đơn Hàng (POS)
| ID Story | `frontend` Work (UI/State) | `backend` Work (API/DB) |
|:---|:---|:---|
| **US2.1 POS Ghi Đơn** | Layout giỏ hàng, lưu item vào Pinia `order.store`. Bấm thanh toán POST mảng JSON items. | API POST `/orders`. Rẽ nhánh Transaction lập Hóa đơn, tự tính lại giá nội bộ. |
| **US2.2 Đổi Trạng Thái**  | Nút bấm UI thao tác chuyển Trạng thái. Hiển thị lại mảng Lịch sử Đơn. | API PATCH `/orders/:id/status`. Cập nhật Inventory qua logic Service (Trừ kho lúc Paid). |

## 3. Feature 3: Hồ Sơ Khách Hàng (CRM)
| ID Story | `frontend` Work (UI/State) | `backend` Work (API/DB) |
|:---|:---|:---|
| **US3.1 Ghi lịch sử mua**| Text input thao tác nhanh. Gọi API nhúng Customer Profile vào đơn. | API Cập nhật `totalSpend` Customer khi chốt đơn hàng `Completed`. |

## 4. Feature 4: Security & Thống kê
| ID Story | `frontend` Work (UI/State) | `backend` Work (API/DB) |
|:---|:---|:---|
| **US4.1 Quyền RBAC**     | Middleware `vue-router` cấm Staff truy cập route `/admin/*`. Tự ẩn các Menu nhạy cảm. | Middleware JWT chặn 401/403 ở các routes gắn cờ yêu cầu quyền Admin Role. |
| **US4.2 Đồ thị Chart**   | Nhúng thư viện đồ thị `Chart.js`. Gọi API Analytics để vẽ Chart Dashboard. | DB Prisma `groupBy` doanh thu hoặc đếm lệnh theo Time-Series xuất mảng `Dataset`. |

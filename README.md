# Movie Hub 🎬

Movie Hub là một nền tảng đặt vé xem phim hiện đại, dựa trên kiến trúc microservices được xây dựng với **NestJS** (Backend), **Next.js** (Frontend), và được quản lý bằng **Nx Monorepo**.

## 🚀 Tổng quan kiến trúc

Hệ thống tuân theo kiến trúc microservices:

- **Frontend**: Ứng dụng Next.js.
- **API Gateway**: Điểm truy cập duy nhất cho tất cả các yêu cầu từ client.
- **Microservices**: User, Movie, Cinema, Booking (xử lý các nghiệp vụ cụ thể).
- **Giao tiếp**: Phương pháp lai sử dụng TCP (Giữa các service) và Redis Pub/Sub (Sự kiện).
- **Cơ sở hạ tầng**: Các service được Docker hóa sử dụng PostgreSQL (Cơ sở dữ liệu riêng cho từng service) và Redis.

---

## 🛠️ Yêu cầu tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (Phiên bản 20+ được khuyến nghị)
- [Git](https://git-scm.com/)

---

## 🏃‍♂️ Bắt đầu

Làm theo các bước sau để chạy hệ thống trên máy cục bộ.

### 1. Clone Repository

```bash
git clone https://github.com/Tanh1603/movie-hub.git
cd movie-hub
```

### 2. Cấu hình biến môi trường

Bạn cần thiết lập các file `.env` cho các dịch vụ Docker.

**Môi trường Database:**
Tạo các file sau với nội dung bên dưới (hoặc copy từ file ví dụ nếu có):

- `apps/user-service/.env.db`
- `apps/movie-service/.env.db`
- `apps/cinema-service/.env.db`
- `apps/booking-service/.env.db`

_Mẫu nội dung cho `.env.db` (Thay đổi `POSTGRES_DB` tương ứng: `movie_hub_user`, `movie_hub_movie`, v.v.):_

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=movie_hub_<service_name>
```

**Môi trường Service:**
Tạo file `.env` trong thư mục của từng service (ví dụ: `apps/user-service/.env`). Đảm bảo bạn đặt `TCP_HOST=0.0.0.0` và sử dụng tên service docker (ví dụ: `postgres-user`) cho các host database.

> **Lưu ý:** Hướng dẫn chi tiết về thiết lập file `.env` có sẵn trong tài liệu dự án.

### 3. Chạy hệ thống với Docker Compose

Lệnh này sẽ build các image, khởi động database, redis và các backend microservice, và chạy các script seeding dữ liệu.

```bash
docker compose up -d --build
```

Đợi vài phút để các service được build và `healthcheck` thông qua. Bạn có thể kiểm tra log bằng lệnh:

```bash
docker compose logs -f
```

### 4. Khởi động Frontend

Vì frontend được tối ưu hóa cho phát triển cục bộ, hãy chạy nó bên ngoài Docker:

```bash
# Cài đặt dependencies
npm install

# Khởi động ứng dụng web
npx nx serve web
```

---

## 🌐 Triển khai & URL truy cập

Khi mọi thứ đã hoạt động, bạn có thể truy cập các dịch vụ tại:

| Service             | Access URL                                               | Mô tả                      |
| ------------------- | -------------------------------------------------------- | -------------------------- |
| **Frontend**        | [http://localhost:4200](http://localhost:4200)           | Giao diện người dùng chính |
| **API Gateway**     | [http://localhost:4000/api](http://localhost:4000/api)   | Main API Endpoint          |
| **Swagger Docs**    | [http://localhost:4000/docs](http://localhost:4000/docs) | Tài liệu API               |
| **User Service**    | `localhost:4001`                                         | TCP/Debugging Port         |
| **Movie Service**   | `localhost:4002`                                         | TCP/Debugging Port         |
| **Cinema Service**  | `localhost:4003`                                         | TCP/Debugging Port         |
| **Booking Service** | `localhost:4004`                                         | TCP/Debugging Port         |

## 🗄️ Truy cập Cơ sở dữ liệu (Tùy chọn)

Nếu bạn có DB Client (DBeaver, PGAdmin), bạn có thể kết nối đến cơ sở dữ liệu qua các port sau:

- **User DB**: `localhost:5435`
- **Movie DB**: `localhost:5436`
- **Cinema DB**: `localhost:5437`
- **Booking DB**: `localhost:5438`

## 📞 Thông tin liên hệ

| Họ và tên          | Vai trò     | MSSV     | Email                  |
| :----------------- | :---------- | :------- | :--------------------- |
| Nguyễn Thiên An    | Nhóm trưởng | 23520020 | 23520020@gm.uit.edu.vn |
| Nguyễn Lê Tuấn Anh | Thành viên  | 23520064 | 23520064@gm.uit.edu.vn |
| Lê Văn Huy         | Thành viên  | 23520616 | 23520616@gm.uit.edu.vn |
| Quách Vĩnh Cơ      | Thành viên  | 23520189 | 23520189@gm.uit.edu.vn |
| Điều Xuân Hiển     | Thành viên  | 23520456 | 23520456@gm.uit.edu.vn |
| Phạm Hùng          | Thành viên  | 23520573 | 23520573@gm.uit.edu.vn |
| Lưu Bình           | Thành viên  | 23520156 | 23520156@gm.uit.edu.vn |

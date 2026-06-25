# ⚽ Server Haxball Xịn Xò (Bản có Rank & Clan)

![status](https://img.shields.io/badge/status-active-green)

## ⚙️ Giới Thiệu Sương Sương

Bộ code này là một phiên bản server Haxball được "độ" lại cực kỳ tâm huyết dành cho anh em Việt Nam (base gốc mượn ý tưởng từ shelld3v). Mình đã nhồi nhét vào đây đủ thứ tính năng từ leo Rank, đấu Clan, cơ chế chống đổ bê tông (Anti-CB) cho đến chống văng tục và ti tỉ hiệu ứng xịn xò khác!

## 🎮 Các Chế Độ Chơi Chính

- **Chế độ Pick (Đội trưởng chọn người):** Hệ thống thông minh tự đá những người treo máy (AFK) ra ngoài, ai làm đội trưởng mà trốn (F5 thoát game) sẽ bị phạt nặng.
- **Chế độ Random:** Tự động chia đều đội hình dựa theo Rank của từng người cho cân kèo.
- **Đá Luân Lưu (Penalty):** Hết giờ mà vẫn hoà là tự động bế cả làng sang map sân cỏ Penalty để sút phân định thắng thua luôn!

## 🧠 Tính Năng Xoay Quanh Trận Đấu

- **Anti-CB (Chống Hậu Vệ Đổ Bê Tông):** Cứ đứng ôm bo ở gôn là sẽ bị đẩy văng ra, buộc hai đội phải dâng lên tấn công.
- **Đá bay người AFK:** Đứng im không nhúc nhích là tự động bị ném lên ghế Khán giả (không áp dụng khi đá 1v1 hoặc tập luyện nhé).
- **Thay Người Giữa Trận (!sub):** Đang đá mà có người lag hay muốn nghỉ, đội trưởng gọi lệnh thay người trực tiếp luôn!
- **Tự Động Reset:** Chuyển map, load trận mới mượt mà không cần ấn nút gì.

## 🏆 Cày Rank & Mở Bang Hội (Clan)

- **Ghi nhận mọi chỉ số:** Ghi lại chi tiết Bàn thắng, Kiến tạo, Cứu thua, Phá bóng, hay thậm chí cả phản lưới nhà =))
- **Hệ Thống Rank ELO:** Đá hay thì lên Rank, phế thì tụt hạng, có đủ các mức Rank để anh em khoe thành tích.
- **Hệ Thống Clan:** Lập Bang hội, gắn tag, icon riêng cực ngầu.
- **Đại Chiến Clan:** Khi hai Clan mạnh đụng độ nhau, sân vận động sẽ tự động đổi màu và hiệu ứng siêu khét.

## 🎆 Hiệu Ứng Bùng Nổ

- **Ăn Mừng Bàn Thắng VIP:** Khi bạn ghi bàn, 14+ hiệu ứng cháy nổ vật lý (Lốc xoáy, Hố đen, Súng máy, Mưa sao băng...) sẽ nổ tung sân! (Mua bằng điểm Sao trong game).
- **Màu Áo Đấu RGB:** Áo đấu đổi màu lấp lánh liên tục trong những trận quan trọng.
- **Avatar Biểu Cảm:** Avatar nhảy số đếm ngược, hiện icon ngủ khò khò khi AFK hay bom nổ cực kỳ nhí nhố.

## 🛡️ Tính Năng Quản Lý & Phạt Dân Chơi "Nghiệp Dư"

- **Đăng nhập Admin/Super Admin:** Pass xịn, đăng nhập nhanh, không rườm rà.
- **Chống Toxic:** Ai văng tục, chửi thề sẽ bị khoá mõm (Mute) 10 phút ngay lập tức nếu tái phạm.
- **Vote kích (VoteKick):** Ngứa mắt ai cả phòng có thể vote để đá ra ngoài, có cơ chế chống lạm dụng nha.
- **Phạt Thoát Ngang:** Ai làm đội trưởng mà F5 thoát game né trách nhiệm sẽ bị tước quyền làm đội trưởng trận sau.
- **Cày nhiều Tab:** Thoải mái mở nhiều Tab, mở nhiều clone vào phòng mà không sợ bị khoá.

## 📊 Bình Luận Viên Trực Tiếp

- Bình luận siêu vui ngay khi ghi bàn (VD: "Đệm bóng cận thành", "Sút xa sấm sét", "Flash"...).
- Hét lên nếu có Hattrick, Poker...
- Bình luận theo từng quả penalty.

## 📡 Tương Tác Qua Discord

- **Bảng Vàng:** Trận nào xong cũng gửi thông số chung cuộc và tên MVP thẳng lên kênh Discord.
- **Log Chat:** Xem trực tiếp ai đang chat gì trong phòng qua Discord (để dễ quản lý).
- **Báo cáo (Report):** Thấy ai hack hay phá game, gõ `!report` là tin nhắn bay thẳng tới Admin trên Discord.

## 🏟️ Danh Sách Sân Vận Động (Map)

- **Sân 5v5:** Map chính để cày Rank, có bo tròn góc và hỗ trợ Anti-CB.
- **Sân 3v3:** Dành cho lúc phòng hơi hẻo người.
- **Sân 1v1 / 2v2:** Dành cho mấy thanh niên thích solo kỹ năng.
- **Sân Penalty:** Sân chuyên biệt chỉ để sút luân lưu.
- **Sân Tập Luyện:** Mở 24/24, không tính giờ, anh em vào tha hồ múa lửa.

---

# 🚀 HƯỚNG DẪN CẮM SERVER 24/7 (TRÊN VPS UBUNTU)

Code này viết riêng để treo trên máy chủ VPS (Ubuntu). Để kết nối các tệp `app.js` chạy code chính `codehaxballfinal.js`, anh em làm theo các bước dân dã sau:

### Bước 1: Chuẩn bị "đồ nghề" (NodeJS)

Anh em mở terminal của VPS lên và gõ lần lượt các lệnh này để tải NodeJS (Bản 18 hoặc 20 nhé):

```bash
# Cập nhật VPS cho mới mẻ
sudo apt update && sudo apt upgrade -y

# Tải NodeJS bản 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Kiểm tra xem cài xong chưa (ra phiên bản là OK)
node -v
```

### Bước 2: Tải Source Code & Cài Thư Viện

1. Gom hết code của anh em (cần nhất là 2 file `app.js` và `codehaxballfinal.js`) ném vào 1 thư mục bất kỳ trên VPS, ví dụ đặt ở `/root/haxball-server`.
2. Truy cập vào thư mục đó:

```bash
cd /root/haxball-server
```

3. Cài 2 gói thư viện này để code chạy được:

```bash
npm install haxball.js node-localstorage
```

### Bước 3: Đi xin "Chìa khoá" (Token) để mở phòng

1. Vào trang: https://www.haxball.com/headlesstoken
2. Vượt mã Captcha, copy đoạn mã Token loằng ngoằng nó hiện ra.
3. Mở file `app.js` ra sửa (gõ `nano app.js`).
4. Tìm dòng `const TOKEN = "thr1.AAAA...";` và dán Token mới của anh em đè lên.
5. Xong thì bấm `Ctrl + O` (chữ O nhé) -> `Enter` để lưu, rồi `Ctrl + X` để thoát ra.

### Bước 4: Khởi chạy Server (Treo vĩnh viễn)

**Cách 1: Chạy nháp xem có lỗi không**

```bash
node app.js
```

Nếu màn hình báo `"✅ Code Game đã chạy qua trơn tru..."` và phun ra cái Link phòng (`https://www.haxball.com/play?c=...`) thì là ngon lành! Nhấn `Ctrl + C` để tắt.

**Cách 2: Treo cho chạy ngầm 24/7 (Khuyên dùng mạnh)**
Treo cách này thì anh em có tắt máy tính đi ngủ, server vẫn chạy tì tì trên VPS:

```bash
# Cài công cụ PM2
sudo npm install pm2 -g

# Đẩy phòng Haxball vào chạy ngầm (đặt tên là Haxball-Room)
pm2 start app.js --name "Haxball-Room"

# Lưu cấu hình để lỡ VPS có sập nguồn bật lại thì phòng tự lên
pm2 save
pm2 startup
```

**📌 Vài lệnh PM2 dắt túi cho anh em:**

```bash
- Lấy Link phòng (hoặc soi lỗi xem thằng nào phá): `pm2 logs Haxball-Room`
- Dừng phòng: `pm2 stop Haxball-Room`
- Chạy lại phòng: `pm2 restart Haxball-Room`

```

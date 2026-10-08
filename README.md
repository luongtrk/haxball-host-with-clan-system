# Haxball Headless Server (Rank & Clan System)

Mã nguồn máy chủ Haxball Headless tự động tích hợp hệ thống tính điểm Rank Elo, Bang hội (Clan), cơ chế chống AFK, chống ôm gôn (Anti-CB) và kết nối Discord.

> **Xem hướng dẫn chi tiết về tính năng và danh sách lệnh trong game tại:**  
> 🌐 [https://huongdanhethongclan.netlify.app/](https://huongdanhethongclan.netlify.app/)

---

## Yêu cầu hệ thống

- **Node.js**: Phiên bản 18 LTS trở lên (khuyên dùng Node.js 20 LTS).
- **Hệ điều hành**: Linux (Ubuntu, Debian...), Windows hoặc macOS.

---

## Hướng dẫn cài đặt và sử dụng

### Bước 1: Tải mã nguồn

Mở terminal / cmd và tải mã nguồn về máy hoặc VPS:

```bash
git clone https://github.com/luongtrk/haxball-host-with-clan-system.git
cd haxball-host-with-clan-system
```

### Bước 2: Cài đặt thư viện

Chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
npm install haxball.js node-localstorage discord.js
```

- `haxball.js`: Chạy phòng Haxball trên môi trường Node.js.
- `node-localstorage`: Lưu trữ dữ liệu Rank, chỉ số cầu thủ và Clan trên máy chủ.
- `discord.js`: Kết nối Bot Discord để nhận tin nhắn từ Discord gửi vào phòng game (chat 2 chiều).

### Bước 3: Lấy Token mở phòng

1. Truy cập trang lấy token chính thức: [https://www.haxball.com/headlesstoken](https://www.haxball.com/headlesstoken)
2. Vượt mã captcha và copy chuỗi mã Token hiện ra.
3. Mở file `app.js`, tìm dòng:
   ```javascript
   const TOKEN = ""; //<--- Điền Token vào đây
   ```
   Dán mã Token vừa copy vào giữa cặp dấu ngoặc kép.

_(Lưu ý: Headless token chỉ có tác dụng trong vài chục phút, mỗi lần chạy lại phòng bạn cần lấy Token mới)._

### Bước 4: Cấu hình phòng (Tùy chọn)

Mở file `codehaxballfinal.js` để chỉnh sửa các cài đặt theo ý muốn. Code đã chia sẵn các biến cấu hình rất rõ ràng:

#### 1. Cài đặt phòng cơ bản
- `ROOM_NAME`: Tên phòng hiển thị trên danh sách server Haxball.
- `SUPER_ADMIN_AUTHS`: Điền Auth key của bạn vào mảng (ví dụ: `["auth_cua_ban"]`) để nhận quyền Super Admin cao nhất (miễn nhiễm kick/ban, toàn quyền dùng lệnh quản trị).
- `PUBLIC`: Đặt `true` để mở phòng công khai cho mọi người cùng thấy, hoặc `false` nếu muốn làm phòng kín (chỉ vào bằng link).
- `playerName`: Tên hiển thị của bot host trong phòng (mặc định: `"BLV Niko Bellic"`).
- `maxPlayers`: Giới hạn số người chơi tối đa có thể vào phòng (mặc định: 30 người).

#### 2. Thể thức thi đấu & Chế độ chơi
- `MODE`: Chọn chế độ chia đội chính:
  - `"pick"`: Hai đội trưởng lần lượt chọn người vào đội.
  - `"rand"`: Tự động chia người ngẫu nhiên và cân bằng theo điểm Rank Elo.
- `MAX_PLAYERS`: Số người thi đấu mỗi đội (mặc định là `5` tương ứng map 5v5; có thể chỉnh thành `3` nếu bạn muốn làm phòng 3v3).
- `TIME_LIMIT`: Thời gian tối đa của một trận đấu, tính theo phút (mặc định: `4` phút).
- `SCORE_LIMIT`: Số bàn thắng chạm trần để thắng trận (mặc định: `4` bàn).

#### 3. Thời gian chờ & Chống treo máy (AFK)
- `ACTIVITY_TIMEOUT`: Số giây đứng im trong sân trước khi bị tính là AFK và tự động đưa ra làm Khán giả (mặc định: `10` giây).
- `AFK_TIMEOUT`: Thời gian treo máy tối đa ở hàng ghế Khán giả trước khi bị kick khỏi phòng (mặc định: `10 * 60` tức 10 phút).
- `FIRST_PICK_TIMEOUT` & `PICK_TIMEOUT`: Thời gian cho đội trưởng chọn quân (lượt đầu tiên `15` giây, các lượt sau `25` giây).
- `PENALTY_TIMEOUT`: Thời gian tối đa cho mỗi lượt sút luân lưu Penalty (mặc định: `10` giây).

#### 4. Chống chửi bậy & Luật phạt
- `BAD_WORDS`: Danh sách các từ chửi bậy, tục tĩu cần chặn (bạn có thể thêm bớt từ tùy ý).
- `MAX_BAD_WORDS`: Số lần nói bậy tối đa trước khi bị hệ thống tự động cấm chat (mute) 10 phút (mặc định: `4` lần).
- `MAX_WARNINGS_PER_PLAYER`: Số lần cảnh báo tối đa trước khi bị xử phạt ban khỏi phòng.

#### 5. Kết nối Discord (Gửi kết quả, log chat & báo cáo)
- `DISCORD_LINK`: Link mời vào server Discord của bạn (hiển thị khi người chơi gõ lệnh `!discord`).
- `DISCORD_STATS_WEBHOOK`: Link Webhook để bot tự động gửi bảng vàng thống kê trận đấu và vinh danh MVP sau mỗi trận.
- `DISCORD_WEBHOOK`: Link Webhook để bot gửi tỷ số trận đấu và file video quay lại trận (nếu bật `SAVE_RECORDINGS = true`).
- `DISCORD_REPORT_WEBHOOK` & `REPORT_TAG_USER_IDS`: Link Webhook nhận thông báo khi người chơi gõ `!report` để tố cáo phá game/hack, kèm danh sách ID tài khoản Discord để tag Admin nhận thông báo.
- `DISCORD_CHAT_WEBHOOK`: Link Webhook để đẩy toàn bộ tin nhắn chat trong phòng game sang kênh Discord theo thời gian thực (log chat).
- `DISCORD_BOT_TOKEN` & `DISCORD_CHANNEL_ID`: Token bot Discord và ID kênh để bật tính năng chat 2 chiều giữa Discord và phòng game.
  - *Lưu ý khi dùng Bot Discord:* Cần cài thư viện `discord.js` (đã có ở Bước 2) và vào trang [Discord Developer Portal](https://discord.com/developers/applications) -> Chọn Bot của bạn -> Mục **Bot** -> Tìm phần **Privileged Gateway Intents** và bật xanh dòng **Message Content Intent** để bot đọc được tin nhắn.
  - *Lệnh điều khiển trên kênh Discord:*
    - Nhập bất kỳ tin nhắn nào trong kênh để gửi vào phòng game dưới dạng thông báo `[ADMIN]: Nội dung`.
    - Gõ `!xemchat`: BẬT chế độ chuyển tiếp chat từ trong game sang kênh Discord.
    - Gõ `!tatchat`: TẮT chế độ chuyển tiếp chat.

---

### Bước 5: Khởi chạy phòng

#### Cách 1: Chạy trực tiếp (để kiểm tra xem có lỗi không)

```bash
node app.js
```

Khi phòng mở thành công, link vào phòng (`https://www.haxball.com/play?c=...`) sẽ hiện lên màn hình terminal. Nhấn `Ctrl + C` khi muốn tắt phòng.

#### Cách 2: Chạy nền 24/7 bằng PM2 (khuyên dùng khi treo trên VPS)

Treo cách này thì khi bạn tắt terminal hay tắt máy tính, phòng trên VPS vẫn tiếp tục chạy:

```bash
# Cài đặt PM2
npm install pm2 -g

# Đưa phòng vào chạy ngầm (đặt tên là haxball-room)
pm2 start app.js --name "haxball-room"

# Lưu lại để VPS tự động mở lại phòng nếu máy chủ bị khởi động lại
pm2 save
pm2 startup
```

**Các lệnh PM2 thường dùng:**
- Xem link phòng và nhật ký hoạt động: `pm2 logs haxball-room`
- Chạy lại phòng: `pm2 restart haxball-room`
- Tắt phòng: `pm2 stop haxball-room`
- Xem trạng thái phòng: `pm2 status`

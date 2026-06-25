const SUPER_ADMIN_PASSWORD = "noibuonchientranh";
const ADMIN_PASSWORD = "traitimquacam";
const SUPER_ADMIN_AUTHS = [""];
const MODE = "pick";
const ROOM_NAME = `⚽𝘼𝙪𝙩𝙤 𝙍𝙤𝙤𝙢 (RANK & CLAN) | LỎ NHẤT VN`;
const PUBLIC = true;
const ACTIVITY_TIMEOUT = 10;
const AFK_TIMEOUT = 10 * 60;
const FIRST_PICK_TIMEOUT = 15;
const PICK_TIMEOUT = 25;
const PAUSE_TIMEOUT = 15;
const PENALTY_TIMEOUT = 10;
const AFTER_GAME_REST = 2.5;
const PREDICTION_PERIOD = 60;
const MAX_SUBSTITUTIONS = 2;
const MAX_PLAYERS = 5;
const TIME_LIMIT = 4;
const SCORE_LIMIT = 4;
const MIN_PLAYERS_FOR_STATS = MAX_PLAYERS - 1;
const MIN_VOTES_FOR_SURRENDER = MAX_PLAYERS - 2;
const MAX_ADDED_TIME = 30;
const NOTIFICATION_INTERVAL = 5 * 60;
const LATE_SUBSTITUTION_PERIOD = 30;
const MAX_AFK_PLAYERS = 3;
const MAX_SIZE_ADJUSTMENT_RATIO = 0.3;
const SAVE_RECORDINGS = true;
const MAX_WARNINGS_PER_PLAYER = 6;
const VIOLATION_BAN_PERIOD = 3;
const YELLOW_BAN_PERIOD = 10;
const RED = 0xFA3E3E;
const GREEN = 0x5DB899;
const YELLOW = 0xF1CC81;
const BLUE = 0x047CC4;
const BALL_COLORS = [0xFFFFCC, 0xCCFFFF, 0xE5CCFF, 0xCCFFCC, 0xFFCCFF, 0xE5E7E9];
const TEAM_NAMES = {
  1: "RED",
  2: "BLUE",
};
const ROLE = {
  PLAYER: 0,
  ADMIN: 1,
  SUPER_ADMIN: 2,
};
const PLAYER_SCORING_RULES = {
  goals: 5,
  assists: 2,
  ownGoals: -3,
  passes: 1,
  shotsOnTarget: 0.5,
  stoppedShots: 3.5,       // ⬆️ TĂNG TỪ 2 LÊN 3.5 (Thưởng đậm cho cản phá cú sút)
  errorsLeadingToGoal: -2,
  attemptsLeadingToOG: 2,
  penaltiesScored: 1,
  penaltiesMissed: -1,
  touches: 0.05,           // ⬆️ TĂNG TỪ 0.01 LÊN 0.05 (Hậu vệ phá bóng, tranh chấp nhiều sẽ có điểm rất cao)
};
const EFFECT_NAMES = [
  "Hào Quang Super Saiyan",      // 0 (Đã nâng cấp bốc lửa)
  "Động Đất Kinh Hoàng",         // 1 (Đã nâng cấp rung nảy sân)
  "Vũ Điệu Chiến Thắng",         // 2 (Đã nâng cấp xếp vòng tròn)
  "Sàn Nhảy Disco",              // 3 (Đổi từ Bóng 7 sắc)
  "Thần La Thiên Chinh",         // 4 (Sóng xung kích Shinra Tensei)
  "Khung Thành Bùng Nổ",         // 5 (Đổi từ Gôn nổ tùm lum)
  "Mảnh Vỡ Hỗn Độn",             // 6 (Đổi từ Vỡ bóng tùm lum)
  "Pháo Sáng Di Động",           // 7 (Nghe chuyên nghiệp hơn)
  "Cơn Mưa Đạn Xuyên Thấu",
  "Siêu Hố Đen Vũ Trụ",          // 9 (Nâng cấp Accretion Disk)
  "Dải Ngân Hà Hoàng Kim",       // 10 (Nâng cấp 3 lớp quỹ đạo vệ tinh)
  "Phi Lôi Thần Thuật",          // 11 (Tên này cực ngầu rồi, giữ nguyên)
  "Bom Hạt Nhân (Nuke)",         // 12 (Đổi từ Bom hẹn giờ)
  "Mưa Sao Băng Chói Lòa",       // 13 (Thêm tính từ cho ngầu)
  "Bão Cuồng Phong Càn Quét"     // 14 (Đổi từ Lốc xoáy)
];
// ===== HỆ THỐNG ANTI-TOXIC VOTEKICK =====
const BAD_WORDS = ["chịch", "buòi", "buồi", "buoi", "đit", "fucking", "cunt", "dcmm", "đcmm", "me may", "con mẹ mày", "con me may", "loz", "lòn", "lon", "lồn", "cặc", "fuck", "bitch", "shit", "concac", "nigga", "địt", "con cac", "dit", "đmm", "ad ngu", "duma", "đụ", "backy", "namky", "bắc kỳ", "nam kỳ", "namki", "backi", "bac ky", "nam ky", "nam kì", "bắc kì"];
const MAX_BAD_WORDS = 4;
let badWordCounts = {};
let activeVoteKick = null;
const TEAM_COLORS = [
  // [angle, avatarBgColor, [stripeColors]] — avatar phải tương phản với stripe chính
  // Đỏ thuần vs Xanh Navy (avatar vàng nổi bật trên cả 2)
  [[60, 0xFFFF00, [0xFF3030, 0xFF6060]], [60, 0xFFFF00, [0x003EA6, 0x0060D0]]],
  // Đỏ rực vs Xanh Cyan (avatar trắng vs avatar đen, sọc tương phản rõ)
  [[60, 0xFF0000, [0xFFFFFF, 0xFFE000]], [60, 0x000000, [0x00E5FF, 0x00BFFF]]],
  // Đỏ Cam vs Xanh Lam (avatar đen vs avatar trắng)
  [[45, 0x000000, [0xFF4500, 0xFFAA00, 0xFF4500]], [45, 0xFFFFFF, [0x0044CC, 0x00AAFF, 0x0044CC]]],
  // Cam rực vs Xanh Navy (avatar đen vs avatar trắng)
  [[0, 0x000000, [0xFF6600, 0xFFCC00]], [0, 0xFFFFFF, [0x000066, 0x0000CC]]],
  // Đỏ Mận sọc vs Cyan Sọc (avatar trắng cho cả 2, sọc đối lập)
  [[0, 0xFFFFFF, [0xCC0000, 0x880000, 0xCC0000]], [0, 0x000000, [0x00CCCC, 0x008888, 0x00CCCC]]],
  // Hồng Đỏ vs Xanh Dương Đậm (avatar trắng vs avatar đen)
  [[90, 0xFFFFFF, [0xFF0055, 0xFF5580, 0xFF0055]], [90, 0xFFFFFF, [0x0011CC, 0x4455FF, 0x0011CC]]],
  // Đen Đỏ vs Trắng Xanh (avatar đỏ vs avatar xanh - tương phản tuyệt đối)
  [[45, 0xFFFFFF, [0x000000, 0xFF0000, 0x000000]], [45, 0x000000, [0xFFFFFF, 0x00AAFF, 0xFFFFFF]]],
  // Trắng sọc Đỏ vs Đen sọc Xanh (avatar đỏ vs avatar xanh)
  [[45, 0x000000, [0xFFFFFF, 0xDD0000, 0xFFFFFF]], [45, 0xFFFFFF, [0x000000, 0x0066FF, 0x000000]]],
  // Vàng Đỏ vs Đen Cyan (avatar đen vs avatar vàng)
  [[-45, 0x000000, [0xFF2200, 0xFFDD00, 0xFF2200]], [-45, 0xFFDD00, [0x004466, 0x00BBEE, 0x004466]]],
  // Hồng Tươi vs Tím Xanh (avatar trắng vs avatar đen)
  [[232, 0xFFFFFF, [0xFF0077, 0xFF44AA, 0xFF0077]], [129, 0x000000, [0x5522CC, 0x8866FF, 0x5522CC]]],
  // Xanh Lá Sáng vs Tím Đậm (avatar đen vs avatar trắng — tương phản cao)
  [[45, 0x000000, [0x00FF44, 0x00BB33]], [45, 0xFFFFFF, [0x8800CC, 0x5500AA]]],
  // Vàng Đen vs Xanh Trắng (avatar đen vs avatar trắng)
  [[90, 0x000000, [0xFFDD00, 0xFF8800, 0xFFDD00]], [90, 0xFFFFFF, [0x002299, 0x0055CC, 0x002299]]],
  // Xám Đen vs Trắng Vàng (avatar đỏ vs avatar xanh - highlight màu đối lập)
  [[135, 0xFF2200, [0x222222, 0x000000, 0x222222]], [135, 0x0044FF, [0xEEEEEE, 0xFFFFFF, 0xEEEEEE]]],
  // Cam Đỏ vs Xanh Navy (avatar đen vs avatar vàng)
  [[60, 0x000000, [0xFF6600, 0xFF2200, 0xFF6600]], [60, 0xFFDD00, [0x000044, 0x0000AA, 0x000044]]],
  // Xanh Lá Neon vs Đỏ (avatar đen cho cả 2, sọc đối nghịch hoàn toàn)
  [[90, 0x000000, [0x00FF66, 0x00AA44]], [90, 0x000000, [0xFF2200, 0xAA0000]]],
  // Hồng Tím vs Xanh Rêu (avatar trắng vs avatar đen)
  [[45, 0xFFFFFF, [0xFF00CC, 0x9900CC]], [45, 0x000000, [0x006633, 0x003300]]],
  // Xanh Lá Matrix vs Đỏ Lửa (avatar đen cho cả 2, cực kỳ tương phản)
  [[0, 0x000000, [0x00FF44, 0x008822]], [0, 0x000000, [0xFF2200, 0x880000]]],
  // Vàng Cyan vs Đỏ Tím (avatar đen vs avatar đen, sọc 2 màu đối nghịch)
  [[60, 0x000000, [0xFFDD00, 0x00FFFF]], [60, 0x000000, [0xFF0033, 0x6600CC]]],
  // Hồng Pastel vs Xanh Pastel (avatar tím vs avatar cam - tương phản ngầm)
  [[120, 0xAA0055, [0xFFCCDD, 0xFFAABB]], [120, 0xFFFFFF, [0x004499, 0x002266]]],
  // Hoàng Hôn Đỏ vs Đêm Tối (avatar trắng vs avatar trắng, sọc đối lập)
  [[135, 0xFFFFFF, [0xFF4400, 0xCC0033, 0xFF4400]], [135, 0xFFFFFF, [0x001166, 0x003399, 0x001166]]],
  // Vàng Hoàng Gia vs Tím Ngọc (avatar đen vs avatar vàng)
  [[45, 0x000000, [0xFFCC00, 0xFFFF66, 0xFFCC00]], [45, 0xFFFF00, [0x5500AA, 0x8800DD, 0x5500AA]]],
  // Hồng Neon vs Cyan Đậm (avatar trắng vs avatar đen)
  [[90, 0xFFFFFF, [0xFF0077, 0xFF6600]], [90, 0x000000, [0x00CCEE, 0x001188]]],
  // Đỏ Sẫm Cam vs Xanh Lá Thẫm (avatar vàng vs avatar tím)
  [[60, 0xFFAA00, [0xFF0000, 0xAA0000, 0xFF5500]], [60, 0x9900CC, [0x003322, 0x006644, 0x00AA77]]],
  // Navy vs Vàng (avatar trắng vs avatar đen — cổ điển tương phản)
  [[0, 0xFFFFFF, [0x000055, 0x0000AA, 0x000055]], [0, 0x000000, [0xFFCC00, 0xFFFF44, 0xFFCC00]]],
  // Tím Đêm vs Xanh Neon (avatar vàng vs avatar đen)
  [[135, 0xFFCC00, [0x220044, 0x110022]], [135, 0x000000, [0x99FF00, 0x66CC00]]],
  // Xanh Bầu Trời vs Vàng Kim (avatar đen vs avatar đen)
  [[90, 0x000000, [0x88BBDD, 0xFFFFFF, 0x88BBDD]], [90, 0x000000, [0xFFDD00, 0xCC9900, 0xFFDD00]]],
  // Đỏ Thẫm vs Xanh Thép (avatar trắng vs avatar trắng)
  [[-45, 0xFFFFFF, [0xCC2200, 0x990000]], [-45, 0xFFFFFF, [0x223355, 0x445577]]],
  // Cam Lửa vs Xanh Lam (avatar đen vs avatar trắng)
  [[45, 0x000000, [0xFF5500, 0xFFAA00, 0xFF5500]], [45, 0xFFFFFF, [0x0033AA, 0x0066DD, 0x0033AA]]],
  // Trắng Đỏ vs Xanh Vàng (Real Madrid vs Barcelona)
  [[0, 0xAA8800, [0xFFFFFF, 0xEEEEEE]], [0, 0xFFDD00, [0x003366, 0x990033, 0x003366]]],
  // Đỏ Đậm vs Xanh Nhạt (Man Utd vs Man City)
  [[0, 0xFFFFFF, [0xBB0011, 0x880011]], [0, 0xFFFFFF, [0x55AADD, 0x7FCCEE]]],
  // Đen Đỏ vs Đen Xanh (AC Milan vs Inter)
  [[0, 0xFFFFFF, [0xDD0011, 0x000000, 0xDD0011]], [0, 0xFFEE00, [0x0022BB, 0x000000, 0x0022BB]]],
  // Đỏ vs Vàng Đen (Bayern vs Dortmund)
  [[0, 0xFFFFFF, [0xCC0022, 0x880011]], [0, 0xFFFFFF, [0xFFDD00, 0x000000, 0xFFDD00]]],
  // Đỏ vs Xanh (Arsenal vs Chelsea)
  [[0, 0xFFFFFF, [0xEE0000, 0xCC0000]], [0, 0xFFFFFF, [0x0033AA, 0x0033AA]]],
  // Trắng Đen vs Xanh (Juventus vs Napoli)
  [[0, 0xFFD700, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0x000000, [0x0099CC, 0x0099CC]]],
  // Đỏ Trắng vs Xanh Trắng (Croatia vs England)
  [[0, 0xFFDD00, [0xAA0000, 0xFF2200, 0xAA0000]], [0, 0xCC0000, [0x000066, 0xFFFFFF, 0x000066]]],
  // Đen Tím vs Tím Hồng (Cyberpunk)
  [[135, 0xFFFFFF, [0x000000, 0x111111, 0x000000]], [135, 0xFFFFFF, [0x9900CC, 0x5500AA, 0xFF0099]]],
  // Đỏ Vàng vs Xanh (Việt Nam vs Thái Lan)
  [[0, 0xFFFF00, [0xDD0000, 0xBB0000]], [0, 0xFFFFFF, [0x0000EE, 0x000099]]],
  // Hồng Nhạt vs Xanh Da Trời (bé gái vs bé trai)
  [[45, 0x990055, [0xFF99BB, 0xFFBBCC, 0xFFCCDD]], [45, 0xFFFFFF, [0x004499, 0x002266, 0x004499]]],
  // Cam Lửa vs Xanh Lá Đậm (đối lập mạnh)
  [[90, 0x000000, [0xFF4400, 0x882200]], [90, 0x000000, [0x00FF44, 0x008822]]],
  // Đen Vàng vs Đen Vàng Xanh (Golden Night)
  [[0, 0xBB8800, [0x000000, 0x111111, 0x000000]], [0, 0x000000, [0xBBAA00, 0xFFDD00, 0xBBAA00]]],
  // Cam Hà Lan vs Xanh Croatia (quốc kỳ)
  [[0, 0xFFFFFF, [0xFF5500, 0xFF5500]], [90, 0x0000BB, [0xFFFFFF, 0xFF2200, 0xFFFFFF]]],
  // Vàng Lá vs Đen Xanh (Brazil vs Argentina)
  [[0, 0x006622, [0xFFCC00, 0xFFCC00]], [0, 0x000000, [0x5588BB, 0x5588BB]]],
  // Vàng Colombia vs Đỏ Chile
  [[0, 0x003399, [0xFFCC00, 0xFFCC00]], [0, 0xFFFFFF, [0xCC0011, 0x002288, 0xCC0011]]],
  // Xanh Nhật vs Đỏ Hàn
  [[0, 0xFFFFFF, [0x000066, 0x0000AA]], [0, 0xFFFFFF, [0xCC0011, 0xCC0011]]],
  // Xanh Ả Rập vs Vàng Úc
  [[0, 0xFFFFFF, [0x006633, 0x006633]], [0, 0x00AA44, [0xFFCC00, 0xFFCC00]]],
  // Tím Lavender vs Xanh Navy (avatar đen vs avatar tím)
  [[60, 0x000033, [0x9988EE, 0xBBAEFF]], [60, 0x5500AA, [0xFFFFFF, 0xFFFFFF]]],
  // Cyan vs Vàng (biển vs cát)
  [[0, 0xFFFFFF, [0x00AAAA, 0x0088BB]], [0, 0x000000, [0xFFDD00, 0xFFBB00]]],
  // Cam Chanh vs Xanh Bạc Hà (avatar đen vs avatar trắng)
  [[45, 0x000000, [0xFFAA00, 0xFFEE44]], [45, 0xFFFFFF, [0x00AA55, 0x008844]]],
  // Hồng Dạ Quang vs Xanh Đậm (avatar trắng vs avatar trắng)
  [[45, 0xFFFFFF, [0xFF0077, 0xDD0022]], [45, 0x000000, [0x00FFFF, 0x0088FF]]],
  // Hoàng Hôn vs Đêm Sâu (avatar trắng vs avatar trắng)
  [[135, 0xFFFFFF, [0xFF0000, 0x880000, 0xCC2266]], [135, 0xFFFFFF, [0x000044, 0x000088, 0x000044]]],
  // --- THÊM CÁC CÂU LẠC BỘ CHÂU ÂU ---
  [[0, 0x0000FF, [0xCB3524, 0xFFFFFF, 0xCB3524]], [0, 0x000000, [0xFFFFFF, 0xFFFFFF]]],
  [[0, 0xFFFFFF, [0x004170, 0xE30613, 0x004170]], [45, 0x000000, [0xFFFFFF, 0xED1C24]]],
  [[0, 0xFFD700, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0x000000, [0x87CEEB, 0x87CEEB]]],
  [[0, 0xFFD700, [0x8E1F2F, 0x8E1F2F]], [0, 0xFFFFFF, [0x12A0D7, 0x12A0D7]]],
  [[0, 0xFFFFFF, [0xA32638, 0xF2A900]], [0, 0xFFFFFF, [0xFEDD00, 0x002395, 0xFEDD00]]],
  [[0, 0xFFFFFF, [0x6CABDD, 0x6CABDD]], [0, 0xD4AF37, [0x000000, 0xFFFFFF, 0x000000]]],
  [[0, 0x000000, [0xFDE100, 0xFDE100]], [0, 0x000000, [0xDD013F, 0xFFFFFF, 0xDD013F]]],
];
let colorHistory = []; // Lưu trữ chỉ số (index) của các màu đã dùng gần đây
const HISTORY_LIMIT = 20; // Số trận tối đa không được lặp lại màu (bạn có thể tăng lên 5 nếu TEAM_COLORS nhiều)
// Tạo một danh sách các trận đấu đặc biệt.
// Để so sánh mảng trong Javascript khá phức tạp, ta dùng thủ thuật chuyển mảng thành chuỗi JSON để so sánh cho nhanh.
const SPECIAL_MATCHES = {
  // 🏆 CÂU LẠC BỘ CHÂU ÂU - khớp với TEAM_COLORS index 50-56

  [JSON.stringify([[0, 0x0000FF, [0xCB3524, 0xFFFFFF, 0xCB3524]], [0, 0x000000, [0xFFFFFF, 0xFFFFFF]]])]: {
    name: "⚔️ LA LIGA: ATLETICO MADRID vs VALENCIA", color: 0xCB3524, icon: "🛡️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x004170, 0xE30613, 0x004170]], [45, 0x000000, [0xFFFFFF, 0xED1C24]]])]: {
    name: "🗼 LIGUE 1: PSG vs AS MONACO", color: 0x004170, icon: "🗼"
  },
  [JSON.stringify([[0, 0xFFD700, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0x000000, [0x87CEEB, 0x87CEEB]]])]: {
    name: "🦓 SERIE A: JUVENTUS vs LAZIO", color: 0xFFFFFF, icon: "🦓"
  },
  [JSON.stringify([[0, 0xFFD700, [0x8E1F2F, 0x8E1F2F]], [0, 0xFFFFFF, [0x12A0D7, 0x12A0D7]]])]: {
    name: "☀️ DERBY DEL SOLE: AS ROMA vs NAPOLI", color: 0x8E1F2F, icon: "☀️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0xA32638, 0xF2A900]], [0, 0xFFFFFF, [0xFEDD00, 0x002395, 0xFEDD00]]])]: {
    name: "🔥 KITALARARASI DERBI: GALATASARAY vs FENERBAHCE", color: 0xA32638, icon: "🔥"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x6CABDD, 0x6CABDD]], [0, 0xD4AF37, [0x000000, 0xFFFFFF, 0x000000]]])]: {
    name: "🦅 NGOẠI HẠNG ANH: MAN CITY vs NEWCASTLE", color: 0x6CABDD, icon: "🦅"
  },
  [JSON.stringify([[0, 0x000000, [0xFDE100, 0xFDE100]], [0, 0x000000, [0xDD013F, 0xFFFFFF, 0xDD013F]]])]: {
    name: "🐝 BUNDESLIGA: DORTMUND vs RB LEIPZIG", color: 0xFDE100, icon: "🐝"
  },

  // 🌍 ĐỘI TUYỂN - khớp với TEAM_COLORS index 39-46
  [JSON.stringify([[0, 0xFFDD00, [0xAA0000, 0xFF2200, 0xAA0000]], [0, 0xCC0000, [0x000066, 0xFFFFFF, 0x000066]]])]: {
    name: "⚔️ EURO ĐẠI CHIẾN: CROATIA vs ANH", color: 0xCC0000, icon: "⚔️"
  },
  // Index 39: Cam Hà Lan vs Croatia
  [JSON.stringify([[0, 0xFFFFFF, [0xFF5500, 0xFF5500]], [90, 0x0000BB, [0xFFFFFF, 0xFF2200, 0xFFFFFF]]])]: {
    name: "🌪️ ĐẠI CHIẾN CHÂU ÂU: HÀ LAN vs CROATIA", color: 0xFF5500, icon: "🌪️"
  },
  [JSON.stringify([[0, 0x006622, [0xFFCC00, 0xFFCC00]], [0, 0x000000, [0x5588BB, 0x5588BB]]])]: {
    name: "🌞 SIÊU KINH ĐIỂN NAM MỸ: BRAZIL vs ARGENTINA", color: 0xFFCC00, icon: "🌞"
  },
  [JSON.stringify([[0, 0x003399, [0xFFCC00, 0xFFCC00]], [0, 0xFFFFFF, [0xCC0011, 0x002288, 0xCC0011]]])]: {
    name: "☕ RỰC LỬA NAM MỸ: COLOMBIA vs CHILE", color: 0xFFCC00, icon: "☕"
  },
  // Index 42: Nhật Bản vs Hàn Quốc
  [JSON.stringify([[0, 0xFFFFFF, [0x000066, 0x0000AA]], [0, 0xFFFFFF, [0xCC0011, 0xCC0011]]])]: {
    name: "⛩️ DERBY ĐÔNG Á: NHẬT BẢN vs HÀN QUỐC", color: 0x0000AA, icon: "⛩️"
  },
  // Index 43: Ả Rập Xê Út vs Australia
  [JSON.stringify([[0, 0xFFFFFF, [0x006633, 0x006633]], [0, 0x00AA44, [0xFFCC00, 0xFFCC00]]])]: {
    name: "🐪 CHÂU Á TRANH BÁ: Ả RẬP XÊ ÚT vs AUSTRALIA", color: 0x006633, icon: "🐪"
  },

  // 🚀 SỰ KIỆN ĐẶC BIỆT - khớp với TEAM_COLORS index 35-38
  // Index 35: Cyberpunk (Đen Tím vs Tím Hồng)
  [JSON.stringify([[135, 0xFFFFFF, [0x000000, 0x111111, 0x000000]], [135, 0xFFFFFF, [0x9900CC, 0x5500AA, 0xFF0099]]])]: {
    name: "🤖 CHẾ ĐỘ CYBERPUNK 2077 KÍCH HOẠT", color: 0x9900CC, icon: "🤖"
  },
  // Index 36: Việt Nam vs Thái Lan
  [JSON.stringify([[0, 0xFFFF00, [0xDD0000, 0xBB0000]], [0, 0xFFFFFF, [0x0000EE, 0x000099]]])]: {
    name: "⭐ DERBY ĐÔNG NAM Á: VIỆT NAM vs THÁI LAN", color: 0xFFFF00, icon: "⭐"
  },
  // Index 38: Cam Lửa vs Xanh Lá (Rồng Lửa vs Rồng Độc)
  [JSON.stringify([[90, 0x000000, [0xFF4400, 0x882200]], [90, 0x000000, [0x00FF44, 0x008822]]])]: {
    name: "🐉 TRẬN CHIẾN QUÁI THÚ: RỒNG LỬA vs RỒNG ĐỘC", color: 0xFF4400, icon: "🐉"
  },
  // Index 33: Đỏ Trắng vs Xanh Trắng (Juventus vs Napoli kiểu mới)
  [JSON.stringify([[0, 0xFFD700, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0x000000, [0x0099CC, 0x0099CC]]])]: {
    name: "🍕 ĐẠI CHIẾN NƯỚC Ý: JUVENTUS vs NAPOLI", color: 0x0099CC, icon: "🍕"
  },
  // Index 30: Đen Đỏ vs Đen Xanh (AC Milan vs Inter)
  [JSON.stringify([[0, 0xFFFFFF, [0xDD0011, 0x000000, 0xDD0011]], [0, 0xFFEE00, [0x0022BB, 0x000000, 0x0022BB]]])]: {
    name: "🏟️ DERBY DELLA MADONNINA: AC MILAN vs INTER MILAN", color: 0xDD0011, icon: "🏟️"
  },
  // Index 31: Đỏ vs Vàng Đen (Bayern vs Dortmund)
  [JSON.stringify([[0, 0xFFFFFF, [0xCC0022, 0x880011]], [0, 0xFFFFFF, [0xFFDD00, 0x000000, 0xFFDD00]]])]: {
    name: "⚡ DER KLASSIKER: BAYERN MUNICH vs DORTMUND", color: 0xFFDD00, icon: "⚡"
  },
  // Index 32: Đỏ vs Xanh (Arsenal vs Chelsea)
  [JSON.stringify([[0, 0xFFFFFF, [0xEE0000, 0xCC0000]], [0, 0xFFFFFF, [0x0033AA, 0x0033AA]]])]: {
    name: "🛡️ ĐẠI CHIẾN LONDON: ARSENAL vs CHELSEA", color: 0xEE0000, icon: "🛡️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0xBB0011, 0x880011]], [0, 0xFFFFFF, [0x55AADD, 0x7FCCEE]]])]: {
    name: "⚔️ DERBY MANCHESTER: MAN UTD vs MAN CITY", color: 0xBB0011, icon: "⚔️"
  },
  [JSON.stringify([[0, 0xAA8800, [0xFFFFFF, 0xEEEEEE]], [0, 0xFFDD00, [0x003366, 0x990033, 0x003366]]])]: {
    name: "🔥 EL CLÁSICO: REAL MADRID vs BARCELONA", color: 0xFFDD00, icon: "🔥"
  },
  // Index 39 Golden Night (Đen Vàng)
  [JSON.stringify([[0, 0xBB8800, [0x000000, 0x111111, 0x000000]], [0, 0x000000, [0xBBAA00, 0xFFDD00, 0xBBAA00]]])]: {
    name: "👑 SỰ KIỆN VIP: ĐÊM HOÀNG KIM (GOLDEN NIGHT)", color: 0xFFDD00, icon: "👑"
  },
};
const NORMAL_MATCHES = {
  // 1. Đỏ thuần vs Xanh Navy
  [JSON.stringify([[60, 0xFFFF00, [0xFF3030, 0xFF6060]], [60, 0xFFFF00, [0x003EA6, 0x0060D0]]])]: {
    name: "🔴 Đỏ Rực vs 🔵 Xanh Navy", icon: "⚔️"
  },
  // 2. Đỏ rực vs Cyan (avatar đỏ vs avatar đen)
  [JSON.stringify([[60, 0xFF0000, [0xFFFFFF, 0xFFE000]], [60, 0x000000, [0x00E5FF, 0x00BFFF]]])]: {
    name: "🔥 Đỏ Lửa vs 💎 Xanh Băng", icon: "☄️"
  },
  // 3. Đỏ Cam vs Xanh Lam
  [JSON.stringify([[45, 0x000000, [0xFF4500, 0xFFAA00, 0xFF4500]], [45, 0xFFFFFF, [0x0044CC, 0x00AAFF, 0x0044CC]]])]: {
    name: "🌅 Solar Flare vs ⚡ Electric Blue", icon: "🌋"
  },
  // 4. Cam rực vs Xanh Navy
  [JSON.stringify([[0, 0x000000, [0xFF6600, 0xFFCC00]], [0, 0xFFFFFF, [0x000066, 0x0000CC]]])]: {
    name: "🟠 Cam Rực vs 🌊 Navy Đêm", icon: "🔆"
  },
  // 5. Đỏ Mận sọc vs Cyan Sọc
  [JSON.stringify([[0, 0xFFFFFF, [0xCC0000, 0x880000, 0xCC0000]], [0, 0x000000, [0x00CCCC, 0x008888, 0x00CCCC]]])]: {
    name: "🌋 Magma Đỏ vs 🌊 Aqua Sọc", icon: "🌋"
  },
  // 6. Hồng Đỏ vs Xanh Dương Đậm
  [JSON.stringify([[90, 0xFFFFFF, [0xFF0055, 0xFF5580, 0xFF0055]], [90, 0xFFFFFF, [0x0011CC, 0x4455FF, 0x0011CC]]])]: {
    name: "💗 Hồng Dạ Quang vs 🌑 Xanh Đêm", icon: "💫"
  },
  // 7. Đen Đỏ vs Trắng Xanh
  [JSON.stringify([[45, 0xFFFFFF, [0x000000, 0xFF0000, 0x000000]], [45, 0x000000, [0xFFFFFF, 0x00AAFF, 0xFFFFFF]]])]: {
    name: "⚫ Đen Đỏ vs ⚪ Trắng Xanh", icon: "🦓"
  },
  // 8. Trắng sọc Đỏ vs Đen sọc Xanh
  [JSON.stringify([[45, 0x000000, [0xFFFFFF, 0xDD0000, 0xFFFFFF]], [45, 0xFFFFFF, [0x000000, 0x0066FF, 0x000000]]])]: {
    name: "🔴 Đỏ Cổ Điển vs 🔵 Xanh Cổ Điển", icon: "🛡️"
  },
  // 9. Vàng Đỏ vs Đen Cyan
  [JSON.stringify([[-45, 0x000000, [0xFF2200, 0xFFDD00, 0xFF2200]], [-45, 0xFFDD00, [0x004466, 0x00BBEE, 0x004466]]])]: {
    name: "🟡 Vàng Nóng vs 💎 Xanh Kim Cương", icon: "🔆"
  },
  // 10. Hồng Tươi vs Tím Xanh
  [JSON.stringify([[232, 0xFFFFFF, [0xFF0077, 0xFF44AA, 0xFF0077]], [129, 0x000000, [0x5522CC, 0x8866FF, 0x5522CC]]])]: {
    name: "💖 Hồng Neon vs 🌌 Tím Galaxy", icon: "✨"
  },
  // 11. Xanh Lá Sáng vs Tím Đậm
  [JSON.stringify([[45, 0x000000, [0x00FF44, 0x00BB33]], [45, 0xFFFFFF, [0x8800CC, 0x5500AA]]])]: {
    name: "🌿 Xanh Lá Neon vs 🍇 Tím Đậm", icon: "🍃"
  },
  // 12. Vàng Đen vs Xanh Trắng
  [JSON.stringify([[90, 0x000000, [0xFFDD00, 0xFF8800, 0xFFDD00]], [90, 0xFFFFFF, [0x002299, 0x0055CC, 0x002299]]])]: {
    name: "🟡 Vàng Đen vs 🔵 Neon Blue", icon: "⚡"
  },
  // 13. Xám Đen vs Trắng Vàng
  [JSON.stringify([[135, 0xFF2200, [0x222222, 0x000000, 0x222222]], [135, 0x0044FF, [0xEEEEEE, 0xFFFFFF, 0xEEEEEE]]])]: {
    name: "🌑 Bóng Đêm vs ⚪ Ánh Trăng", icon: "🌘"
  },
  // 14. Cam Đỏ vs Xanh Navy
  [JSON.stringify([[60, 0x000000, [0xFF6600, 0xFF2200, 0xFF6600]], [60, 0xFFDD00, [0x000044, 0x0000AA, 0x000044]]])]: {
    name: "🟠 Lửa Cam vs ⚓ Navy Đêm", icon: "🔥"
  },
  // 15. Xanh Lá Neon vs Đỏ Lửa
  [JSON.stringify([[90, 0x000000, [0x00FF66, 0x00AA44]], [90, 0x000000, [0xFF2200, 0xAA0000]]])]: {
    name: "🌿 Matrix Xanh vs 🔥 Rồng Lửa", icon: "🐉"
  },
  // 16. Hồng Tím vs Xanh Rêu
  [JSON.stringify([[45, 0xFFFFFF, [0xFF00CC, 0x9900CC]], [45, 0x000000, [0x006633, 0x003300]]])]: {
    name: "🔮 Tím Ma Thuật vs 🌲 Lục Lâm", icon: "🪄"
  },
  // 17. Xanh Lá Matrix vs Đỏ Lửa
  [JSON.stringify([[0, 0x000000, [0x00FF44, 0x008822]], [0, 0x000000, [0xFF2200, 0x880000]]])]: {
    name: "💻 Hacker Matrix vs 🔥 Firewall", icon: "💻"
  },
  // 18. Vàng Hoàng Gia vs Tím Ngọc
  [JSON.stringify([[45, 0x000000, [0xFFCC00, 0xFFFF66, 0xFFCC00]], [45, 0xFFFF00, [0x5500AA, 0x8800DD, 0x5500AA]]])]: {
    name: "👑 Vàng Hoàng Gia vs 🟣 Tím Hoàng Gia", icon: "⚜️"
  },
  // 19. Đỏ Sẫm Cam vs Xanh Lá Thẫm
  [JSON.stringify([[60, 0xFFAA00, [0xFF0000, 0xAA0000, 0xFF5500]], [60, 0x9900CC, [0x003322, 0x006644, 0x00AA77]]])]: {
    name: "🩸 Máu Đỏ vs 🌿 Thợ Săn Rừng", icon: "🏹"
  },
  // 20. Tím Đêm vs Xanh Neon
  [JSON.stringify([[135, 0xFFCC00, [0x220044, 0x110022]], [135, 0x000000, [0x99FF00, 0x66CC00]]])]: {
    name: "🟣 Đêm Tím vs 🟢 Neon Lime", icon: "🎮"
  },
  // 21. Đỏ Thẫm vs Xanh Thép
  [JSON.stringify([[-45, 0xFFFFFF, [0xCC2200, 0x990000]], [-45, 0xFFFFFF, [0x223355, 0x445577]]])]: {
    name: "🔴 Đỏ Thẫm vs 🌑 Thép Xanh", icon: "⚔️"
  },
  // 22. Cam Lửa vs Xanh Lam
  [JSON.stringify([[45, 0x000000, [0xFF5500, 0xFFAA00, 0xFF5500]], [45, 0xFFFFFF, [0x0033AA, 0x0066DD, 0x0033AA]]])]: {
    name: "🔥 Hỏa Diệm vs ❄️ Băng Sương", icon: "☄️"
  },
  // 23. Navy vs Vàng
  [JSON.stringify([[0, 0xFFFFFF, [0x000055, 0x0000AA, 0x000055]], [0, 0x000000, [0xFFCC00, 0xFFFF44, 0xFFCC00]]])]: {
    name: "⚓ Navy vs 🌟 Vàng Rực", icon: "⭐"
  },
  // 24. Cyan vs Vàng
  [JSON.stringify([[0, 0xFFFFFF, [0x00AAAA, 0x0088BB]], [0, 0x000000, [0xFFDD00, 0xFFBB00]]])]: {
    name: "🌊 Biển Ban Mai vs 🏜️ Cát Vàng", icon: "🌊"
  },
  // 25. Cam Chanh vs Xanh Bạc Hà
  [JSON.stringify([[45, 0x000000, [0xFFAA00, 0xFFEE44]], [45, 0xFFFFFF, [0x00AA55, 0x008844]]])]: {
    name: "🍊 Cam Chanh vs 🌿 Xanh Bạc Hà", icon: "🍃"
  },
  // 26. Hồng Dạ Quang vs Xanh Đậm
  [JSON.stringify([[45, 0xFFFFFF, [0xFF0077, 0xDD0022]], [45, 0x000000, [0x00FFFF, 0x0088FF]]])]: {
    name: "💖 Hồng Dạ Quang vs 🔵 Thiên Thanh", icon: "💫"
  },
  // 27. Hoàng Hôn vs Đêm Sâu
  [JSON.stringify([[135, 0xFFFFFF, [0xFF0000, 0x880000, 0xCC2266]], [135, 0xFFFFFF, [0x000044, 0x000088, 0x000044]]])]: {
    name: "🌇 Chiều Tà vs 🌃 Màn Đêm", icon: "🌆"
  },
  // 28. Xanh Bầu Trời vs Vàng Kim
  [JSON.stringify([[90, 0x000000, [0x88BBDD, 0xFFFFFF, 0x88BBDD]], [90, 0x000000, [0xFFDD00, 0xCC9900, 0xFFDD00]]])]: {
    name: "🌀 Bầu Trời vs 🌟 Hoàng Kim", icon: "🌤️"
  },
  // 29. Hồng Neon vs Cyan Đậm
  [JSON.stringify([[90, 0xFFFFFF, [0xFF0077, 0xFF6600]], [90, 0x000000, [0x00CCEE, 0x001188]]])]: {
    name: "💗 Hồng Cyberpunk vs 🌊 Xanh Neon", icon: "🌴"
  },
  // 30. Hoàng Hôn Đỏ vs Đêm Tối
  [JSON.stringify([[135, 0xFFFFFF, [0xFF4400, 0xCC0033, 0xFF4400]], [135, 0xFFFFFF, [0x001166, 0x003399, 0x001166]]])]: {
    name: "🌇 Hoàng Hôn vs 🌙 Biển Đêm", icon: "🌆"
  },
  // 31. Vàng Cyan vs Đỏ Tím
  [JSON.stringify([[60, 0x000000, [0xFFDD00, 0x00FFFF]], [60, 0x000000, [0xFF0033, 0x6600CC]]])]: {
    name: "💛 Vàng Cyan vs 💜 Đỏ Tím", icon: "💫"
  },
  // 32. Hồng Pastel vs Xanh Pastel
  [JSON.stringify([[120, 0xAA0055, [0xFFCCDD, 0xFFAABB]], [120, 0xFFFFFF, [0x004499, 0x002266]]])]: {
    name: "🌸 Hồng Pastel vs 🌊 Xanh Pastel", icon: "💮"
  },
  // 33. Hồng Nhạt vs Xanh Da Trời
  [JSON.stringify([[45, 0x990055, [0xFF99BB, 0xFFBBCC, 0xFFCCDD]], [45, 0xFFFFFF, [0x004499, 0x002266, 0x004499]]])]: {
    name: "🎀 Bé Gái vs 🍼 Bé Trai", icon: "🧸"
  },
  // 34. Tím Lavender vs Xanh Navy
  [JSON.stringify([[60, 0x000033, [0x9988EE, 0xBBAEFF]], [60, 0x5500AA, [0xFFFFFF, 0xFFFFFF]]])]: {
    name: "🪻 Tím Lavender vs ⚓ Xanh Navy", icon: "🪻"
  }
};

const GOALKEEPER_COLORS = {
  red: [0, 0xFFFFFF, [0x363636, 0x262626, 0x363636]],
  blue: [0, 0xFFFFFF, [0x13A720, 0x2FD835, 0x13A720]],
};
const GOAL_COMMENTARIES = {
  "-3": [
    "Bàn thắng rút ngắn cách biệt. Tuy nhiên khoảng cách vẫn còn rất lớn.",
    "Một bàn gỡ danh dự, thế trận vẫn đang hoàn toàn nghiêng về đối thủ.",
  ],
  "-2": [
    "Cách biệt được rút ngắn xuống còn 2 bàn. Áp lực bắt đầu xuất hiện.",
    "Bàn thắng quan trọng để nuôi lại hy vọng bám đuổi tỉ số.",
    "Lưới đã rung. Đội bị dẫn trước đang cố gắng giành lại thế trận.",
  ],
  "-1": [
    "Chỉ còn cách biệt đúng 1 bàn. Trận đấu đang trở nên căng thẳng.",
    "Bàn rút ngắn tỉ số cực kỳ sát nút. Mọi thứ đều có thể xảy ra.",
    "Khoảng cách giờ chỉ là 1 bàn. Sai lầm lúc này sẽ phải trả giá đắt.",
  ],
  "0": [
    "Tỉ số đã được cân bằng. Trận đấu chính thức quay lại vạch xuất phát.",
    "Bàn thắng gỡ hòa chuẩn xác. Không bên nào nắm lợi thế lúc này.",
    "Thế quân bình được thiết lập. Một đòn giáng mạnh vào sự chủ quan của hàng thủ.",
    "Lưới rung và tỉ số là hòa. Hai đội sẽ phải làm lại từ đầu.",
  ],
  "1": [
    "Vươn lên dẫn trước. Thế bế tắc đã được phá vỡ.",
    "Một bàn lợi thế. Cục diện trận đấu bắt đầu thay đổi.",
    "Bàn thắng bản lề giúp đội bóng nắm quyền chủ động trên sân.",
  ],
  "2": [
    "Nhân đôi cách biệt. Một khoảng cách an toàn đang được thiết lập.",
    "Hai bàn dẫn trước. Đối phương bắt đầu bộc lộ sự lúng túng.",
    "Lợi thế được gia tăng. Hệ thống phòng ngự của đối thủ đang gặp rắc rối.",
  ],
  "3": [
    "Cách biệt 3 bàn. Trận đấu dường như đã được an bài.",
    "Sự áp đảo hoàn toàn được thể hiện rõ ràng trên bảng tỉ số.",
    "Ba bàn không gỡ. Một kịch bản rất khó để lật ngược thế cờ.",
  ],
  "4": [
    "4 bàn cách biệt. Hệ thống của đối thủ đã hoàn toàn vỡ trận.",
    "Không còn cơ hội phản kháng. Khoảng cách là quá lớn để san lấp.",
    "Một màn trình diễn áp đảo. Thế trận hoàn toàn thuộc về một bên.",
  ],
  "5": [
    "5 bàn cách biệt. Một trận đấu chênh lệch đẳng cấp rõ rệt.",
    "Hủy diệt hoàn toàn đối thủ. Không còn bất kỳ sự kháng cự nào.",
    "Kết liễu trận đấu bằng một tỉ số không tưởng.",
  ],
};

const WINNING_GOAL_COMMENTARIES = [
  "Trận đấu kết thúc. Bàn thắng ấn định tỉ số cuối cùng.",
  "Dấu chấm hết cho mọi nỗ lực bám đuổi của đối thủ.",
  "Chiến thắng đã được khẳng định một cách tuyệt đối.",
  "Bàn thắng chốt hạ. Không còn cơ hội nào để lật ngược thế cờ.",
  "Mọi thứ đã ngã ngũ. Một kết quả hoàn toàn xứng đáng.",
];

const SCORER_COMMENTARIES = {
  "1": "Bàn thắng mở tài khoản trong trận đấu này của",
  "2": "Cú đúp gọn gàng và chính xác được lập bởi",
  "3": "Hattrick xuất sắc! Màn trình diễn đẳng cấp đến từ",
  "4": "Cú Poker không khoan nhượng. Tiền đạo xuất sắc nhất lúc này là",
  "5": "Bàn thắng thứ 5 cá nhân. Hiệu suất ghi bàn hủy diệt của",
};

const PENALTY_GOAL_COMMENTARIES = [
  "Cú sút penalty thành công. Chính xác và lạnh lùng.",
  "Không có sai lầm nào trên chấm 11m. Bàn thắng được ghi.",
  "Thủ môn đã bị đánh lừa hoàn toàn. Một pha dứt điểm cơ bản.",
  "Áp lực được giải tỏa bằng cú sút penalty chuẩn mực.",
];

const PENALTY_MISS_COMMENTARIES = [
  "Cú sút hỏng ăn đáng tiếc trên chấm phạt đền.",
  "Không vào. Áp lực tâm lý đã khiến cú sút đi không như ý muốn.",
  "Cơ hội bị bỏ lỡ một cách khó hiểu từ khoảng cách 11m.",
  "Sút hỏng. Đối thủ đã phán đoán thành công ý đồ dứt điểm.",
];

const DISCORD_LOG_WEBHOOK = "";
const DISCORD_WEBHOOK = "";
const DISCORD_STATS_WEBHOOK = ""
// ⚠️ WEBHOOK BÁO CÁO LỖI: Dùng cùng DISCORD_WEBHOOK hoặc thay bằng webhook riêng nếu muốn kênh riêng
const DISCORD_REPORT_WEBHOOK = ""; // ← Đổi thành URL webhook khác nếu muốn gửi vào kênh riêng
// Discord User ID của các admin cần được tag khi có báo cáo lỗi
// Hướng dẫn lấy ID: Bật Developer Mode trong Discord → chuột phải vào tên user → "Copy User ID"
const REPORT_TAG_USER_IDS = [""]; // ← Điền ID thật vào đây!
const STADIUM_TRAINING = '{"name": "Practice","width": 250,"height": 250,"cameraWidth": 0,"cameraHeight": 0,"maxViewWidth": 0,"cameraFollow": "ball","spawnDistance": 170,"redSpawnPoints": [],"blueSpawnPoints": [],"kickOffReset": "partial","bg": {"color": "718C5A","type": "grass","height": 150,"width": 150,"cornerRadius": 0,"kickOffRadius": 0},"traits": {"ballArea": {"vis": false,"bCoef": 1,"cMask": ["ball"]},"goalPost": {"radius": 8,"invMass": 0,"bCoef": 0.5},"goalNet": {"vis": true,"bCoef": 0.1,"cMask": ["ball"]},"kickOffBarrier": {"vis": false,"bCoef": 0.1,"cGroup": ["redKO","blueKO"],"cMask": ["red","blue"]},"line": {"vis": true,"bCoef": 0,"cMask": [""]}},"vertexes": [],"segments": [],"goals": [],"discs": [],"planes": [{"normal": [0,-1],"dist": -200},{"normal": [0,1],"dist": -200},{"normal": [-1,0],"dist": -200},{"normal": [1,0],"dist": -200},{"normal": [0,-1],"dist": -150,"trait": "ballArea"},{"normal": [0,1],"dist": -150,"trait": "ballArea"},{"normal": [-1,0],"dist": -150,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea"},{"normal": [1,0],"dist": -150,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea"}],"joints": [],"playerPhysics": {"radius": 15.5,"bCoef": 0.35,"invMass": 0.5,"damping": 0.96,"cGroup": ["red","blue"],"acceleration": 0.118,"gravity": [0,0],"kickingAcceleration": 0.083,"kickingDamping": 0.96,"kickStrength": 4.7,"kickback": 0},"ballPhysics": {"radius": 6,"bCoef": 0.468,"cMask": ["all"],"damping": 0.99,"invMass": 1.4,"gravity": [0,0],"color": "BDFF80","cGroup": ["ball"],"canBeStored": true},"canBeStored": true}';
const STADIUM_1v1 = '{"name":"KFL 1v1 2v2 By DaYo from HaxMaps","width":480,"height":230,"bg":{"kickOffRadius":60,"color":"525252"},"vertexes":[{"x":-401.4,"y":-200,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":401.4,"y":-200,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":401.4,"y":200,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":-401.4,"y":200,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":0,"y":200,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":0,"y":-200,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":0,"y":-80,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"ffffff"},{"x":0,"y":80,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"ffffff"},{"x":-400,"y":60,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":-400,"y":-60,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":400,"y":-60,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":400,"y":60,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":0,"y":230,"cMask":[],"cGroup":[]},{"x":0,"y":-230,"cMask":[],"cGroup":[]},{"x":436.4,"y":-60,"cMask":[],"cGroup":[],"color":"5957ff"},{"x":436.4,"y":60,"cMask":[],"cGroup":[],"color":"5957ff"},{"x":-436.4,"y":-60,"cMask":[],"cGroup":[],"color":"ff5757"},{"x":-436.4,"y":60,"cMask":[],"cGroup":[],"color":"ff5757"},{"x":400,"y":-135,"cMask":["wall"],"cGroup":["wall"]},{"x":400,"y":135,"cMask":["wall"],"cGroup":["wall"],"curve":180},{"x":-400,"y":-135,"cMask":["wall"],"cGroup":["wall"],"curve":180,"_data":{"mirror":{}}},{"x":-400,"y":135,"cMask":["wall"],"cGroup":["wall"]},{"x":-400,"y":-201.4,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":400,"y":-201.4,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":400,"y":201.4,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":-400,"y":201.4,"cMask":[],"cGroup":[],"color":"ffffff"},{"x":435,"y":-61.4,"cMask":[],"cGroup":[],"color":"5957ff"},{"x":435,"y":61.4,"cMask":[],"cGroup":[],"color":"5957ff"},{"x":-435,"y":-61.4,"cMask":[],"cGroup":[],"color":"ff5757"},{"x":-435,"y":61.4,"cMask":[],"cGroup":[],"color":"ff5757"},{"x":-400,"y":135,"cMask":["wall"],"cGroup":["wall"],"curve":180},{"x":400,"y":-135,"cMask":["wall"],"cGroup":["wall"],"curve":180},{"x":-39.70962850170082,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-39.439628568644224,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-38.599457340390344,"y":8.577657186753411,"cMask":["wall"],"cGroup":["wall"]},{"x":-12.167333969347064,"y":-39.86836860352869,"cMask":["wall"],"cGroup":["wall"]},{"x":-9.864305764766423,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-3.160793923255983,"y":-45.4438457749184,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":0,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":23.85882621501726,"y":-45.28500027146,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-1.715531437350682,"y":-23.15967440423421,"cMask":["wall"],"cGroup":["wall"]},{"x":23.15967440423421,"y":-22.730791544896537,"cMask":["wall"],"cGroup":["wall"]},{"x":31.57871768309533,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":32.16621445032529,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-37.56521420501247,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-37.29521427195587,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-37.56521420501247,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-37.29521427195587,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-35.13279364200405,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-34.86279370894746,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.10095151508689,"y":7.826910099405138,"cMask":["wall"],"cGroup":["wall"]},{"x":-13.668828144043612,"y":-40.61911569087696,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-36.8477141365777,"y":9.828902332333866,"cMask":["wall"],"cGroup":["wall"]},{"x":-10.415590765534422,"y":-38.61712345794823,"cMask":["wall"],"cGroup":["wall"]},{"x":-36.613888547160386,"y":8.180543428107411,"cMask":["wall"],"cGroup":["wall"]},{"x":-7.878736971536467,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-38.99657109903633,"y":10.960339738629349,"cMask":["wall"],"cGroup":["wall"]},{"x":-10.261419523412414,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-1.175225130026027,"y":-45.04673201627241,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":1.9855687932299562,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":0.016116145911946544,"y":-44.64961825762642,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":3.1769100691679295,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-1.3184176787046924,"y":-21.174105611004254,"cMask":["wall"],"cGroup":["wall"]},{"x":23.5567881628802,"y":-20.74522275166658,"cMask":["wall"],"cGroup":["wall"]},{"x":-0.5241901614127096,"y":-18.79142305912831,"cMask":["wall"],"cGroup":["wall"]},{"x":24.351015680172182,"y":-18.362540199790637,"cMask":["wall"],"cGroup":["wall"]},{"x":-3.160793923255983,"y":-42.26693570575047,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":23.85882621501726,"y":-42.10809020229207,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-3.160793923255983,"y":-39.48713939522853,"cMask":["wall"],"cGroup":["wall"]},{"x":23.85882621501726,"y":-39.32829389177013,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-2.946245715851926,"y":-44.207199958117776,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":24.073374422421317,"y":-44.048354454659375,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":34.302406014000624,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":34.88990278123059,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":36.68563330354275,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":37.273130070772716,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":32.506675491688455,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":32.84713653305161,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":43.4945141098152,"cMask":["wall"],"cGroup":["wall"]},{"x":2.222303693945231,"y":-45.017316182298636,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":5.383097617201214,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":4.428491241978515,"y":-43.914222408281994,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":7.5892851652344975,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-37.56521420501247,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-37.29521427195587,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-36.45504304370199,"y":9.006540046091088,"cMask":["wall"],"cGroup":["wall"]},{"x":-35.42079990832411,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-35.15079997526752,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-35.42079990832411,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-35.15079997526752,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-32.447841442424945,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-32.718379412259104,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-37.95653721839854,"y":8.255792958742814,"cMask":["wall"],"cGroup":["wall"]},{"x":-34.70329983988935,"y":10.257785191671543,"cMask":["wall"],"cGroup":["wall"]},{"x":-34.46947425047203,"y":8.609426287445087,"cMask":["wall"],"cGroup":["wall"]},{"x":-36.85215680234798,"y":11.389222597967025,"cMask":["wall"],"cGroup":["wall"]},{"x":-35.56106555856469,"y":11.54443376968455,"cMask":["wall"],"cGroup":["wall"]},{"x":-9.12894218752141,"y":-36.90159202059755,"cMask":["wall"],"cGroup":["wall"]},{"x":-35.56106555856469,"y":11.54443376968455,"cMask":["wall"],"cGroup":["wall"]},{"x":-9.12894218752141,"y":-36.90159202059755,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.88802132883167,"y":12.536548263458796,"cMask":["wall"],"cGroup":["wall"]},{"x":-12.152869753207753,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-44.75098551676566,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-44.48098558370906,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-43.64081435545518,"y":8.577657186753411,"cMask":["wall"],"cGroup":["wall"]},{"x":-17.208690984411902,"y":-39.86836860352869,"cMask":["wall"],"cGroup":["wall"]},{"x":-14.905662779831259,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-8.20215093832082,"y":-45.4438457749184,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-5.041357015064836,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":18.817469199952424,"y":-45.28500027146,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-6.756888452415518,"y":-23.15967440423421,"cMask":["wall"],"cGroup":["wall"]},{"x":18.118317389169373,"y":-22.730791544896537,"cMask":["wall"],"cGroup":["wall"]},{"x":26.537360668030495,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":27.124857435260456,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-42.606571220077306,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-42.3365712870207,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-42.606571220077306,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-42.3365712870207,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.174150657068886,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-39.9041507240123,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-45.14230853015172,"y":7.826910099405138,"cMask":["wall"],"cGroup":["wall"]},{"x":-18.71018515910845,"y":-40.61911569087696,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-41.88907115164254,"y":9.828902332333866,"cMask":["wall"],"cGroup":["wall"]},{"x":-15.456947780599258,"y":-38.61712345794823,"cMask":["wall"],"cGroup":["wall"]},{"x":-41.65524556222522,"y":8.180543428107411,"cMask":["wall"],"cGroup":["wall"]},{"x":-12.920093986601303,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-44.03792811410116,"y":10.960339738629349,"cMask":["wall"],"cGroup":["wall"]},{"x":-15.30277653847725,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-6.216582145090863,"y":-45.04673201627241,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-3.05578822183488,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-5.025240869152889,"y":-44.64961825762642,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-1.8644469458969066,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-6.359774693769529,"y":-21.174105611004254,"cMask":["wall"],"cGroup":["wall"]},{"x":18.515431147815363,"y":-20.74522275166658,"cMask":["wall"],"cGroup":["wall"]},{"x":-5.565547176477546,"y":-18.79142305912831,"cMask":["wall"],"cGroup":["wall"]},{"x":19.309658665107346,"y":-18.362540199790637,"cMask":["wall"],"cGroup":["wall"]},{"x":-8.20215093832082,"y":-42.26693570575047,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":18.817469199952424,"y":-42.10809020229207,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-8.20215093832082,"y":-39.48713939522853,"cMask":["wall"],"cGroup":["wall"]},{"x":18.817469199952424,"y":-39.32829389177013,"cMask":["wall"],"cGroup":["wall"]},{"x":-7.9876027309167625,"y":-44.207199958117776,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":19.03201740735648,"y":-44.048354454659375,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":29.261048998935788,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":29.848545766165753,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":31.644276288477915,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":33.854194221406914,"y":43.4945141098152,"cMask":["wall"],"cGroup":["wall"]},{"x":27.46531847662362,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":27.805779517986775,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-2.819053321119605,"y":-45.017316182298636,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":0.3417406021363778,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-0.6128657730863214,"y":-43.914222408281994,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":2.5479281501696613,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-42.606571220077306,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-42.3365712870207,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-41.496400058766824,"y":9.006540046091088,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.46215692338895,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-40.19215699033235,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.46215692338895,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-40.19215699033235,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-38.02973636038053,"y":-47.002316878116766,"cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{}}},{"x":-37.75973642732394,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":-42.99789423346337,"y":8.255792958742814,"cMask":["wall"],"cGroup":["wall"]},{"x":-39.74465685495419,"y":10.257785191671543,"cMask":["wall"],"cGroup":["wall"]},{"x":-39.510831265536865,"y":8.609426287445087,"cMask":["wall"],"cGroup":["wall"]},{"x":-41.89351381741281,"y":11.389222597967025,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.602422573629525,"y":11.54443376968455,"cMask":["wall"],"cGroup":["wall"]},{"x":-14.170299202586246,"y":-36.90159202059755,"cMask":["wall"],"cGroup":["wall"]},{"x":-40.602422573629525,"y":11.54443376968455,"cMask":["wall"],"cGroup":["wall"]},{"x":-14.170299202586246,"y":-36.90159202059755,"cMask":["wall"],"cGroup":["wall"]},{"x":-45.9293783438965,"y":12.536548263458796,"cMask":["wall"],"cGroup":["wall"]},{"x":-17.19422676827259,"y":45.33391918015176,"cMask":["wall"],"cGroup":["wall"]},{"x":55,"y":42,"cMask":["wall"],"cGroup":["wall"]},{"x":35.59589441669825,"y":42,"cMask":["wall"],"cGroup":["wall"]}],"segments":[{"v0":5,"v1":6,"color":"ffffff","bCoef":0,"cMask":[],"cGroup":[]},{"v0":4,"v1":7,"color":"ffffff","bCoef":0,"cMask":[],"cGroup":[]},{"v0":6,"v1":13,"vis":false,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":7,"v1":12,"vis":false,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":6,"v1":7,"curve":180,"color":"ffffff","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"],"curveF":6.123233995736766e-17},{"v0":7,"v1":6,"curve":180,"color":"ffffff","bCoef":0.1,"cMask":["red","blue"],"cGroup":["blueKO"],"curveF":6.123233995736766e-17},{"v0":10,"v1":14,"color":"5957ff","bCoef":0.1,"cMask":["ball"],"bias":-10},{"v0":26,"v1":27,"color":"5957ff","bCoef":0.1,"cMask":["ball"],"bias":-10},{"v0":15,"v1":11,"color":"5957ff","bCoef":0.1,"cMask":["ball"],"bias":-10},{"v0":8,"v1":17,"color":"ff5757","bCoef":0.1,"cMask":["ball"],"bias":-10,"y":60},{"v0":29,"v1":28,"color":"ff5757","bCoef":0.1,"cMask":["ball"],"bias":-10},{"v0":16,"v1":9,"color":"ff5757","bCoef":0.1,"cMask":["ball"],"bias":-10,"y":-60},{"v0":9,"v1":8,"color":"C5C5C5","bCoef":0,"cMask":[]},{"v0":10,"v1":11,"color":"C5C5C5","bCoef":0,"cMask":[]},{"v0":0,"v1":1,"color":"ffffff","cMask":["ball"],"bias":-10},{"v0":23,"v1":10,"color":"ffffff","cMask":["ball"],"bias":-10},{"v0":11,"v1":24,"color":"ffffff","cMask":["ball"],"bias":-10},{"v0":2,"v1":3,"color":"ffffff","cMask":["ball"],"bias":-10},{"v0":25,"v1":8,"color":"ffffff","cMask":["ball"],"bias":-10},{"v0":9,"v1":22,"color":"ffffff","cMask":["ball"],"bias":-10},{"v0":20,"v1":30,"curve":180,"color":"626262","cMask":["wall"],"cGroup":["wall"]},{"v0":19,"v1":31,"curve":180,"color":"626262","cMask":["wall"],"cGroup":["wall"]},{"v0":32,"v1":33,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":34,"v1":35,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":34,"v1":36,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":37,"v1":38,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":40,"v1":41,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":42,"v1":43,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":43,"v1":44,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":45.33391918015176},{"v0":45,"v1":46,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":47,"v1":48,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":49,"v1":50,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":51,"v1":52,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":53,"v1":54,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":55,"v1":56,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":57,"v1":58,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":59,"v1":60,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":61,"v1":62,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":63,"v1":64,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":65,"v1":66,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":67,"v1":68,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{},"arc":{"a":[-3.160793923255983,-42.26693570575047],"b":[23.85882621501726,-42.10809020229207],"radius":null,"center":[null,null],"from":null,"to":null}}},{"v0":69,"v1":70,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":71,"v1":72,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{},"arc":{"a":[-2.946245715851926,-44.207199958117776],"b":[24.073374422421317,-44.048354454659375],"radius":null,"center":[null,null],"from":null,"to":null}}},{"v0":73,"v1":74,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":75,"v1":76,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":77,"v1":78,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":45.33391918015176},{"v0":79,"v1":80,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":45.33391918015176},{"v0":81,"v1":82,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":83,"v1":84,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":85,"v1":86,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":88,"v1":89,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":90,"v1":91,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":92,"v1":93,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":98,"v1":99,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":100,"v1":101,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":102,"v1":103,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":104,"v1":105,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":106,"v1":107,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":106,"v1":108,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":109,"v1":110,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":112,"v1":113,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":114,"v1":115,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":115,"v1":116,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":45.33391918015176},{"v0":117,"v1":118,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":119,"v1":120,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":121,"v1":122,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":125,"v1":126,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":127,"v1":128,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":129,"v1":130,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":131,"v1":132,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":133,"v1":134,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":135,"v1":136,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":137,"v1":138,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":139,"v1":140,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{},"arc":{"a":[-8.20215093832082,-42.26693570575047],"b":[18.817469199952424,-42.10809020229207],"radius":null,"center":[null,null],"from":null,"to":null}}},{"v0":141,"v1":142,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":143,"v1":144,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"_data":{"mirror":{},"arc":{"a":[-7.9876027309167625,-44.207199958117776],"b":[19.03201740735648,-44.048354454659375],"radius":null,"center":[null,null],"from":null,"to":null}}},{"v0":145,"v1":146,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":147,"v1":148,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":149,"v1":150,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":45.33391918015176},{"v0":151,"v1":152,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":45.33391918015176},{"v0":153,"v1":154,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":155,"v1":156,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":157,"v1":158,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":160,"v1":161,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":162,"v1":163,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":164,"v1":165,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":170,"v1":171,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":172,"v1":173,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":80,"v1":148,"color":"ffffff","cMask":["wall"],"cGroup":["wall"]},{"v0":176,"v1":177,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"y":42}],"planes":[{"normal":[0,1],"dist":-230,"bCoef":0,"_data":{"extremes":{"normal":[0,1],"dist":-230,"canvas_rect":[-1651.0297475714392,-536.7697609817459,1652.880677781721,536.7697609817459],"a":[-1651.0297475714392,-230],"b":[1652.880677781721,-230]}}},{"normal":[0,-1],"dist":-230,"bCoef":0,"_data":{"extremes":{"normal":[0,-1],"dist":-230,"canvas_rect":[-1651.0297475714392,-536.7697609817459,1652.880677781721,536.7697609817459],"a":[-1651.0297475714392,230],"b":[1652.880677781721,230]}}},{"normal":[1,0],"dist":-480,"bCoef":0,"_data":{"extremes":{"normal":[1,0],"dist":-480,"canvas_rect":[-1651.0297475714392,-536.7697609817459,1652.880677781721,536.7697609817459],"a":[-480,-536.7697609817459],"b":[-480,536.7697609817459]}}},{"normal":[-1,0],"dist":-480,"bCoef":0,"_data":{"extremes":{"normal":[-1,0],"dist":-480,"canvas_rect":[-1651.0297475714392,-536.7697609817459,1652.880677781721,536.7697609817459],"a":[480,-536.7697609817459],"b":[480,536.7697609817459]}}}],"goals":[{"p0":[-407.9,60],"p1":[-407.9,-60],"team":"red"},{"p0":[407.9,60],"p1":[407.9,-60],"team":"blue"}],"discs":[{"radius":5.4,"invMass":0,"pos":[-400,-60],"color":"ffffff"},{"radius":5.4,"invMass":0,"pos":[-400,60],"color":"ffffff"},{"radius":5.4,"invMass":0,"pos":[400,-60],"color":"ffffff"},{"radius":5.4,"invMass":0,"pos":[400,60],"color":"ffffff"},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false}],"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.2},"ballPhysics":{"radius":5.8,"invMass":1.55,"pos":[0,0],"color":"FFF26D","bCoef":0.412,"cGroup":["ball","kick","score"]},"traits":{},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false}';
const STADIUM_3v3 = '{"name": "lỏ | 3v3","width": 800,"height": 350,"spawnDistance": 350,"bg": {"type": "hockey","width": 700,"height": 320,"kickOffRadius": 100,"cornerRadius": 0,"color": "6D925C"},"vertexes": [{"x": 701,"y": 320,"trait": "ballArea"},{"x": 698,"y": -317,"trait": "ballArea"},{"x": 0,"y": 100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 180},{"x": 0,"y": -100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 180},{"x": 0,"y": -349,"trait": "kickOffBarrier"},{"x": -701,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,-80],"p0": [-707.25,0]},{"x": -740,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,-80],"p0": [-707.25,0]},{"x": -740,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,80],"p0": [-707.25,0]},{"x": -701,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,80],"p0": [-707.25,0]},{"x": 699,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,-80]},{"x": 740,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,-80]},{"x": 740,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,80]},{"x": 699,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,80]},{"x": -700,"y": 80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8","pos": [-700,80],"p0": [-707.25,0]},{"x": -700,"y": 321,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8"},{"x": -700,"y": -80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8","pos": [-700,-80],"p0": [-707.25,0]},{"x": -700,"y": -319,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8"},{"x": -700,"y": 320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF"},{"x": 701,"y": 320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF"},{"x": 700,"y": 80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","pos": [700,80]},{"x": 700,"y": 320,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea"},{"x": 700,"y": -317,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8"},{"x": 700,"y": -80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8","pos": [700,-80]},{"x": 698,"y": -317,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea"},{"x": 698,"y": -317,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea"},{"x": -701,"y": -320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"color": "FFFFFF"},{"x": 698,"y": -320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"color": "FFFFFF"},{"x": 0,"y": -319,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": -100,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": 100,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": 320,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": -100,"bCoef": 0.1,"cMask": ["red","blue"],"trait": "kickOffBarrier","vis": true,"color": "F8F8F8"},{"x": 0,"y": -100,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": -180},{"x": 0,"y": -100,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 0},{"x": -706.3571428571429,"y": 77.95238095238096,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false,"pos": [-700,80],"p0": [-707.25,0]},{"x": -706.3571428571429,"y": 318.95238095238096,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false},{"x": -706.3571428571429,"y": -320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0},{"x": -706.3571428571429,"y": -81,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0,"pos": [-700,-80],"p0": [-707.25,0]},{"x": 708.2619047619047,"y": -319.0476190476191,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0},{"x": 708.2619047619047,"y": -82.0476190476191,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0,"pos": [700,-80]},{"x": 707.2619047619047,"y": 81.04761904761904,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false,"pos": [700,80]},{"x": 707.2619047619047,"y": 321.04761904761904,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false},{"x": 0,"y": -100,"bCoef": 0.1,"trait": "line"},{"x": -700,"y": -80,"bCoef": 0.1,"trait": "line","p0": [-707.25,0],"color": "ff9494"},{"x": -700,"y": 80,"bCoef": 0.1,"trait": "line","p0": [-707.25,0],"color": "ff9494"},{"x": 700,"y": -80,"bCoef": 0.1,"trait": "line","color": "a3baff"},{"x": 700,"y": 80,"bCoef": 0.1,"trait": "line","color": "a3baff"},{"x": -700,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -470,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -700,"y": 307,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": -686,"y": 320,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": -700,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -470,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -700,"y": -305,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": -687,"y": -320,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": 700,"y": -303,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": 684,"y": -320,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": 700,"y": 306,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": 687,"y": 320,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": 700,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 700,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -514,"y": 0.5555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -1.4444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": 2.5555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -3.4444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -2.4444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": 1.5555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -3.9444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": 3.0555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -0.11111111111110983,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -2.11111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": 1.8888888888888902,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -4.11111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -3.11111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": 0.8888888888888902,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -4.61111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": 2.38888888888889,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 703,"y": -319,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","vis": false,"curve": 0},{"x": 703,"y": -82,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","pos": [700,-80],"vis": false,"curve": 0},{"x": 703,"y": 81,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","pos": [700,80],"vis": false,"curve": 0,"color": "FFFFFF"},{"x": 703,"y": 321,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0,"color": "FFFFFF"},{"x": -703,"y": 78,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","pos": [-700,80],"vis": false,"p0": [-707.25,0]},{"x": -703,"y": 319,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","vis": false},{"x": -703,"y": -82,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","pos": [-700,-80],"vis": false,"p0": [-707.25,0]},{"x": -703,"y": -321,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","vis": false},{"x": 0,"y": 100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": 0,"y": -100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": 0,"y": 100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": 0,"y": -100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": -0.13291470434327612,"y": 100,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -0.13291470434327612,"y": -100.36002093144947,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 0,"y": 99.04761904761905,"trait": "kickOffBarrier"},{"x": 0,"y": 350,"bCoef": 0.15,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 180},{"x": -699.4653214422947,"y": 168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -594.9755404186691,"y": 168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -699.4653214422947,"y": -168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -594.9755404186691,"y": -168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 700.7870182057165,"y": 167.8781102469103,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 594.954218584181,"y": 167.8781102469103,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 700.7870182057165,"y": -169.57560788560852,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 594.954218584181,"y": -169.57560788560852,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -470.00000000000006,"y": 120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": -100},{"x": -470.00000000000006,"y": -120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": -100},{"x": 469.9999999999995,"y": 120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 100},{"x": 469.9999999999995,"y": -120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 100}],"segments": [{"v0": 5,"v1": 6,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [-700,-80],"y": -80,"p0": [-707.25,0]},{"v0": 6,"v1": 7,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","x": -740,"p0": [-707.25,0]},{"v0": 7,"v1": 8,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [-700,80],"y": 80,"p0": [-707.25,0]},{"v0": 9,"v1": 10,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [700,-80],"y": -80},{"v0": 10,"v1": 11,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","x": 740},{"v0": 11,"v1": 12,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [700,80],"y": 80},{"v0": 2,"v1": 3,"curve": 180,"vis": true,"color": "F8F8F8","bCoef": 0.15,"cGroup": ["blueKO"],"trait": "kickOffBarrier"},{"v0": 2,"v1": 3,"curve": -180,"vis": true,"color": "F8F8F8","bCoef": 0.15,"cGroup": ["redKO"],"trait": "kickOffBarrier"},{"v0": 3,"v1": 4,"trait": "kickOffBarrier"},{"v0": 13,"v1": 14,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": -700},{"v0": 15,"v1": 16,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": -700},{"v0": 17,"v1": 18,"vis": true,"color": "FFFFFF","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","y": 320},{"v0": 19,"v1": 20,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": 700},{"v0": 21,"v1": 22,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": 700},{"v0": 23,"v1": 24,"vis": true,"color": "F8F8F8","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": 550,"y": -240},{"v0": 25,"v1": 26,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","y": -320},{"v0": 27,"v1": 28,"vis": true,"color": "FFFFFF","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier"},{"v0": 29,"v1": 30,"vis": true,"color": "FFFFFF","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier"},{"v0": 34,"v1": 35,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": -707.5},{"v0": 36,"v1": 37,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": -707.5},{"v0": 38,"v1": 39,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": 707.5},{"v0": 40,"v1": 41,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": 707.5},{"v0": 43,"v1": 44,"curve": 0,"vis": true,"color": "ff9494","bCoef": 0.1,"trait": "line","x": -700,"p0": [-707.25,0]},{"v0": 45,"v1": 46,"curve": 0,"vis": true,"color": "a3baff","bCoef": 0.1,"trait": "line","x": 700},{"v0": 47,"v1": 48,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 50,"v1": 49,"curve": -90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 51,"v1": 52,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 48,"v1": 52,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 54,"v1": 53,"curve": 90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 56,"v1": 55,"curve": -90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 58,"v1": 57,"curve": 90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 59,"v1": 60,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 61,"v1": 62,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 63,"v1": 64,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 470},{"v0": 66,"v1": 65,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 65,"v1": 66,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 68,"v1": 67,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 67,"v1": 68,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 70,"v1": 69,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 69,"v1": 70,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 72,"v1": 71,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 71,"v1": 72,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 74,"v1": 73,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 73,"v1": 74,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 76,"v1": 75,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 75,"v1": 76,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 78,"v1": 77,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 77,"v1": 78,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 80,"v1": 79,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 79,"v1": 80,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 81,"v1": 82,"curve": 0,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": 703},{"v0": 83,"v1": 84,"curve": 0,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": 703},{"v0": 85,"v1": 86,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": -703},{"v0": 87,"v1": 88,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": -703},{"v0": 89,"v1": 90,"curve": -180,"vis": true,"color": "FFFFFF","bCoef": 0.15,"cGroup": ["redKO"],"trait": "kickOffBarrier"},{"v0": 91,"v1": 92,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.15,"cGroup": ["blueKO"],"trait": "kickOffBarrier"},{"v0": 95,"v1": 96,"trait": "kickOffBarrier"},{"v0": 97,"v1": 98,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 99,"v1": 100,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 98,"v1": 100,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 101,"v1": 102,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 103,"v1": 104,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 102,"v1": 104,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 105,"v1": 106,"curve": -100,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 107,"v1": 108,"curve": 100,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470}],"goals": [{"p0": [-706.25,-75],"p1": [-706.25,80],"team": "red"},{"p0": [706.25,80],"p1": [706.25,-80],"team": "blue"}],"discs": [{"radius": 5,"pos": [-700,80],"color": "FFFFFF","trait": "goalPost","y": 80,"p0": [-707.25,0]},{"radius": 5,"pos": [-700,-80],"color": "FFFFFF","trait": "goalPost","y": -80,"x": -560,"p0": [-707.25,0]},{"radius": 5,"pos": [700,80],"color": "FFFFFF","trait": "goalPost","y": 80},{"radius": 5,"pos": [700,-80],"color": "FFFFFF","trait": "goalPost","y": -80},{"radius": 3,"invMass": 0,"pos": [-700,320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 3,"invMass": 0,"pos": [-700,-320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 3,"invMass": 0,"pos": [700,-320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 3,"invMass": 0,"pos": [700,320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false}],"planes": [{"normal": [0,1],"dist": -320,"bCoef": 1,"trait": "ballArea","vis": false,"curve": 0,"_data": {"extremes": {"normal": [0,1],"dist": -320,"canvas_rect": [-800,-350,10006,10006],"a": [-800,-320],"b": [10006,-320]}}},{"normal": [0,-1],"dist": -320,"bCoef": 1,"trait": "ballArea","_data": {"extremes": {"normal": [0,-1],"dist": -320,"canvas_rect": [-800,-350,10006,10006],"a": [-800,320],"b": [10006,320]}}},{"normal": [0,1],"dist": -350,"bCoef": 0.1,"_data": {"extremes": {"normal": [0,1],"dist": -350,"canvas_rect": [-800,-350,10006,10006],"a": [-800,-350],"b": [10006,-350]}}},{"normal": [0,-1],"dist": -350,"bCoef": 0.1,"_data": {"extremes": {"normal": [0,-1],"dist": -350,"canvas_rect": [-800,-350,10006,10006],"a": [-800,350],"b": [10006,350]}}},{"normal": [1,0],"dist": -760,"bCoef": 0.1,"_data": {"extremes": {"normal": [1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [-760,-350],"b": [-760,10006]}}},{"normal": [-1,0],"dist": -760,"bCoef": 0.1,"_data": {"extremes": {"normal": [-1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [760,-350],"b": [760,10006]}}},{"normal": [1,0],"dist": -760,"bCoef": 0.1,"trait": "ballArea","vis": false,"curve": 0,"_data": {"extremes": {"normal": [1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [-760,-350],"b": [-760,10006]}}},{"normal": [-1,0],"dist": -760,"bCoef": 0.1,"trait": "ballArea","vis": false,"curve": 0,"_data": {"extremes": {"normal": [-1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [760,-350],"b": [760,10006]}}}],"traits": {"ballArea": {"vis": false,"bCoef": 1,"cMask": ["ball"]},"goalPost": {"radius": 8,"invMass": 0,"bCoef": 0.5},"goalNet": {"vis": true,"bCoef": 0.1,"cMask": ["all"]},"line": {"vis": true,"bCoef": 0.1,"cMask": [""]},"kickOffBarrier": {"vis": false,"bCoef": 0.1,"cGroup": ["redKO","blueKO"],"cMask": ["red","blue"]}},"playerPhysics": {"bCoef": 0,"acceleration": 0.11,"kickingAcceleration": 0.083,"kickStrength": 4.4},"ballPhysics": {"radius": 5.8,"bCoef": 0.412,"invMass": 1.5,"color": "BDFF80"},"joints": [],"redSpawnPoints": [[-200,0],[-200,-80],[-200,80]],"blueSpawnPoints": [[200,0],[200,-80],[200,80]],"cameraWidth": 0,"cameraHeight": 0,"maxViewWidth": 0,"cameraFollow": "ball","canBeStored": false,"kickOffReset": "partial"}';
const STADIUM = '{"name": "lỏ | Stadium","width": 900,"height": 400,"spawnDistance": 400,"bg": {"type": "grass","width": 800,"height": 350,"kickOffRadius": 95,"cornerRadius": 0,"color": "718B5B"},"vertexes": [{"x": -800,"y": 350,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"color": "ffffff","curve": 0,"vis": false},{"x": -800,"y": 100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": -30,"curve": 0,"vis": false,"color": "ffffff"},{"x": -800,"y": -100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 0,"curve": 0,"vis": true,"color": "ffffff"},{"x": -800,"y": -350,"bCoef": 0.95,"cMask": ["ball"],"trait": "ballArea","bias": -30,"color": "ffffff","curve": 0,"vis": false},{"x": 800,"y": 350,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"color": "ffffff","curve": 0,"vis": false},{"x": 800,"y": 100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 0,"curve": 0,"color": "ffffff","vis": false},{"x": 800,"y": -100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 30,"curve": 0,"color": "ffffff"},{"x": 800,"y": -350,"bCoef": 0.95,"cMask": ["ball"],"trait": "ballArea","bias": -30,"color": "ffffff","curve": 0,"vis": false},{"x": 0,"y": 404,"trait": "kickOffBarrier"},{"x": 0,"y": 95,"trait": "line","color": "ffffff"},{"x": 0,"y": -95,"trait": "line","color": "ffffff"},{"x": 0,"y": -404,"trait": "kickOffBarrier"},{"x": -835,"y": -100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": 835,"y": -100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": -835,"y": 100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": 835,"y": 100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": 0,"y": 95,"trait": "kickOffBarrier","curve": 180,"color": "ffffff"},{"x": 0,"y": -95,"trait": "kickOffBarrier","curve": 180,"color": "ffffff"},{"x": 800,"y": -100,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"bias": -30,"vis": false},{"x": 0,"y": 350,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "ffffff"},{"x": 0,"y": -350,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "ffffff"},{"x": -45,"y": -25,"bCoef": 0,"trait": "line"},{"x": -30,"y": -25,"bCoef": 0,"trait": "line"},{"x": -30,"y": 10,"bCoef": 0,"trait": "line"},{"x": -10,"y": 10,"bCoef": 0,"trait": "line"},{"x": -10,"y": 25,"bCoef": 0,"trait": "line"},{"x": -45,"y": 25,"bCoef": 0,"trait": "line"},{"x": 10,"y": -25,"bCoef": 0,"trait": "line"},{"x": 45,"y": -25,"bCoef": 0,"trait": "line"},{"x": 45,"y": 25,"bCoef": 0,"trait": "line"},{"x": 10,"y": 25,"bCoef": 0,"trait": "line"},{"x": 22,"y": -12,"bCoef": 0,"trait": "line"},{"x": 33,"y": -12,"bCoef": 0,"trait": "line"},{"x": 33,"y": 12,"bCoef": 0,"trait": "line"},{"x": 22,"y": 12,"bCoef": 0,"trait": "line"},{"x": 26.14449016918153,"y": -41,"bCoef": 0,"trait": "line","color": "ffffff","_data": {"mirror": {}}},{"x": 35.43832241020169,"y": -41.73215465122187,"bCoef": 0,"trait": "line","color": "ffffff","_data": {"mirror": {}}},{"x": 27.474013107757965,"y": -31.504851902657116,"bCoef": 0,"trait": "line","color": "ffffff","_data": {"mirror": {}}},{"x": 0,"y": 0,"bCoef": 0,"trait": "line","vis": false},{"x": 0,"y": 0,"bCoef": 0,"trait": "line","vis": false},{"x": 800,"y": 225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 800,"y": -225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 560,"y": -225,"bCoef": 0,"trait": "line","curve": 0,"color": "ffffff"},{"x": 560,"y": 225,"bCoef": 0,"trait": "line","curve": 0,"color": "ffffff"},{"x": 560,"y": 95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": 560,"y": -95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": -560,"y": -225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -560,"y": 225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -800,"y": 225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -800,"y": -225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -560,"y": 95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": -560,"y": -95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": -800,"y": 345,"bCoef": 0,"trait": "line","color": "ffffff","curve": 180,"vis": true},{"x": 795,"y": 350,"bCoef": 1,"trait": "line","curve": 0,"bias": 30},{"x": 800,"y": 345,"trait": "line","curve": 180},{"x": -800,"y": -345,"trait": "line","curve": -180},{"x": -795,"y": -350,"trait": "line","curve": -180},{"x": 795,"y": -350,"bCoef": 0.95,"trait": "line","curve": 0,"vis": false},{"x": 800,"y": -345,"trait": "line","curve": -180},{"x": -795,"y": 350,"bCoef": 0,"cMask": ["ball"],"trait": "line","vis": true,"color": "ffffff","curve": 180},{"x": -457.142857143,"y": -348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": -457.142857143,"y": 348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": 457.142857143,"y": -348,"bCoef": 0,"trait": "line"},{"x": 457.142857143,"y": 348,"bCoef": 0,"trait": "line"},{"x": -800,"y": -155,"trait": "line","color": "ffffff"},{"x": -700,"y": -155,"trait": "line","color": "ffffff"},{"x": -700,"y": 155,"trait": "line"},{"x": -800,"y": 155,"trait": "line"},{"x": -630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 700,"y": -155,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 700,"y": 155,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 800,"y": 155,"bCoef": 0,"trait": "line"},{"x": 800,"y": -155,"bCoef": 0,"trait": "line"},{"x": 630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -800,"y": -100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 0,"curve": 0,"vis": true,"color": "ffffff"},{"x": -800,"y": -350,"bCoef": 0.95,"cMask": ["ball"],"trait": "ballArea","bias": -30,"color": "ffffff","curve": 0,"vis": false},{"x": -457.142857143,"y": -348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": -457.142857143,"y": 348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": 457.142857143,"y": -348,"bCoef": 0,"trait": "line"},{"x": 457.142857143,"y": 348,"bCoef": 0,"trait": "line"},{"x": -490,"y": -450,"cGroup": ["c1"],"vis": false},{"x": -490,"y": 450,"cGroup": ["c1"],"vis": false},{"x": 490,"y": -450,"cGroup": ["c2"],"vis": false},{"x": 490,"y": 450,"cGroup": ["c2"],"vis": false}],"segments": [{"v0": 0,"v1": 1,"bCoef": 1,"trait": "ballArea","bias": -30},{"v0": 2,"v1": 3,"bCoef": 1,"trait": "ballArea","bias": -30},{"v0": 4,"v1": 5,"bCoef": 1,"trait": "ballArea","bias": 30},{"v0": 6,"v1": 7,"curve": 0,"bCoef": 1,"trait": "ballArea"},{"v0": 8,"v1": 9,"trait": "kickOffBarrier"},{"v0": 9,"v1": 10,"curve": 180,"cGroup": ["blueKO"],"trait": "kickOffBarrier"},{"v0": 9,"v1": 10,"curve": -180,"cGroup": ["redKO"],"trait": "kickOffBarrier"},{"v0": 10,"v1": 11,"trait": "kickOffBarrier"},{"v0": 2,"v1": 12,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["all"],"trait": "goalNet","y": -100},{"v0": 6,"v1": 13,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["all"],"trait": "goalNet","y": -100},{"v0": 1,"v1": 14,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["all"],"trait": "goalNet","y": 100},{"v0": 5,"v1": 15,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["all"],"trait": "goalNet","y": 100},{"v0": 1,"v1": 0,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"x": -800},{"v0": 5,"v1": 4,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30,"x": 800},{"v0": 2,"v1": 3,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30,"x": -800},{"v0": 6,"v1": 7,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"x": 800},{"v0": 10,"v1": 9,"curve": -180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 17,"v1": 16,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 2,"v1": 1,"curve": 0,"vis": true,"color": "ff9494","bCoef": 0,"trait": "line","x": -800},{"v0": 6,"v1": 5,"curve": 0,"vis": true,"color": "a3baff","bCoef": 0,"trait": "line","x": 795},{"v0": 17,"v1": 20,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier"},{"v0": 16,"v1": 19,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","x": 0},{"v0": 7,"v1": 3,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"y": -350},{"v0": 0,"v1": 4,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","y": 350},{"v0": 21,"v1": 22,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 22,"v1": 23,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 23,"v1": 24,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 24,"v1": 25,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 25,"v1": 26,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 26,"v1": 21,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 27,"v1": 28,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 28,"v1": 29,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 29,"v1": 30,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 30,"v1": 27,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 43,"v1": 40,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": 225},{"v0": 43,"v1": 42,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": 560},{"v0": 42,"v1": 41,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": -225},{"v0": 44,"v1": 45,"curve": 100,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": 560},{"v0": 48,"v1": 47,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": 225},{"v0": 47,"v1": 46,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": -560},{"v0": 46,"v1": 49,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": -225},{"v0": 51,"v1": 50,"curve": 100,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": -560},{"v0": 15,"v1": 13,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","x": 835},{"v0": 12,"v1": 14,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","x": -835},{"v0": 53,"v1": 54,"curve": 180,"color": "ffffff","trait": "line"},{"v0": 55,"v1": 56,"curve": -180,"color": "ffffff","trait": "line"},{"v0": 57,"v1": 58,"curve": -180,"color": "ffffff","trait": "line"},{"v0": 0,"v1": 4,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30},{"v0": 0,"v1": 53,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30},{"v0": 3,"v1": 57,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea"},{"v0": 3,"v1": 7,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30},{"v0": 7,"v1": 18,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30},{"v0": 4,"v1": 5,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 0},{"v0": 0,"v1": 1,"curve": 0,"vis": false,"color": "FFFFFF","bCoef": 1,"trait": "ballArea","bias": 0},{"v0": 3,"v1": 2,"curve": 0,"vis": false,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 0},{"v0": 52,"v1": 59,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","bias": 0},{"v0": 64,"v1": 65,"curve": 0,"vis": true,"color": "ffffff","trait": "line"},{"v0": 66,"v1": 67,"curve": 0,"vis": true,"color": "ffffff","trait": "line"},{"v0": 65,"v1": 66,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 68,"v1": 69,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 70,"v1": 71,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 72,"v1": 73,"color": "ffffff","bCoef": 0,"trait": "line","x": 710},{"v0": 73,"v1": 74,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 72,"v1": 75,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 76,"v1": 77,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": 642.5},{"v0": 78,"v1": 79,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 81,"v1": 80,"curve": 0,"vis": false,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 0},{"v0": 86,"v1": 87,"vis": false,"color": "eb387a","cMask": ["c1"]},{"v0": 88,"v1": 89,"vis": false,"color": "eb387a","cMask": ["c2"]},{"v0": 31,"v1": 32,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 32,"v1": 33,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 33,"v1": 34,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 34,"v1": 31,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 35,"v1": 36,"curve": 208.0275647476128,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","_data": {"mirror": {},"arc": {"a": [26.14449016918153,-41],"b": [35.43832241020169,-41.73215465122187],"curve": 208.0275647476128,"radius": 4.804301335717605,"center": [30.700039422357595,-42.525871005775045],"from": 2.81838982199157,"to": 0.16597045456351098}}},{"v0": 36,"v1": 37,"curve": 70.09948797392062,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","_data": {"mirror": {},"arc": {"a": [35.43832241020169,-41.73215465122187],"b": [27.474013107757965,-31.504851902657116],"curve": 70.09948797392062,"radius": 11.285777131053878,"center": [24.166594833963302,-42.29511370735805],"from": 0.04990287982944615,"to": 1.2733697489365303}}}],"goals": [{"p0": [-809.5,-99.5],"p1": [-809.5,99.5],"team": "red"},{"p0": [809.5,99.5],"p1": [809.5,-99.5],"team": "blue"}],"discs": [{"radius": 0,"pos": [-490,-350],"color": "ffffff","bCoef": 0,"cMask": ["c1"],"cGroup": ["none"],"trait": "line"},{"radius": 0,"pos": [-490,350],"color": "ffffff","bCoef": 0,"cMask": ["c1"],"cGroup": ["none"],"trait": "line"},{"radius": 0,"pos": [490,-350],"color": "ffffff","bCoef": 0,"cMask": ["c2"],"cGroup": ["none"],"trait": "line"},{"radius": 0,"pos": [490,350],"color": "ffffff","bCoef": 0,"cMask": ["c2"],"cGroup": ["none"],"trait": "line"},{"radius": 5.5,"pos": [-800,100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 5.5,"pos": [-800,-100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 5.5,"pos": [800,100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 5.5,"pos": [800,-100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false}],"planes": [{"normal": [0,1],"dist": -404,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [0,1],"dist": -404,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [-1133.7408,-404],"b": [12604.678272000001,-404]}}},{"normal": [0,-1],"dist": -404,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [0,-1],"dist": -404,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [-1133.7408,404],"b": [12604.678272000001,404]}}},{"normal": [1,0],"dist": -900,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [1,0],"dist": -900,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [-900,-508.92364800000007],"b": [-900,12604.678272000001]}}},{"normal": [-1,0],"dist": -900,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [-1,0],"dist": -900,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [900,-508.92364800000007],"b": [900,12604.678272000001]}}}],"traits": {"ballArea": {"vis": false,"bCoef": 1,"cMask": ["ball"]},"goalPost": {"radius": 8,"invMass": 0,"bCoef": 1},"goalNet": {"vis": true,"bCoef": 0.1,"cMask": ["all"]},"kickOffBarrier": {"vis": false,"bCoef": 0.1,"cGroup": ["redKO","blueKO"],"cMask": ["red","blue"]},"line": {"vis": true,"bCoef": 0,"cMask": [""]},"arco": {"radius": 2,"cMask": ["n/d"],"color": "cccccc"}},"playerPhysics": {"bCoef": 0,"acceleration": 0.11,"kickingAcceleration": 0.083,"kickStrength": 4.4},"ballPhysics": {"radius": 5.8,"bCoef": 0.412,"invMass": 1.5,"color": "BDFF80"},"joints": [{"d0": 1,"d1": 2,"strength": "rigid","color": "eb387a","length": null},{"d0": 3,"d1": 4,"strength": "rigid","color": "15bcd6","length": null}],"canBeStored": false,"redSpawnPoints": [[-400,0],[-400,50],[-400,-50],[-400,100],[-400,-100],[-400,380]],"blueSpawnPoints": [[400,0],[400,50],[400,-50],[400,100],[400,-100],[400,380]],"kickOffReset": "full"}';
const PENALTY_STADIUM = '{"name":"lỏ Stadium | PEN","width":420,"height":200,"spawnDistance":310,"bg":{"type":"grass","width":400,"height":260,"kickOffRadius":0,"cornerRadius":0,"color":"718B5B"},"vertexes":[{"x":323,"y":260,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30},{"x":323,"y":100,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30},{"x":323,"y":-100,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30},{"x":323,"y":-260,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30},{"x":370,"y":-100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","radius":0},{"x":370,"y":100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","radius":0},{"x":332,"y":-98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":323,"y":260,"bCoef":0,"trait":"line"},{"x":323,"y":-260,"bCoef":0,"trait":"line"},{"x":0,"y":-260,"bCoef":0,"trait":"line"},{"x":0,"y":260,"bCoef":0,"trait":"line"},{"x":323,"y":200,"bCoef":0,"trait":"line"},{"x":110,"y":200,"bCoef":0,"trait":"line"},{"x":110,"y":-200,"bCoef":0,"trait":"line"},{"x":323,"y":-200,"bCoef":0,"trait":"line"},{"x":0,"y":100,"bCoef":0,"trait":"line"},{"x":0,"y":-100,"bCoef":0,"trait":"line"},{"x":110,"y":5,"bCoef":0,"trait":"line"},{"x":110,"y":-5,"bCoef":0,"trait":"line"},{"x":55,"y":-260,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"x":65,"y":260,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"x":300,"y":-90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":365,"y":-90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":365,"y":90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":300,"y":90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":2,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet","y":-100},{"v0":1,"v1":5,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet","y":100},{"v0":1,"v1":0,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30,"x":665},{"v0":2,"v1":3,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30,"x":665},{"v0":2,"v1":1,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":7,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":9,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":9,"v1":8,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":11,"v1":12,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":12,"v1":13,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":13,"v1":14,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":15,"v1":16,"curve":150,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":18,"v1":17,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":17,"v1":18,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":5,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet"},{"v0":19,"v1":20,"curve":45,"vis":false,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"v0":21,"v1":22,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":22,"v1":23,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":23,"v1":24,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":24,"v1":21,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"}],"goals":[{"p0":[332,100],"p1":[332,-100],"team":"blue"},{"p0":[325,-100],"p1":[100,0],"team":"red"},{"p0":[100,0],"p1":[320,100],"team":"red"}],"discs":[{"radius":5.75,"color":"FFDEAD","bCoef":0.4,"invMass":1.4,"pos":[110,0],"cGroup":["ball","kick","score"]},{"pos":[323,100],"trait":"goalPost"},{"pos":[323,-100],"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-260,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,1],"dist":-260,"canvas_rect":[-710,-260,710,260],"a":[-710,-260],"b":[710,-260]}}},{"normal":[0,-1],"dist":-260,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-260,"canvas_rect":[-710,-260,710,260],"a":[-710,260],"b":[710,260]}}},{"normal":[1,0],"dist":-499,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[1,0],"dist":-499,"canvas_rect":[-710,-260,710,260],"a":[-499,-260],"b":[-499,260]}}},{"normal":[-1,0],"dist":-376,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[-1,0],"dist":-376,"canvas_rect":[-710,-260,710,260],"a":[376,-260],"b":[376,260]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":4.65,"invMass":0,"color":"C6D881","bCoef":1.25},"goalNet":{"vis":true,"bCoef":0.2,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n/d"],"color":"cccccc"},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]}},"playerPhysics":{"radius":14.5,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.655,"bCoef":0.25},"ballPhysics":"disc0","joints":[],"canBeStored":false,"redSpawnPoints":[[-100,0]],"blueSpawnPoints":[[323,0]],"kickOffReset":"full"}';
const DISCORD_LINK = "";
const COMMANDS_TO_VALIDATE = ["discord", "kickafk", "afk", "captains", "unmute", "clearmutes", "report"];
const INVISIBLE_CHARACTERS = ["	", "ㅤ"];
var logMsg = "";

class Setting {
  constructor(setting) {
    this.msgColor = "normal";
    this.sizeAdjustment = 0;
    if (setting !== null) {
      Object.assign(this, setting);
    };
  };
};
class Kick {
  constructor(ballProperties, byPlayer) {
    this.properties = ballProperties;
    this.player = byPlayer;
    this.time = room.getScores().time;

    let xOpponentGoal = (byPlayer.team == 1) ? stadium.goalLine.x : -stadium.goalLine.x;
    this.isAShot = (
      Math.abs(ballProperties.xspeed) + Math.abs(ballProperties.yspeed) > 1.5 && // ✅ Bỏ qua nếu bóng gần đứng yên
      (xOpponentGoal * ballProperties.xspeed > 0) &&
      (Math.abs(ballProperties.x + ballProperties.xspeed * 97.5) > stadium.goalLine.x) &&
      (Math.abs(ballProperties.y + ballProperties.yspeed * (xOpponentGoal - ballProperties.x) / ballProperties.xspeed) < stadium.goalLine.y)
    );
  }
};
class PlayerReport {
  constructor(player) {
    this.name = "";
    this.goals = 0;
    this.assists = 0;
    this.ownGoals = 0;
    this.cleansheets = 0;
    this.wins = 0;
    this.games = 0;
    this.motms = 0;
    this.points = 0;
    this.auth = null;
    if (player !== null) {
      Object.assign(this, player);
    };
  }
  getWinRate() {
    if (this.games == 0) return 0;
    return (this.wins / this.games * 100).toFixed(2);
  }
};
class PlayerStats {
  constructor(name) {
    this.name = name;
    this.goals = 0;
    this.assists = 0;
    this.ownGoals = 0;
    this.touches = 0;
    this.passes = 0;
    this.shotsOnTarget = 0;
    this.stoppedShots = 0;
    this.errorsLeadingToGoal = 0;
    this.attemptsLeadingToOG = 0;
    this.penaltiesScored = 0;
    this.penaltiesMissed = 0;
    this.meanPosition = 0;
    this.positionSum = 0;
    this.positionTicks = 0;
  }
  getPoints() {
    let points = 0;
    for (const [statName, value] of Object.entries(this)) {
      if (PLAYER_SCORING_RULES[statName] === undefined) continue;
      points += PLAYER_SCORING_RULES[statName] * value;
    };
    return points; // 🎯 Trả về điểm nguyên bản, không cộng thêm Bonus nữa
  }
};
class TeamStats {
  constructor() {
    this.substitutions = 0;
    this.possession = 0;
    this.players = {};
  }
  resetStats() {
    this.substitutions = 0;
    this.possession = 0;
    for (const playerId in this.players) {
      delete this.players[playerId];
    };
  }
};
class Penalty {
  constructor() {
    this.groups = [[], []];
    this.results = [[], []];
  }
  getTurn() {
    return this.results[0].length - this.results[1].length;
  }
  getPenaltyWinner() {
    if (this.results[0].length > 5) {
      if (this.results[0].length != this.results[1].length) return null;
      if (this.results[0].at(-1) == this.results[1].at(-1)) return null;
      return this.results[0].at(-1) ? 1 : 2;
    };

    if (this.results[0].filter(result => result).length > 5 - this.results[1].filter(result => !result).length) {
      return 1;
    } else if (this.results[1].filter(result => result).length > 5 - this.results[0].filter(result => !result).length) {
      return 2;
    };
    return null;
  }
  getPenaltyTakers() {
    let turn = this.getTurn();
    return [this.groups[turn].at(this.results[1].length % this.groups[turn].length), this.groups[turn ^ 1].at(-1)];
  }
  push(result) {
    this.results[this.getTurn()].push(result);
  }
  clear() {
    this.groups = [[], []];
    this.results = [[], []];
  }
};
class Game {
  constructor() {
    this.teams = {
      1: new TeamStats(),
      2: new TeamStats(),
    };
    this.penalty = new Penalty();
    this.ballRecords = [null, null, null];
  }
  getStats() {
    let stats = {
      possession: [50, 50],
      passes: [0, 0],
      shotsOnTarget: [0, 0],
    };
    if (this.teams[1].possession + this.teams[2].possession != 0) {
      stats.possession[0] = ~~(game.teams[1].possession / (game.teams[1].possession + game.teams[2].possession) * 100);
      stats.possession[1] = 100 - stats.possession[0];
    };
    for (let i = 0; i < 2; i++) {
      for (const player of Object.values(this.teams[i + 1].players)) {
        stats.passes[i] += player.passes;
        stats.shotsOnTarget[i] += player.shotsOnTarget;
      };
    };
    return stats;
  }
  resetBallRecords() {
    this.ballRecords = [null, null, null];
  }
  reset() {
    this.resetBallRecords();
    this.penalty.clear();
    this.teams[1].resetStats();
    this.teams[2].resetStats();
  }
};
class BallColor {
  constructor() {
    this.index = 0;
  }
  getColor() {
    this.index++;
    return BALL_COLORS[this.index % BALL_COLORS.length];
  }
}
class Surrender {
  constructor() {
    this.votes = [new Set, new Set];
  }
  surrender(teamId) {
    isPlaying = false;
    let scores = room.getScores();
    prevScore = `${scores.red}-${scores.blue}`;
    surrenderedTeam = teamId; // LƯU LẠI ID CỦA ĐỘI VỪA ĐẦU HÀNG
    handlePostGame(getOppositeTeamId(teamId));
    room.stopGame();
    room.sendAnnouncement(`🏴 Đội ${TEAM_NAMES[teamId]} đã xin chui háng`, null, 0x00FFFF, "small-italic", 0)
  }
  vote(player) {
    if (player.team == 0) return;
    if (isCaptain(player.id)) {
      this.surrender(player.team);
      return; // 🎯 VÁ LỖI: Thêm return để ngắt ngay lập tức, không in ra thông báo đếm phiếu thừa thãi nữa!
    }

    this.votes[player.team - 1].add(player.id);
    let count = 0;
    for (const voterId of this.votes[player.team - 1]) {
      let voter = room.getPlayer(voterId);
      if (voter && (voter.team == player.team)) count++;
    };
    room.sendAnnouncement(`${player.name} đã bỏ phiếu chui háng cho ${TEAM_NAMES[player.team]} (${count}/${MIN_VOTES_FOR_SURRENDER})`, null, GREEN, "small", 0);

    if (count >= MIN_VOTES_FOR_SURRENDER) this.surrender(player.team);
  }
  hasVoted(player) {
    if (player.team == 0) return false;
    return this.votes[player.team - 1].has(player.id);
  }
  reset() {
    this.votes.every((votes) => votes.clear());
  }
}

var commands = {
  help: [helpFunc, ["rand", "pick"], ROLE.PLAYER, false],
  discord: [discordFunc, ["rand", "pick"], ROLE.PLAYER, false],
  bye: [byeFunc, ["rand", "pick"], ROLE.PLAYER, false],
  stat: [showStatsFunc, ["rand", "pick"], ROLE.PLAYER, false],
  rank: [showRankingsFunc, ["rand", "pick"], ROLE.PLAYER, false],
  kickafk: [kickAfkFunc, ["rand", "pick"], ROLE.PLAYER, false],
  spec: [specFunc, ["rand", "pick"], ROLE.PLAYER, false],
  login: [loginFunc, ["rand", "pick"], ROLE.PLAYER, false],
  afk: [afkFunc, ["rand", "pick"], ROLE.PLAYER, false],
  afks: [showAfksFunc, ["rand", "pick"], ROLE.PLAYER, false],
  predict: [predictFunc, ["rand", "pick"], ROLE.PLAYER, false],
  captains: [listCaptainsFunc, ["pick"], ROLE.PLAYER, false],
  surrender: [surrenderFunc, ["pick"], ROLE.PLAYER, false],
  leavecap: [leaveCaptainFunc, ["pick"], ROLE.PLAYER, true],
  adjustsize: [adjustSizeFunc, ["rand", "pick"], ROLE.PLAYER, false],
  yellow: [yellowCardFunc, ["rand", "pick"], ROLE.ADMIN, false],
  clearyellow: [clearYellowCardFunc, ["rand", "pick"], ROLE.ADMIN, false],
  mute: [muteFunc, ["rand", "pick"], ROLE.ADMIN, false],
  unmute: [unmuteFunc, ["rand", "pick"], ROLE.ADMIN, false],
  clearmutes: [clearMutesFunc, ["rand", "pick"], ROLE.ADMIN, false],
  ban: [banFunc, ["rand", "pick"], ROLE.ADMIN, false],
  bans: [showBansFunc, ["rand", "pick"], ROLE.ADMIN, false],
  unban: [unbanFunc, ["rand", "pick"], ROLE.ADMIN, false],
  clearbans: [clearBansFunc, ["rand", "pick"], ROLE.ADMIN, false],
  lock: [lockFunc, ["rand", "pick"], ROLE.ADMIN, false],
  unlock: [unlockFunc, ["rand", "pick"], ROLE.ADMIN, false],
  assigncap: [assignCaptainFunc, ["pick"], ROLE.ADMIN, false],
  buff: [buffStarFunc, ["rand", "pick"], ROLE.SUPER_ADMIN, false],
  seteffect: [setEffectFunc, ["rand", "pick"], ROLE.PLAYER, false],
  effects: [listEffectsFunc, ["rand", "pick"], ROLE.PLAYER, false],
  testdiscord: [testDiscordFunc, ["rand", "pick"], ROLE.SUPER_ADMIN, false],
  top: [checkTopFunc, ["rand", "pick"], ROLE.PLAYER, false],
  resetday: [resetDayFunc, ["rand", "pick"], ROLE.SUPER_ADMIN, false],
  report: [reportFunc, ["rand", "pick"], ROLE.PLAYER, false], // Lệnh báo cáo lỗi room
  role: [roleFunc, ["rand", "pick"], ROLE.PLAYER, false], // Lệnh xem danh sách role
  clan: [clanFunc, ["rand", "pick"], ROLE.PLAYER, false],
  huongdan: [huongdanFunc, ["rand", "pick"], ROLE.PLAYER, false],
};
var identities = {};
var adminAuths = new Set();
var afkList = new Set([0]);
var muteList = new Set();
var banList = [];
var isPlaying = false;
var isPicking = false;
var isGameOver = false;
var isTakingPenalty = false;
var postGameHandled = false;
var isChatLocked = false;
var canPause = false;
var winningStreak = 0;
var prevWinner = 1;
var pickTurn = 0;
var pausedBy = 0;
var captains = { 1: 0, 2: 0 };
var kits = { red: null, blue: null };
var prevScore = null;
var predictions = {};
var warnings = {};
var lastMessages = [];
var game = new Game;
var surrenderVoter = new Surrender;
var stadium = {
  goalLine: { x: 0, y: 0 },
  ballRadius: 0,
  playerRadius: 0,
};
var timeouts = {
  toPick: null,
  toResume: null,
  toTakePenalty: null,
  toAct: {},
  toQuitAfk: {},
};
var selectedCaptain = null;
var quotes = [];
var currentStadium = null;
var ballColor = new BallColor();

var room = HBInit({
  roomName: ROOM_NAME,
  maxPlayers: 30,
  playerName: "BLV Niko Bellic",
  public: PUBLIC,
  geo: { "code": "VN", "lat": 21.0285, "lon": 105.8542 },
  token: window.HAXBALL_TOKEN // <--- SỬA LẠI ĐÚNG NHƯ THẾ NÀY
});

// ==========================================
// HỆ THỐNG CLAN (BANG HỘI)
// ==========================================
let clans = JSON.parse(localStorage.getItem("haxball_clans") || "{}");
let clanProposals = JSON.parse(localStorage.getItem("haxball_clan_proposals") || "{}");

function saveClans() {
  localStorage.setItem("haxball_clans", JSON.stringify(clans));
}
function saveClanProposals() {
  localStorage.setItem("haxball_clan_proposals", JSON.stringify(clanProposals));
}

var prevWinner = 1;
var surrenderedTeam = 0; // Biến lưu vết đội nào đã đầu hàng
// Giữ lại biến này vì có thể các tính năng khác (như check cày Elo) cần dùng
let leaversFromCurrentMatch = new Set();

// ===== Anti Defender Rank Script (Bản Tàng Hình Tối Ưu & Đẩy Lùi) =====
const MAX_CB_PLAYERS = 4; // Tối đa 4 người được lui về thủ

function checkCbLimit() {
  // Chỉ hoạt động khi trận đấu đang diễn ra
  if (typeof isPlaying !== 'undefined' && !isPlaying || MAX_CB_PLAYERS == 0) return;

  let redPlayers = room.getPlayerList().filter((player) => player.team == 1);
  let bluePlayers = room.getPlayerList().filter((player) => player.team == 2);
  if (redPlayers.length < 4 || bluePlayers.length < 4) return;

  const disc1 = room.getDiscProperties(1);
  const disc3 = room.getDiscProperties(3);
  if (!disc1 || !disc3) return;

  const redLimitX = disc1.x;
  const blueLimitX = disc3.x;

  let players = room.getPlayerList().filter((player) => player.team != 0);
  let redCount = 0, blueCount = 0;

  // TẠO CACHE: Lưu trước kích thước/thuộc tính của toàn bộ cầu thủ để tránh lag
  let pProps = {};
  players.forEach(p => {
    let props = room.getPlayerDiscProperties(p.id);
    if (props) pProps[p.id] = props;
  });

  // Đếm số người dùng size thực tế (radius)
  players.forEach(function (player) {
    let props = pProps[player.id];
    if (!props) return;
    let radius = props.radius; // Tự động lấy kích thước to/nhỏ của cầu thủ

    if (player.team == 1) {
      if (player.position.x - radius <= redLimitX - 0.1) ++redCount;
    } else if (player.team == 2) {
      if (player.position.x + radius >= blueLimitX + 0.1) ++blueCount;
    }
  });

  // Áp dụng cGroup cho Đội Đỏ
  players.forEach(function (player) {
    if (player.team == 2) return;
    let currentProps = pProps[player.id];
    if (!currentProps) return;
    let radius = currentProps.radius;

    let targetGroup = (redCount >= MAX_CB_PLAYERS && player.position.x - radius > redLimitX - 0.1) ? 536870914 : 2;
    if (currentProps.cGroup !== targetGroup) {
      room.setPlayerDiscProperties(player.id, { cGroup: targetGroup });
    }
  });

  // Đẩy khớp nối tường Đội Đỏ (Disc 2)
  if (redCount >= MAX_CB_PLAYERS) {
    if (room.getDiscProperties(2) && room.getDiscProperties(2).y != 350) room.setDiscProperties(2, { y: 350 });
  } else {
    if (room.getDiscProperties(2) && room.getDiscProperties(2).y != -350) room.setDiscProperties(2, { y: -350 });
  }

  // Áp dụng cGroup cho Đội Xanh
  players.forEach(function (player) {
    if (player.team == 1) return;
    let currentProps = pProps[player.id];
    if (!currentProps) return;
    let radius = currentProps.radius;

    let targetGroup = (blueCount >= MAX_CB_PLAYERS && player.position.x + radius < blueLimitX + 0.1) ? 1073741828 : 4;
    if (currentProps.cGroup !== targetGroup) {
      room.setPlayerDiscProperties(player.id, { cGroup: targetGroup });
    }
  });

  // Đẩy khớp nối tường Đội Xanh (Disc 4)
  if (blueCount >= MAX_CB_PLAYERS) {
    if (room.getDiscProperties(4) && room.getDiscProperties(4).y != 350) room.setDiscProperties(4, { y: 350 });
  } else {
    if (room.getDiscProperties(4) && room.getDiscProperties(4).y != -350) room.setDiscProperties(4, { y: -350 });
  }
}


let tickCounter = 0;

room.onGameTick = function () {
  if (!isPlaying) return;

  // =========================================================================
  // ⚡ MỨC 1: HỆ THỐNG ANTI-CB (CHỐNG LÙI SÂU MỚI DỰA VÀO MAP)
  // =========================================================================
  if (typeof checkCbLimit === "function") {
    checkCbLimit();
  }

  tickCounter++;
  // Reset bộ đếm để tránh tràn RAM khi cắm máy lâu ngày
  if (tickCounter >= 60) tickCounter = 0;

  // =========================================================================
  // ⚡ MỨC 2: CẬP NHẬT ANTI-GHOST & CHỐNG KICK OAN AFK (Chạy đúng 1 lần/giây)
  // =========================================================================
  if (tickCounter === 0) {
    // 🛡️ LỆNH MIỄN TỬ: Liên tục xóa án tích AFK nếu đang đá 1v1 hoặc Training
    // Giúp anh em đứng im cả ngày trong map này cũng không bị Bot đá ra ngoài!
    if (stadium && stadium.name && (stadium.name.includes("1v1") || stadium.name.includes("training"))) {
      if (typeof clearAfkRecords === "function") clearAfkRecords();
    }

    let players = room.getPlayerList();
    for (let i = 0; i < players.length; i++) {
      let p = players[i];
      if (p.team === 0) continue;

      let props = room.getPlayerDiscProperties(p.id);

      // 🛡️ ANTI-GHOST: Chỉ đảm bảo cMask luôn có bit 1 (chạm được Bóng)
      // (Đã xóa phần ép cGroup cũ để không bị "đánh nhau" với hàm checkCbLimit mới)
      if (props && (props.cMask & 1) === 0) {
        room.setPlayerDiscProperties(p.id, {
          cMask: props.cMask | 1
        });
      }
    }
  }
};
// ==========================================================
// 🎯 MÁY QUÉT TÌM THỦ MÔN SIÊU NHẸ (1 GIÂY QUÉT 1 LẦN)
// ==========================================================
setInterval(() => {
  // Chỉ quét khi bóng đang lăn
  if (!isPlaying) return;

  let players = room.getPlayerList();
  for (let i = 0; i < players.length; i++) {
    let p = players[i];

    // Bỏ qua khán giả hoặc người chưa load xong nhân vật
    if (p.team === 0 || !p.position) continue;

    let pStats = getGameStats(p);

    // Lấy mẫu tọa độ X cộng dồn lại để cuối trận tính trung bình
    pStats.positionSum = (pStats.positionSum || 0) + p.position.x;
    pStats.positionTicks = (pStats.positionTicks || 0) + 1;
    pStats.meanPosition = pStats.positionSum / pStats.positionTicks;
  }
}, 1000); // 1000 mili-giây = 1 giây quét 1 lần
function getVotesNeeded() {
  if (!stadium || !stadium.name) return 6; // Đề phòng lỗi chưa tải map
  if (stadium.name.includes("1v1")) return 2;
  if (stadium.name.includes("3v3")) return 3;
  return 6; // Các map còn lại (5v5...)
}

function setEffectFunc(value, player) {
  let auth = getAuth(player.id);
  if (!auth) return false;

  let stats = getStats(auth);
  let points = stats.points || 0;

  // 🛑 CHỐT CHẶN: Dưới 200 sao không được tự đổi hiệu ứng
  if (points < 200) {
    room.sendAnnouncement(`❌ Tính năng tự do chọn Hiệu ứng chỉ dành cho Cao thủ 200★ trở lên! (Hiện tại: ${points}★)`, player.id, 0xFF4444, "bold", 1);
    return false;
  }

  if (!value || value.trim() === "") {
    room.sendAnnouncement("💡 HƯỚNG DẪN: Gõ !seteffect <số> (Dùng lệnh !effects để xem danh sách)", player.id, 0x00FFFF, "bold", 1);
    return false;
  }

  if (value.toLowerCase() === "random") {
    stats.effectId = -1;
    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));
    room.sendAnnouncement("Đã đặt hiệu ứng ghi bàn của bạn về: NGẪU NHIÊN 🎲", player.id, GREEN);
    return false;
  }

  let effectId = parseInt(value);
  if (isNaN(effectId) || effectId < 0 || effectId >= EFFECT_NAMES.length) {
    room.sendAnnouncement(`Vui lòng nhập ID từ 0 đến ${EFFECT_NAMES.length - 1}, hoặc 'random'. Gõ !effects để xem danh sách.`, player.id, RED);
    return false;
  }

  stats.effectId = effectId;
  delete stats.auth;
  localStorage.setItem(auth, JSON.stringify(stats));

  let effectName = EFFECT_NAMES[effectId];
  room.sendAnnouncement(`✨ Đã cài hiệu ứng ăn mừng của bạn là: [${effectId}] ${effectName.toUpperCase()}!`, player.id, GREEN, "bold", 2);

  return false;
}

function listEffectsFunc(value, player) {
  let auth = getAuth(player.id);
  if (!auth) return false;

  let stats = getStats(auth);
  let points = stats.points || 0;

  // 🛑 CHỐT CHẶN: Dưới 200 sao không được xem danh sách
  if (points < 200) {
    if (points >= 50) {
      room.sendAnnouncement(`❌ Bạn cần 200★ để mở khóa Kho Hiệu Ứng! (Hiện tại: ${points}★)\n💡 Do đã đạt mốc 50★, Bot đã tặng bạn 1 hiệu ứng cố định bí mật. Hãy ghi bàn để xem nhé!`, player.id, 0xFF4444, "bold", 1);
    } else {
      room.sendAnnouncement(`❌ Bạn cần 200★ để mở khóa Kho Hiệu Ứng! (Hiện tại: ${points}★)\n💡 Hãy cày lên 50★ để được Bot tặng 1 hiệu ứng ngẫu nhiên.`, player.id, 0xFF4444, "bold", 1);
    }
    return false;
  }

  room.sendAnnouncement("DANH SÁCH HIỆU ỨNG GHI BÀN (Dùng !seteffect <số> để chọn):", player.id, YELLOW, "bold", 0);

  let listMsg = "";
  for (let i = 0; i < EFFECT_NAMES.length; i++) {
    listMsg += `[${i}] ${EFFECT_NAMES[i]}    `;
    // Cứ 3 hiệu ứng thì xuống dòng cho dễ nhìn
    if ((i + 1) % 3 === 0) listMsg += "\n";
  }

  room.sendAnnouncement(listMsg, player.id, 0x00FFFF, "small-bold", 0);
  return false;
}


room.setTeamsLock(1);
room.setKickRateLimit(6, 0, 0);
loadStadium("training").then(_ => { room.startGame() });
setInterval(randomAnnouncement, NOTIFICATION_INTERVAL * 1000);
setInterval(randomGameStat, 2.5 * 60 * 1000);
if (MODE == "pick") setInterval(showSpecTable.bind(null), 5 * 1000);

// THÔNG BÁO NHẮC NHỞ ANTI-TOXIC & NỘI QUY (Lặp lại mỗi 5 phút)
setInterval(() => {
  room.sendAnnouncement("🥰Room lỏ nhưng cầu thủ thì không. Vui lòng anh em thi đấu hết mình và tôn trọng đối thủ.", null, 0x00FFFF, "small-bold", 0);

  // Gửi thêm dòng cảnh báo nội quy ngay sau đó 5 giây
  setTimeout(() => {
    room.sendAnnouncement("⚠️ CẢNH BÁO: Nghiêm cấm mọi hành vi toxic, xúc phạm người chơi hoặc phá game. Vi phạm sẽ bị cấm vĩnh viễn (Ban) không cần báo trước.", null, 0xFF4444, "small-bold", 0);
  }, 5000);
}, 5 * 60 * 1000); // Lưu ý: 5 * 60 * 1000 mới là 5 phút, 3000 là 15 phút nhé. Nếu muốn 5 phút thì đổi số 3000 thành 1000.

// 🚨 NHẮC NHỞ LỆNH BÁO CÁO LỖI ROOM (Mỗi 24 phút)
setInterval(() => {
  room.sendAnnouncement(
    "🚨 [BÁO CÁO LỖI ROOM] Nếu room bị lỗi (bug, lag, lỏ, v.v...) hãy dùng lệnh:",
    null, 0xFF6600, "bold", 0
  );
  setTimeout(() => {
    room.sendAnnouncement(
      "👉 !report [mô tả lỗi]   —   Ví dụ: !report room bị lỏ không đá được",
      null, 0xFFFF00, "small-bold", 0
    );
  }, 2000);
  setTimeout(() => {
    room.sendAnnouncement(
      "📨 Bot sẽ tự động tag Admin trên Discord để xử lý ngay. Cảm ơn anh em! 🙏",
      null, 0x00FF99, "small", 0
    );
  }, 4000);
}, 24 * 60 * 1000); // Nhắc nhở mỗi 24 phút

updateMetadata();


async function loadStadium(name) {
  if ((isTakingPenalty && (name != "penalty")) || (name == currentStadium)) return;
  let _stadium = {
    "penalty": [PENALTY_STADIUM, 0, 0],
    "5v5": [STADIUM, SCORE_LIMIT, TIME_LIMIT],
    "3v3": [STADIUM_3v3, 5, 5],
    "1v1": [STADIUM_1v1, 5, 5],
    "training": [STADIUM_TRAINING, 0, 0],
  }[name];

  let wasPlaying = !!room.getScores();
  let oldStadium = currentStadium;

  room.stopGame();

  // Load nguyên bản chuỗi JSON của map
  room.setCustomStadium(_stadium[0]);
  room.setScoreLimit(_stadium[1]);
  room.setTimeLimit(_stadium[2]);

  currentStadium = name;
  stadium.name = name;

  // Phân tích Stadium mới để lấy thông số phục vụ cho logic của Bot
  let parsedStadium = JSON.parse(_stadium[0]);
  if (parsedStadium.goals && parsedStadium.goals.length != 0) {
    stadium.goalLine.x = Math.abs(parsedStadium.goals[0].p0[0]);
    stadium.goalLine.y = Math.abs(parsedStadium.goals[0].p0[1]);
  };
  stadium.ballRadius = (parsedStadium.ballPhysics && parsedStadium.ballPhysics.radius) || 10;
  stadium.playerRadius = (parsedStadium.playerPhysics && parsedStadium.playerPhysics.radius) || 15;

  if (name === "training") {
    isPicking = false;
    room.startGame();
  } else if (wasPlaying && !isPicking && name !== "penalty") {

    // 🎯 LIÊN THÔNG BẢN ĐỒ TOÀN DIỆN: Đưa cả "training" vào danh sách để tự động luân chuyển
    let playingMaps = ["training", "1v1", "3v3", "5v5"];

    if (playingMaps.includes(oldStadium) && playingMaps.includes(name)) {

      // 🎯 CHIẾN THUẬT TIỀN TRẢM HẬU TẤU: Cân bằng đội hình TRƯỚC khi Start Game
      let players = room.getPlayerList().filter(p => !afkList.has(p.id));
      let redTeam = players.filter(p => p.team === 1);
      let blueTeam = players.filter(p => p.team === 2);
      let specs = players.filter(p => p.team === 0);

      let baseMax = (name === "5v5") ? 5 : (name === "3v3") ? 3 : (name === "1v1") ? 2 : 5;
      let currentMax = Math.min(baseMax, Math.floor(players.length / 2));

      // 1. Cắt bớt người thừa đẩy ra Spec
      while (redTeam.length > currentMax) { let p = redTeam.pop(); room.setPlayerTeam(p.id, 0); specs.push(p); }
      while (blueTeam.length > currentMax) { let p = blueTeam.pop(); room.setPlayerTeam(p.id, 0); specs.push(p); }

      // 2. Bù người thiếu từ Spec vào sân
      while ((redTeam.length < currentMax || blueTeam.length < currentMax) && specs.length > 0) {
        let targetTeam = (redTeam.length <= blueTeam.length) ? 1 : 2;
        let p = specs.shift();
        room.setPlayerTeam(p.id, targetTeam);
        if (targetTeam === 1) redTeam.push(p); else blueTeam.push(p);
      }

      // 3. Xử lý đội hình lệch (nếu số lượng bị lẻ)
      while (redTeam.length - blueTeam.length >= 2) {
        let p = redTeam.pop();
        room.setPlayerTeam(p.id, 2);
        blueTeam.push(p);
      }
      while (blueTeam.length - redTeam.length >= 2) {
        let p = blueTeam.pop();
        room.setPlayerTeam(p.id, 1);
        redTeam.push(p);
      }

      // MỌI THỨ ĐÃ SẴN SÀNG -> BẤM NÚT START ĐỂ TẤT CẢ XUẤT HIỆN CÙNG LÚC!
      room.startGame();
    }

  }
}
// 🎯 HỆ THỐNG LUÂN CHUYỂN MAP TỰ ĐỘNG (ĐÃ FIX XUNG ĐỘT PAUSE PICK)

function getPlayerStats() {
  let playerList = [];
  for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.length != 43) continue;
    playerList.push(new PlayerReport({ ...JSON.parse(localStorage.getItem(key)), auth: key }));
  };
  return playerList;
}


async function randomAnnouncement() {
  let msg;
  switch (getRandomInt(2)) {
    case 0:
      msg = "🔔 Mã nguồn được viết bởi shelld3v (Discord). Mã nguồn: https://github.com/shelld3v/haxball-host";
      break;
    default:
      try {
        (quotes.length == 0) && await fetch("https://api.quotable.io/quotes/random?limit=50", { method: "GET" })
          .then(response => response.json())
          .then(json => quotes = json.map(quote => `"${quote.content}" - ${quote.author}`));
      } catch (error) {
        return;
      };
      msg = quotes.pop();
  }
  room.sendAnnouncement(msg, null, YELLOW, "small-italic", 0);
  sendLogWebhook(logMsg);
  logMsg = "";
}

function randomGameStat() {
  let scores = room.getScores();
  if ((scores == null) || (scores.time < 60)) return;
  let fact;
  try {
    switch (getRandomInt(5)) {
      case 0:
        fact = `Kiểm soát bóng: 🟥 ${game.getStats().possession.map(possession => possession + "%").join(" - ")} 🟦`;
        break;
      case 1:
        let passes = game.getStats().passes;
        if (passes[0] + passes[1] == 0) return;
        fact = `Lượt chuyền bóng: 🟥 ${passes.join(" - ")} 🟦`;
        break;
      case 2:
        fact = `Sút trúng đích: 🟥 ${game.getStats().shotsOnTarget.join(" - ")} 🟦`;
        break;
      case 3:
        if (winningStreak < 3) return;
        fact = `Chuỗi bất bại của ${TEAM_NAMES[prevWinner]}: ${winningStreak}`;
        break;
      case 4:
        let topPasser = new PlayerStats();
        for (let teamId = 1; teamId < 3; teamId++) {
          for (const stats of Object.values(game.teams[teamId].players)) {
            if (stats.passes <= topPasser.passes) continue;
            topPasser = stats;
          };
        };
        if (topPasser.passes == 0) return;
        fact = `Thực hiện nhiều đường chuyền nhất: ${topPasser.name} (${topPasser.passes} đường chuyền)`;
    };
    room.sendAnnouncement(`⏩⏩    ${fact}    ⏪⏪`, null, 0xCF9FFF, "small-bold");
  } catch (e) { }
}

function updateMetadata() {
  let month = new Date().getMonth() + 1;
  let lastPlayedMonth = localStorage.getItem("last_played_month");
  lastPlayedMonth || (lastPlayedMonth = month);
  localStorage.getItem("starting_month") || localStorage.setItem("starting_month", lastPlayedMonth);

  if (month != lastPlayedMonth) {
    // Tự động chốt sổ, thông báo thống kê tháng cũ và reset sang tháng mới
    resetStorage();
  }

  localStorage.setItem("last_played_month", month);
}
setInterval(updateMetadata, 60000);

function resetStorage() {
  // 🎯 1. Tự động quét LocalStorage lấy dữ liệu cầu thủ
  let playerList = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key && key.length === 43) {
      let item = JSON.parse(localStorage.getItem(key));
      item.auth = key;
      playerList.push(item);
    }
  }

  let topPlayers = [...playerList].sort(function (p1, p2) {
    if (p1.points == p2.points) return (p2.goals || 0) + (p2.assists || 0) - (p1.goals || 0) - (p1.assists || 0);
    return (p2.points || 0) - (p1.points || 0);
  }).slice(0, 5);

  let topScorers = [...playerList].sort(function (p1, p2) {
    if (p1.goals == p2.goals) return (p2.assists || 0) - (p1.assists || 0);
    return (p2.goals || 0) - (p1.goals || 0);
  }).slice(0, 5);

  let topAssisters = [...playerList].sort(function (p1, p2) {
    if (p1.assists == p2.assists) return (p2.goals || 0) - (p1.goals || 0);
    return (p2.assists || 0) - (p1.assists || 0);
  }).slice(0, 5);

  let topMOTMs = [...playerList].sort(function (p1, p2) {
    if (p1.motms == p2.motms) return ((p2.goals || 0) + (p2.assists || 0)) - ((p1.goals || 0) + (p1.assists || 0));
    return (p2.motms || 0) - (p1.motms || 0);
  }).slice(0, 5);

  let topGoalkeepers = [...playerList].sort((p1, p2) => (p2.cleansheets || 0) - (p1.cleansheets || 0)).slice(0, 5);
  let topOwnGoalScorers = [...playerList].sort((p1, p2) => (p2.ownGoals || 0) - (p1.ownGoals || 0)).slice(0, 5);

  let eligiblePlayers = playerList.filter(p => (p.games || 0) >= 5);
  if (eligiblePlayers.length === 0) eligiblePlayers = playerList;

  const getFairRank = (list, key, value) => list.findIndex(x => (x[key] || 0) === (value || 0)) + 1;
  let rGoals = [...eligiblePlayers].sort((a, b) => (b.goals || 0) - (a.goals || 0));
  let rAssists = [...eligiblePlayers].sort((a, b) => (b.assists || 0) - (a.assists || 0));
  let rMotms = [...eligiblePlayers].sort((a, b) => (b.motms || 0) - (a.motms || 0));
  let rPoints = [...eligiblePlayers].sort((a, b) => (b.points || 0) - (a.points || 0));
  let rClean = [...eligiblePlayers].sort((a, b) => (b.cleansheets || 0) - (a.cleansheets || 0));

  eligiblePlayers.forEach(p => {
    p.avgRank = (getFairRank(rGoals, 'goals', p.goals) +
      getFairRank(rAssists, 'assists', p.assists) +
      getFairRank(rMotms, 'motms', p.motms) +
      getFairRank(rPoints, 'points', p.points) +
      getFairRank(rClean, 'cleansheets', p.cleansheets)) / 5;
  });

  eligiblePlayers.sort((a, b) => a.avgRank - b.avgRank);
  let top3MVP = eligiblePlayers.slice(0, 3);

  let winnersAuth = {};
  if (top3MVP[0]) winnersAuth[1] = top3MVP[0].auth;
  if (top3MVP[1]) winnersAuth[2] = top3MVP[1].auth;
  if (top3MVP[2]) winnersAuth[3] = top3MVP[2].auth;
  localStorage.setItem("last_month_winners", JSON.stringify(winnersAuth));

  // =========================================================
  // 🏰 2. TỔNG KẾT MÙA GIẢI CLAN & TRAO CÚP (SEASON RESET)
  // =========================================================
  let monthStr = getMonths();
  let clanTags = Object.keys(clans);

  // Lọc ra các Clan có tối thiểu 5 thành viên để xếp hạng nhận Cúp
  let eligibleClans = clanTags.map(tag => ({ tag: tag, data: clans[tag] }))
    .filter(c => c.data.members.length >= 5 && (c.data.elo || 1000) >= 1000)
    .sort((a, b) => (b.data.elo || 1000) - (a.data.elo || 1000));

  if (eligibleClans.length > 0) {
    if (eligibleClans[0]) {
      eligibleClans[0].data.trophies = eligibleClans[0].data.trophies || [];
      eligibleClans[0].data.trophies.push(`🏆 Quán Quân Tháng ${monthStr}`);
    }
    if (eligibleClans[1]) {
      eligibleClans[1].data.trophies = eligibleClans[1].data.trophies || [];
      eligibleClans[1].data.trophies.push(`🥈 Á Quân Tháng ${monthStr}`);
    }
    if (eligibleClans[2]) {
      eligibleClans[2].data.trophies = eligibleClans[2].data.trophies || [];
      eligibleClans[2].data.trophies.push(`🥉 Quý Quân Tháng ${monthStr}`);
    }
  }

  let topClanMsg = eligibleClans.slice(0, 3).map((c, i) => `${["🥇", "🥈", "🥉"][i]} [${c.data.icon || ""}${c.tag}] ${c.data.name} (Elo: ${c.data.elo || 1000})`).join("\n");

  // Reset toàn bộ Elo của tất cả các Clan về 1000 để bắt đầu mùa giải mới
  for (let tag in clans) {
    clans[tag].elo = 1000;
  }
  saveClans();

  // =========================================================
  // 📢 3. THÔNG BÁO ROOM & DISCORD
  // =========================================================

  // Thông báo Bang Hội
  room.sendAnnouncement(`🎊 TỔNG KẾT MÙA GIẢI CLAN THÁNG ${monthStr} 🎊`, null, 0x00FFFF, "bold", 2);
  if (topClanMsg) {
    room.sendAnnouncement(topClanMsg, null, 0xFFFFFF, "bold", 1);
  } else {
    room.sendAnnouncement("Chưa có Clan nào đủ điều kiện nhận cúp mùa này.", null, 0xAAAAAA, "italic", 1);
  }

  // Thông báo Cá nhân
  let msg = `Danh sách vua bú liếm tháng ${monthStr}:\n\n${topScorers.map((player, index) => `${index + 1}. ${player.name} - ${player.goals} bàn thắng (${player.assists} kiến tạo)`).join("\n")}`;
  room.sendAnnouncement(msg, null, BLUE, "small-bold", 0);

  room.sendAnnouncement(`🎉 TỔNG KẾT THÁNG ${monthStr} - DANH SÁCH MVP TOÀN DIỆN 🎉`, null, 0xFFD700, "bold", 2);
  if (top3MVP[0]) room.sendAnnouncement(`🥇 1st: ${top3MVP[0].name} (Được thưởng 50★ làm vốn tháng sau)`, null, 0xFFFF00, "bold", 1);
  if (top3MVP[1]) room.sendAnnouncement(`🥈 2nd: ${top3MVP[1].name} (Được thưởng 30★ làm vốn tháng sau)`, null, 0xC0C0C0, "bold", 1);
  if (top3MVP[2]) room.sendAnnouncement(`🥉 3rd: ${top3MVP[2].name} (Được thưởng 15★ làm vốn tháng sau)`, null, 0xCD7F32, "bold", 1);

  let discordFields = [
    {
      name: `🏰 TOP CLAN XUẤT SẮC NHẤT THÁNG`,
      value: `============================\n\n*${topClanMsg || "_Không có Clan nào đủ điều kiện_"}*`,
    },
    {
      name: "👑 TOP 3 MVP TOÀN DIỆN NHẤT THÁNG",
      value: `============================\n\n*${top3MVP.map((p, index) => `${["🥇", "🥈", "🥉"][index]} ${p.name} (Hạng TB: Top ${p.avgRank.toFixed(1)}) - Nhận lương sao!`).join("\n")}*`,
    },
    {
      name: "Cầu thủ xuất sắc nhất",
      value: `============================\n\n*${topPlayers.map((player, index) => `${index + 1}. ${player.name} - ${player.points} sao`).join("\n")}*`,
    },
    {
      name: "Vua bú liếm",
      value: `============================\n\n*${topScorers.map((player, index) => `${index + 1}. ${player.name} - ${player.goals} bàn thắng`).join("\n")}*`,
    },
    {
      name: "Vua kiến tạo",
      value: `============================\n\n*${topAssisters.map((player, index) => `${index + 1}. ${player.name} - ${player.assists} kiến tạo`).join("\n")}*`,
    },
    {
      name: "Cầu thủ nhiều MOTM nhất",
      value: `============================\n\n*${topMOTMs.map((player, index) => `${index + 1}. ${player.name} - ${player.motms} lần nhận MOTM`).join("\n")}*`,
    },
    {
      name: "Vua thủ môn",
      value: `============================\n\n*${topGoalkeepers.map((player, index) => `${index + 1}. ${player.name} - ${player.cleansheets} trận sạch lưới`).join("\n")}*`,
    },
    {
      name: "NGU nhất",
      value: `============================\n\n*${topOwnGoalScorers.map((player, index) => `${index + 1}. ${player.name} - ${player.ownGoals} bàn phản lưới nhà`).join("\n")}*`,
    }
  ];
  if (typeof sendWebhook === "function") sendWebhook(`✨ Số liệu thống kê trong tháng ${monthStr}`, null, discordFields);

  // =========================================================
  // 🧹 4. DỌN DẸP DỮ LIỆU & PHÁT LƯƠNG SAO CÁ NHÂN (ĐÃ VÁ LỖI)
  // =========================================================
  let rewards = [50, 30, 15];
  let top3Auths = top3MVP.map(p => p.auth);

  for (let i = 0; i < localStorage.length; i++) {
    let k = localStorage.key(i);
    if (k && k.length === 43) {
      let pStats = JSON.parse(localStorage.getItem(k));

      // Tạo hồ sơ mới (Reset số liệu) nhưng GIỮ LẠI các dữ liệu vĩnh viễn
      let newStats = {
        name: pStats.name,
        goals: 0,
        assists: 0,
        ownGoals: 0,
        games: 0,
        wins: 0,
        motms: 0,
        cleansheets: 0,
        points: 0, // Reset điểm về 0

        // 🛡️ DỮ LIỆU VĨNH VIỄN KHÔNG BỊ RESET:
        clan: pStats.clan,
        lastClanProposalDate: pStats.lastClanProposalDate,
        customRole: pStats.customRole,
        customColor: pStats.customColor,
        useClanColor: pStats.useClanColor,
        effectId: pStats.effectId
      };

      // Trả thưởng Sao khởi nghiệp cho Top 3 MVP
      let mvpIndex = top3Auths.indexOf(k);
      if (mvpIndex !== -1) {
        newStats.points = rewards[mvpIndex];
      }

      localStorage.setItem(k, JSON.stringify(newStats));
    }
  }

  localStorage.setItem("starting_month", new Date().getMonth() + 1);
}

function getMonths() {
  let starting_month = localStorage.getItem("starting_month");
  let ending_month = localStorage.getItem("last_played_month");
  if (starting_month != ending_month) return `${starting_month}-${ending_month}`;
  return starting_month;
}

function getTag(name) {
  return "@" + name.replace(/ /g, "_");
}

// Tính độ dài chuỗi bằng thuật toán nội suy (Cực nhẹ, RAM tốn 0 MB)
function getDisplayLength(string) {
  let len = 0;
  for (let i = 0; i < string.length; i++) {
    // Ký tự thường tính 1, ký tự Kanji/Emoji/Có dấu tính 1.8
    len += string.charCodeAt(i) > 255 ? 1.8 : 1;
  }
  return Math.round(len);
}

function getRandomInt(rangeEnd) {
  return Math.floor(Math.random() * rangeEnd);
}

function randomChoice(array) {
  return array[getRandomInt(array.length)];
}

function convertToMeters(value) {
  return ~~(value / 37);
}

function getDistance(x, y) {
  return Math.sqrt(x ** 2 + y ** 2);
}

function getOppositeTeamId(id) {
  return (id == 1) ? 2 : (id == 2) ? 1 : 0;
}
async function sendLogWebhook(msg) {
  if (!DISCORD_LOG_WEBHOOK || msg.length == 0) return;
  try {
    await fetch(DISCORD_LOG_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({ content: `\`\`\`${msg}\`\`\`` }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return;
  };
}

// Gửi thông báo và File Replay lên Discord
async function sendWebhook(title, content, fields, attachments) {
  if (!DISCORD_WEBHOOK) return;
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({
        embeds: [{
          color: 1752220,
          title: title,
          description: content,
          fields: fields,
        }],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Lỗi gửi text webhook: ", error);
    return;
  };

  if (!attachments) return;

  for (let i = 0; i < attachments.length; i++) {
    let attachment = attachments[i];
    if (!attachment[1]) continue;

    let form = new FormData();
    form.append(`files[${i}]`, new Blob([attachment[1]]), attachment[0]);

    // ĐÃ THÊM TRY...CATCH BẢO VỆ CHỐNG SẬP ROOM
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        body: form,
      });
    } catch (error) {
      console.error("Mạng lag, gửi file Replay thất bại nhưng room vẫn an toàn!", error);
    }
  };
}

function log(msg) {
  console.log(msg);
  if (!DISCORD_LOG_WEBHOOK) return;
  logMsg += msg + "\n";
}

function reorderPlayers() {
  room.reorderPlayers(Array.from(afkList), false);
}

function getAuth(id) {
  if (identities[id] === undefined) return null; // Nếu không tìm thấy ID (như ID 0 của Bot) thì trả về null thay vì sập
  return identities[id][0];
}

function getConn(id) {
  return identities[id][1];
}

function getRole(player) {
  return player.admin ? ROLE.SUPER_ADMIN : adminAuths.has(getAuth(player.id)) ? ROLE.ADMIN : ROLE.PLAYER;
}

function getSetting(id) {
  return new Setting(JSON.parse(localStorage.getItem(`setting_${getAuth(id)}`)));
}

function saveSetting(id, setting) {
  localStorage.setItem(`setting_${getAuth(id)}`, JSON.stringify(setting));
}

function getStats(auth) {
  return new PlayerReport(JSON.parse(localStorage.getItem(auth)));
}

function getGameStats(player, team) {
  if (identities[player.id] === undefined) return new PlayerStats();
  let auth = getAuth(player.id);

  // 🎯 BỊT LỖ HỔNG NHÂN BẢN 2 BẢNG ĐIỂM
  // Bắt buộc lưu chỉ số vào đội gốc 120p, bất kể lúc luân lưu bị hệ thống kéo đi đâu
  try {
    if (isTakingPenalty && game.penalty) {
      if (game.penalty.groups[0].includes(player.id)) team = 1;
      else if (game.penalty.groups[1].includes(player.id)) team = 2;
      else team = team || player.team;
    } else {
      team = team || player.team;
    }

    if (game.teams[team].players[auth] === undefined) {
      game.teams[team].players[auth] = new PlayerStats(player.name);
    };
    return game.teams[team].players[auth];
  } catch (e) {
    return new PlayerStats(player.name);
  }
}

function getPlayerByName(value) {
  if (!value) return null;
  if (value.startsWith("@")) {
    return room.getPlayerList().find(player => getTag(player.name) == value);
  };
  value = value.toLowerCase();
  return room.getPlayerList().find(player => player.name.toLowerCase().includes(value));
}

function getNonAfkPlayers() {
  return room.getPlayerList().filter(player => !afkList.has(player.id));
}

function getSpectators() {
  return room.getPlayerList().filter(player => (player.team == 0) && !afkList.has(player.id));
}

function getPlayerByPos(number) {
  return getNonAfkPlayers().filter(player => player.team == 0)[number - 1];
}

function getMotm() {
  let participantsCount = Object.keys(game.teams[1].players).length + Object.keys(game.teams[2].players).length;
  // Thay MAX_PLAYERS thành MIN_PLAYERS_FOR_STATS để 8 người vẫn được tính MOTM
  if (participantsCount < MIN_PLAYERS_FOR_STATS * 2) return [null, new PlayerStats("")];
  let motm;
  let highestPoints = Number.NEGATIVE_INFINITY;
  for (let teamId = 1; teamId < 3; teamId++) {
    for (const [auth, stats] of Object.entries(game.teams[teamId].players)) {
      let points = 0;
      for (const [statName, value] of Object.entries(stats)) {
        if (PLAYER_SCORING_RULES[statName] === undefined) continue;
        points += PLAYER_SCORING_RULES[statName] * value;
      };
      if (teamId == prevWinner) points++;
      if ((points > highestPoints) || ((points == highestPoints) && (stats.touches > motm[1].touches))) {
        highestPoints = points;
        motm = [auth, stats];
      };
    };
  };
  return motm;
}

function getPredictionWinners() {
  return (predictions[prevScore] || []).reduce(function (players, id) {
    if (afkList.has(id)) return players;
    let player = room.getPlayer(id);
    (player !== null) && (player.team !== prevWinner) && players.push(player);
    return players;
  }, []);
}

function getBestSpectatorByStats() {
  let bestPlayer = null;
  let highest = -1;
  for (const player of getSpectators()) {
    let stats = getStats(getAuth(player.id));
    if (stats.points < highest) continue;
    bestPlayer = player;
    highest = stats.points;
  };
  return bestPlayer;
}

function isCaptain(id) {
  return Object.values(captains).includes(id);
}

function resizePlayer(id) {
  let setting = getSetting(id);
  let baseRadius = stadium.playerRadius || 15; // Lấy kích thước chuẩn
  // Bắt buộc reset lại kích thước về mặc định (có cộng thêm size của VIP nếu có)
  room.setPlayerDiscProperties(id, { radius: baseRadius + (+setting.sizeAdjustment) });
}

function resizePlayers() {
  for (const player of room.getPlayerList()) {
    if (player.team == 0) continue;
    resizePlayer(player.id);
  };
}

function setRandomColors() {
  let randomIndex;
  do {
    randomIndex = getRandomInt(TEAM_COLORS.length);
  } while (colorHistory.includes(randomIndex));

  colorHistory.push(randomIndex);
  if (colorHistory.length > HISTORY_LIMIT) colorHistory.shift();

  let colors = TEAM_COLORS[randomIndex];

  kits.red = colors[0];
  kits.blue = colors[1];

  room.setTeamColors(1, ...colors[0]);
  room.setTeamColors(2, ...colors[1]);

  // --- THÔNG BÁO TỐI GIẢN (KHÔNG DELAY) ---
  if (stadium.name === "5v5") {
    let colorString = JSON.stringify(colors);
    let special = SPECIAL_MATCHES[colorString];
    let normal = NORMAL_MATCHES[colorString];

    if (special) {
      room.sendAnnouncement(`${special.icon} SPECIAL MATCH: ${special.name} ${special.icon}`, null, special.color, "bold", 2);
    } else if (normal) {
      room.sendAnnouncement(`${normal.icon} Chủ đề trận đấu: ${normal.name} ${normal.icon}`, null, 0x00FFFF, "bold", 1);
    } else {
      room.sendAnnouncement("⚽ Trận đấu bắt đầu. Đề nghị anh em thi đấu fair-play!", null, 0x00FFFF, "bold", 1);
    }
  } else {
    // Không phải 5v5
    room.sendAnnouncement("⚽ Trận đấu bắt đầu. Đề nghị anh em thi đấu fair-play!", null, 0x00FFFF, "bold", 1);
  }
}
function huongdanFunc(value, player) {
  let msg = `📖 CẨM NANG HƯỚNG DẪN HỆ THỐNG CLAN:\n👉 Truy cập ngay: https://huongdanhethongclan.netlify.app/`;
  // Gửi thông báo riêng cho người gõ lệnh với màu Xanh Cyan nổi bật
  room.sendAnnouncement(msg, player.id, 0x00FFFF, "bold", 2);
  return false;
}
function clanFunc(value, player) {
  let auth = getAuth(player.id);
  if (!auth) return false;
  let stats = getStats(auth);

  let role = getRole(player);
  let isAdmin = (role === ROLE.ADMIN || role === ROLE.SUPER_ADMIN);

  // 🛡️ TỰ ĐỘNG CHỮA LÀNH (AUTO-HEAL): Xóa Tag Clan ảo cho MỌI LỆNH nếu Clan đã bị giải tán
  if (stats.clan && !clans[stats.clan]) {
    let ghostClan = stats.clan;
    stats.clan = null;
    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));
    room.sendAnnouncement(`✨ Hệ thống đã tự động gỡ bỏ Tag Clan ảo [${ghostClan}] bị kẹt trong hồ sơ của bạn!`, player.id, 0x00FF00, "bold", 1);
  }

  if (!value || value.trim() === "") {
    let msg = `🛡️ HỆ THỐNG CLAN (Gõ !huongdan để xem chi tiết trên Web):\n` +
      `🌎 Chung: !clan list | info <Tag> | top | members | join | leave | propose | togglecolor\n` +
      `👑 Quản lý: !clan requests | accept | kick | promote | demote | transfer\n` +
      `🎨 Tùy chỉnh (>=5 TV): !clan rival | unrival | setcolor | rename | seticon | retag`;

    if (isAdmin) {
      msg += `\n👮 Admin: !clan proposals | approve | reject | create | delete | setleader`;
    }

    room.sendAnnouncement(msg, player.id, 0x00FFFF, "small-bold", 1);
    return false;
  }

  let parts = value.trim().split(" ");
  let cmd = parts[0].toLowerCase();
  let param = parts.slice(1).join(" ");
  let paramUpper = param.toUpperCase();

  // ==========================================
  // 📥 HỆ THỐNG ĐỀ XUẤT CLAN (TẤT CẢ & ADMIN)
  // ==========================================
  if (cmd === "propose") {
    if (stats.clan) { room.sendAnnouncement("❌ Bạn đã có Clan, không thể đề xuất tạo Clan mới!", player.id, 0xFF4444); return false; }

    let today = new Date().toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    if (stats.lastClanProposalDate === today) {
      room.sendAnnouncement("❌ Bạn đã hết lượt! Mỗi người chỉ được đề xuất tạo Clan 1 lần/ngày.", player.id, 0xFF4444, "bold", 1);
      return false;
    }

    let firstSpace = param.indexOf(" ");
    if (firstSpace === -1) { room.sendAnnouncement("❌ Cú pháp: !clan propose <Tag 1-3 ký tự> <Tên Đầy Đủ>. VD: !clan propose MU Manchester United", player.id, 0xFF4444); return false; }

    let tag = param.substring(0, firstSpace).toUpperCase();
    let fullName = param.substring(firstSpace + 1).trim();

    if (tag.length < 1 || tag.length > 3) { room.sendAnnouncement("❌ Tag viết tắt chỉ được từ 1 đến 3 ký tự!", player.id, 0xFF4444); return false; }
    if (clans[tag]) { room.sendAnnouncement("❌ Tag Clan này đã tồn tại!", player.id, 0xFF4444); return false; }
    if (clanProposals[tag]) { room.sendAnnouncement("❌ Đã có người đề xuất Tag này rồi, hãy chờ Admin duyệt!", player.id, 0xFF4444); return false; }

    let existingProposal = Object.values(clanProposals).find(p => p.auth === auth);
    if (existingProposal) { room.sendAnnouncement(`❌ Bạn đang có đề xuất Clan [${existingProposal.tag}] chờ duyệt. Xin hãy chờ kết quả!`, player.id, 0xFF4444); return false; }

    clanProposals[tag] = { tag: tag, name: fullName, auth: auth, playerName: player.name };
    saveClanProposals();

    stats.lastClanProposalDate = today;
    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));

    room.sendAnnouncement(`✅ Đã gửi đơn đề xuất lập Clan [${tag}] - ${fullName}. Hãy báo Admin duyệt nhé!`, player.id, 0x00FF00, "bold", 2);

    for (let p of room.getPlayerList()) {
      if (getRole(p) === ROLE.ADMIN || getRole(p) === ROLE.SUPER_ADMIN) {
        room.sendAnnouncement(`🔔 CÓ ĐỀ XUẤT CLAN MỚI: [${tag}] từ ${player.name}. Gõ '!clan proposals' để xem.`, p.id, 0xFFD700, "bold", 2);
      }
    }
    return false;
  }

  if (cmd === "proposals") {
    if (!isAdmin) { room.sendAnnouncement("❌ Chỉ Admin mới có quyền xem danh sách đề xuất!", player.id, 0xFF4444); return false; }
    let tags = Object.keys(clanProposals);
    if (tags.length === 0) { room.sendAnnouncement("Hiện không có đơn xin lập Clan nào.", player.id, 0xFFA500); return false; }

    let listMsg = "📝 DANH SÁCH ĐỀ XUẤT LẬP CLAN:\n" + tags.map(t => `- [${t}] ${clanProposals[t].name} (Bởi: ${clanProposals[t].playerName})`).join("\n");
    listMsg += "\n👉 Dùng '!clan approve <Tag>' để lập Clan hoặc '!clan reject <Tag>' để hủy đơn.";
    room.sendAnnouncement(listMsg, player.id, 0x00FFFF, "small-bold", 1);
    return false;
  }

  if (cmd === "approve") {
    if (!isAdmin) { room.sendAnnouncement("❌ Chỉ Admin mới có quyền duyệt Clan!", player.id, 0xFF4444); return false; }
    if (!paramUpper || !clanProposals[paramUpper]) { room.sendAnnouncement("❌ Đề xuất không tồn tại!", player.id, 0xFF4444); return false; }

    let prop = clanProposals[paramUpper];
    let tag = prop.tag;

    if (clans[tag]) {
      delete clanProposals[tag]; saveClanProposals();
      room.sendAnnouncement(`❌ Clan [${tag}] đã được tạo từ trước. Đơn đề xuất tự động hủy.`, player.id, 0xFF4444);
      return false;
    }

    let proposerStats = getStats(prop.auth);
    if (proposerStats.clan && clans[proposerStats.clan]) {
      let oldClan = clans[proposerStats.clan];
      oldClan.members = oldClan.members.filter(a => a !== prop.auth);
      oldClan.coleaders = oldClan.coleaders.filter(a => a !== prop.auth);
      if (oldClan.leader === prop.auth) oldClan.leader = null;
    }

    clans[tag] = {
      name: prop.name, tag: tag, icon: "🔰", color: 0xFFFFFF,
      leader: prop.auth, coleaders: [], members: [prop.auth], requests: [],
      elo: 1000, stats: { games: 0, wins: 0, goals: 0 }, lastActive: Date.now(),
      level: 1, exp: 0, rivals: [], rivalRequests: [], trophies: []
    };
    saveClans();

    proposerStats.clan = tag;
    delete proposerStats.auth;
    localStorage.setItem(prop.auth, JSON.stringify(proposerStats));

    delete clanProposals[tag]; saveClanProposals();
    room.sendAnnouncement(`🎉 ADMIN VỪA PHÊ DUYỆT: Clan [${tag}] - ${prop.name} đã chính thức được thành lập! Leader: ${prop.playerName}.`, null, 0x00FF00, "bold", 2);
    return false;
  }

  if (cmd === "reject") {
    if (!isAdmin) { room.sendAnnouncement("❌ Chỉ Admin mới có quyền xóa đề xuất!", player.id, 0xFF4444); return false; }
    if (!paramUpper || !clanProposals[paramUpper]) { room.sendAnnouncement("❌ Đề xuất không tồn tại!", player.id, 0xFF4444); return false; }
    delete clanProposals[paramUpper]; saveClanProposals();
    room.sendAnnouncement(`🗑️ Đã từ chối và xóa đơn đề xuất lập Clan [${paramUpper}].`, player.id, 0xFFA500, "bold", 1);
    return false;
  }

  // ==========================================
  // 👮 LỆNH ADMIN
  // ==========================================
  if (cmd === "create") {
    if (!isAdmin) { room.sendAnnouncement("❌ Chỉ Admin mới có quyền tạo Clan!", player.id, 0xFF4444); return false; }
    let firstSpace = param.indexOf(" ");
    if (firstSpace === -1) { room.sendAnnouncement("❌ Cú pháp: !clan create <Tag 1-3 ký tự> <Tên Đầy Đủ>", player.id, 0xFF4444); return false; }
    let tag = param.substring(0, firstSpace).toUpperCase();
    let fullName = param.substring(firstSpace + 1).trim();
    if (tag.length < 1 || tag.length > 3) { room.sendAnnouncement("❌ Tag viết tắt chỉ được từ 1 đến 3 ký tự!", player.id, 0xFF4444); return false; }
    if (clans[tag]) { room.sendAnnouncement("❌ Tag Clan này đã tồn tại!", player.id, 0xFF4444); return false; }

    clans[tag] = {
      name: fullName, tag: tag, icon: "🔰", color: 0xFFFFFF,
      leader: null, coleaders: [], members: [], requests: [],
      elo: 1000, stats: { games: 0, wins: 0, goals: 0 }, lastActive: Date.now(),
      level: 1, exp: 0, rivals: [], rivalRequests: [], trophies: []
    };
    saveClans();
    room.sendAnnouncement(`✅ Đã tạo Clan [${tag}] - ${fullName}. Hãy dùng '!clan setleader ${tag} @<Tên>' để gán Leader!`, player.id, 0x00FF00, "bold", 2);
    return false;
  }

  if (cmd === "delete") {
    if (!isAdmin) { return false; }
    if (!clans[paramUpper]) { room.sendAnnouncement("❌ Clan không tồn tại!", player.id, 0xFF4444); return false; }
    for (let memberAuth of clans[paramUpper].members) {
      let memberStats = getStats(memberAuth);
      memberStats.clan = null;
      delete memberStats.auth;
      localStorage.setItem(memberAuth, JSON.stringify(memberStats));
    }

    for (let t in clans) {
      if (clans[t].rivals) clans[t].rivals = clans[t].rivals.filter(r => r !== paramUpper);
      if (clans[t].rivalRequests) clans[t].rivalRequests = clans[t].rivalRequests.filter(r => r !== paramUpper);
    }
    delete clans[paramUpper]; saveClans();
    room.sendAnnouncement(`🗑️ Admin đã giải tán Clan [${paramUpper}].`, null, 0xFF4444, "bold", 2);
    return false;
  }

  if (cmd === "setleader") {
    if (!isAdmin) return false;
    let splitIndex = param.indexOf("@");
    if (splitIndex === -1) { room.sendAnnouncement("❌ Cú pháp: !clan setleader <Tag> @<Tên>", player.id, 0xFF4444); return false; }
    let clanTag = param.substring(0, splitIndex).trim().toUpperCase();
    let targetName = param.substring(splitIndex + 1).trim().replace(/_/g, " ");

    if (!clans[clanTag]) { room.sendAnnouncement("❌ Clan không tồn tại!", player.id, 0xFF4444); return false; }
    let targetPlayer = room.getPlayerList().find(p => p.name === targetName);
    if (!targetPlayer) { room.sendAnnouncement(`❌ Không tìm thấy "${targetName}".`, player.id, 0xFF4444); return false; }

    let targetAuth = getAuth(targetPlayer.id);
    let targetStats = getStats(targetAuth);
    if (targetStats.clan && targetStats.clan !== clanTag) {
      room.sendAnnouncement(`❌ Người này đang ở trong Clan [${targetStats.clan}]. Phải !clan leave trước.`, player.id, 0xFF4444); return false;
    }

    clans[clanTag].leader = targetAuth;
    if (!clans[clanTag].members.includes(targetAuth)) clans[clanTag].members.push(targetAuth);
    targetStats.clan = clanTag;

    delete targetStats.auth;
    localStorage.setItem(targetAuth, JSON.stringify(targetStats));
    saveClans();
    room.sendAnnouncement(`👑 VUA CHÚA ĐÃ CHỈ ĐỊNH: ${targetPlayer.name} chính thức trở thành Leader của [${clanTag}]!`, null, 0xFFD700, "bold", 2);
    return false;
  }

  // ==========================================
  // 🌎 LỆNH DÀNH CHO TẤT CẢ MỌI NGƯỜI
  // ==========================================
  if (cmd === "list") {
    let clanTags = Object.keys(clans);
    if (clanTags.length === 0) { room.sendAnnouncement("Hiện tại chưa có Clan nào.", player.id, 0xFFA500); return false; }

    let clanRanking = clanTags.map(tag => {
      let c = clans[tag];
      let elo = c.elo || 1000;
      let s = c.stats || { games: 0, wins: 0, goals: 0 };
      let lvl = c.level || 1;
      let winRate = s.games > 0 ? Math.round((s.wins / s.games) * 100) : 0;
      let isValid = c.members.length >= 5;
      return { tag: tag, data: c, elo: elo, stats: s, winRate: winRate, isValid: isValid, lvl: lvl };
    });

    clanRanking.sort((a, b) => {
      if (a.isValid && b.isValid) {
        if (b.lvl !== a.lvl) return b.lvl - a.lvl;
        return b.elo - a.elo;
      }
      if (a.isValid && !b.isValid) return -1;
      if (!a.isValid && b.isValid) return 1;

      if (b.lvl !== a.lvl) return b.lvl - a.lvl;
      return b.elo - a.elo;
    });

    let listStr = clanRanking.map((item, index) => {
      let c = item.data;
      let displayTag = c.icon ? `${c.icon}${item.tag}` : item.tag;
      let powerStr = item.isValid ? `Lv.${item.lvl} | 🏆 Elo: ${item.elo} | ⚔️ Win ${item.winRate}%` : `(Cần >= 5 TV)`;
      let rankMedal = item.isValid ? (index === 0 ? "🥇 " : index === 1 ? "🥈 " : index === 2 ? "🥉 " : `[#${index + 1}] `) : `[-] `;
      return `${rankMedal}[${displayTag}] ${c.name || item.tag} - ${c.members.length} TV | ${powerStr}`;
    }).join("\n");

    room.sendAnnouncement(`🏆 BẢNG XẾP HẠNG CLAN SERVER:\n${listStr}`, player.id, 0x00FFFF, "small-bold", 1);
    return false;
  }

  if (cmd === "info") {
    if (!paramUpper || !clans[paramUpper]) { room.sendAnnouncement("❌ Clan không tồn tại!", player.id, 0xFF4444); return false; }
    let c = clans[paramUpper];
    let hexColor = (c.color !== null && c.color !== undefined) ? "#" + c.color.toString(16).padStart(6, '0').toUpperCase() : "Mặc định";
    let iconDisplay = c.icon ? c.icon : "Không có";

    let leaderName = "Chưa rõ";
    if (c.leader) { let lStats = getStats(c.leader); if (lStats && lStats.name) leaderName = lStats.name; }

    let elo = c.elo || 1000;
    let lvl = c.level || 1;
    let exp = c.exp || 0;
    let s = c.stats || { games: 0, wins: 0, goals: 0 };
    let winRate = s.games > 0 ? Math.round((s.wins / s.games) * 100) : 0;

    let eloStr = (c.members.length >= 5) ? `🏆 ${elo}` : `Cần >= 5 Thành viên`;
    let statsStr = `⚔️ Trận: ${s.games} | 🏅 Thắng: ${s.wins} (${winRate}%) | ⚽ Ghi bàn: ${s.goals}`;
    let rivalStr = (c.rivals && c.rivals.length > 0) ? c.rivals.join(", ") : "Không có";
    let trophiesStr = (c.trophies && c.trophies.length > 0) ? c.trophies.join(", ") : "Chưa có";

    room.sendAnnouncement(`🛡️ THÔNG TIN CLAN [${paramUpper}] - ${c.name || paramUpper}:\n- Leader: 👑 ${leaderName}\n- Cấp độ: Lv.${lvl} (EXP: ${exp})\n- Sức Mạnh (Elo): ${eloStr}\n- Thống Kê: ${statsStr}\n- Tủ Cúp: ${trophiesStr}\n- Kẻ Thù: ${rivalStr}\n- Icon: ${iconDisplay} | Màu Role: ${hexColor}\n- Tổng TV: ${c.members.length} | Phó Leader: ${c.coleaders.length}`, player.id, 0x00FFFF, "small-bold", 1);
    return false;
  }

  if (cmd === "top") {
    let targetClanTag = paramUpper || stats.clan;
    if (!targetClanTag || !clans[targetClanTag]) {
      room.sendAnnouncement("❌ Vui lòng nhập Tag Clan hợp lệ hoặc gia nhập 1 Clan để xem! (VD: !clan top MU)", player.id, 0xFF4444);
      return false;
    }
    let c = clans[targetClanTag];
    let memberStatsList = [];
    for (let mAuth of c.members) {
      let m = getStats(mAuth);
      let roleIcon = (c.leader === mAuth) ? "👑" : ((c.coleaders && c.coleaders.includes(mAuth)) ? "🔰" : "👤");
      memberStatsList.push({ name: m.name || "Unknown", points: m.points || 0, role: roleIcon });
    }
    memberStatsList.sort((a, b) => b.points - a.points);
    let topList = memberStatsList.slice(0, 5).map((m, i) => `${i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i + 1) + "."} ${m.role} ${m.name} (${m.points}★)`).join("\n");
    room.sendAnnouncement(`🏆 TOP CỐNG HIẾN NỘI BỘ CLAN [${targetClanTag}]:\n${topList}`, player.id, 0xFFD700, "small-bold", 1);
    return false;
  }

  if (cmd === "members") {
    let targetClanTag = paramUpper || stats.clan;
    if (!targetClanTag || !clans[targetClanTag]) { return false; }
    let c = clans[targetClanTag];
    let memberList = [];
    for (let mAuth of c.members) {
      let mStats = getStats(mAuth);
      let roleIcon = "👤";
      if (c.leader === mAuth) roleIcon = "👑";
      else if (c.coleaders && c.coleaders.includes(mAuth)) roleIcon = "🔰";
      memberList.push(`${roleIcon} ${mStats.name || "Unknown"} (${mStats.points || 0}★)`);
    }
    memberList.sort((a, b) => {
      if (a.startsWith("👑")) return -1; if (b.startsWith("👑")) return 1;
      if (a.startsWith("🔰") && !b.startsWith("🔰")) return -1;
      if (!a.startsWith("🔰") && b.startsWith("🔰")) return 1;
      return 0;
    });
    room.sendAnnouncement(`👥 THÀNH VIÊN CLAN [${targetClanTag}] (${c.members.length} người):\n` + memberList.join("  |  "), player.id, 0x00FFFF, "small-bold", 1);
    return false;
  }

  if (cmd === "join") {
    if (stats.clan) { room.sendAnnouncement(`❌ Bạn đã ở trong Clan [${stats.clan}] rồi!`, player.id, 0xFF4444); return false; }
    if (!clans[paramUpper]) { room.sendAnnouncement("❌ Clan không tồn tại!", player.id, 0xFF4444); return false; }
    if (clans[paramUpper].requests.includes(auth)) { room.sendAnnouncement("❌ Bạn đã gửi yêu cầu rồi, hãy đợi duyệt!", player.id, 0xFF4444); return false; }
    clans[paramUpper].requests.push(auth);
    saveClans();
    room.sendAnnouncement(`✅ Đã gửi yêu cầu gia nhập Clan [${paramUpper}].`, player.id, 0x00FF00, "bold", 1);
    return false;
  }

  if (cmd === "leave") {
    let myClanTag = stats.clan;

    if (!myClanTag) { room.sendAnnouncement("❌ Bạn chưa tham gia Clan nào!", player.id, 0xFF4444); return false; }
    if (clans[myClanTag].leader === auth) {
      room.sendAnnouncement("❌ Leader không thể rời đi! Hãy dùng lệnh '!clan transfer @Tên' để nhường chức trước khi rời.", player.id, 0xFF4444); return false;
    }
    clans[myClanTag].members = clans[myClanTag].members.filter(a => a !== auth);
    clans[myClanTag].coleaders = clans[myClanTag].coleaders.filter(a => a !== auth);
    stats.clan = null;

    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));

    clans[myClanTag].lastActive = Date.now();
    saveClans();
    room.sendAnnouncement(`👋 Bạn đã rời khỏi Clan [${myClanTag}].`, player.id, 0xFFA500, "bold", 1);
    return false;
  }

  if (cmd === "togglecolor") {
    if (!stats.clan || !clans[stats.clan]) { room.sendAnnouncement("❌ Bạn chưa có Clan!", player.id, 0xFF4444); return false; }
    stats.useClanColor = (stats.useClanColor === false) ? true : false;

    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));

    if (stats.useClanColor) {
      room.sendAnnouncement(`🎨 Đã BẬT dùng màu của Clan trên khung Chat.`, player.id, 0x00FF00, "bold", 1);
    } else {
      room.sendAnnouncement(`🎨 Đã TẮT màu Clan. Khung Chat sẽ dùng màu Custom Role của riêng bạn.`, player.id, 0xFFA500, "bold", 1);
    }
    return false;
  }

  // ==========================================
  // ⚔️ LỆNH DÀNH CHO QUẢN LÝ (LEADER / CO-LEADER)
  // ==========================================
  let myClanTag = stats.clan;
  let myClan = myClanTag ? clans[myClanTag] : null;
  let isLeader = myClan && (myClan.leader === auth);
  let isCoLeader = myClan && (myClan.coleaders && myClan.coleaders.includes(auth));
  let hasPerm = isLeader || isCoLeader;

  if (cmd === "rival") {
    if (!isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới có quyền Tuyên Chiến!", player.id, 0xFF4444); return false; }
    if (myClan.members.length < 5) { room.sendAnnouncement("❌ Clan phải có từ 5 thành viên trở lên mới được sử dụng tính năng này!", player.id, 0xFF4444); return false; }
    if (!paramUpper || !clans[paramUpper]) { room.sendAnnouncement("❌ Cú pháp: !clan rival <Tag_Clan_Khác>", player.id, 0xFF4444); return false; }
    if (paramUpper === myClanTag) { room.sendAnnouncement("❌ Không thể tự tuyên chiến với chính mình!", player.id, 0xFF4444); return false; }

    myClan.rivals = myClan.rivals || [];
    myClan.rivalRequests = myClan.rivalRequests || [];
    let targetClan = clans[paramUpper];
    targetClan.rivals = targetClan.rivals || [];
    targetClan.rivalRequests = targetClan.rivalRequests || [];

    if (myClan.rivals.includes(paramUpper)) {
      room.sendAnnouncement(`❌ Clan [${myClanTag}] và [${paramUpper}] đã là kẻ thù của nhau rồi!`, player.id, 0xFF4444); return false;
    }

    if (myClan.rivalRequests.includes(paramUpper)) {
      myClan.rivalRequests = myClan.rivalRequests.filter(t => t !== paramUpper);
      myClan.rivals.push(paramUpper);
      targetClan.rivals.push(myClanTag);
      saveClans();
      room.sendAnnouncement(`⚔️ [LIÊN MINH HÀNH ĐỘNG] Clan [${myClanTag}] và [${paramUpper}] đã chính thức trở thành KẺ THÙ TRUYỀN KIẾP! Các trận Clan War giữa 2 bên sẽ X2 ĐIỂM ELO!`, null, 0xFF0000, "bold", 2);
    } else {
      if (targetClan.rivalRequests.includes(myClanTag)) {
        room.sendAnnouncement(`❌ Đã gửi chiến thư trước đó rồi. Đang chờ đối phương chấp nhận!`, player.id, 0xFF4444); return false;
      }
      targetClan.rivalRequests.push(myClanTag);
      saveClans();
      room.sendAnnouncement(`📜 THÔNG BÁO: Clan [${myClanTag}] đã gửi chiến thư tuyên bố Kẻ thù với Clan [${paramUpper}]. Chờ Leader đối phương gõ '!clan rival ${myClanTag}' để chấp nhận!`, null, 0xFF8C00, "bold", 2);
    }
    return false;
  }

  if (cmd === "unrival") {
    if (!isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới có quyền Hủy Kẻ thù!", player.id, 0xFF4444); return false; }
    if (myClan.members.length < 5) { room.sendAnnouncement("❌ Clan phải có từ 5 thành viên trở lên mới được sử dụng tính năng này!", player.id, 0xFF4444); return false; }
    if (!paramUpper) { room.sendAnnouncement("❌ Cú pháp: !clan unrival <Tag_Clan_Khác>", player.id, 0xFF4444); return false; }

    myClan.rivals = myClan.rivals || [];
    if (myClan.rivals.includes(paramUpper)) {
      myClan.rivals = myClan.rivals.filter(t => t !== paramUpper);
      if (clans[paramUpper] && clans[paramUpper].rivals) {
        clans[paramUpper].rivals = clans[paramUpper].rivals.filter(t => t !== myClanTag);
      }
      saveClans();
      room.sendAnnouncement(`🕊️ HIỆP ƯỚC HÒA BÌNH: Clan [${myClanTag}] và [${paramUpper}] đã đình chiến.`, null, 0x00FF00, "bold", 2);
    } else {
      room.sendAnnouncement(`❌ Hai Clan chưa phải là kẻ thù của nhau.`, player.id, 0xFF4444);
    }
    return false;
  }

  if (cmd === "setcolor") {
    if (!isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới có quyền đổi màu Clan!", player.id, 0xFF4444); return false; }
    if (myClan.members.length < 5) { room.sendAnnouncement("❌ Clan phải có từ 5 thành viên trở lên mới được dùng tính năng đổi màu!", player.id, 0xFF4444); return false; }
    let colorInput = param.toLowerCase();
    if (!/^[0-9a-f]{6}$/i.test(colorInput)) { room.sendAnnouncement("❌ Mã màu HEX không hợp lệ! (Ví dụ: FF0000)", player.id, 0xFF4444); return false; }

    let colorVal = parseInt(colorInput, 16);
    myClan.color = colorVal;
    saveClans();
    room.sendAnnouncement(`🎨 Màu của Clan [${myClanTag}] đã được cập nhật! (Các thành viên có thể gõ !clan togglecolor để đổi).`, null, colorVal, "bold", 2);
    return false;
  }

  if (cmd === "rename") {
    if (!isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới có quyền đổi Tên Đầy Đủ của Clan!", player.id, 0xFF4444); return false; }
    if (myClan.members.length < 5) { room.sendAnnouncement("❌ Clan phải có từ 5 thành viên trở lên mới được đổi tên!", player.id, 0xFF4444); return false; }
    if (!param) { room.sendAnnouncement("❌ Cú pháp: !clan rename <Tên Dài Mới>", player.id, 0xFF4444); return false; }

    myClan.name = param.trim();
    saveClans();
    room.sendAnnouncement(`🎉 Tên đầy đủ của Clan [${myClanTag}] đã được đổi thành: ${myClan.name}`, null, 0xFFD700, "bold", 1);
    return false;
  }

  if (cmd === "seticon") {
    if (!isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới có quyền đổi Icon Clan!", player.id, 0xFF4444); return false; }
    if (myClan.members.length < 5) { room.sendAnnouncement("❌ Clan phải có từ 5 thành viên trở lên mới được đổi Icon!", player.id, 0xFF4444); return false; }
    if (param.toLowerCase() === "clear" || param.toLowerCase() === "none") {
      myClan.icon = "";
      saveClans();
      room.sendAnnouncement(`✅ Đã gỡ bỏ Icon của Clan [${myClanTag}].`, player.id, 0x00FF00, "bold", 1);
      return false;
    }
    if (!param) { room.sendAnnouncement("❌ Cú pháp: !clan seticon <Icon> (Gõ !clan seticon clear để xóa icon)", player.id, 0xFF4444); return false; }
    let newIcon = param.trim();
    if (newIcon.length > 4) { room.sendAnnouncement("❌ Icon quá dài! Vui lòng chỉ dùng 1-2 emoji ngắn gọn.", player.id, 0xFF4444); return false; }
    myClan.icon = newIcon;
    saveClans();
    room.sendAnnouncement(`🎉 Clan [${myClanTag}] đã cập nhật Icon mới: ${newIcon}`, null, 0xFFD700, "bold", 2);
    return false;
  }

  if (cmd === "retag") {
    if (!isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới có quyền đổi Tag Clan!", player.id, 0xFF4444); return false; }
    if (myClan.members.length < 5) { room.sendAnnouncement("❌ Clan phải có từ 5 thành viên trở lên mới được đổi Tag!", player.id, 0xFF4444); return false; }
    let newTag = paramUpper;
    if (!newTag) { room.sendAnnouncement("❌ Cú pháp: !clan retag <Tag Mới>", player.id, 0xFF4444); return false; }
    if (newTag.length < 1 || newTag.length > 3) { room.sendAnnouncement("❌ Tag viết tắt chỉ được từ 1 đến 3 ký tự!", player.id, 0xFF4444); return false; }
    if (clans[newTag]) { room.sendAnnouncement("❌ Tag Clan này đã có người sử dụng!", player.id, 0xFF4444); return false; }

    let oldTag = myClanTag;

    for (let memberAuth of myClan.members) {
      let memberStats = getStats(memberAuth);
      memberStats.clan = newTag;
      delete memberStats.auth;
      localStorage.setItem(memberAuth, JSON.stringify(memberStats));
    }

    for (let t in clans) {
      if (clans[t].rivals && clans[t].rivals.includes(oldTag)) {
        clans[t].rivals = clans[t].rivals.filter(r => r !== oldTag);
        clans[t].rivals.push(newTag);
      }
      if (clans[t].rivalRequests && clans[t].rivalRequests.includes(oldTag)) {
        clans[t].rivalRequests = clans[t].rivalRequests.filter(r => r !== oldTag);
        clans[t].rivalRequests.push(newTag);
      }
    }

    clans[newTag] = clans[oldTag];
    clans[newTag].tag = newTag;
    delete clans[oldTag];

    saveClans();
    room.sendAnnouncement(`🎉 ĐỔI TAG CLAN: Clan [${oldTag}] đã chính thức đổi Tag thành [${newTag}]!`, null, 0xFFD700, "bold", 2);
    return false;
  }

  if (["requests", "accept", "kick"].includes(cmd) && !hasPerm) {
    room.sendAnnouncement("❌ Chỉ Leader và Co-Leader mới có quyền này!", player.id, 0xFF4444); return false;
  }
  if (["promote", "demote", "transfer"].includes(cmd) && !isLeader) {
    room.sendAnnouncement("❌ Chỉ Leader mới có quyền sử dụng lệnh này!", player.id, 0xFF4444); return false;
  }

  if (cmd === "requests") {
    let reqs = myClan.requests;
    if (reqs.length === 0) { room.sendAnnouncement("Không có ai xin vào Clan lúc này.", player.id, 0xFFA500); return false; }

    let onlineReqs = [];
    let pList = room.getPlayerList();
    for (let rAuth of reqs) {
      let p = pList.find(pl => getAuth(pl.id) === rAuth);
      if (p) onlineReqs.push((typeof getTag === "function") ? getTag(p.name) : `@${p.name.replace(/ /g, "_")}`);
    }

    room.sendAnnouncement(`📝 YÊU CẦU GIA NHẬP (Đang online):\n` + (onlineReqs.length ? onlineReqs.join("\n") : "Có người xin vào nhưng họ đang Offline."), player.id, 0x00FFFF, "small-bold", 1);
    return false;
  }
  if (["accept", "kick", "promote", "demote", "transfer"].includes(cmd)) {
    let targetName = param.replace(/^@/, "").trim().replace(/_/g, " ");
    if (!targetName) {
      room.sendAnnouncement(`❌ Cú pháp sai! Vui lòng nhập tên. VD: !clan ${cmd} @Tên_Nguoi_Choi`, player.id, 0xFF4444);
      return false;
    }

    let targetAuth = null;
    let targetStats = null;
    let actualName = targetName;

    // 1. TÌM KIẾM ONLINE (Quét người đang trong phòng trước để lấy tên chuẩn nếu họ đổi tên)
    let targetPlayer = room.getPlayerList().find(p => p.id !== 0 && p.name.toLowerCase() === targetName.toLowerCase());

    if (targetPlayer) {
      targetAuth = getAuth(targetPlayer.id);
      targetStats = getStats(targetAuth);
      actualName = targetPlayer.name;
    }
    // 2. TÌM KIẾM OFFLINE (Lục tìm trong Database nếu họ không onl)
    else {
      // Gộp danh sách những người đang xin vào và những người đang là thành viên
      let involvedAuths = [...myClan.members, ...myClan.requests];
      for (let a of involvedAuths) {
        let st = getStats(a);
        if (st && st.name && st.name.toLowerCase() === targetName.toLowerCase()) {
          targetAuth = a;
          targetStats = st;
          actualName = st.name;
          break;
        }
      }
    }

    // 3. CHỐT KẾT QUẢ TÌM KIẾM
    if (!targetAuth) {
      room.sendAnnouncement(`❌ Không tìm thấy "${targetName}" trong danh sách chờ duyệt hoặc thành viên Clan!`, player.id, 0xFF4444);
      return false;
    }

    if (cmd === "accept") {
      if (!myClan.requests.includes(targetAuth)) { room.sendAnnouncement("❌ Người này chưa xin vào Clan!", player.id, 0xFF4444); return false; }
      if (targetStats.clan) { room.sendAnnouncement("❌ Người này đã vào Clan khác rồi!", player.id, 0xFF4444); return false; }

      myClan.requests = myClan.requests.filter(a => a !== targetAuth);
      myClan.members.push(targetAuth);
      targetStats.clan = myClanTag;

      delete targetStats.auth;
      localStorage.setItem(targetAuth, JSON.stringify(targetStats));

      myClan.lastActive = Date.now();
      saveClans();
      room.sendAnnouncement(`⚔️ ${player.name} đã thu nạp ${actualName} vào Clan [${myClanTag}]!`, null, 0x00FF00, "bold", 2);
    }

    else if (cmd === "kick") {
      if (targetAuth === auth) { room.sendAnnouncement("❌ Không thể tự kick chính mình!", player.id, 0xFF4444); return false; }
      if (targetAuth === myClan.leader) { room.sendAnnouncement("❌ Không thể kick Leader!", player.id, 0xFF4444); return false; }
      if (myClan.coleaders && myClan.coleaders.includes(targetAuth) && !isLeader) { room.sendAnnouncement("❌ Chỉ Leader mới kick được Co-Leader!", player.id, 0xFF4444); return false; }
      if (!myClan.members.includes(targetAuth)) { room.sendAnnouncement("❌ Người này không ở trong Clan!", player.id, 0xFF4444); return false; }

      myClan.members = myClan.members.filter(a => a !== targetAuth);
      if (myClan.coleaders) myClan.coleaders = myClan.coleaders.filter(a => a !== targetAuth);
      targetStats.clan = null;

      delete targetStats.auth;
      localStorage.setItem(targetAuth, JSON.stringify(targetStats));

      myClan.lastActive = Date.now();
      saveClans();
      room.sendAnnouncement(`🥾 ${actualName} đã bị đuổi khỏi Clan [${myClanTag}].`, null, 0xFF4444, "bold", 1);
    }

    else if (cmd === "promote") {
      if (!myClan.members.includes(targetAuth)) { room.sendAnnouncement("❌ Người này không ở trong Clan!", player.id, 0xFF4444); return false; }
      if (myClan.coleaders && myClan.coleaders.includes(targetAuth)) { room.sendAnnouncement("❌ Người này đã là Co-Leader rồi!", player.id, 0xFF4444); return false; }

      myClan.coleaders = myClan.coleaders || [];
      myClan.coleaders.push(targetAuth);
      saveClans();
      room.sendAnnouncement(`🔰 ${actualName} vừa được thăng chức làm Co-Leader Clan [${myClanTag}]!`, null, 0xFFD700, "bold", 2);
    }

    else if (cmd === "demote") {
      if (!myClan.coleaders || !myClan.coleaders.includes(targetAuth)) { room.sendAnnouncement("❌ Người này không phải Co-Leader!", player.id, 0xFF4444); return false; }

      myClan.coleaders = myClan.coleaders.filter(a => a !== targetAuth);
      saveClans();
      room.sendAnnouncement(`📉 ${actualName} đã bị tước quyền Co-Leader Clan [${myClanTag}].`, null, 0xFFA500, "bold", 1);
    }

    else if (cmd === "transfer") {
      if (targetAuth === auth) { room.sendAnnouncement("❌ Bạn vốn đã là Leader rồi!", player.id, 0xFF4444); return false; }
      if (!myClan.members.includes(targetAuth)) { room.sendAnnouncement("❌ Người này không ở trong Clan của bạn!", player.id, 0xFF4444); return false; }

      // Thu hồi quyền Co-Leader của người nhận (nếu có)
      if (myClan.coleaders && myClan.coleaders.includes(targetAuth)) {
        myClan.coleaders = myClan.coleaders.filter(a => a !== targetAuth);
      }

      // Trao quyền
      myClan.leader = targetAuth;
      saveClans();

      room.sendAnnouncement(`👑 BÀN GIAO QUYỀN LỰC: ${player.name} đã nhường chức Leader Clan [${myClanTag}] cho ${actualName}!`, null, 0xFFD700, "bold", 2);
    }

    return false;
  }
}

async function avatarEffect(playerId, avatars) {
  for (const avatar of avatars) {
    await room.setPlayerAvatar(playerId, avatar);
    await new Promise(r => setTimeout(r, 500));
  };
  room.setPlayerAvatar(playerId, null);
}

function getPlayerGoalEffect(auth) {
  if (!auth) return null;
  let stats = getStats(auth);
  let points = stats.points || 0;

  // 1. DƯỚI 50 SAO: Không có hiệu ứng
  if (points < 50) return null;

  // 2. TỪ 50 ĐẾN 199 SAO: Bot tự cấp 1 hiệu ứng ngẫu nhiên cố định dựa trên Auth
  if (points < 200) {
    let hash = 0;
    for (let i = 0; i < auth.length; i++) {
      hash = auth.charCodeAt(i) + ((hash << 5) - hash);
    }
    let randomIndex = Math.abs(hash) % EFFECT_NAMES.length;
    return randomIndex;
  }

  // 3. TỪ 200 SAO TRỞ LÊN: Lấy đúng hiệu ứng mà họ đã thiết lập. Nếu họ chưa từng cài, mặc định là Random (-1).
  return (stats.effectId !== undefined) ? stats.effectId : -1;
}
// Thêm forceEffectId = null vào tham số
async function celebrationEffect(playerEventObj, hasScored, forceEffectId = null) {
  // FIX LỖI: Lấy dữ liệu cầu thủ ĐẦY ĐỦ từ hệ thống để có tọa độ (.position)
  let player = room.getPlayer(playerEventObj.id);

  // Nếu cầu thủ không ở trên sân (đang ở Spectator) thì không chạy hiệu ứng
  if (!player || !player.position) return;

  let playerIds;
  let auth = getAuth(player.id);

  // 👉 1. SỬ DỤNG HÀM TỰ ĐỘNG PHÂN BỔ ĐỂ LẤY HIỆU ỨNG TƯƠNG ỨNG VỚI MỐC SAO
  let activeEffect = getPlayerGoalEffect(auth);

  // 👉 2. NẾU KHÔNG CÓ HIỆU ỨNG THÌ THOÁT LUÔN (Không nổ - VD: Dưới 50 sao)
  if (activeEffect === null || activeEffect === undefined) return;

  // 3. Lựa chọn hiệu ứng theo thứ tự ưu tiên: Lệnh test -> Random (-1) -> Bình thường
  let targetEffect;
  if (forceEffectId !== null) {
    targetEffect = forceEffectId;
  } else if (activeEffect === -1) {
    targetEffect = getRandomInt(EFFECT_NAMES.length); // Quay random từ danh sách
  } else {
    targetEffect = activeEffect;
  }

  // 4. Thực thi hiệu ứng
  switch (targetEffect) {
    case 0: {
      // --- HIỆU ỨNG 0: SUPER SAIYAN (Hào quang rực cháy) ---
      if (!player.position) return;
      let originalRadius = room.getPlayerDiscProperties(player.id).radius;
      room.setPlayerAvatar(player.id, "🔥");

      let ssjInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        // Nhấp nháy kích thước
        room.setPlayerDiscProperties(player.id, { radius: originalRadius * 1.5 });
        setTimeout(() => room.setPlayerDiscProperties(player.id, { radius: originalRadius }), 100);

        // Phóng hào quang (đĩa) bay lượn lên trên
        for (let i = 9; i <= 15; i++) { // Dùng 7 đĩa làm aura
          room.setDiscProperties(i, {
            x: pProps.x + (Math.random() * 30 - 15),
            y: pProps.y + 15,
            xspeed: Math.random() * 2 - 1,
            yspeed: -(Math.random() * 5 + 5), // Bay ngược lên
            vis: true, color: 0xFFD700, radius: 3 + Math.random() * 3,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }
      }, 200);

      setSafeTimeout(() => {
        clearInterval(ssjInterval);
        room.setPlayerAvatar(player.id, null);
        room.setPlayerDiscProperties(player.id, { radius: originalRadius });
        for (let i = 9; i <= 15; i++) room.setDiscProperties(i, { x: 10000, y: 10000, vis: false });
      }, 2500);
      break;
    }

    case 1: {
      // --- HIỆU ỨNG 1: ĐỘNG ĐẤT (Earthquake) ---
      if (!player.position) return;
      let originalRadius = room.getPlayerDiscProperties(player.id).radius;
      room.setPlayerDiscProperties(player.id, { radius: originalRadius * 2.5 });
      room.setPlayerAvatar(player.id, "🦍");

      // Làm tất cả những người khác trên sân bị nảy bần bật (Earthquake effect)
      let quakeInterval = setSafeInterval(() => {
        let players = room.getPlayerList();
        for (let p of players) {
          if (p.team === 0 || p.id === player.id || !p.position) continue;
          room.setPlayerDiscProperties(p.id, { yspeed: -7 + Math.random() * 14, xspeed: -3 + Math.random() * 6 });
          room.setPlayerAvatar(p.id, "😵");
        }
      }, 300);

      setSafeTimeout(() => {
        clearInterval(quakeInterval);
        room.setPlayerDiscProperties(player.id, { radius: originalRadius });
        for (let p of room.getPlayerList()) {
          if (p.team !== 0) room.setPlayerAvatar(p.id, null);
        }
      }, 2000);
      break;
    }

    case 2: {
      // --- HIỆU ỨNG 2: VÒNG TRÒN TÌNH BẠN (Team Dance) ---
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "🕺");

      let orbitAngle = 0;
      let danceInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;
        orbitAngle += 0.2;

        let teammates = room.getPlayerList().filter(p => p.team === player.team && p.id !== player.id && p.position);
        if (teammates.length === 0) return;

        let angleStep = (Math.PI * 2) / teammates.length;

        for (let i = 0; i < teammates.length; i++) {
          let tProps = room.getPlayerDiscProperties(teammates[i].id);
          if (!tProps) continue;

          let targetX = pProps.x + Math.cos(orbitAngle + i * angleStep) * 60;
          let targetY = pProps.y + Math.sin(orbitAngle + i * angleStep) * 60;

          let dx = targetX - tProps.x;
          let dy = targetY - tProps.y;

          // Kéo đồng đội mượt mà vào vị trí vòng tròn
          room.setPlayerDiscProperties(teammates[i].id, { xspeed: dx / 5, yspeed: dy / 5 });
          room.setPlayerAvatar(teammates[i].id, "🎉");
        }
      }, 50);

      setSafeTimeout(() => {
        clearInterval(danceInterval);
        for (let p of room.getPlayerList()) {
          if (p.team !== 0) room.setPlayerAvatar(p.id, null);
        }
      }, 2500);
      break;
    }

    case 3: {
      // --- HIỆU ỨNG 3: QUẢ CẦU DISCO ---
      let ball = room.getDiscProperties(0);
      if (!ball) return;

      let originalColor = ball.color;
      let discoColors = [0xFF0000, 0xFF8000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF];
      let colorIndex = 0;
      let discIndex = 9;

      let discoInterval = setSafeInterval(() => {
        let currentBall = room.getDiscProperties(0);
        if (!currentBall) return;

        // Đổi màu bóng liên tục
        room.setDiscProperties(0, { color: discoColors[colorIndex % discoColors.length] });
        colorIndex++;

        // Bắn tia sáng từ bóng
        for (let i = 0; i < 3; i++) {
          let angle = Math.random() * Math.PI * 2;
          room.setDiscProperties(discIndex, {
            x: currentBall.x, y: currentBall.y,
            xspeed: Math.cos(angle) * 12, yspeed: Math.sin(angle) * 12,
            vis: true, color: discoColors[getRandomInt(discoColors.length)], radius: 4,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
          discIndex++;
          if (discIndex > 38) discIndex = 9;
        }
      }, 100);

      setSafeTimeout(() => {
        clearInterval(discoInterval);
        room.setDiscProperties(0, { color: originalColor }); // Trả lại màu gốc
        for (let i = 9; i <= 38; i++) room.setDiscProperties(i, { x: 10000, y: 10000, vis: false });
      }, 2500);
      break;
    }

    case 4: {
      // --- HIỆU ỨNG 4: THẦN LA THIÊN CHINH (Shinra Tensei) ---
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "💢");

      // 1. Đẩy văng đối thủ theo hình tròn (Radial)
      let players = room.getPlayerList();
      for (let p of players) {
        if (p.team === 0 || p.id === player.id) continue;
        if (p.team !== player.team && p.position) {
          let dx = p.position.x - player.position.x;
          let dy = p.position.y - player.position.y;
          let dist = Math.hypot(dx, dy) || 1;

          if (dist < 350) { // Bán kính đẩy
            room.setPlayerDiscProperties(p.id, {
              xspeed: (dx / dist) * 22,
              yspeed: (dy / dist) * 22
            });
            room.setPlayerAvatar(p.id, "💨");
          }
        }
      }

      // 2. Vòng sóng xung kích (bung 30 đĩa ra cùng lúc)
      let count = 30;
      for (let i = 1; i <= count; i++) {
        let angle = (Math.PI * 2 * i) / count;
        room.setDiscProperties(i + 8, {
          x: player.position.x, y: player.position.y,
          xspeed: Math.cos(angle) * 25, // Bay cực nhanh
          yspeed: Math.sin(angle) * 25,
          vis: true, color: 0xFFFFFF, radius: 4,
          invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
        });
      }

      setSafeTimeout(() => {
        for (let p of room.getPlayerList()) {
          if (p.team !== 0) room.setPlayerAvatar(p.id, null);
        }
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
      }, 1500);
      break;
    }

    case 5: {
      if (!player.position) return;
      let goalX = (player.team == 1) ? stadium.goalLine.x : -stadium.goalLine.x;
      let colors = [0xFF0000, 0x00FF00, 0xFFFF00, 0x00FFFF, 0xFF00FF, 0xFFFFFF, 0xFFA500];
      let count = 30;

      let players = room.getPlayerList();
      for (let i = 0; i < players.length; i++) {
        let p = players[i];
        if (p.team === 0 || !p.position) continue;
        let distanceToGoal = Math.abs(p.position.x - goalX);
        if (distanceToGoal < 250) {
          let pushForce = (player.team == 1 ? -15 : 15);
          room.setPlayerDiscProperties(p.id, {
            xspeed: pushForce,
            yspeed: (p.position.y > 0 ? 5 : -5)
          });
          room.setPlayerAvatar(p.id, "😱");
        }
      }

      // 🎯 Dịch index lên +8 (Bắt đầu từ Đĩa 9)
      for (let i = 1; i <= count; i++) {
        room.setDiscProperties(i + 8, {
          x: goalX,
          y: (Math.random() * 100) - 50,
          xspeed: (player.team == 1 ? -1 : 1) * (Math.random() * 15 + 10),
          yspeed: Math.random() * 12 - 6,
          vis: true,
          color: colors[getRandomInt(colors.length)],
          radius: 4 + Math.random() * 4,
          invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
        });
      }

      setSafeTimeout(() => {
        let currentPlayers = room.getPlayerList();
        for (let i = 0; i < currentPlayers.length; i++) {
          if (currentPlayers[i].team !== 0) room.setPlayerAvatar(currentPlayers[i].id, null);
        }
        // 🎯 Xả tàng hình cho Đĩa 9 đến 38
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
      }, 2300);
      break;
    }

    case 6: {
      let ball = room.getDiscProperties(0);
      if (!ball) return;
      let count = 30;
      let colors = [0xFF0000, 0x00FF00, 0xFFFF00, 0x00FFFF, 0xFF00FF, 0xFFFFFF, 0xFFA500];

      // 🎯 Bắt đầu từ Đĩa 9
      for (let i = 1; i <= count; i++) {
        let angle = (Math.PI * 2 * i) / count;
        let blastSpeed = Math.random() * 8 + 8;
        room.setDiscProperties(i + 8, {
          x: ball.x, y: ball.y,
          xspeed: Math.cos(angle) * blastSpeed,
          yspeed: Math.sin(angle) * blastSpeed,
          vis: true, color: colors[getRandomInt(colors.length)],
          radius: 4 + Math.random() * 2,
          invMass: 1, bCoef: 0.5, cMask: 0, cGroup: 0,
          damping: 0.90
        });
      }

      let scatterInterval = setSafeInterval(() => {
        let activePlayers = [];
        let players = room.getPlayerList();
        for (let i = 0; i < players.length; i++) {
          if (players[i].team !== 0 && players[i].position) {
            let props = room.getPlayerDiscProperties(players[i].id);
            if (props) activePlayers.push({ id: players[i].id, props: props });
          }
        }
        if (activePlayers.length === 0) return;

        for (let i = 1; i <= count; i++) {
          let piece = room.getDiscProperties(i + 8);
          if (!piece || piece.x > 9000) continue;

          for (let j = 0; j < activePlayers.length; j++) {
            let pProps = activePlayers[j].props;
            let dx = piece.x - pProps.x;
            let dy = piece.y - pProps.y;
            let distSq = dx * dx + dy * dy;

            if (distSq < 400) {
              let angle = Math.atan2(dy, dx);
              let playerSpeed = Math.hypot(pProps.xspeed, pProps.yspeed) || 0;
              let scatterForce = playerSpeed + 4;
              room.setDiscProperties(i + 8, {
                xspeed: piece.xspeed + Math.cos(angle) * scatterForce,
                yspeed: piece.yspeed + Math.sin(angle) * scatterForce
              });
            }
          }
        }
      }, 150);

      setSafeTimeout(() => {
        clearInterval(scatterInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
      }, 2500);
      break;
    }

    case 7: {
      if (!player.position) return;
      let colors = [0xFF0000, 0x00FF00, 0xFFFF00, 0x00FFFF, 0xFF00FF, 0xFFFFFF, 0xFFA500];
      let discIndex = 9; // 🎯 Khởi đầu từ 9

      let lastAngle = (player.team === 1) ? 0 : Math.PI;
      room.setPlayerAvatar(player.id, "🎆");

      let sparklerInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        let speedSq = pProps.xspeed * pProps.xspeed + pProps.yspeed * pProps.yspeed;
        if (speedSq > 0.5) lastAngle = Math.atan2(pProps.yspeed, pProps.xspeed);

        let spawnX = pProps.x - Math.cos(lastAngle) * 12;
        let spawnY = pProps.y - Math.sin(lastAngle) * 12;

        let numParticles = 7;
        let baseAngle = Math.random() * Math.PI * 2;
        let spreadAngle = Math.PI / 3;

        for (let i = 0; i < numParticles; i++) {
          let angle = baseAngle - (spreadAngle / 2) + (spreadAngle * (i / (numParticles - 1)));
          let speed = Math.random() * 6 + 9;

          room.setDiscProperties(discIndex, {
            x: spawnX, y: spawnY,
            xspeed: Math.cos(angle) * speed, yspeed: Math.sin(angle) * speed,
            vis: true, color: colors[getRandomInt(colors.length)],
            radius: 4 + Math.random() * 2,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });

          discIndex++;
          if (discIndex > 38) discIndex = 9; // 🎯 Quay vòng từ 9 -> 38
        }
      }, 400);

      setSafeTimeout(() => {
        clearInterval(sparklerInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
        room.setPlayerAvatar(player.id, null);
      }, 2500);
      break;
    }

    case 8: {
      if (!player.position) return;
      let discIndex = 9; // 🎯 Khởi đầu từ 9
      let lastAngle = (player.team === 1) ? 0 : Math.PI;
      room.setPlayerAvatar(player.id, "🔫");

      let machineGunInterval = setSafeInterval(() => {
        let discProps = room.getPlayerDiscProperties(player.id);
        if (!discProps) return;

        let speedSq = discProps.xspeed * discProps.xspeed + discProps.yspeed * discProps.yspeed;
        if (speedSq > 0.5) lastAngle = Math.atan2(discProps.yspeed, discProps.xspeed);

        let bulletSpeed = 12;
        let randomColor = Math.floor(Math.random() * 16777215);

        let spawnX = discProps.x - Math.cos(lastAngle) * 12;
        let spawnY = discProps.y - Math.sin(lastAngle) * 12;

        room.setDiscProperties(discIndex, {
          x: spawnX, y: spawnY,
          xspeed: Math.cos(lastAngle) * bulletSpeed + (discProps.xspeed * 0.8),
          yspeed: Math.sin(lastAngle) * bulletSpeed + (discProps.yspeed * 0.8),
          vis: true, color: randomColor, radius: 3.5,
          invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
        });

        discIndex++;
        if (discIndex > 38) discIndex = 9; // 🎯 Tận dụng full 30 viên đạn
      }, 50);

      setSafeTimeout(() => {
        clearInterval(machineGunInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
        room.setPlayerAvatar(player.id, null);
      }, 2300);
      break;
    }

    case 9: {
      // --- HIỆU ỨNG 9: SIÊU HỐ ĐEN VŨ TRỤ (Mở rộng & Có ranh giới) ---
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "🌌");
      let bhAngle = 0;

      let blackHoleInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        bhAngle += 0.2;

        // 1. Mở rộng bán kính vòng xoáy lên 130 (thay vì 60 như cũ)
        for (let i = 0; i < 30; i++) {
          let spiralRadius = 130 - ((bhAngle * 12 + i * 6) % 130);
          let angleOffset = bhAngle + (i * (Math.PI * 2) / 30);

          room.setDiscProperties(i + 9, {
            x: pProps.x + Math.cos(angleOffset) * spiralRadius,
            y: pProps.y + Math.sin(angleOffset) * spiralRadius,
            vis: true, color: (i % 2 === 0) ? 0x4B0082 : 0x000000,
            radius: 3 + (spiralRadius / 25), // Chỉnh lại tỷ lệ size để đĩa không bị to quá đà
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }

        // 2. Lực hút thông minh (Quỹ đạo lơ lửng)
        let players = room.getPlayerList();
        for (let i = 0; i < players.length; i++) {
          let p = players[i];
          if (p.team === 0 || p.id === player.id || !p.position) continue;

          let p2Props = room.getPlayerDiscProperties(p.id);
          if (!p2Props) continue;

          let dx = pProps.x - p2Props.x;
          let dy = pProps.y - p2Props.y;
          let dist = Math.hypot(dx, dy) || 1;

          if (dist > 55) {
            // Nếu ở xa > Bị hút vào với vận tốc ổn định
            room.setPlayerDiscProperties(p.id, {
              xspeed: (dx / dist) * 7,
              yspeed: (dy / dist) * 7
            });
            room.setPlayerAvatar(p.id, "😵");
          } else {
            // Nếu đã vào gần tới tâm > Ngừng hút, chuyển sang xoáy lơ lửng quanh tâm
            room.setPlayerDiscProperties(p.id, {
              xspeed: (-dy / dist) * 4, // Lực tiếp tuyến xoay tròn
              yspeed: (dx / dist) * 4
            });
            room.setPlayerAvatar(p.id, "💫"); // Đổi avatar chóng mặt
          }
        }
      }, 50);

      setSafeTimeout(() => {
        clearInterval(blackHoleInterval);
        room.setPlayerAvatar(player.id, null);

        let currentPlayers = room.getPlayerList();
        for (let i = 0; i < currentPlayers.length; i++) {
          if (currentPlayers[i].team !== 0) room.setPlayerAvatar(currentPlayers[i].id, null);
        }
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false });
        }

        // Vụ nổ đẩy ra nhẹ khi hố đen biến mất (có điều chỉnh lực dội)
        let pProps = room.getPlayerDiscProperties(player.id);
        if (pProps) {
          for (let p of currentPlayers) {
            if (p.team === 0 || p.id === player.id) continue;
            let p2Props = room.getPlayerDiscProperties(p.id);
            if (p2Props) {
              let dx = p2Props.x - pProps.x;
              let dy = p2Props.y - pProps.y;
              let dist = Math.hypot(dx, dy) || 1;
              room.setPlayerDiscProperties(p.id, {
                xspeed: (dx / dist) * 10, // Đẩy văng ra theo hướng vector
                yspeed: (dy / dist) * 10
              });
            }
          }
        }
      }, 2500);
      break;
    }

    case 10: {
      // --- HIỆU ỨNG 10: DẢI NGÂN HÀ HOÀNG KIM ---
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "👑");
      let angle = 0;

      let auraInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;
        angle += 0.15;

        // Phân bổ 30 đĩa thành 3 lớp quỹ đạo (10 đĩa/lớp)
        for (let i = 0; i < 30; i++) {
          let layer = Math.floor(i / 10); // Lớp 0, 1, 2
          let orbitRadius = 25 + (layer * 15); // Bán kính: 25, 40, 55
          let speedMultiplier = 3 - layer; // Lớp trong quay nhanh hơn lớp ngoài
          let offset = (angle * speedMultiplier) + ((i % 10) * (Math.PI * 2 / 10));

          let colors = [0xFFD700, 0xFFA500, 0xFFFFFF]; // Vàng, Cam, Trắng

          room.setDiscProperties(i + 9, {
            x: pProps.x + Math.cos(offset) * orbitRadius,
            y: pProps.y + Math.sin(offset) * orbitRadius,
            vis: true, color: colors[layer], radius: 4 - (layer * 0.5),
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }
      }, 50);

      setSafeTimeout(() => {
        clearInterval(auraInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false });
        }
        room.setPlayerAvatar(player.id, null);
      }, 3500);
      break;
    }

    case 11: {
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "⚡");

      let blinkInterval = setSafeInterval(() => {
        room.setPlayerDiscProperties(player.id, {
          xspeed: Math.random() * 40 - 20,
          yspeed: Math.random() * 40 - 20
        });
      }, 200);

      setSafeTimeout(() => {
        clearInterval(blinkInterval);
        room.setPlayerAvatar(player.id, null);
      }, 2300);
      break;
    }

    case 12: {
      // --- HIỆU ỨNG 12: BOM HẠT NHÂN (Nuke Bomb) ---
      if (!player.position) return;
      let bombTimer = 3;
      room.setPlayerAvatar(player.id, "☢️");
      let dangerRadius = 150;

      let countdown = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        bombTimer--;
        if (bombTimer > 0) {
          room.setPlayerAvatar(player.id, bombTimer.toString());
          dangerRadius -= 40; // Vòng nguy hiểm siết lại

          // Hiển thị vòng tròn cảnh báo
          for (let i = 0; i < 30; i++) {
            let angle = i * (Math.PI * 2 / 30);
            room.setDiscProperties(i + 9, {
              x: pProps.x + Math.cos(angle) * dangerRadius,
              y: pProps.y + Math.sin(angle) * dangerRadius,
              vis: true, color: 0xFF0000, radius: 3,
              invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
            });
          }
        }
      }, 500);

      setSafeTimeout(() => {
        clearInterval(countdown);
        room.setPlayerAvatar(player.id, "💥");
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        // Đẩy văng tất cả mọi người trên sân (Áp lực cực mạnh)
        let playersOnField = room.getPlayerList();
        for (let p of playersOnField) {
          if (p.team === 0 || p.id === player.id) continue;
          let p2Props = room.getPlayerDiscProperties(p.id);
          if (!p2Props) continue;
          let dx = p2Props.x - pProps.x;
          let dy = p2Props.y - pProps.y;
          let dist = Math.hypot(dx, dy) || 1;

          room.setPlayerDiscProperties(p.id, { xspeed: (dx / dist) * 25, yspeed: (dy / dist) * 25 });
          room.setPlayerAvatar(p.id, "🚀");
        }

        // Bắn 30 đĩa ra mọi hướng như sóng xung kích
        for (let i = 0; i < 30; i++) {
          let angle = i * (Math.PI * 2 / 30);
          room.setDiscProperties(i + 9, {
            x: pProps.x, y: pProps.y,
            xspeed: Math.cos(angle) * 25, yspeed: Math.sin(angle) * 25,
            vis: true, color: 0xFF4500, radius: 8,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }
      }, 1500);

      setSafeTimeout(() => {
        room.setPlayerAvatar(player.id, null);
        for (let p of room.getPlayerList()) {
          if (p.team !== 0) room.setPlayerAvatar(p.id, null);
        }
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
      }, 2300);
      break;
    }

    case 13: {
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "☄️");
      let discIndex = 9; // 🎯 Bắt đầu từ 9

      let meteorInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        for (let i = 0; i < 2; i++) {
          let randomX = pProps.x - 400 + Math.random() * 800;
          room.setDiscProperties(discIndex, {
            x: randomX, y: -350,
            xspeed: 4 + Math.random() * 4, yspeed: 12 + Math.random() * 6,
            vis: true, color: 0xFF8C00,
            radius: 5 + Math.random() * 5,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
          discIndex++;
          if (discIndex > 38) discIndex = 9; // 🎯 Tận dụng full 30 đĩa
        }
      }, 130);

      setSafeTimeout(() => {
        clearInterval(meteorInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
        room.setPlayerAvatar(player.id, null);
      }, 2500);
      break;
    }

    case 14: {
      // --- HIỆU ỨNG 14: BÃO CUỒNG PHONG ---
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "🌪️");
      let tornadoAngle = 0;

      let tornadoInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;
        tornadoAngle += 0.4;

        // Tạo 3 tầng lốc xoáy (10 đĩa mỗi tầng)
        for (let i = 0; i < 30; i++) {
          let layer = Math.floor(i / 10);
          let layerRadius = 20 + (layer * 15); // Lốc xoáy to dần ra ngoài
          let offsetAngle = tornadoAngle + (i * (Math.PI * 2 / 10)) + (layer * 0.5); // Xoắn ốc

          room.setDiscProperties(i + 9, {
            x: pProps.x + Math.cos(offsetAngle) * layerRadius,
            y: pProps.y + Math.sin(offsetAngle) * layerRadius,
            xspeed: Math.cos(offsetAngle + Math.PI / 2) * 5, // Vận tốc xoay
            yspeed: Math.sin(offsetAngle + Math.PI / 2) * 5,
            vis: true, color: 0x87CEEB, radius: 4 + layer,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }

        // Kéo và xoáy đối thủ
        let currentPlayers = room.getPlayerList();
        for (let p of currentPlayers) {
          if (p.team === 0 || p.id === player.id) continue;
          let p2Props = room.getPlayerDiscProperties(p.id);
          if (!p2Props) continue;

          let dx = pProps.x - p2Props.x;
          let dy = pProps.y - p2Props.y;
          let distSq = dx * dx + dy * dy;

          if (distSq < 40000) { // Phạm vi bão rộng hơn
            let dist = Math.hypot(dx, dy) || 1;
            room.setPlayerDiscProperties(p.id, {
              xspeed: p2Props.xspeed * 0.7 + (dx / dist) * 3 + (-dy / dist) * 4,
              yspeed: p2Props.yspeed * 0.7 + (dy / dist) * 3 + (dx / dist) * 4
            });
            room.setPlayerAvatar(p.id, "😵‍💫");
          }
        }
      }, 50); // Tick rate nhanh hơn để lốc xoáy mượt hơn

      setSafeTimeout(() => {
        clearInterval(tornadoInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
        for (let p of room.getPlayerList()) {
          if (p.team !== 0) room.setPlayerAvatar(p.id, null);
        }
      }, 2500);
      break;
    }
  };
}

// === BỘ QUẢN LÝ TIẾN TRÌNH HIỆU ỨNG (CHỐNG RÒ RỈ RAM) ===
let activeEffectIntervals = [];
let activeEffectTimeouts = [];

// Hàm bao bọc an toàn để ghi nhớ tiến trình
function setSafeInterval(callback, ms) {
  let id = setInterval(callback, ms);
  activeEffectIntervals.push(id);
  return id;
}

function setSafeTimeout(callback, ms) {
  let id = setTimeout(callback, ms);
  activeEffectTimeouts.push(id);
  return id;
}

function cleanupEffectDiscs() {
  // Thêm ngoặc đơn () quanh cụm check stadium để logic AND/OR chạy chuẩn xác
  if ((stadium && stadium.name === "penalty") || isTakingPenalty) return;

  // 1. DẬP TẮT TOÀN BỘ ĐỒNG HỒ NGẦM ĐANG CHẠY (Chống tràn RAM cực mạnh)
  if (typeof activeEffectIntervals !== 'undefined') {
    activeEffectIntervals.forEach(clearInterval);
    activeEffectIntervals = [];
  }
  if (typeof activeEffectTimeouts !== 'undefined') {
    activeEffectTimeouts.forEach(clearTimeout);
    activeEffectTimeouts = [];
  }

  // 2. 🎯 Dọn 30 đĩa hiệu ứng rác (Từ ID 9 đến 38) & Chống Crash
  for (let i = 9; i <= 38; i++) {
    try {
      room.setDiscProperties(i, {
        x: 10000, y: 10000,
        vis: false, xspeed: 0, yspeed: 0
      });
    } catch (e) {
      // Nhẹ nhàng bỏ qua nếu map hiện tại không có đủ 38 đĩa
    }
  }

  // 3. Xóa mọi Emoji (Avatar) bị kẹt do hiệu ứng ngắt giữa chừng
  let players = room.getPlayerList();
  for (let i = 0; i < players.length; i++) {
    if (players[i].team !== 0) room.setPlayerAvatar(players[i].id, null);
  }
}

function showSpecTable() {
  if (!isPicking) return;
  const capId = captains[pickTurn];
  if (!capId) return;

  let playerList = getSpectators().map((player, index) => {
    let auth = getAuth(player.id);
    let clanPrefix = "";
    let points = 0; // Khởi tạo biến lưu số Sao

    if (auth) {
      let stats = getStats(auth);
      if (stats) {
        // Lấy số sao hiện có (nếu chưa có thì mặc định là 0)
        points = stats.points || 0;

        // Kiểm tra Clan
        if (stats.clan && clans[stats.clan]) {
          let icon = clans[stats.clan].icon || "";
          clanPrefix = `[${icon}${stats.clan}] `;
        }
      }
    }

    // Ghép số sao (★) vào trước số thứ tự (#)
    return `[#${index + 1}] ${clanPrefix}${player.name} (${points}★)`;
  });

  let table = " ".repeat(85) + "DANH SÁCH DỰ BỊ\n" + "_".repeat(150) + "\n" + playerList.join("  •  ") + "\n" + "_".repeat(150);
  room.sendAnnouncement(table, captains[pickTurn], BLUE, "small-bold", 2);
  room.sendAnnouncement("Hướng dẫn: nhập số hoặc tag để chọn người chơi (VD: 2 hoặc @32MBVRAM). Nhập '0' để tự động chọn người chơi có thống kê tốt nhất", captains[pickTurn], YELLOW, "small", 0);
}

function isPlayerValid(player) {
  if (player.name.trim().length == 0) {
    room.kickPlayer(player.id, "Người chơi không có tên");
    return false;
  };
  if (INVISIBLE_CHARACTERS.some(char => player.name.includes(char))) {
    room.kickPlayer(player.id, "Tên người chơi chứa kí tự không hợp lệ");
    return false;
  };

  let tag = getTag(player.name.trim());
  for (const _player of room.getPlayerList()) {
    if (_player.id == player.id) continue;
    if ((_player.id != 0) && (getConn(_player.id) == player.conn)) {
      room.kickPlayer(_player.id, "Bạn đã vào room bằng 1 tab khác");
      continue;
    };
    if (getTag(_player.name.trim()) == tag) {
      room.kickPlayer(player.id, "Bạn đã trùng tên với một người khác trong room, xin vui lòng đổi lại");
      return false;
    };
  };
  return true;
}

async function checkBan(player) {
  let bans = JSON.parse(localStorage.getItem("bans")) || [];
  for (let i = 0; i < bans.length; i++) {
    if (bans[i][0] != player.conn) continue;
    bans[i][0] = player.id;
    setTimeout(ban.bind(null, ...bans[i]), 3000);
    bans.splice(i, 1);
    break;
  };
  localStorage.setItem("bans", JSON.stringify(bans));
}

function saveIdentities(player) {
  identities[player.id] = [player.auth, player.conn];
}

function canUseCommand(command, player) {
  if (!command[1].includes(MODE)) return false;
  if (getRole(player) < command[2]) return false;
  if (isCaptain(player.id) < command[3]) return false;
  return true;
}

let afkPositions = {};

function afkCallback(id) {
  let player = room.getPlayer(id);
  if (!player || player.team === 0) {
    delete timeouts.toAct[id];
    delete afkPositions[id];
    return;
  }

  // 🎯 THÊM DÒNG NÀY ĐỂ KHÓA VAN AN TOÀN CHO 1V1 VÀ TRAINING
  if (stadium && (stadium.name === "1v1" || stadium.name === "training")) return;

  // 🛡️ BẢO HIỂM 1: Người chơi vừa vào sân, nhân vật chưa kịp Load.
  if (!player.position) {
    //... (phần code dưới giữ nguyên)
    timeouts.toAct[id] = setTimeout(afkCallback.bind(null, id), ACTIVITY_TIMEOUT * 1000);
    return;
  }

  // 🛡️ BẢO HIỂM 2: Nếu Radar bị mất dấu tọa độ gốc của họ
  // -> Lưu lại tọa độ hiện tại làm mốc và bắt đầu đếm 10s.
  if (!afkPositions[id]) {
    afkPositions[id] = { x: player.position.x, y: player.position.y };
    timeouts.toAct[id] = setTimeout(afkCallback.bind(null, id), ACTIVITY_TIMEOUT * 1000);
    return;
  }

  // 🎯 KIỂM TRA CHUYỂN ĐỘNG VẬT LÝ
  let dx = player.position.x - afkPositions[id].x;
  let dy = player.position.y - afkPositions[id].y;
  let dist = Math.hypot(dx, dy);

  // Nếu có di chuyển hơn 5 đơn vị -> Đang đá bình thường! Reset giờ.
  if (dist > 5) {
    afkPositions[id] = { x: player.position.x, y: player.position.y };
    timeouts.toAct[id] = setTimeout(afkCallback.bind(null, id), ACTIVITY_TIMEOUT * 1000);
    return;
  }

  // Nếu thực sự đứng im phăng phắc suốt 10 giây -> Trảm!
  room.kickPlayer(id, "AFK");
  delete timeouts.toAct[id];
  delete afkPositions[id];
}

function oversleepCallback(id) {
  let player = room.getPlayer(id);
  if (player && getRole(player) >= ROLE.ADMIN) {
    // Hủy lệnh kick nếu người đó là Admin
    delete timeouts.toQuitAfk[id];
    return;
  }
  room.kickPlayer(id, "Bạn đã AFK quá lâu");
  delete timeouts.toQuitAfk[id];
}

function penaltyTimeoutCallback() {
  if (!isTakingPenalty) return;
  room.sendChat("Cầu thủ đã không thực hiện penalty trong thời gian quy định");
  game.penalty.push(false);
  takePenalty();
}

function getGameStatus() {
  let scores = room.getScores();
  return (
    (scores !== null) &&
    (Math.max(scores.red, scores.blue, 0.5) != scores.scoreLimit) &&
    ((scores.red == scores.blue) || (scores.time < scores.timeLimit))
  );
}

let isUpdatingTeams = false;
async function updateTeamPlayers() {
  // Nếu game chưa bắt đầu, hoặc đang chọn người, hoặc đang bận xếp team thì dừng
  if (getGameStatus() === false || isPicking || isUpdatingTeams) return;

  isUpdatingTeams = true; // Khóa chống spam (Anti-Race condition)
  try {
    let players = getNonAfkPlayers();
    let redPlayers = players.filter(player => player.team == 1);
    let bluePlayers = players.filter(player => player.team == 2);

    let currentMaxPlayers = MAX_PLAYERS;
    if (typeof stadium !== "undefined" && stadium.name) {
      if (stadium.name.includes("3v3")) currentMaxPlayers = 3;
      if (stadium.name.includes("1v1")) currentMaxPlayers = 2;
    }
    if (typeof isTakingPenalty !== "undefined" && isTakingPenalty) currentMaxPlayers = 1;

    // Nếu đã đủ người thì không làm gì cả
    if ((redPlayers.length >= currentMaxPlayers) && (bluePlayers.length >= currentMaxPlayers)) return;

    let missingTeam = (redPlayers.length > bluePlayers.length) ? 2 : (redPlayers.length < bluePlayers.length) ? 1 : 0;
    let subPlayers = players.filter(player => player.team == 0);

    if (subPlayers.length == 1 || (typeof isTakingPenalty !== "undefined" && isTakingPenalty)) {
      if (missingTeam == 0) return;
      room.setPlayerTeam(subPlayers[0].id, missingTeam);
    } else if (subPlayers.length > 1) {
      if (players.length <= currentMaxPlayers * 2 && missingTeam == 0) {
        room.setPlayerTeam(subPlayers[0].id, 1);
        room.setPlayerTeam(subPlayers[1].id, 2);
      } else if (MODE === "pick") {
        startPickMode(); // Có dư người thì cho dừng trận chuyển sang Pick
      }
    } else if (players.length > 1 && missingTeam != 0) {
      // Nếu có team bị dư người, kick người cuối cùng ra Spec
      room.setPlayerTeam(((missingTeam == 1) ? bluePlayers : redPlayers).at(-1).id, 0);
    }
  } finally {
    isUpdatingTeams = false; // Mở khóa
  }
}
function updateBallKick(player) {
  if (!isPlaying) return;
  let ballProperties = room.getDiscProperties(0);
  game.ballRecords.unshift(new Kick(ballProperties, player));
  game.ballRecords.pop();

  if (game.ballRecords[1] === null) {
    canPause = false;
    return;
  };

  let timeGap = game.ballRecords[0].time - game.ballRecords[1].time;
  let travelingDistance = getDistance(ballProperties.x - game.ballRecords[1].properties.x, ballProperties.y - game.ballRecords[1].properties.y);
  let stats = getGameStats(player);
  stats.touches++;
  if (
    game.ballRecords[1].isAShot &&
    (timeGap < 1) &&
    (travelingDistance < stadium.playerRadius)
  ) {
    getGameStats(game.ballRecords[1].player.id).shotsOnTarget--;
    game.ballRecords[1].isAShot = false;
  } else if (game.ballRecords[0].isAShot) {
    stats.shotsOnTarget++;
  } else if (Math.abs(ballProperties.x + ballProperties.xspeed * 100) < stadium.goalLine.x) {
    let scores = room.getScores();
    if ((scores.timeLimit != 0) && (scores.time - scores.timeLimit > MAX_ADDED_TIME)) {
      startPenaltyShootout();
      return;
    };
  };

  stats = getGameStats(game.ballRecords[1].player);
  if ((game.ballRecords[2] !== null) && game.ballRecords[2].isAShot && (game.ballRecords[1].player.team != game.ballRecords[2].player.team)) stats.stoppedShots++;
  if (player.team != game.ballRecords[1].player.team) return;
  if ((player.id != game.ballRecords[1].player.id) && (travelingDistance > 12)) stats.passes++;
  game.teams[player.team].possession += timeGap;
}

async function updateCaptain(teamId, newCaptain) {
  let players = getNonAfkPlayers();
  if (!newCaptain) {
    newCaptain = (typeof isTakingPenalty !== "undefined" && isTakingPenalty && game && game.penalty) ? room.getPlayer(game.penalty.groups[teamId - 1].at(0)) : (
      players.find(player => (player.team == teamId) && !isCaptain(player.id)) ||
      players.find(player => player.team == 0 && !isCaptain(player.id)) ||
      players.find(player => (player.team == getOppositeTeamId(teamId)) && !isCaptain(player.id))
    );
    if (!newCaptain) {
      captains[teamId] = 0;
      return;
    };
  };

  let oldCaptainId = captains[teamId];
  captains[teamId] = newCaptain.id;

  if (newCaptain.team == teamId) {
    if (oldCaptainId !== 0 && room.getPlayer(oldCaptainId)) room.reorderPlayers([oldCaptainId], false);
  } else if (typeof isTakingPenalty !== "undefined" && isTakingPenalty && game && game.penalty) {
    game.penalty.groups[teamId - 1] = game.penalty.groups[teamId - 1].filter(id => id != oldCaptainId);
    game.penalty.groups[teamId - 1].includes(newCaptain.id) || game.penalty.groups[teamId - 1].unshift(newCaptain.id);
  } else {
    room.setPlayerTeam(newCaptain.id, teamId);
    // Ngăn chặn lỗi kick nhầm Player 0 (Host)
    if (oldCaptainId !== 0 && room.getPlayer(oldCaptainId)) room.setPlayerTeam(oldCaptainId, 0);
  };

  room.sendAnnouncement(`${newCaptain.name} đã được chọn làm đội trưởng của ${TEAM_NAMES[teamId]}`, null, GREEN, "bold", 0);

  if (isPicking && (pickTurn == teamId)) {
    clearTimeout(timeouts.toPick);
    requestPick();
  };
}
function checkAutoPick() {
  if (typeof isTakingPenalty !== 'undefined' && isTakingPenalty) return false;
  if (!isPicking) return false;

  let specPlayers = [];
  let redPlayersCount = 0;
  let bluePlayersCount = 0;

  room.getPlayerList().forEach(function (player) {
    if (afkList.has(player.id)) return;
    switch (player.team) {
      case 0:
        specPlayers.push(player);
        break;
      case 1:
        redPlayersCount++;
        break;
      case 2:
        bluePlayersCount++;
    };
  });

  let currentMaxPlayers = MAX_PLAYERS;
  if (stadium && stadium.name && stadium.name.includes("3v3")) currentMaxPlayers = 3;
  if (stadium && stadium.name && stadium.name.includes("1v1")) currentMaxPlayers = 2;

  if ((redPlayersCount >= currentMaxPlayers) && (bluePlayersCount >= currentMaxPlayers)) {
    endPickMode();
    return true;
  };
  if ((redPlayersCount == bluePlayersCount) && ((specPlayers.length == 1) || (redPlayersCount >= currentMaxPlayers))) {
    endPickMode();
    return true;
  };
  if (specPlayers.length == 0) {
    endPickMode();
    return true;
  };
  if (Math.abs(redPlayersCount - bluePlayersCount) < specPlayers.length) return false;

  let targetTeam = (redPlayersCount > bluePlayersCount) ? 2 : 1;
  let targetCount = (targetTeam == 1) ? redPlayersCount : bluePlayersCount;
  for (const player of specPlayers) {
    if (targetCount >= currentMaxPlayers) break;
    room.setPlayerTeam(player.id, targetTeam);
    targetCount++;
  };

  endPickMode();
  return true;
}
function endPickMode() {
  isPicking = false;
  clearTimeout(timeouts.toPick);
  let scores = room.getScores();

  // Nếu đang giữa trận thì nhả Pause, nếu đầu trận thì Start
  if (scores !== null) {
    pausedBy = 0;
    room.pauseGame(false);
  } else {
    room.startGame();
  }
}

function requestPick() {
  if (!isPicking || checkAutoPick()) return;
  let players = room.getPlayerList().filter(p => !afkList.has(p.id));
  let redPlayersCount = players.filter(player => player.team == 1).length;
  let bluePlayersCount = players.filter(player => player.team == 2).length;
  pickTurn = (redPlayersCount > bluePlayersCount) ? 2 : 1;

  // 🎯 CHỐT CHẶN ANTI-RACE CONDITION: Đội tới lượt nhưng MẤT ĐỘI TRƯỞNG -> Cập nhật gấp
  if (!captains[pickTurn] || !room.getPlayer(captains[pickTurn])) {
    updateCaptain(pickTurn);
    return; // Hàm updateCaptain sẽ tự động gọi lại requestPick() sau khi tìm được người
  }

  room.sendAnnouncement(`${TEAM_NAMES[pickTurn]} đang chọn người chơi...`, null, YELLOW, "small", 0);
  if (typeof showSpecTable === "function") showSpecTable();
  room.sendAnnouncement("Đã đến lượt bạn chọn người chơi", captains[pickTurn], YELLOW, "bold", 2);

  clearTimeout(timeouts.toPick);
  timeouts.toPick = setTimeout(() => {
    // Chỉ kick nếu đội trưởng tồn tại và không phải là Host (0)
    if (captains[pickTurn] && captains[pickTurn] !== 0) {
      room.kickPlayer(captains[pickTurn], "Bạn đã không chọn người chơi trong thời gian quy định");
    }
  }, ((Math.min(redPlayersCount, bluePlayersCount) > 1) ? PICK_TIMEOUT : FIRST_PICK_TIMEOUT) * 1000);
}

function helpFunc(value, player) {
  let allAlias = Object.keys(commands).filter(alias => canUseCommand(commands[alias], player));
  allAlias = allAlias.map(alias => "!" + alias)
  room.sendAnnouncement(`Các câu lệnh có sẵn: ${allAlias.join(", ")}`, player.id, GREEN);
  return false;
}

function discordFunc(value, player) {
  if (!DISCORD_LINK) {
    room.sendAnnouncement(`Room hiện chưa có server Discord`, player.id, YELLOW, "normal", 0);
    return false;
  };
  room.sendAnnouncement(`Vào server Discord của Admin(Dyck Gang) 🥰: ${DISCORD_LINK}`, null, GREEN, "normal", 0);
  return true;
}

// 🚨 HÀM BÁO CÁO LỖI ROOM - Gửi webhook lên Discord và tag Admin
const reportCooldowns = new Map(); // Chống spam lệnh !report
const REPORT_COOLDOWN_MS = 60 * 1000; // 60 giây cooldown mỗi người

function reportFunc(value, player) {
  if (!value || value.trim().length < 5) {
    room.sendAnnouncement(
      "❌ Vui lòng mô tả lỗi rõ hơn (ít nhất 5 ký tự). Ví dụ: !report room bị lỏ không đá được",
      player.id, 0xFF4444, "bold", 0
    );
    return false;
  }

  // Kiểm tra cooldown
  let now = Date.now();
  let lastUsed = reportCooldowns.get(player.id) || 0;
  if (now - lastUsed < REPORT_COOLDOWN_MS) {
    let remaining = Math.ceil((REPORT_COOLDOWN_MS - (now - lastUsed)) / 1000);
    room.sendAnnouncement(
      `⏳ Bạn đã gửi báo cáo gần đây. Vui lòng đợi thêm ${remaining} giây.`,
      player.id, YELLOW, "bold", 0
    );
    return false;
  }
  reportCooldowns.set(player.id, now);

  // Thông báo trong phòng
  room.sendAnnouncement(
    `🚨 ${player.name} đã gửi báo cáo lỗi: "${value}" — Admin đang được thông báo trên Discord!`,
    null, 0xFF6600, "bold", 0
  );

  // Gửi lên Discord webhook dạng Embed
  let tags = REPORT_TAG_USER_IDS.map(id => `<@${id}>`).join(" ");
  let payload = {
    content: tags,
    embeds: [{ color: 0xFF4400, title: "🚨 Báo cáo lỗi room", description: `**${player.name}:** ${value}` }],
  };

  fetch(DISCORD_REPORT_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(err => console.error("Report webhook error:", err));

  return true;
}

function roleFunc(value, player) {
  let auth = getAuth(player.id);
  if (!auth) return false;

  let stats = getStats(auth);
  let points = stats.points || 0;

  // CHẶN HOÀN TOÀN DƯỚI 150 SAO
  if (points < 150) {
    room.sendAnnouncement(`❌ Bạn cần đạt Rank 💎 Superstar (150★) để mở khóa tính năng tự tạo Role! (Hiện tại: ${points}★)`, player.id, 0xFF4444, "bold", 1);
    return false;
  }

  // HƯỚNG DẪN KHI GÕ THIẾU THAM SỐ
  if (!value || value.trim() === "") {
    let guideMsg = "💡 HƯỚNG DẪN TẠO ROLE TÙY CHỈNH:\n";
    guideMsg += "- 💎 150★ (Superstar): !role <MãMàuHEX> hoặc !role random\n";
    guideMsg += "- 🌟 300★ (Master): Mở khóa lệnh !role style <bold | italic | small | small-bold | small-italic | normal>\n";
    guideMsg += "- 🏆 500★ (Champion): Đổi Tên (10 ký tự). VD: !role FF0000 <Tên>\n";
    guideMsg += "- 👑 1000★ (Legend): Đổi Tên dài hơn (15 ký tự).\n";
    guideMsg += "- 🗑️ Xóa cài đặt: !role clear [name / color / style / all]";
    room.sendAnnouncement(guideMsg, player.id, 0x00FFFF, "bold", 1);
    return false;
  }

  let parts = value.trim().split(" ");
  let firstWord = parts[0].toLowerCase();

  // XỬ LÝ LỆNH XÓA (CLEAR)
  if (firstWord === "clear" || firstWord === "xoa") {
    let target = (parts[1] || "all").toLowerCase();
    if (target === "name" || target === "ten") {
      stats.customRole = null;
      room.sendAnnouncement("✅ Đã gỡ bỏ Tên Custom Role.", player.id, 0x00FF00, "bold", 2);
    } else if (target === "color" || target === "mau") {
      stats.customColor = null;
      room.sendAnnouncement("✅ Đã gỡ bỏ Màu Custom.", player.id, 0x00FF00, "bold", 2);
    } else if (target === "style" || target === "kieu") {
      stats.customFontStyle = null;
      room.sendAnnouncement("✅ Đã gỡ bỏ Kiểu chữ Custom, trở về mặc định.", player.id, 0x00FF00, "bold", 2);
    } else {
      stats.customRole = null;
      stats.customColor = null;
      stats.customFontStyle = null;
      room.sendAnnouncement("✅ Đã gỡ bỏ toàn bộ Tên, Màu và Kiểu Chữ Custom Role.", player.id, 0x00FF00, "bold", 2);
    }
    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));
    return false;
  }

  // XỬ LÝ LỆNH STYLE (ĐỔI KIỂU CHỮ CHO >= 300 SAO)
  if (firstWord === "style" || firstWord === "kieu") {
    if (points < 300) {
      room.sendAnnouncement("❌ Tính năng đổi Kiểu Chữ chỉ dành cho Rank 🌟 Master (300★ trở lên)!", player.id, 0xFF4444, "bold", 1);
      return false;
    }
    let chosenStyle = parts[1] ? parts[1].toLowerCase() : "";
    let validStyles = ["bold", "italic", "small", "small-bold", "small-italic", "normal"];

    if (!validStyles.includes(chosenStyle)) {
      room.sendAnnouncement("❌ Kiểu chữ không hợp lệ! Vui lòng chọn 1 trong các kiểu sau:\n👉 bold, italic, small, small-bold, small-italic, normal.", player.id, 0xFF4444, "bold", 1);
      return false;
    }

    stats.customFontStyle = chosenStyle;
    delete stats.auth;
    localStorage.setItem(auth, JSON.stringify(stats));
    room.sendAnnouncement(`✅ Đã cập nhật Kiểu Chữ kênh chat của bạn thành: ${chosenStyle}`, player.id, 0x00FF00, chosenStyle, 2);
    return false;
  }

  let roleName = "";
  let isTryingToChangeColor = false;
  let newColorVal = null;

  if (firstWord === "random") {
    isTryingToChangeColor = true;
    newColorVal = Math.floor(Math.random() * 16777215);
    parts.shift();
    roleName = parts.join(" ").trim();
  } else if (/^[0-9a-f]{6}$/i.test(firstWord)) {
    isTryingToChangeColor = true;
    newColorVal = parseInt(firstWord, 16);
    parts.shift();
    roleName = parts.join(" ").trim();
  } else {
    roleName = value.trim();
  }

  // KIỂM TRA ĐIỀU KIỆN ĐỔI TÊN (PHẢI TỪ 500 SAO TRỞ LÊN)
  if (roleName !== "") {
    if (points < 500) {
      room.sendAnnouncement("❌ Bạn cần đạt Rank 🏆 Champion (500★) mới được phép đổi Tên Role! Lệnh bị từ chối.", player.id, 0xFF4444, "bold", 1);
      return false;
    }
    let maxLength = points >= 1000 ? 15 : 10; // Cấp càng cao tên càng dài
    if (roleName.length > maxLength) {
      room.sendAnnouncement(`❌ Tên Role quá dài! Giới hạn hiện tại của bạn là ${maxLength} ký tự.`, player.id, 0xFF4444, "bold", 1);
      return false;
    }
    stats.customRole = roleName;
  }

  // CẬP NHẬT MÀU MỚI
  if (isTryingToChangeColor) {
    stats.customColor = newColorVal;
  }

  delete stats.auth;
  localStorage.setItem(auth, JSON.stringify(stats));

  // RENDER THÔNG BÁO CHO NGƯỜI DÙNG
  let finalRoleStr = (points >= 500 && stats.customRole) ? stats.customRole : getFootballRole(points).roleName;
  let finalColor = (stats.customColor !== null && stats.customColor !== undefined) ? stats.customColor : getFootballRole(points).color;
  let hexColorStr = "#" + finalColor.toString(16).padStart(6, '0').toUpperCase();
  let finalStyle = (points >= 300 && stats.customFontStyle) ? stats.customFontStyle : "bold";

  room.sendAnnouncement(`✅ Đã cập nhật Custom Role: [${finalRoleStr}] (Màu hiển thị: ${hexColorStr}).`, player.id, finalColor, finalStyle, 2);

  return false;
}

function byeFunc(value, player) {
  room.kickPlayer(player.id, "Bye, sớm quay lại room nha 👋🏻🥺");
  return false;
}

function showStatsFunc(value, player) {
  let showPlayer;
  if (!value) {
    showPlayer = player;
  } else {
    showPlayer = getPlayerByName(value);
    if (showPlayer === undefined) {
      room.sendAnnouncement(`Người chơi "${value}" không tồn tại hoặc đã rời đi`, player.id, RED);
      return false;
    };
  };
  let item = getStats(getAuth(showPlayer.id));
  room.sendAnnouncement(`Thống kê trong tháng ${getMonths()} của ${showPlayer.name} (${item.points} sao):`, player.id, BLUE, "bold", 0);
  room.sendAnnouncement(`│⚽ Bàn thắng: ${item.goals}
│🤝🏻 Kiến tạo: ${item.assists}
│❌ Bàn thắng phản lưới nhà: ${item.ownGoals}
│🧤 Sạch lưới: ${item.cleansheets}
│✨ Cầu thủ xuất sắc nhất trận: ${item.motms}
│🔰 Số trận đã chơi: ${item.games}
│🏆 Tỉ lệ thắng: ${item.getWinRate()}%`, player.id, BLUE, "small-bold", 0);
  return false;
}

function showRankingsFunc(value, player) {
  let playerList = getPlayerStats();
  if (playerList.length == 0) {
    room.sendAnnouncement("Chưa có dữ liệu người chơi", player.id, RED);
    return false;
  };

  playerList.sort(function (player1, player2) {
    if (player1.points == player2.points) {
      return player2.goals + player2.assists - player1.goals - player1.assists;
    };
    return player2.points - player1.points;
  })
  let msg = `⭐ Danh sách cầu thủ hàng đầu tháng ${getMonths()} ⭐: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.points} ⭐)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;
  playerList.sort(function (player1, player2) {
    if (player1.goals == player2.goals) {
      return player2.assists - player1.assists;
    };
    return player2.goals - player1.goals;
  })
  msg += `\n⚽ Danh sách ghi bàn hàng đầu tháng ${getMonths()} ⚽: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.goals} ⚽)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;

  playerList.sort(function (player1, player2) {
    if (player1.assists == player2.assists) {
      return player2.goals - player1.goals;
    };
    return player2.assists - player1.assists;
  });
  msg += `\n👟 Danh sách kiến tạo hàng đầu tháng ${getMonths()} 👟: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.assists} 👟)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;

  room.sendAnnouncement(msg, player.id, YELLOW, "small-italic", 0);
  return false;
}

function kickAfkFunc(value, player) {
  if (!isPlaying) {
    room.sendAnnouncement("Chỉ có thể báo cáo AFK khi trận đấu đang diễn ra", player.id, RED);
    return false;
  };

  trackAfk();
  room.sendAnnouncement("Đang theo dõi AFK, AFK sẽ sớm bị kick", null, GREEN);
  return true;
}

function specFunc(value, player) {
  let scores = room.getScores();
  let isSuperAdmin = (typeof getRole === "function" && getRole(player) >= ROLE.SUPER_ADMIN);

  // 👑 Nếu KHÔNG PHẢI Super Admin thì mới bị chặn
  if (!isSuperAdmin) {
    if (isPicking && scores !== null) {
      room.sendAnnouncement("⚠️ Lệnh bị khóa: Không thể ra Spec khi đang Pause Pick giữa trận!", player.id, 0xFF4444, "bold", 2);
      return false;
    }

    if (typeof isTakingPenalty !== 'undefined' && isTakingPenalty) {
      room.sendAnnouncement("⚠️ Lệnh bị khóa: Cấm đào ngũ khi đang sút Luân lưu!", player.id, 0xFF4444, "bold", 2);
      return false;
    }
  }

  if (player.team === 0) {
    room.sendAnnouncement("Bạn đã ở Spectators", player.id, 0xFF4444);
    return false;
  }

  let spectatorsCount = room.getPlayerList().filter(p => p.team === 0 && !afkList.has(p.id)).length;
  // Bot cũng sẽ du di luôn cho SuperAdmin nếu muốn ra Spec dù hết người thay (nếu ngài muốn)
  if (spectatorsCount === 0 && (!isPicking || scores !== null) && !isSuperAdmin) {
    room.sendAnnouncement("Đã hết người chơi để thay vào", player.id, 0xFF4444);
    return false;
  };

  let isCap = (player.id === captains[1]) ? 1 : (player.id === captains[2]) ? 2 : 0;
  if (isCap !== 0) {
    updateCaptain(isCap);
    if (isPicking) room.sendChat(`⚠️ Đội trưởng ${TEAM_NAMES[isCap]} đã xin ra ghế dự bị. Đang chuyển quyền cho người khác...`);
  }

  room.setPlayerTeam(player.id, 0);
  room.sendAnnouncement("Bạn đã được di chuyển ra Spectators", player.id, 0x22C55E);

  if (isPicking && scores === null) {
    if (typeof checkAutoPick === "function") { checkAutoPick() || showSpecTable(); }
  }

  if (typeof updateTeamPlayers === "function") updateTeamPlayers();
  if (typeof punishQuitGame === "function" && !isSuperAdmin) punishQuitGame(player); // Tha luôn không trừ sao đào ngũ cho Sếp
  return true;
}
function listCaptainsFunc(value, player) {
  for (let teamId = 1; teamId < 3; teamId++) {
    if (captains[teamId] !== 0) {
      let capPlayer = room.getPlayer(captains[teamId]);
      // Thêm lớp khiên bảo vệ: Kiểm tra xem capPlayer có bị Null (vừa thoát game) hay không
      if (capPlayer) {
        room.sendAnnouncement(`Đội trưởng của ${TEAM_NAMES[teamId]}: ${capPlayer.name}`, null, GREEN, "normal", 0);
      }
    }
  }
}

function predictFunc(prediction, player) {
  if (player.team != 0) {
    room.sendAnnouncement("Cầu thủ không được tham gia dự đoán để tránh hiện tượng bán độ", player.id, RED);
    return false;
  };
  if (!prediction) {
    room.sendAnnouncement("Vui lòng cung cấp một tỉ số hợp lệ, có dạng RED-BLUE (VD: 3-1)", player.id, RED);
    return false;
  };
  if (Object.values(predictions).some(predictors => predictors.includes(player.id))) {
    room.sendAnnouncement("Bạn chỉ có thể thực hiện một dự đoán trong một trận đấu", player.id, RED);
    return false;
  };
  let scores = room.getScores();
  if (isTakingPenalty || (scores === null) || (scores.time > PREDICTION_PERIOD) || (scores.red + scores.blue != 0)) {
    room.sendAnnouncement("Chưa thể đoán tỉ số hoặc đã hết thời hạn dự đoán tỉ số", player.id, RED);
    return false;
  };

  let score = prediction.split("-").map(goals => Number(goals));
  if ((score.length != 2) || score.some(goals => goals % 1 !== 0)) {
    room.sendAnnouncement("Tỉ số không hợp lệ, vui lòng đảm bảo tỉ số có dạng RED-BLUE (VD: 2-1)", player.id, RED);
    return false;
  };
  let scoreLimit = room.getScores().scoreLimit;
  if ((scoreLimit != 0) && (score.some(goals => goals > scoreLimit) || (score[0] + score[1] == scoreLimit * 2))) {
    room.sendAnnouncement("Tỉ số không thể xảy ra", player.id, RED);
    return false;
  };
  prediction = score.join("-");
  if (predictions[prediction] === undefined) {
    predictions[prediction] = [player.id];
  } else if ((MODE != "pick") && (predictions[prediction].length <= MAX_PLAYERS)) {
    predictions[prediction].push(player.id);
  } else {
    room.sendAnnouncement("Đã có đủ người dự đoán tỉ số này, vui lòng dự đoán tỉ số khác", player.id, RED);
    return false;
  };

  room.sendAnnouncement(`${player.name} đã dự đoán tỉ số RED ${prediction} BLUE`, null, GREEN);
  return false;
}

function surrenderFunc(value, player) {
  if (player.team == 0) {
    room.sendAnnouncement("Bạn không thể sử dụng lệnh này", player.id, RED);
    return false;
  };
  let scores = room.getScores();
  if (isTakingPenalty || (scores === null)) {
    room.sendAnnouncement("Lệnh không khả dụng lúc này", player.id, RED);
    return false;
  };
  if (scores.time < 60 * TIME_LIMIT / 2) {
    room.sendAnnouncement("Chưa đủ thời gian chơi tối thiểu để có thể đầu hàng, vui lòng đợi thêm", player.id, RED);
    return false;
  };
  if ((player.team == 1) ? (scores.red >= scores.blue) : (scores.blue >= scores.red)) {
    room.sendAnnouncement("Bạn chỉ có thể đầu hàng khi đội đang thua", player.id, RED);
    return false;
  };
  if (surrenderVoter.hasVoted(player)) {
    room.sendAnnouncement("Bạn đã bỏ phiếu đầu hàng trước đó", player.id, RED);
    return false;
  }

  surrenderVoter.vote(player);
  return false;
}

function subFunc(value, player) {
  if (isPicking) {
    room.sendAnnouncement("⚠️ Lệnh thay người bị khóa: Hệ thống đang điều phối nhân sự tự động. Hãy gõ số để Pick!", player.id, RED, "bold");
    return false;
  }

  if (isTakingPenalty || (room.getScores() === null)) {
    room.sendAnnouncement("Bạn chỉ có thể thay người khi trận đấu đang diễn ra", player.id, RED);
    return false;
  };
  if (game.teams[player.team].substitutions >= MAX_SUBSTITUTIONS) {
    room.sendAnnouncement("Bạn đã hết lượt thay người", player.id, RED);
    return false;
  };
  let sub = value.split(" ", 2);
  if (sub[0] == "") {
    room.sendAnnouncement("Đặt cầu thủ muốn thay ra TRƯỚC cầu thủ muốn thay vào, bỏ trống vị trí thay vào nếu muốn tự động thay vào cầu thủ có thống kê tốt nhất trong room (VD: !sub @a @b hoặc !sub @a)", player.id, RED);
    return false;
  };

  let [outPlayer, inPlayer] = [getPlayerByName(sub[0]), getPlayerByName(sub[1]) || getBestSpectatorByStats()];
  if (!inPlayer || !outPlayer) {
    room.sendAnnouncement("Một trong hai hoặc cả hai cầu thủ không tồn tại hoặc đã rời đi", player.id, RED);
    return false;
  };
  if (inPlayer.team != 0) {
    room.sendAnnouncement("Chỉ có thể thay vào người chơi từ Spectators", player.id, RED);
    return false;
  };
  if (afkList.has(inPlayer.id)) {
    room.sendAnnouncement("Người chơi bạn muốn thay vào đang ở trạng thái AFK", player.id, RED);
    return false;
  };

  // --- CHỈ CHỐNG "ĐỔI PHE" Ở MAP 5V5 ---
  if (stadium.name === "5v5") {
    let oppTeam = getOppositeTeamId(player.team);
    let inPlayerAuth = getAuth(inPlayer.id);
    // Nếu người này đã có tên trong sổ thống kê của phe đối phương trong trận đấu hiện tại
    if (game.teams[oppTeam].players[inPlayerAuth] !== undefined) {
      room.sendAnnouncement(`Không thể thay ${inPlayer.name} vào sân vì người này đã thi đấu cho ${TEAM_NAMES[oppTeam]} trong trận này!`, player.id, RED);
      return false;
    }
  }
  if (outPlayer.team != player.team) {
    room.sendAnnouncement("Không thể thay ra cầu thủ không nằm trong đội bạn", player.id, RED);
    return false;
  };

  room.sendAnnouncement(`🔻 ${outPlayer.name} đã được thay ra ngoài`, null, 0xFF0000, "small", 0);
  room.sendAnnouncement(`🔺 ${inPlayer.name} đã được thay vào sân`, null, 0x00FF00, "small", 0);
  room.setPlayerTeam(inPlayer.id, player.team);
  room.setPlayerTeam(outPlayer.id, 0);

  // FIX LỖI 1: Cung cấp rõ team mới của người được thay vào để bot không bị nhầm là team 0
  getGameStats(inPlayer, player.team);

  game.teams[player.team].substitutions++;
  room.sendAnnouncement(`Lượt thay người còn lại: ${MAX_SUBSTITUTIONS - game.teams[player.team].substitutions}`, player.id, YELLOW, "small-italic", 0);
  return false;
}

function pauseFunc(value, player) {
  if (!canPause) {
    room.sendAnnouncement("Bạn không thể dừng game vào lúc này", player.id, RED);
    return false;
  };

  pausedBy = player.team;
  room.pauseGame(true);
  room.sendChat(`Trận đấu đã được tạm dừng bởi đội trưởng của ${TEAM_NAMES[player.team]} để thay người`);
  room.sendAnnouncement(`Bạn có ${PAUSE_TIMEOUT} giây để thay người, dùng !resume khi đã xong việc`, player.id, YELLOW);
  timeouts.toResume = setTimeout(room.pauseGame.bind(null, false), PAUSE_TIMEOUT * 1000);
  return false;
}

function resumeFunc(value, player) {
  if (player.team != pausedBy) {
    room.sendAnnouncement("Vui lòng đợi đội bạn thay người", player.id, RED);
    return false;
  };

  room.pauseGame(false);
  return false;
}

function setMsgColorFunc(value, player) {
  if (value != "normal") {
    if (!/^[0-9A-F]{6}$/i.test(value)) {
      room.sendAnnouncement('Vui lòng nhập một mã màu hợp lệ hoặc dùng "normal" để đặt lại về mặc định (VD: !msgcolor 00FFFF hoặc !msgcolor normal)', player.id, RED);
      return false;
    };
    value = `0x${value}`;
  };
  let setting = getSetting(player.id);
  setting.msgColor = value;
  saveSetting(player.id, setting);
  return false;
}

function adjustSizeFunc(value, player) {
  if (!value || isNaN(value)) {
    room.sendAnnouncement("Vui lòng cung cấp số đơn vị muốn thay đổi, dùng 0 để chỉnh lại về bình thường (VD: !adjustsize -2)", player.id, RED);
    return false;
  };
  if (value > 0) {
    room.sendAnnouncement("Bạn không thể tăng kích cỡ cầu thủ", player.id, RED);
    return false;
  };
  if (Math.abs(value) > stadium.playerRadius * MAX_SIZE_ADJUSTMENT_RATIO) {
    room.sendAnnouncement("Kích cỡ cầu thủ đã bị chỉnh tới mức không hợp lệ", player.id, RED);
    return false;
  };
  let setting = getSetting(player.id);
  let gap = value - setting.sizeAdjustment;
  setting.sizeAdjustment = value;
  saveSetting(player.id, setting);

  let playerDiscProperties = room.getPlayerDiscProperties(player.id);
  (playerDiscProperties !== null) && room.setPlayerDiscProperties(player.id, { radius: playerDiscProperties.radius + gap });
  room.sendAnnouncement("Đã chỉnh và lưu kích thước cầu thủ", player.id, GREEN);
  return false;
}

function assignCaptainFunc(value, player) {
  if (isPicking) {
    room.sendAnnouncement("⚠️ Lệnh bị từ chối: Không thể ép đổi Đội trưởng lúc đang Pause Pick!", player.id, RED, "bold");
    return false;
  }
  if (!value) {
    room.sendAnnouncement("Vui lòng cung cấp tên đội và một người chơi hợp lệ (VD: !assigncap red @32MBVRAM hoặc !assigncap blue 32)", player.id, RED);
    return false;
  };

  let teamIds = { "red": 1, "blue": 2 };
  let [team, name] = value.split(" ", 2);
  if (teamIds[team] === undefined) {
    room.sendAnnouncement("Tên đội phải là \"red\" hoặc \"blue\" (VD: !assigncap red 32)", player.id, RED);
    return false;
  };
  let assignedPlayer = getPlayerByName(name);
  if (!assignedPlayer) {
    room.sendAnnouncement(`Người chơi "${value}" không tồn tại hoặc đã rời đi`, player.id, RED);
    return false;
  };
  if (afkList.has(assignedPlayer.id)) {
    room.sendAnnouncement("Người chơi đang ở trạng thái AFK", player.id, RED);
    return false;
  };
  updateCaptain(teamIds[team], assignedPlayer);
  return true;
}

function buffStarFunc(value, player) {
  if (!value) {
    room.sendAnnouncement("Sử dụng: !buff @tên số_sao (VD: !buff @32MBVRAM 50 hoặc !buff 32 -10)", player.id, RED);
    return false;
  }

  // Tách tham số: phần cuối cùng là số sao, phần trước đó là tên người chơi
  let args = value.split(" ");
  let amount = parseInt(args.pop());
  let name = args.join(" ");

  if (isNaN(amount)) {
    room.sendAnnouncement("Lỗi: Số lượng sao phải là một con số.", player.id, RED);
    return false;
  }

  let targetPlayer = getPlayerByName(name);
  if (!targetPlayer) {
    room.sendAnnouncement(`Lỗi: Không tìm thấy người chơi "${name}" trong phòng.`, player.id, RED);
    return false;
  }

  // Lấy dữ liệu thống kê hiện tại của người chơi
  let auth = getAuth(targetPlayer.id);
  let stats = getStats(auth);

  // FIX: Cộng (hoặc trừ) sao, nhưng chốt chặn ở mức 0 để không bao giờ bị âm
  stats.points = Math.max(0, stats.points + amount);

  // Lưu lại vào localStorage (giữ nguyên logic gốc của file)
  delete stats.auth;
  localStorage.setItem(auth, JSON.stringify(stats));

  // Gửi thông báo tàng hình (chỉ người gõ lệnh mới nhìn thấy)
  // Tự động đổi chữ "thêm" thành "trừ" nếu số nhập vào là số âm cho xuôi tai
  let actionText = amount >= 0 ? "thêm" : "trừ";
  room.sendAnnouncement(`[BÍ MẬT] Đã ${actionText} ${Math.abs(amount)} sao cho ${targetPlayer.name}. Tổng sao hiện tại: ${stats.points}★`, player.id, GREEN, "bold");

  return false;
}
function leaveCaptainFunc(value, player) {
  if (isPicking) {
    room.sendAnnouncement("⚠️ Lệnh bị từ chối: Không thể đổi băng Đội trưởng khi đang chọn người!", player.id, RED, "bold");
    return false;
  }
  let assignedPlayer = getPlayerByName(value);
  if (!assignedPlayer) {
    room.sendAnnouncement(`Người chơi "${value}" không tồn tại hoặc đã rời đi`, player.id, RED);
    return false;
  };
  if (afkList.has(assignedPlayer.id)) {
    room.sendAnnouncement("Người chơi đang ở trạng thái AFK", player.id, RED);
    return false;
  };
  if (assignedPlayer.team == getOppositeTeamId(player.team)) {
    room.sendAnnouncement("Người chơi đang chơi cho đội khác", player.id, RED);
    return false;
  };
  updateCaptain(player.team, assignedPlayer);
  return true;
}

function loginFunc(password, player) {
  // 🎯 PHONG ẤN TẬN GỐC: Khóa vĩnh viễn mọi hành vi đăng nhập bằng pass
  room.sendChat("❌ Hệ thống đăng nhập bằng mật khẩu đã bị khóa!", player.id);

  // Trả về false để bắt buộc tàng hình dòng lệnh nếu có kẻ gõ bậy
  return false;
}

function yellowCardFunc(value, player) {
  if (!value) {
    room.sendAnnouncement("Vui lòng cung cấp một người chơi hợp lệ và lý do phạt nếu có (VD: !yellow @32MBVRAM hoặc !yellow 32 ác)", player.id, RED);
    return false;
  };

  value = value.split(" ");
  let [name, reason] = [value.shift(), value.join(" ")];
  let toPlayer = getPlayerByName(name); // Tạo biến toPlayer

  if (!toPlayer) { // Kiểm tra nếu không tìm thấy người chơi
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${name}"`, player.id, RED);
    return false; // Dừng lệnh ngay lập tức
  };

  if (getRole(player) < getRole(toPlayer)) {
    room.sendAnnouncement(`Bạn không có quyền phạt thẻ vàng người chơi "${name}"`, player.id, RED);
    return false;
  };

  let yellowCards = JSON.parse(localStorage.getItem("yellow_cards")) || [];
  let index = yellowCards.indexOf(getConn(toPlayer.id));
  if (index != -1) {
    yellowCards.splice(index, 1);
    ban(toPlayer.id, "Bạn đã nhận 2 thẻ vàng", YELLOW_BAN_PERIOD);
    var msg = `🟨🟨 ${toPlayer.name} đã nhận thẻ vàng thứ 2 từ ${player.name}`;
  } else {
    yellowCards.push(getConn(toPlayer.id));
    var msg = `🟨 ${toPlayer.name} đã nhận một thẻ vàng từ ${player.name} (2 thẻ vàng = ban)`;
  };
  reason && (msg += `: ${reason}`);
  room.sendAnnouncement(msg, null, YELLOW);
  localStorage.setItem("yellow_cards", JSON.stringify(yellowCards));

  // LOG ĐƯỢC ĐẶT Ở CUỐI CÙNG (Lúc này chắc chắn toPlayer đã tồn tại)
  log(`${toPlayer.name} was given a yellow card by ${player.name} (reason: ${reason})`);
  return false;
}

function clearYellowCardFunc(value, player) {
  if (!value) {
    room.sendAnnouncement("Vui lòng cung cấp một người chơi hợp lệ (VD: !clearyellow @32MBVRAM hoặc !clearyellow 32)", player.id, RED);
    return false;
  };

  let toPlayer = getPlayerByName(value);
  if (!toPlayer) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${value}"`, player.id, RED);
    return false;
  };

  let yellowCards = JSON.parse(localStorage.getItem("yellow_cards")) || [];
  let index = yellowCards.indexOf(getConn(toPlayer.id));
  if (index == -1) {
    room.sendAnnouncement(`${toPlayer.name} chưa nhận thẻ vàng nào`, player.id, RED);
    return false;
  };
  yellowCards.splice(index, 1);
  localStorage.setItem("yellow_cards", JSON.stringify(yellowCards));
  room.sendAnnouncement(`🟨❌ ${toPlayer.name} đã được xóa thẻ vàng`, null, YELLOW);
  return false;
}

function muteFunc(value, player) {
  if (!value) {
    room.sendAnnouncement("Vui lòng cung cấp người chơi, thời hạn cấm chat (đơn vị phút, để 0 để cấm vĩnh viễn) và lý do nếu có (VD: !mute @32MBVRAM 1 / !mute 32 0 Ngu)", player.id, RED);
    return false;
  };

  value = value.split(" ");
  let [name, period, reason] = [value.shift(), value.shift(), value.join(" ")];
  let toPlayer = getPlayerByName(name);
  if (!toPlayer) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${name}"`, player.id, RED);
    return false;
  };
  if (getRole(player) < getRole(toPlayer)) {
    room.sendAnnouncement(`Bạn không có quyền cấm chat người chơi "${name}"`, player.id, RED);
    return false;
  };

  if (isNaN(period) || period < 0) {
    room.sendAnnouncement("Vui lòng cung cấp một thời hạn cấm chat hợp lệ (VD: !mute @32MBVRAM 3)", player.id, RED);
    return false;
  };

  muteList.add(getConn(toPlayer.id));
  if (period == 0) {
    var msg = `${toPlayer.name} đã bị cấm chat bởi ${player.name}`;
    // Thêm vào trong cả 2 trường hợp (period == 0 và else):
    log(`${toPlayer.name} was muted by ${player.name} (reason: ${reason})`);
  } else {
    setTimeout(muteList.delete.bind(muteList, getConn(toPlayer.id)), period * 60 * 1000);
    var msg = `${toPlayer.name} đã bị cấm chat trong ${period} phút bởi ${player.name}`;
    // Thêm vào trong cả 2 trường hợp (period == 0 và else):
    log(`${toPlayer.name} was muted by ${player.name} (reason: ${reason})`);
  };
  reason && (msg += `: ${reason}`);
  room.sendAnnouncement(msg, null, RED, "bold", 0);
  return false;
}

function unmuteFunc(value, player) {
  if (!value) {
    room.sendAnnouncement("Vui lòng cung cấp một người chơi hợp lệ (VD: !unmute @32MBVRAM hoặc !unmute 32)", player.id, RED);
    return false;
  };

  let toPlayer = getPlayerByName(value);
  if (!toPlayer) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${value}"`, player.id, RED);
    return false;
  };

  muteList.delete(getConn(toPlayer.id));
  room.sendAnnouncement(`${toPlayer.name} đã có thể chat trở lại`, null, GREEN);
  log(`${toPlayer.name} was unmuted by ${player.name}`);
  return false;
}

function clearMutesFunc(value, player) {
  muteList.clear();
  room.sendAnnouncement("Đã xóa các lượt cấm chat", null, GREEN);
  return false;
}

function lockFunc(value, player) {
  if (isChatLocked) return false;
  isChatLocked = true;
  room.sendAnnouncement(`${player.name} đã khóa khung chat`, null, YELLOW);
  log(`${player.name} locked the chat`); // hoặc unlocked
  return false;
}

function unlockFunc(value, player) {
  if (!isChatLocked) return false;
  isChatLocked = false;
  room.sendAnnouncement(`${player.name} đã mở khóa khung chat`, null, YELLOW);
  log(`${player.name} unlocked the chat`); // hoặc unlocked
  return false
}

function banFunc(value, player) {
  if (!value) {
    room.sendAnnouncement("Vui lòng cung cấp người chơi, thời hạn ban (đơn vị giờ, để 0 để cấm vĩnh viễn) và lý do nếu có (VD: !ban @32MBVRAM 24 / !ban 32 0 Phá room)", player.id, RED);
    return false;
  };

  value = value.split(" ");
  let [name, period, reason] = [value.shift(), value.shift(), value.join(" ")];
  let toPlayer = getPlayerByName(name);
  if (!toPlayer) {
    room.sendAnnouncement(`Không thể tìm thấy người chơi "${name}"`, player.id, RED);
    return false;
  };
  if (getRole(player) < getRole(toPlayer)) {
    room.sendAnnouncement(`Bạn không có quyền cấm người chơi "${name}"`, player.id, RED);
    return false;
  };
  if (isNaN(period) || period < 0) {
    room.sendAnnouncement("Vui lòng cung cấp một thời hạn ban hợp lệ (VD: !ban @32MBVRAM 24)", player.id, RED);
    return false;
  };
  ban(toPlayer.id, reason, +period);
  return false;
}

function showBansFunc(value, player) {
  room.sendAnnouncement(`Danh sách người chơi đã bị ban:`, player.id, GREEN);
  for (const details of banList) {
    room.sendAnnouncement(`• [${details[0]}] ${details[1]} (Lí do: ${details[2]})`, player.id, GREEN, "small", 0);
  };
  return false;
}

function unbanFunc(value, player) {
  if (!value || isNaN(value)) {
    room.sendAnnouncement("Vui lòng cung cấp ID người chơi bị cấm, dùng !bans để xem danh sách cấm (VD: !clearban 133)", player.id, RED);
    return false;
  };
  let banDetails = banList.find(details => details[0] == value);
  if (!banDetails) {
    room.sendAnnouncement(`Không tìm thấy người chơi bị cấm với ID ${value}`, player.id, RED);
    return false;
  }
  unban(banDetails[0]);
  room.sendAnnouncement(`Đã bỏ cấm người chơi ${banDetails[1]}`, null, GREEN);
  return false;
}

function clearBansFunc(value, player) {
  room.clearBans();
  banList.length = 0;
  room.sendAnnouncement("Đã xóa các lượt ban", null, GREEN);
  return false;
}

function afkFunc(value, player) {
  let scores = room.getScores();
  let isSuperAdmin = (typeof getRole === "function" && getRole(player) >= ROLE.SUPER_ADMIN);

  // 👑 Nếu KHÔNG PHẢI Super Admin thì mới bị chặn
  if (!isSuperAdmin) {
    if (isPicking && scores !== null) {
      room.sendAnnouncement("⚠️ Lệnh bị khóa: Không thể bật/tắt AFK khi đang Pause Pick giữa trận!", player.id, 0xFF4444, "bold", 2);
      return false;
    }

    if (typeof isTakingPenalty !== 'undefined' && isTakingPenalty) {
      room.sendAnnouncement("⚠️ Lệnh bị khóa: Dậy mà sút đi, không AFK lúc Luân lưu được đâu!", player.id, 0xFF4444, "bold", 2);
      return false;
    }
  }

  if (afkList.has(player.id)) {
    afkList.delete(player.id);
    if (timeouts.toQuitAfk && timeouts.toQuitAfk[player.id]) {
      clearTimeout(timeouts.toQuitAfk[player.id]);
      delete timeouts.toQuitAfk[player.id];
    }
    room.sendAnnouncement(`${player.name} đã thoát chế độ AFK`, null, 0x22C55E);

    switch (getNonAfkPlayers().length) {
      case 8: loadStadium("5v5"); break;
      case 6: loadStadium("3v3"); break;
      case 2: loadStadium("1v1"); break;
    }
  } else {
    if (getRole(player) < ROLE.ADMIN) {
      if (afkList.size >= MAX_AFK_PLAYERS) {
        room.sendAnnouncement("Đã có quá nhiều người chơi AFK, bạn không thể AFK", player.id, 0xFF4444);
        return false;
      };
      if (!timeouts.toQuitAfk) timeouts.toQuitAfk = {};
      timeouts.toQuitAfk[player.id] = setTimeout(oversleepCallback.bind(null, player.id), AFK_TIMEOUT * 1000);
    };

    let isCap = (player.id === captains[1]) ? 1 : (player.id === captains[2]) ? 2 : 0;
    if (isCap !== 0) {
      updateCaptain(isCap);
      if (isPicking) room.sendChat(`⚠️ Đội trưởng ${TEAM_NAMES[isCap]} đã treo máy (AFK). Đang chuyển quyền cho người khác...`);
    }

    afkList.add(player.id);
    room.sendAnnouncement(`${player.name} đã chuyển sang chế độ AFK, dùng !afk lần nữa để thoát`, null, 0x22C55E);

    if (player.team != 0) {
      room.setPlayerTeam(player.id, 0);
      if (typeof punishQuitGame === "function" && !isSuperAdmin) punishQuitGame(player); // Sếp AFK cũng không bị trừ sao đào ngũ
    };

    if (isPicking && scores === null) {
      if (typeof checkAutoPick === "function") { checkAutoPick() || showSpecTable(); }
    } else {
      if (typeof checkAutoPick === "function") checkAutoPick();
    }

    switch (getNonAfkPlayers().length) {
      case 7: loadStadium("3v3"); break;
      case 5: loadStadium("1v1"); break;
      case 1: loadStadium("training"); break;
    }
  };

  if (typeof updateTeamPlayers === "function") updateTeamPlayers();
  if (typeof reorderPlayers === "function") reorderPlayers();
  return false;
};

function showAfksFunc(value, player) {
  room.sendAnnouncement(`Danh sách những người chơi đang AFK: ${Array.from(afkList).map(id => room.getPlayer(id).name).join(", ")}`, player.id, GREEN);
  return false;
}

function punishQuitGame(player) {
  if (
    (getRole(player) >= ROLE.ADMIN) ||
    (getGameStatus() === false) ||
    (getNonAfkPlayers().length < MAX_PLAYERS * 2 + 3)
  ) return;
  let banMessage = "Bạn đã mắc quá nhiều lỗi vi phạm";
  let playerConn = getConn(player.id);
  if (playerConn in warnings) {
    warnings[playerConn]++;
  } else {
    warnings[playerConn] = 1;
  };
  room.sendAnnouncement(`${player.name} đã nhận ${warnings[playerConn]}/${MAX_WARNINGS_PER_PLAYER} cảnh cáo trong ngày do hành vi rời trận`, null, RED, "small-italic", 0);
  if (warnings[playerConn] < MAX_WARNINGS_PER_PLAYER) return;
  delete warnings[playerConn];
  room.sendAnnouncement(`${player.name} đã nhận hình phạt (ban ${VIOLATION_BAN_PERIOD} giờ) do mắc quá nhiều lỗi vi phạm`, null, RED, "small-bold", 0);
  if (room.getPlayer(player.id) === null) {
    let bans = JSON.parse(localStorage.getItem("bans")) || [];
    bans.push([playerConn, banMessage, VIOLATION_BAN_PERIOD]);
    localStorage.setItem("bans", JSON.stringify(bans));
    return;
  };
  ban(player.id, banMessage, VIOLATION_BAN_PERIOD);
}

function unban(playerId) {
  room.clearBan(playerId);
  banList = banList.filter(details => details[0] != playerId);
}

function ban(playerId, reason, timeout) {
  if (timeout != 0) {
    reason = reason.length ? reason + `. Cấm sẽ hết hạn sau ${timeout} giờ` : `Cấm sẽ hết hạn sau ${timeout} giờ`;
    setTimeout(unban.bind(null, playerId), timeout * 60 * 60 * 1000);
  };
  room.kickPlayer(playerId, reason, true);
}

var _pickLock = false;
async function pick(pickedPlayer, team) {
  if (_pickLock) return; // Chống spam click (Race condition)
  _pickLock = true;
  try {
    if (!pickedPlayer) {
      pickedPlayer = getBestSpectatorByStats();
      if (!pickedPlayer) return;
    };

    let teamCount = room.getPlayerList().filter(p => !afkList.has(p.id) && p.team == team).length;
    let currentMaxPlayers = MAX_PLAYERS;
    if (typeof stadium !== "undefined" && stadium.name) {
      if (stadium.name.includes("3v3")) currentMaxPlayers = 3;
      if (stadium.name.includes("1v1")) currentMaxPlayers = 2;
    }

    if (teamCount >= currentMaxPlayers) {
      room.sendAnnouncement(`${TEAM_NAMES[team]} đã đủ ${currentMaxPlayers} người`, captains[team], RED, "small", 0);
      requestPick();
      return;
    };

    clearTimeout(timeouts.toPick);
    await room.setPlayerTeam(pickedPlayer.id, team);
    room.sendAnnouncement(`${pickedPlayer.name} đã được chọn vào ${TEAM_NAMES[team]}`, null, GREEN, "small", 0);
    requestPick();
  } finally {
    _pickLock = false;
  }
}

function handleCommand(player, input) {
  let splitIndex = input.indexOf(" ");
  splitIndex = (splitIndex != -1) ? splitIndex : input.length;
  let [alias, value] = [input.slice(0, splitIndex).toLowerCase(), input.slice(splitIndex + 1).trim()];
  let command = commands[alias];
  if (!command || !canUseCommand(command, player)) {
    room.sendAnnouncement(`Không thể xác định lệnh !${alias}, dùng !help để xem các lệnh`, player.id, RED);
    return false;
  };

  return command[0](value, player);
}

function updateGoalStats(team) {
  let [shot, assist] = game.ballRecords;
  if (shot === null) return;

  if (shot.player.team != team) {
    if (
      assist &&
      assist.isAShot &&
      (assist.player.team == team) &&
      (stadium.goalLine.x - Math.abs(shot.properties.x) < stadium.playerRadius * 4) &&
      (shot.time - assist.time < 3)
    ) {
      [shot, assist] = game.ballRecords.slice(1);
    } else {
      getGameStats(shot.player).ownGoals++;
      room.sendChat(`Một bàn phản lưới nhà do sai lầm của ${getTag(shot.player.name)}`);
      (assist !== null) && (assist.player.team == team) && getGameStats(assist.player).attemptsLeadingToOG++;
      return;
    };
  };

  let ballPosition = room.getBallPosition();
  let shooterStats = getGameStats(shot.player);
  shooterStats.goals++;
  let comment = SCORER_COMMENTARIES[shooterStats.goals] || `Thật điên rồ, bàn thắng thứ ${shooterStats.goals} trong trận đấu này của`;
  comment = comment.concat(" ", getTag(shot.player.name));
  celebrationEffect(shot.player, shooterStats.goals);
  if (assist !== null) {
    let assisterStats = getGameStats(assist.player);
    if (assist.player.team != team) {
      assisterStats.errorsLeadingToGoal++;
    } else if (assist.player.id != shot.player.id) {
      assisterStats.assists++;
      if (assisterStats.assists != 1) {
        comment = comment.concat(", ", `${getTag(assist.player.name)} đã có cho mình kiến tạo thứ ${assisterStats.assists} trong trận đấu`);
      } else {
        comment = comment.concat(", ", `đường kiến tạo từ ${getTag(assist.player.name)}`);
      };
    };
  };
  room.sendChat(comment);

  let speed = convertToMeters(getDistance(shot.properties.xspeed, shot.properties.yspeed) * 60);
  let distance = convertToMeters(getDistance(shot.properties.x - ballPosition.x, shot.properties.y - ballPosition.y));
  room.sendAnnouncement(`Khoảng cách: ${distance || "dưới 1"}m | Lực sút: ${speed} (m/s)`, null, 0x00FF00, "small", 0);
}

function saveStats() {
  let motmAuth = getMotm()[0];
  let scoreArray = prevScore.split("-");
  let redGoals = parseInt(scoreArray[0]);
  let blueGoals = parseInt(scoreArray[1]);
  let goalDifference = Math.abs(redGoals - blueGoals);

  let dailyDb = JSON.parse(localStorage.getItem("daily_stats")) || {};

  // 🎯 KIỂM TRA LỆNH TRUY NÃ: CÓ CHUỖI NÀO BỊ CHẶT KHÔNG?
  let bountyClaimed = false;
  let bountyVictimNames = [];
  if (prevWinner !== 0 && surrenderedTeam === 0) {
    let losingTeam = prevWinner === 1 ? 2 : 1;
    for (const auth in game.teams[losingTeam].players) {
      let st = getStats(auth);
      if ((st.winstreak || 0) >= 3) {
        bountyClaimed = true;
        bountyVictimNames.push(st.name || game.teams[losingTeam].players[auth].name);
      }
    }
  }

  // 🎯 LUẬT NHẬN DIỆN CLAN WAR MỚI (Lọc logic cực kỳ chặt chẽ)
  let teamClans = { 1: null, 2: null };
  let clanCountsObj = { 1: 0, 2: 0 };

  for (let i = 1; i <= 2; i++) {
    let clanCounts = {};
    let tPlayers = Object.keys(game.teams[i].players);
    for (let a of tPlayers) {
      let st = getStats(a);
      if (st.clan) clanCounts[st.clan] = (clanCounts[st.clan] || 0) + 1;
    }
    for (let ct in clanCounts) {
      if (clanCounts[ct] >= 3) {
        teamClans[i] = ct;
        clanCountsObj[i] = clanCounts[ct];
      }
    }
  }

  let isClanWar = false;
  // TH 1: Clan 🆚 Clan (Cả 2 bên đều có >=3 người và là 2 Clan khác nhau)
  if (teamClans[1] && teamClans[2] && teamClans[1] !== teamClans[2]) {
    isClanWar = clans[teamClans[1]] && clans[teamClans[2]];
  }
  // TH 2: Clan 🆚 Đội Mix (1 bên có ĐỦ 5 NGƯỜI, bên kia là Mix)
  else if (teamClans[1] && clanCountsObj[1] >= 5 && !teamClans[2]) {
    isClanWar = !!clans[teamClans[1]];
  }
  else if (teamClans[2] && clanCountsObj[2] >= 5 && !teamClans[1]) {
    isClanWar = !!clans[teamClans[2]];
  }

  for (let teamId = 1; teamId < 3; teamId++) {
    let opponentScore = (teamId === 1) ? blueGoals : redGoals;

    let teamEntries = Object.entries(game.teams[teamId].players);
    let gkAuth = null;
    let cbAuth = null;
    if (teamEntries.length > 0) {
      let defensiveEntries = [...teamEntries].sort((a, b) =>
        (teamId === 1) ? (a[1].meanPosition - b[1].meanPosition) : (b[1].meanPosition - a[1].meanPosition)
      ).slice(0, Math.min(2, teamEntries.length));

      let sortedDef = defensiveEntries.sort((a, b) =>
        (b[1].stoppedShots - a[1].stoppedShots) || (b[1].touches - a[1].touches)
      );
      gkAuth = sortedDef.length > 0 ? sortedDef[0][0] : null;
      cbAuth = sortedDef.length > 1 ? sortedDef[1][0] : null;
    }

    let top5Auths = [];
    if (stadium.name === "5v5" || stadium.name === "penalty") {
      let authRatings = [];
      for (const [auth, report] of teamEntries) {
        let rating = report.getPoints();
        if (auth === gkAuth) {
          rating += 4.0;
          if (opponentScore === 0) rating += 5.0;
          else if (opponentScore === 1) rating += 3.0;
          else if (opponentScore === 2) rating += 1.0;
        } else if (auth === cbAuth) {
          rating += 3.0;
          if (opponentScore === 0) rating += 4.0;
          else if (opponentScore === 1) rating += 2.0;
          else if (opponentScore === 2) rating += 1.0;
        }
        authRatings.push({ auth, rating });
      }
      authRatings.sort((a, b) => b.rating - a.rating);
      top5Auths = authRatings.slice(0, 5).map(x => x.auth);
    }

    for (const [auth, report] of Object.entries(game.teams[teamId].players)) {
      let item = getStats(auth);
      item.name = report.name;

      item.goals += report.goals;
      item.assists += report.assists;
      item.ownGoals += report.ownGoals;
      item.games++;
      item.winstreak = item.winstreak || 0;

      let pointsEarned = 0;
      let performanceMsg = "";
      let msgColor = 0xFFFF00;

      let matchRating = report.getPoints();
      let bonusMsg = "";

      if (auth === gkAuth) {
        matchRating += 4.0;
        if (opponentScore === 0) { matchRating += 5.0; bonusMsg = " (🧤 Base + Lưới sạch: +9.0)"; }
        else if (opponentScore === 1) { matchRating += 3.0; bonusMsg = " (🧤 Base + Lọt 1 bàn: +7.0)"; }
        else if (opponentScore === 2) { matchRating += 1.0; bonusMsg = " (🧤 Base + Lọt 2 bàn: +5.0)"; }
        else { bonusMsg = " (🧤 Điểm Base GK: +4.0)"; }
      } else if (auth === cbAuth) {
        matchRating += 3.0;
        if (opponentScore === 0) { matchRating += 4.0; bonusMsg = " (🛡️ Base + Lưới sạch: +7.0)"; }
        else if (opponentScore === 1) { matchRating += 2.0; bonusMsg = " (🛡️ Base + Lọt 1 bàn: +5.0)"; }
        else if (opponentScore === 2) { matchRating += 1.0; bonusMsg = " (🛡️ Base + Lọt 2 bàn: +4.0)"; }
        else { bonusMsg = " (🛡️ Điểm Base CB: +3.0)"; }
      }

      let isEligible = (stadium.name !== "5v5" && stadium.name !== "penalty") || top5Auths.includes(auth);
      let playerClanValid = item.clan && clans[item.clan] && clans[item.clan].members.length >= 5;

      if (surrenderedTeam !== 0) {
        if (teamId == prevWinner) {
          if (isEligible) {
            item.wins++;
            item.winstreak++;
            pointsEarned = 2; performanceMsg = `Đội đối phương đã đầu hàng. (Thắng +2★)`; msgColor = 0x5DB899;

            if (isClanWar && item.clan === teamClans[teamId]) { pointsEarned += 2; performanceMsg += ` ⚔️ (+2★ Clan War)`; }
            else if (playerClanValid) { pointsEarned += 1; performanceMsg += ` 🛡️ (+1★ Lương Clan)`; }

            if (item.winstreak >= 3) { pointsEarned += 1; performanceMsg += ` 🔥 (+1★ Chuỗi x${item.winstreak})`; }
            if (bountyClaimed) { pointsEarned += 2; performanceMsg += ` 🎯 (+2★ Tiền Truy Nã)`; }

            item.points += pointsEarned;
          } else {
            pointsEarned = 0; performanceMsg = `Ngoài Top 5 (Không được cộng sao và chuỗi)`; msgColor = 0xAAAAAA;
          }
        } else {
          // ☠️ LUẬT ĐẦU HÀNG: PHẠT NẶNG TOP 5, THA CHO NGƯỜI NGOÀI TOP 5
          if (prevWinner !== 0) item.winstreak = 0;

          if (isEligible) {
            let penalty = 0;
            if (auth === getAuth(captains[teamId])) {
              penalty = 4; // Đội trưởng bị trừ tới 4 sao
              performanceMsg = `Đội trưởng hèn nhát quyết định đầu hàng. (-4★)`;
              msgColor = 0xFF0000;
            } else {
              penalty = 2;
              performanceMsg = `Đội của bạn đã đầu hàng. (-2★)`;
              msgColor = 0xFF4444;
            }

            let pointsToDeduct = Math.min(penalty, item.points);
            item.points -= pointsToDeduct;
            pointsEarned -= pointsToDeduct;
          } else {
            // TRẢ VỀ CŨ: An toàn cho người ngoài Top 5
            pointsEarned = 0;
            performanceMsg = `Ngoài Top 5 (Không bị trừ sao)`;
            msgColor = 0xAAAAAA;
          }
        }
      } else {
        if (teamId == prevWinner) {
          if (isEligible) {
            item.wins++;
            item.winstreak++;
            if (matchRating >= 10) { pointsEarned = 3; performanceMsg = `Màn trình diễn xuất sắc. (Thắng +3★)`; msgColor = 0x00FF00; }
            else if (matchRating >= 7) { pointsEarned = 2; performanceMsg = `Màn trình diễn tốt. (Thắng +2★)`; msgColor = 0x5DB899; }
            else if (matchRating >= 2) { pointsEarned = 1; performanceMsg = `Màn trình diễn tròn vai. (Thắng +1★)`; msgColor = 0xF1CC81; }
            else { pointsEarned = 0; performanceMsg = `Màn trình diễn dưới sức. (+0★)`; msgColor = 0xFF4444; }

            if (isClanWar && item.clan === teamClans[teamId]) { pointsEarned += 2; performanceMsg += ` ⚔️ (+2★ Clan War)`; }
            else if (playerClanValid) { pointsEarned += 1; performanceMsg += ` 🛡️ (+1★ Lương Clan)`; }

            if (item.winstreak >= 3) { pointsEarned += 1; performanceMsg += ` 🔥 (+1★ Chuỗi x${item.winstreak})`; }
            if (bountyClaimed) { pointsEarned += 2; performanceMsg += ` 🎯 (+2★ Tiền Truy Nã)`; }

            item.points += pointsEarned;
          } else {
            pointsEarned = 0; performanceMsg = `Ngoài Top 5 (Không được cộng sao và chuỗi)`; msgColor = 0xAAAAAA;
          }
        } else {
          // ☠️ LUẬT THUA TRẬN: THIẾT QUÂN LUẬT CHO TOP 5
          if (prevWinner !== 0) item.winstreak = 0;

          if (isEligible) {
            let penalty = 0;
            if (auth == motmAuth) {
              penalty = 0;
              performanceMsg = `Nỗ lực thi đấu bất chấp kết quả. (-0★)`;
              msgColor = 0x00FFFF;
            } else {
              // Điểm đánh giá gắt gao hơn cho nhóm thi đấu chính thức
              if (matchRating >= 7.0) { penalty = 1; performanceMsg = `Thất bại đáng tiếc. (-1★)`; msgColor = 0xF1CC81; }
              else if (matchRating >= 4.5) { penalty = 2; performanceMsg = `Thiếu hiệu quả trong trận đấu. (-2★)`; msgColor = 0xFF8C00; }
              else { penalty = 3; performanceMsg = `Màn trình diễn cực kỳ tệ hại. (-3★)`; msgColor = 0xFF0000; }
            }

            let pointsToDeduct = Math.min(penalty, item.points);
            item.points -= pointsToDeduct;
            pointsEarned -= pointsToDeduct;
          } else {
            // TRẢ VỀ CŨ: Người ngoài Top 5 không bị vạ lây
            pointsEarned = 0;
            performanceMsg = `Ngoài Top 5 (Không bị trừ sao)`;
            msgColor = 0xAAAAAA;
          }
        };
      }

      if (auth == motmAuth) {
        item.motms++;
        if (teamId == prevWinner && surrenderedTeam === 0 && isEligible) {
          item.points += 1; pointsEarned += 1; performanceMsg += " 🏅 (+1★ MOTM)";
          if (!item.clan) {
            item.points += 2; pointsEarned += 2; performanceMsg += " 🐺 (+2★ Sói Cô Độc)";
          }
        }
        else if (surrenderedTeam === 0) { performanceMsg += " 🏅 (Danh hiệu MOTM)"; }
      };

      let playerInRoom = room.getPlayerList().find(p => p.id !== 0 && getAuth(p.id) === auth);
      if (playerInRoom) {
        room.sendAnnouncement(`📊 Điểm phong độ trận này: ${matchRating.toFixed(1)} pts${bonusMsg}`, playerInRoom.id, 0xAAAAAA, "italic", 0);
        room.sendAnnouncement(`${performanceMsg} | Tổng: ${item.points}★`, playerInRoom.id, msgColor, "bold", 2);
      }

      delete item.auth;
      localStorage.setItem(auth, JSON.stringify(item));

      if (!dailyDb[auth]) dailyDb[auth] = { name: report.name, goals: 0, assists: 0, motms: 0, points: 0, cleansheets: 0, games: 0 };
      dailyDb[auth].name = report.name;
      dailyDb[auth].goals += report.goals;
      dailyDb[auth].assists += report.assists;
      dailyDb[auth].games++;
      dailyDb[auth].points += pointsEarned;
      if (auth === motmAuth) dailyDb[auth].motms++;
    };

    if (gkAuth !== null && opponentScore === 0) {
      let stats = getStats(gkAuth); stats.cleansheets++; delete stats.auth; localStorage.setItem(gkAuth, JSON.stringify(stats));
      if (dailyDb[gkAuth]) dailyDb[gkAuth].cleansheets = (dailyDb[gkAuth].cleansheets || 0) + 1;
    };
  };

  if (bountyClaimed) {
    room.sendAnnouncement(`🎯 LĨNH THƯỞNG TRUY NÃ: Chuỗi thắng của ${bountyVictimNames.join(", ")} đã bị chấm dứt! Các thành viên đội ${TEAM_NAMES[prevWinner]} nhận +2★!`, null, 0xFFD700, "bold", 2);
  }

  let newBounties = [];
  for (const auth in game.teams[prevWinner].players) {
    let st = getStats(auth);
    if (st.winstreak === 3) {
      newBounties.push(st.name || game.teams[prevWinner].players[auth].name);
    }
  }
  if (newBounties.length > 0) {
    room.sendAnnouncement(`🔥 LỆNH TRUY NÃ: Sát thủ ${newBounties.join(", ")} đang có chuỗi 3 trận thắng! Phe nào cản bước được họ sẽ nhận ngay 2★ tiền thưởng!`, null, 0xFF4444, "bold", 2);
  }

  const updateClanExp = (clanTag, earnedExp) => {
    let c = clans[clanTag];
    if (!c) return;

    c.exp = c.exp || 0;
    c.level = c.level || 1;
    c.exp += earnedExp;

    let newLevel = 1;
    if (c.exp >= 8000) newLevel = 5;
    else if (c.exp >= 5000) newLevel = 4;
    else if (c.exp >= 2500) newLevel = 3;
    else if (c.exp >= 1000) newLevel = 2;

    if (newLevel > c.level) {
      c.level = newLevel;
      room.sendAnnouncement(`🎉 TIN VUI: Clan [${clanTag}] đã thăng cấp lên Level ${newLevel}!`, null, 0xFFD700, "bold", 2);
    }
  };

  for (let teamId = 1; teamId <= 2; teamId++) {
    let isWin = (teamId == prevWinner);
    let clanMembersCount = {};

    for (const auth in game.teams[teamId].players) {
      let st = getStats(auth);
      if (st && st.clan && clans[st.clan]) {
        clanMembersCount[st.clan] = (clanMembersCount[st.clan] || 0) + 1;
      }
    }

    for (let clanTag in clanMembersCount) {
      let count = clanMembersCount[clanTag];
      let baseExp = count * (isWin ? 10 : 5);
      updateClanExp(clanTag, baseExp);

      if (count >= 2) {
        let partyBonus = count * 5;
        updateClanExp(clanTag, partyBonus);
      }
    }
  }

  if (teamClans[1]) {
    let bonusExp = 15;
    if (prevWinner === 1) bonusExp += 20;
    if (isClanWar) bonusExp += 30;
    updateClanExp(teamClans[1], bonusExp);
  }
  if (teamClans[2]) {
    let bonusExp = 15;
    if (prevWinner === 2) bonusExp += 20;
    if (isClanWar) bonusExp += 30;
    updateClanExp(teamClans[2], bonusExp);
  }

  let clan1 = teamClans[1];
  let clan2 = teamClans[2];

  if (clan1 && clans[clan1]) {
    clans[clan1].stats = clans[clan1].stats || { games: 0, wins: 0, goals: 0 };
    clans[clan1].stats.games++;
    clans[clan1].stats.goals += redGoals;
    if (prevWinner === 1) clans[clan1].stats.wins++;
  }
  if (clan2 && clans[clan2]) {
    clans[clan2].stats = clans[clan2].stats || { games: 0, wins: 0, goals: 0 };
    clans[clan2].stats.games++;
    clans[clan2].stats.goals += blueGoals;
    if (prevWinner === 2) clans[clan2].stats.wins++;
  }

  // 🎯 TÍNH ELO: Hỗ trợ Đội Mix với mốc 1000 Elo
  if (isClanWar) {
    // 1. Xác định Elo hiện tại (Đội Mix mặc định lấy 1000)
    let elo1 = (clan1 && clans[clan1]) ? (clans[clan1].elo || 1000) : 1000;
    let elo2 = (clan2 && clans[clan2]) ? (clans[clan2].elo || 1000) : 1000;

    // 2. Kẻ thù truyền kiếp (Chỉ xét khi cả 2 bên đều là Clan hợp lệ)
    let isRivalry = false;
    if (clan1 && clan2 && clans[clan1] && clans[clan2]) {
      isRivalry = (clans[clan1].rivals && clans[clan1].rivals.includes(clan2));
    }
    let K = isRivalry ? 64 : 32;

    // 3. Công thức tính xác suất Elo
    let ea = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400));
    let eb = 1 / (1 + Math.pow(10, (elo1 - elo2) / 400));

    let sa = prevWinner === 1 ? 1 : 0;
    let sb = prevWinner === 2 ? 1 : 0;

    let newElo1 = Math.round(elo1 + K * (sa - ea));
    let newElo2 = Math.round(elo2 + K * (sb - eb));

    let diff1 = newElo1 - elo1;
    let diff2 = newElo2 - elo2;

    room.sendAnnouncement(`⚔️ KẾT QUẢ CLAN WAR (TÍNH ELO) ⚔️`, null, 0xFFD700, "bold", 2);

    // 4. In thông báo hiển thị (Thay 'null' bằng chữ 'Đội MIX' cho đẹp)
    let name1 = clan1 ? clan1 : "Đội MIX";
    let name2 = clan2 ? clan2 : "Đội MIX";

    let msgTeam1 = `[${name1}] ${newElo1} Elo (${diff1 > 0 ? '+' + diff1 : diff1})`;
    let msgTeam2 = `[${name2}] ${newElo2} Elo (${diff2 > 0 ? '+' + diff2 : diff2})`;
    room.sendAnnouncement(`${msgTeam1}  🆚  ${msgTeam2}`, null, 0xFFFFFF, "bold", 1);

    // 5. Cập nhật lại Elo vào Database (Chỉ lưu nếu là Clan thật sự, bỏ qua Đội Mix)
    if (clan1 && clans[clan1]) clans[clan1].elo = newElo1;
    if (clan2 && clans[clan2]) clans[clan2].elo = newElo2;
  }

  saveClans();
  localStorage.setItem("daily_stats", JSON.stringify(dailyDb));
}

function reportStats() {
  let recordData = null;
  try {
    recordData = room.stopRecording();
  } catch (e) {
    console.log("Lỗi xả RAM ghi hình: ", e);
  }

  let scoreline = ` RED ${prevScore} BLUE`;
  let time;
  if (game.penalty.results[0].length != 0) {
    scoreline += ` (Luân lưu: ${game.penalty.results.map(results => results.filter(Boolean).length).join("-")})`;
    time = 60 * TIME_LIMIT + MAX_ADDED_TIME;
  } else {
    time = room.getScores().time;
  };
  let minutes = Math.floor(time / 60);
  let elapsedTime = `${minutes}:${Math.round(time - minutes * 60).toString().padStart(2, "0")}`;
  room.sendAnnouncement(scoreline, null, YELLOW, "bold", 0);

  let stats = game.getStats();
  let motmData = getMotm();
  let motmAuth = motmData[0];
  let motm = motmData[1].name;

  let bountyClaimed = false;
  if (prevWinner !== 0 && surrenderedTeam === 0) {
    let losingTeam = prevWinner === 1 ? 2 : 1;
    for (const auth in game.teams[losingTeam].players) {
      let st = getStats(auth);
      if ((st.winstreak || 0) >= 3) {
        bountyClaimed = true;
      }
    }
  }

  // 🎯 LUẬT NHẬN DIỆN CLAN WAR MỚI ĐỂ HIỂN THỊ TRÊN DISCORD
  let teamClans = { 1: null, 2: null };
  let clanCountsObj = { 1: 0, 2: 0 };

  for (let i = 1; i <= 2; i++) {
    let clanCounts = {};
    let tPlayers = Object.keys(game.teams[i].players);
    for (let a of tPlayers) {
      let st = getStats(a);
      if (st.clan) clanCounts[st.clan] = (clanCounts[st.clan] || 0) + 1;
    }
    for (let ct in clanCounts) {
      if (clanCounts[ct] >= 3) {
        teamClans[i] = ct;
        clanCountsObj[i] = clanCounts[ct];
      }
    }
  }

  let isClanWar = false;
  if (teamClans[1] && teamClans[2] && teamClans[1] !== teamClans[2]) {
    isClanWar = clans[teamClans[1]] && clans[teamClans[2]];
  }
  else if (teamClans[1] && clanCountsObj[1] >= 5 && !teamClans[2]) {
    isClanWar = !!clans[teamClans[1]];
  }
  else if (teamClans[2] && clanCountsObj[2] >= 5 && !teamClans[1]) {
    isClanWar = !!clans[teamClans[2]];
  }

  let top5PerTeam = { 1: [], 2: [] };
  if (stadium.name === "5v5" || stadium.name === "penalty") {
    for (let i = 1; i <= 2; i++) {
      let sArray = prevScore.split("-");
      let oppScore = (i === 1) ? parseInt(sArray[1]) : parseInt(sArray[0]);
      let tEntries = Object.entries(game.teams[i].players);
      let gAuth = null;
      let cAuth = null;
      if (tEntries.length > 0) {
        let defEntries = [...tEntries].sort((a, b) =>
          (i === 1) ? (a[1].meanPosition - b[1].meanPosition) : (b[1].meanPosition - a[1].meanPosition)
        ).slice(0, Math.min(2, tEntries.length));

        let sortedDef = defEntries.sort((a, b) =>
          (b[1].stoppedShots - a[1].stoppedShots) || (b[1].touches - a[1].touches)
        );
        gAuth = sortedDef.length > 0 ? sortedDef[0][0] : null;
        cAuth = sortedDef.length > 1 ? sortedDef[1][0] : null;
      }

      let aRatings = [];
      for (const [a, r] of tEntries) {
        let rat = r.getPoints();
        if (a === gAuth) {
          rat += 4.0;
          if (oppScore === 0) rat += 5.0;
          else if (oppScore === 1) rat += 3.0;
          else if (oppScore === 2) rat += 1.0;
        } else if (a === cAuth) {
          rat += 3.0;
          if (oppScore === 0) rat += 4.0;
          else if (oppScore === 1) rat += 2.0;
          else if (oppScore === 2) rat += 1.0;
        }
        aRatings.push({ auth: a, rating: rat });
      }
      aRatings.sort((a, b) => b.rating - a.rating);
      top5PerTeam[i] = aRatings.slice(0, 5).map(x => x.auth);
    }
  }

  let inGameContributions = [[], []];
  let discordContributions = [[], []];

  let playerStats = [["Người chơi                       ", "Đội ", "Bàn", "Kiến tạo", "Phản lưới", "Đường chuyền", "Sút trúng đích", "Chặn cú sút", "Nỗ lực tạo ra bàn thắng phản lưới", "Sai lầm dẫn đến bàn thua", "Penalty thành công", "Penalty không thành công", "Chạm bóng"]];
  playerStats.push(["-".repeat(playerStats[0].reduce((length, name) => length + name.length + 3, 0) - 3)]);

  for (let i = 0; i < 2; i++) {
    let teamId = i + 1;
    for (const [auth, player] of Object.entries(game.teams[teamId].players)) {
      playerStats.push([
        player.name.padEnd(33 + player.name.length - getDisplayLength(player.name), " "),
        TEAM_NAMES[teamId].padEnd(4, " "),
        player.goals.toString().padEnd(playerStats[0][2].length, " "),
        player.assists.toString().padEnd(playerStats[0][3].length, " "),
        player.ownGoals.toString().padEnd(playerStats[0][4].length, " "),
        player.passes.toString().padEnd(playerStats[0][5].length, " "),
        player.shotsOnTarget.toString().padEnd(playerStats[0][6].length, " "),
        player.stoppedShots.toString().padEnd(playerStats[0][7].length, " "),
        player.attemptsLeadingToOG.toString().padEnd(playerStats[0][8].length, " "),
        player.errorsLeadingToGoal.toString().padEnd(playerStats[0][9].length, " "),
        player.penaltiesScored.toString().padEnd(playerStats[0][10].length, " "),
        player.penaltiesMissed.toString().padEnd(playerStats[0][11].length, " "),
        player.touches.toString().padEnd(playerStats[0][12].length, " ")
      ]);

      let scoreArray = prevScore.split("-");
      let redGoals = parseInt(scoreArray[0]);
      let blueGoals = parseInt(scoreArray[1]);
      let goalDifference = Math.abs(redGoals - blueGoals);
      let opponentScore = (teamId === 1) ? blueGoals : redGoals;

      let teamEntries = Object.entries(game.teams[teamId].players);
      let gkAuth = null;
      let cbAuth = null;
      if (teamEntries.length > 0) {
        let defensiveEntries = [...teamEntries].sort((a, b) =>
          (teamId === 1) ? (a[1].meanPosition - b[1].meanPosition) : (b[1].meanPosition - a[1].meanPosition)
        ).slice(0, Math.min(2, teamEntries.length));

        let sortedDef = defensiveEntries.sort((a, b) =>
          (b[1].stoppedShots - a[1].stoppedShots) || (b[1].touches - a[1].touches)
        );
        gkAuth = sortedDef.length > 0 ? sortedDef[0][0] : null;
        cbAuth = sortedDef.length > 1 ? sortedDef[1][0] : null;
      }

      let item = getStats(auth);
      let pointsEarned = 0;
      let matchRating = player.getPoints();
      let bonusStr = "";

      if (auth === gkAuth) {
        matchRating += 4.0;
        if (opponentScore === 0) { matchRating += 5.0; bonusStr = " (🧤+9.0)"; }
        else if (opponentScore === 1) { matchRating += 3.0; bonusStr = " (🧤+7.0)"; }
        else if (opponentScore === 2) { matchRating += 1.0; bonusStr = " (🧤+5.0)"; }
        else { bonusStr = " (🧤+4.0)"; }
      } else if (auth === cbAuth) {
        matchRating += 3.0;
        if (opponentScore === 0) { matchRating += 4.0; bonusStr = " (🛡️+7.0)"; }
        else if (opponentScore === 1) { matchRating += 2.0; bonusStr = " (🛡️+5.0)"; }
        else if (opponentScore === 2) { matchRating += 1.0; bonusStr = " (🛡️+4.0)"; }
        else { bonusStr = " (🛡️+3.0)"; }
      }

      let isEligible = (stadium.name !== "5v5" && stadium.name !== "penalty") || top5PerTeam[teamId].includes(auth);
      let playerClanValid = item.clan && clans[item.clan] && clans[item.clan].members.length >= 5;
      let clanIconReward = "";

      let hypotheticalWinstreak = item.winstreak || 0;

      if (isEligible) {
        if (surrenderedTeam !== 0) {
          if (teamId == prevWinner) {
            hypotheticalWinstreak++;
            pointsEarned = 2;
            if (isClanWar && item.clan === teamClans[teamId]) { pointsEarned += 2; clanIconReward += " ⚔️"; }
            else if (playerClanValid) { pointsEarned += 1; clanIconReward += " 🛡️"; }

            if (hypotheticalWinstreak >= 3) { pointsEarned += 1; clanIconReward += " 🔥"; }
            if (bountyClaimed) { pointsEarned += 2; clanIconReward += " 🎯"; }
          } else {
            // ☠️ ĐỒNG BỘ: Đội trưởng hàng -4, Thành viên -2
            let penalty = (auth === getAuth(captains[teamId])) ? 4 : 2;
            pointsEarned -= Math.min(penalty, item.points);
          }
        } else {
          if (teamId == prevWinner) {
            hypotheticalWinstreak++;
            if (matchRating >= 10) pointsEarned = 3;
            else if (matchRating >= 7) pointsEarned = 2;
            else if (matchRating >= 2) pointsEarned = 1;
            else pointsEarned = 0;

            if (isClanWar && item.clan === teamClans[teamId]) { pointsEarned += 2; clanIconReward += " ⚔️"; }
            else if (playerClanValid) { pointsEarned += 1; clanIconReward += " 🛡️"; }

            if (hypotheticalWinstreak >= 3) { pointsEarned += 1; clanIconReward += " 🔥"; }
            if (bountyClaimed) { pointsEarned += 2; clanIconReward += " 🎯"; }
          } else {
            // ☠️ ĐỒNG BỘ: Thiết quân luật mới (Gắt gao hơn, bỏ giảm án)
            let penalty = 0;
            if (auth == motmAuth) { penalty = 0; }
            else {
              if (matchRating >= 7.0) penalty = 1;
              else if (matchRating >= 4.5) penalty = 2;
              else penalty = 3;
            }
            // Đã xóa bỏ hoàn toàn các dòng "if (goalDifference === 1) penalty--", v.v...
            pointsEarned -= Math.min(penalty, item.points);
          };
        }
        if (surrenderedTeam === 0 && auth == motmAuth && teamId == prevWinner) {
          pointsEarned += 1; clanIconReward += " 🏅";
          if (!item.clan) { pointsEarned += 2; clanIconReward += " 🐺"; }
        }
      } else {
        // ĐỒNG BỘ: Ngoài Top 5 vẫn được an toàn (0 sao)
        pointsEarned = 0;
      }

      let finalPoints = item.points + pointsEarned;
      let signStr = "";
      if (pointsEarned > 0) signStr = `+${pointsEarned}★${clanIconReward}`;
      else if (pointsEarned < 0) signStr = `${pointsEarned}★`;
      else signStr = isEligible ? `Miễn trừ${clanIconReward}` : `Ngoài Top 5`;

      let statsStr = "";
      if (player.goals == 1) statsStr += "⚽"; else if (player.goals > 1) statsStr += `${player.goals}⚽`;
      if (player.assists == 1) statsStr += "👟"; else if (player.assists > 1) statsStr += `${player.assists}👟`;
      if (player.ownGoals == 1) statsStr += "🥅"; else if (player.ownGoals > 1) statsStr += `${player.ownGoals}🥅`;

      if (statsStr !== "") inGameContributions[i].push(`${player.name} (${statsStr})`);

      let discordPlayerStr = player.name;
      if (statsStr !== "") discordPlayerStr += ` (${statsStr})`;

      discordPlayerStr += ` [Rating: ${matchRating.toFixed(1)}${bonusStr} | ${signStr} | Tổng: ${finalPoints}★]`;
      discordContributions[i].push(discordPlayerStr);
    };
  };
  playerStats.push([""], [`Man of the Match: ${motm}`]);

  let statsMsg = `Thống kê kiểm soát bóng: 🔴 ${stats.possession.map(possession => possession + "%").join(" - ")} 🔵
Số pha dứt điểm trúng đích: 🔴 ${stats.shotsOnTarget.join(" - ")} 🔵
Số đường chuyền thành công: 🔴 ${stats.passes.join(" - ")} 🔵`;

  if (inGameContributions[0].length != 0) {
    statsMsg += `\n🔴 ĐỎ: ${inGameContributions[0].join("  •  ")}`;
  };
  if (inGameContributions[1].length != 0) {
    statsMsg += `\n🔵 XANH: ${inGameContributions[1].join("  •  ")}`;
  };
  statsMsg += `\n🏅 Cầu thủ xuất sắc nhất trận (MOTM): ${motm}`;
  statsMsg += `\n🔥 Chuỗi trận thắng liên tiếp: ${winningStreak} trận`;

  room.sendAnnouncement(statsMsg, null, 0xFFFFFF, "small-bold", 0);

  let capRed = room.getPlayer(captains[1]) ? room.getPlayer(captains[1]).name : "Ẩn danh";
  let capBlue = room.getPlayer(captains[2]) ? room.getPlayer(captains[2]).name : "Ẩn danh";

  let discordMsg = `**RED (captain: ${capRed})**\n\`\`\`ansi\n\x1b[1;31m${discordContributions[0].join("\n")}\`\`\`\n**BLUE (captain: ${capBlue})**\n\`\`\`ansi\n\x1b[1;34m${discordContributions[1].join("\n")}\`\`\``;

  let discordFields = [
    { name: "Thống kê trận đấu", value: "=======================\n\n**Kiểm soát bóng**\n**Sút trúng đích**\n**Lượt chuyền bóng**", inline: true },
    { name: "🔴 **RED**", value: `==========\n\n${stats.possession[0]}%\n${stats.shotsOnTarget[0]}\n${stats.passes[0]}`, inline: true },
    { name: "🔵 **BLUE**", value: `==========\n\n${stats.possession[1]}%\n${stats.shotsOnTarget[1]}\n${stats.passes[1]}`, inline: true },
    { name: "📺 Thông tin & Xem lại Replay", value: `MOTM: ${motm}\nThời gian: ${elapsedTime}\nChuỗi bất bại: ${winningStreak} trận\n\n📥 **CÁCH XEM LẠI TRẬN ĐẤU:**\n1. Tải file \`.hbr2\` đính kèm ở dưới.\n2. Truy cập: [Haxball Replay Analyzer](https://haxball-replay-analyzer.github.io/)\n3. Kéo thả file vừa tải vào trang web để thưởng thức highlight!`, inline: false }
  ];

  if (typeof sendWebhook === "function" && recordData) {
    sendWebhook(`🌟 ${scoreline}`, discordMsg, discordFields, [[new Date().toString().slice(0, 21).replace(":", "h") + ".hbr2", recordData], ["players_report.txt", playerStats.map(arr => arr.join(" | ")).join("\n")]]);
  }

  room.sendAnnouncement(`📺 Video Replay trận đấu đã được lưu trên Server Discord! Gõ !discord để lấy link tham gia nhóm và xem lại nhé.`, null, 0x00FFFF, "bold", 2);
}
// =========================================================================
// 🏆 HỆ THỐNG XUẤT BÁO CÁO & TÌM MVP TOÀN DIỆN (RESET LÚC 23:59)
// =========================================================================

let hasSentDailyReport = false;

async function sendDailyStatsToDiscord(isAutoReset = false) {
  if (!DISCORD_STATS_WEBHOOK) {
    if (!isAutoReset) room.sendChat("⚠️ Discord: Chưa cài đặt Webhook cho Bảng Vinh Danh!");
    return;
  }

  try {
    let rawData = localStorage.getItem("daily_stats");

    // =========================================================
    // 🛡️ 1. XỬ LÝ KHI PHÒNG TRỐNG (KHÔNG CÓ DỮ LIỆU CẢ NGÀY)
    // =========================================================
    if (!rawData || rawData === "{}") {
      if (!isAutoReset) room.sendChat("⚠️ Discord: Chưa có dữ liệu thi đấu nào trong ngày hôm nay!");

      if (isAutoReset) {
        localStorage.removeItem("last_daily_mvp");
        localStorage.removeItem("last_daily_gk");
        localStorage.removeItem("daily_stats");
        room.sendChat("♻️ Hôm nay không có ai thi đấu. Đã reset đồng hồ sang ngày mới!");
      }
      return; // Dừng lại sau khi dọn sạch
    }

    let parsedData = JSON.parse(rawData);

    // 🎯 Gắn thẻ ID (auth) và chỉ xét những ai đá từ 5 trận trở lên
    let players = Object.keys(parsedData).map(k => ({ ...parsedData[k], auth: k })).filter(p => p.games >= 3);

    // =========================================================
    // 🛡️ 2. XỬ LÝ KHI CÓ NGƯỜI ĐÁ NHƯNG CHƯA AI ĐỦ 3 TRẬN (VÁ LỖI Ở ĐÂY)
    // =========================================================
    if (players.length === 0) {
      if (!isAutoReset) room.sendChat("⚠️ Discord: Hôm nay chưa có ai đá đủ 3 trận để lên Bảng Vinh Danh!");

      // Dù không đủ 5 trận nhưng nếu đến giờ (23:59) thì VẪN PHẢI RESET!
      if (isAutoReset) {
        localStorage.removeItem("last_daily_mvp");
        localStorage.removeItem("last_daily_gk");
        localStorage.removeItem("daily_stats");
        room.sendChat("♻️ Dữ liệu hôm nay chưa đủ tiêu chuẩn vinh danh. Đã tự động reset sang ngày mới!");
      }
      return; // Dừng lại sau khi dọn sạch
    }

    // =========================================================
    // 👑 TÌM MVP TOÀN DIỆN CỦA NGÀY (VỊ TRÍ TRUNG BÌNH CAO NHẤT)
    // =========================================================
    let rankByGoals = [...players].sort((a, b) => (b.goals || 0) - (a.goals || 0));
    let rankByAssists = [...players].sort((a, b) => (b.assists || 0) - (a.assists || 0));
    let rankByMotms = [...players].sort((a, b) => (b.motms || 0) - (a.motms || 0));
    let rankByPoints = [...players].sort((a, b) => (b.points || 0) - (a.points || 0));
    let rankByCleanSheets = [...players].sort((a, b) => (b.cleansheets || 0) - (a.cleansheets || 0));

    // ⚖️ LUẬT CÔNG LÝ: Đồng điểm thì đồng hạng (Đặc biệt là những người có số 0)
    const getFairRank = (list, key, value) => {
      return list.findIndex(x => (x[key] || 0) === (value || 0)) + 1;
    };

    players.forEach(p => {
      let rGoals = getFairRank(rankByGoals, 'goals', p.goals);
      let rAssists = getFairRank(rankByAssists, 'assists', p.assists);
      let rMotms = getFairRank(rankByMotms, 'motms', p.motms);
      let rPoints = getFairRank(rankByPoints, 'points', p.points);
      let rCleanSheets = getFairRank(rankByCleanSheets, 'cleansheets', p.cleansheets);

      p.avgRank = (rGoals + rAssists + rMotms + rPoints + rCleanSheets) / 5;
    });

    let dailyMVP = [...players].sort((a, b) => a.avgRank - b.avgRank)[0];
    let topGK = rankByCleanSheets[0];

    let topGoals = rankByGoals.slice(0, 10);
    let topAssists = rankByAssists.slice(0, 10);
    let topMotms = rankByMotms.slice(0, 10);
    let topPoints = rankByPoints.slice(0, 10);
    let topCleanSheets = rankByCleanSheets.slice(0, 10);

    const formatList = (list, key, suffix = "") => {
      return list.length > 0
        ? list.map((p, i) => `**${i + 1}.** ${p.name} - ${p[key] || 0}${suffix}`).join('\n')
        : "_Chưa có dữ liệu_";
    };

    let discordFields = [
      { name: "⚽ TOP 10 VUA PHÁ LƯỚI", value: formatList(topGoals, 'goals', ' bàn'), inline: true },
      { name: "👟 TOP 10 VUA KIẾN TẠO", value: formatList(topAssists, 'assists', ' kiến tạo'), inline: true },
      { name: "🏅 TOP 10 ĐẠT NHIỀU MOTM NHẤT", value: formatList(topMotms, 'motms', ' lần'), inline: true },
      { name: "⭐ TOP 10 BÚ NHIỀU SAO NHẤT", value: formatList(topPoints, 'points', ' ★'), inline: true },
      { name: "🧤 TOP 10 BÀN TAY VÀNG", value: formatList(topCleanSheets, 'cleansheets', ' trận sạch lưới'), inline: true }
    ];

    let now = new Date();
    let vnTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    let dateStr = `${String(vnTime.getUTCDate()).padStart(2, '0')}/${String(vnTime.getUTCMonth() + 1).padStart(2, '0')}/${vnTime.getUTCFullYear()}`;

    let mvpText = "";
    if (dailyMVP) {
      if (isAutoReset) {
        mvpText = `\n\n👑 **MVP TOÀN DIỆN CỦA NGÀY:** \`${dailyMVP.name}\` với phong độ áp đảo trên TẤT CẢ các BXH (Vị trí Trung Bình: Top ${dailyMVP.avgRank.toFixed(1)}) đã được hệ thống thưởng nóng **+36★** vào tài khoản gốc!`;
      } else {
        mvpText = `\n\n👑 **(DỰ KIẾN) MVP TOÀN DIỆN:** \`${dailyMVP.name}\` đang dẫn đầu mọi BXH với Vị trí Trung Bình là Top ${dailyMVP.avgRank.toFixed(1)}. Cố gắng giữ vững ngôi vương nhé!`;
      }
    }

    let payload = {
      content: `🎉 **BẢNG VINH DANH LỎ ROOM - NGÀY ${dateStr}** 🎉\nDữ liệu 24h qua đã được tổng hợp.${mvpText}`,
      embeds: [{
        color: 16766720,
        title: `🏆 THỐNG KÊ ROOM TRONG NGÀY 🏆`,
        description: `_Dữ liệu tổng hợp trong ngày ${dateStr} (Đá từ 3 trận trở lên)_`,
        fields: discordFields,
        footer: { text: "Hệ thống tự động Reset vào 00:00 mỗi ngày" },
        timestamp: new Date().toISOString()
      }]
    };

    await fetch(DISCORD_STATS_WEBHOOK, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    room.sendChat("✅ Đã xuất báo cáo Bảng Vinh Danh Ngày sang Discord!");

    // =========================================================
    // 💰 PHÁT THƯỞNG CHO TOP 3, LẬP SỔ BƯU ĐIỆN & RESET (LÚC 23:59)
    // =========================================================
    if (isAutoReset) {
      let dailyVips = {};

      // 1. TRẢ THƯỞNG MVP TOÀN DIỆN (+36 SAO)
      if (dailyMVP && dailyMVP.auth) {
        let originalStats = JSON.parse(localStorage.getItem(dailyMVP.auth));
        if (originalStats) {
          originalStats.points = (originalStats.points || 0) + 36;
          localStorage.setItem(dailyMVP.auth, JSON.stringify(originalStats));

          dailyVips[dailyMVP.auth] = {
            name: dailyMVP.name,
            mvp: true,
            titles: ["MVP Toàn Diện"],
            totalBonus: 36,
            notified: false
          };

          room.sendChat(`👑 CHÚC MỪNG MVP TOÀN DIỆN [ ${dailyMVP.name.toUpperCase()} ] ! Thưởng nóng: +36★`);
        }
      }

      // 2. TRẢ THƯỞNG CHO TOP 3 CÁC HẠNG MỤC (Top 1: +20, Top 2: +10, Top 3: +5)
      let topCategories = [
        { list: rankByGoals, stat: 'goals', title: 'Vua Phá Lưới' },
        { list: rankByAssists, stat: 'assists', title: 'Vua Kiến Tạo' },
        { list: rankByMotms, stat: 'motms', title: 'Nhiều MOTM Nhất' },
        { list: rankByPoints, stat: 'points', title: 'Cầu Thủ Bú Sao' },
        { list: rankByCleanSheets, stat: 'cleansheets', title: 'Găng Tay Vàng' }
      ];

      let rewardTiers = [20, 10, 5]; // 🎯 Mức thưởng tương ứng cho Top 1, Top 2, Top 3

      topCategories.forEach(cat => {
        // Lấy ra 3 người đứng đầu của mỗi bảng
        let top3 = cat.list.slice(0, 3);

        top3.forEach((player, index) => {
          // Phải có thành tích > 0 mới được nhận thưởng (Ví dụ thủ môn phải có ít nhất 1 trận sạch lưới)
          if (player && player.auth && player[cat.stat] > 0) {
            let auth = player.auth;
            let pStats = JSON.parse(localStorage.getItem(auth));
            let rewardPoint = rewardTiers[index];
            let rankTitle = `Top ${index + 1} ${cat.title}`; // Tự tạo chữ: "Top 1 Vua Phá Lưới", "Top 2 Vua Kiến Tạo"...

            if (pStats) {
              // Cộng sao vào tài khoản gốc
              pStats.points = (pStats.points || 0) + rewardPoint;
              localStorage.setItem(auth, JSON.stringify(pStats));

              // Viết vào Sổ Bưu Điện
              if (!dailyVips[auth]) {
                dailyVips[auth] = { name: player.name, mvp: false, titles: [], totalBonus: 0, notified: false };
              }
              dailyVips[auth].titles.push(rankTitle);
              dailyVips[auth].totalBonus += rewardPoint;

              // 📢 Chỉ thông báo Top 1 lên kênh chat chung lúc 23:59 cho đỡ rác màn hình
              if (index === 0) {
                room.sendChat(`🥇 [${rankTitle}]: ${player.name.toUpperCase()} được thưởng nóng +${rewardPoint}★!`);
              }
            }
          }
        });
      });

      // Lưu sổ Bưu Điện lại để sáng mai anh em vào game thì phát thư riêng
      localStorage.setItem("daily_vip_guests", JSON.stringify(dailyVips));

      // Dọn rác
      localStorage.removeItem("last_daily_mvp");
      localStorage.removeItem("last_daily_gk");
      localStorage.removeItem("daily_stats");
      // ... (Đoạn code reset dữ liệu ngày ngài đã làm trước đó)
      room.sendChat("♻️ Đã reset dữ liệu ngày về 0. Bắt đầu cuộc đua mới!");

      // =========================================================
      // 📁 TRÍCH XUẤT VÀ GỬI FILE TEXT TOP 100 ALL-TIME (BẢN FULL CATEGORY)
      // =========================================================
      try {
        let allPlayers = [];
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          if (["daily_stats", "last_daily_mvp", "last_daily_gk", "daily_vip_guests", "last_alltime_ranks"].includes(key)) continue;

          try {
            let data = JSON.parse(localStorage.getItem(key));
            if (data && data.name) {
              allPlayers.push({ auth: key, ...data });
            }
          } catch (e) { }
        }

        if (allPlayers.length > 0) {
          let lastRanksRaw = localStorage.getItem("last_alltime_ranks");
          let lastRanks = lastRanksRaw ? JSON.parse(lastRanksRaw) : {};
          let currentRanks = {};

          const getRankChangeStr = (auth, currentRank, category) => {
            if (!lastRanks[auth] || lastRanks[auth][category] === undefined) return "🆕 Mới   ";
            let oldRank = lastRanks[auth][category];
            let diff = oldRank - currentRank;
            if (diff > 0) return `⬆️ (+${diff})`.padEnd(8, ' ');
            if (diff < 0) return `⬇️ (${diff})`.padEnd(8, ' ');
            return `➖      `;
          };

          // 1. Phân loại và Sắp xếp tất cả các hạng mục
          let sortByPoints = [...allPlayers].sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 100);
          let sortByGoals = [...allPlayers].sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 100);
          let sortByAssists = [...allPlayers].sort((a, b) => (b.assists || 0) - (a.assists || 0)).slice(0, 100);

          // Thêm: MOTM
          let sortByMotm = [...allPlayers].sort((a, b) => (b.motm || b.motms || 0) - (a.motm || a.motms || 0)).slice(0, 100);

          // Thêm: Găng Tay Vàng (Chỉ tính số trận giữ sạch lưới)
          let sortByGK = [...allPlayers].sort((a, b) => (b.cleansheets || 0) - (a.cleansheets || 0)).slice(0, 100);


          // Thêm: Phản Lưới Nhà
          let sortByOG = [...allPlayers].sort((a, b) => (b.ownGoals || 0) - (a.ownGoals || 0)).slice(0, 100);

          // 2. Cập nhật hạng hôm nay vào Rổ
          sortByPoints.forEach((p, i) => { if (!currentRanks[p.auth]) currentRanks[p.auth] = {}; currentRanks[p.auth].points = i + 1; });
          sortByGoals.forEach((p, i) => { if (!currentRanks[p.auth]) currentRanks[p.auth] = {}; currentRanks[p.auth].goals = i + 1; });
          sortByAssists.forEach((p, i) => { if (!currentRanks[p.auth]) currentRanks[p.auth] = {}; currentRanks[p.auth].assists = i + 1; });
          sortByMotm.forEach((p, i) => { if (!currentRanks[p.auth]) currentRanks[p.auth] = {}; currentRanks[p.auth].motm = i + 1; });
          sortByGK.forEach((p, i) => { if (!currentRanks[p.auth]) currentRanks[p.auth] = {}; currentRanks[p.auth].gk = i + 1; });
          sortByOG.forEach((p, i) => { if (!currentRanks[p.auth]) currentRanks[p.auth] = {}; currentRanks[p.auth].og = i + 1; });

          localStorage.setItem("last_alltime_ranks", JSON.stringify(currentRanks));

          // 3. Xây dựng Báo Cáo Text
          let txtContent = `🏆 BẢNG XẾP HẠNG TOP 100 MỌI THỜI ĐẠI 🏆\nNgày xuất: ${dateStr}\n`;
          txtContent += `========================================================\n`;
          txtContent += `(Chú thích: ⬆️ Tăng hạng | ⬇️ Tụt hạng | ➖ Giữ nguyên | 🆕 Mới vào Top)\n\n`;

          txtContent += `⭐ TOP 100 SAO (POINTS) ⭐\n`;
          sortByPoints.forEach((p, i) => {
            let changeStr = getRankChangeStr(p.auth, i + 1, 'points');
            txtContent += `[${changeStr}] ${(i + 1).toString().padStart(3, ' ')}. ${p.name} - ${p.points || 0}★\n`;
          });

          txtContent += `\n⚽ TOP 100 BÀN THẮNG ⚽\n`;
          sortByGoals.forEach((p, i) => {
            let changeStr = getRankChangeStr(p.auth, i + 1, 'goals');
            txtContent += `[${changeStr}] ${(i + 1).toString().padStart(3, ' ')}. ${p.name} - ${p.goals || 0} bàn\n`;
          });

          txtContent += `\n👟 TOP 100 KIẾN TẠO 👟\n`;
          sortByAssists.forEach((p, i) => {
            let changeStr = getRankChangeStr(p.auth, i + 1, 'assists');
            txtContent += `[${changeStr}] ${(i + 1).toString().padStart(3, ' ')}. ${p.name} - ${p.assists || 0} kiến tạo\n`;
          });

          txtContent += `\n🏅 TOP 100 MOTM (ĐẠT NHIỀU MOTM NHẤT) 🏅\n`;
          sortByMotm.forEach((p, i) => {
            let changeStr = getRankChangeStr(p.auth, i + 1, 'motm');
            txtContent += `[${changeStr}] ${(i + 1).toString().padStart(3, ' ')}. ${p.name} - ${p.motm || p.motms || 0} lần MOTM\n`;
          });

          txtContent += `\n🧤 TOP 100 GĂNG TAY VÀNG (SẠCH LƯỚI) 🧤\n`;
          sortByGK.forEach((p, i) => {
            let changeStr = getRankChangeStr(p.auth, i + 1, 'gk');
            // Chỉ hiện nếu có ít nhất 1 trận sạch lưới
            if ((p.cleansheets || 0) > 0) {
              txtContent += `[${changeStr}] ${(i + 1).toString().padStart(3, ' ')}. ${p.name} - 🛡️ ${p.cleansheets} trận sạch lưới\n`;
            }
          });


          txtContent += `\n🤡 TOP 100 PHẢN LƯỚI NHÀ (QUÁ NGU) 🤡\n`;
          sortByOG.forEach((p, i) => {
            let changeStr = getRankChangeStr(p.auth, i + 1, 'og');
            // Chỉ hiện những ông nào có phản lưới > 0 để tránh bảng dài toàn số 0
            if ((p.ownGoals || 0) > 0) {
              txtContent += `[${changeStr}] ${(i + 1).toString().padStart(3, ' ')}. ${p.name} - ❌ ${p.ownGoals} quả phản lưới\n`;
            }
          });

          // Gói thành File .txt và ném qua Webhook Discord
          let blob = new Blob([txtContent], { type: "text/plain" });
          let formData = new FormData();
          formData.append("payload_json", JSON.stringify({
            content: `📁 **BÁO CÁO ALL-TIME TỔNG HỢP:** Cập nhật BXH Điểm, Bàn Thắng, Kiến Tạo, MOTM, Găng Tay Vàng và Báo Thủ!`
          }));

          let safeDateStr = dateStr.replace(/\//g, "-");
          formData.append("file", blob, `Top100_FullStats_${safeDateStr}.txt`);

          await fetch(DISCORD_STATS_WEBHOOK, {
            method: "POST",
            body: formData
          });
        }
      } catch (err) {
        console.error("Lỗi khi xuất file Text All-time:", err);
      }
    }

  } catch (error) {
    console.error("Lỗi gửi Discord Daily:", error);
  }
}
// =========================================================================
// 🧹 HỆ THỐNG TỰ ĐỘNG GIẢI TÁN CLAN THIẾU THÀNH VIÊN (CHẠY NGẦM)
// =========================================================================
function checkAndDisbandClans() {
  let currentTime = Date.now();
  let clansToDelete = [];
  let isDataUpdated = false;

  for (let tag in clans) {
    let c = clans[tag];
    let memberCount = c.members.length;

    // Khởi tạo mốc thời gian bắt đầu thiếu người
    if (!c.understaffedSince) {
      c.understaffedSince = currentTime;
      isDataUpdated = true;
    }

    // NẾU THIẾU NGƯỜI (< 5) -> Bắt đầu đếm ngày tử hình
    if (memberCount < 5) {
      let daysUnderstaffed = (currentTime - c.understaffedSince) / (1000 * 60 * 60 * 24);

      // Hết thời gian ân hạn tuyển quân -> Đưa vào danh sách trảm
      if (
        (memberCount <= 1 && daysUnderstaffed >= 3) ||
        (memberCount <= 3 && daysUnderstaffed >= 5) ||
        (memberCount <= 4 && daysUnderstaffed >= 7)
      ) {
        clansToDelete.push(tag);
      }
    }
    // NẾU ĐÃ ĐỦ 5 NGƯỜI -> An toàn. Neo giữ thời gian ở hiện tại.
    else {
      if (c.understaffedSince !== currentTime) {
        c.understaffedSince = currentTime;
        isDataUpdated = true;
      }
    }
  }

  // ==========================================
  // XỬ LÝ GIẢI TÁN CLAN
  // ==========================================
  if (clansToDelete.length > 0) {
    for (let tag of clansToDelete) {
      // 1. Gỡ Tag Clan khỏi các thành viên
      for (let memberAuth of clans[tag].members) {
        let memberStats = getStats(memberAuth);
        memberStats.clan = null;
        delete memberStats.auth;
        localStorage.setItem(memberAuth, JSON.stringify(memberStats));
      }
      // 2. Xóa Tag Clan khỏi danh sách kẻ thù của các Clan khác
      for (let t in clans) {
        if (clans[t].rivals) clans[t].rivals = clans[t].rivals.filter(r => r !== tag);
        if (clans[t].rivalRequests) clans[t].rivalRequests = clans[t].rivalRequests.filter(r => r !== tag);
      }
      // 3. Xóa Clan khỏi Database
      delete clans[tag];
    }

    saveClans();
    room.sendAnnouncement(`📢 [HỆ THỐNG]: Đã tự động giải tán ${clansToDelete.length} Clan do không duy trì đủ số lượng thành viên tối thiểu!`, null, 0xFF4444, "small-bold", 0);
  } else if (isDataUpdated) {
    saveClans();
  }
}

// Chạy tự động kiểm tra mỗi 30 phút một lần
setInterval(checkAndDisbandClans, 30 * 60 * 1000);
setTimeout(checkAndDisbandClans, 5000); // Chạy 1 lần ngay khi khởi động
// 🕒 HỆ THỐNG KIỂM TRA ĐỒNG HỒ (MỖI 30s)
function checkDailyReportTimer() {
  let now = new Date();
  let vnTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  let hours = vnTime.getUTCHours();
  let minutes = vnTime.getUTCMinutes();

  if (hours === 23 && minutes === 59) {
    if (!hasSentDailyReport) {
      sendDailyStatsToDiscord(true); // Gửi xong là Chốt sổ Trả thưởng & Reset
      hasSentDailyReport = true;
    }
  } else {
    hasSentDailyReport = false;
  }
}
setInterval(checkDailyReportTimer, 30000);

// LỆNH TEST DÀNH CHO SUPER ADMIN (!testdiscord)
function testDiscordFunc(value, player) {
  room.sendAnnouncement("⏳ Đang thu thập số liệu Ngày và bắn sang Discord...", player.id, GREEN);
  sendDailyStatsToDiscord(false); // Chỉ Test, Không Reset, Không trả thưởng!
  return false;
}
// =========================================================================
// 📢 HỆ THỐNG PHÁT THANH ĐUA TOP TRONG NGÀY (TRỰC TIẾP TRONG GAME)
// =========================================================================
function announceDailyLeaders(playerId = null, isFullTop = false) {
  let rawData = localStorage.getItem("daily_stats");
  if (!rawData) {
    if (playerId) room.sendAnnouncement("⚠️ Chưa có dữ liệu thi đấu nào trong ngày hôm nay!", playerId, 0xFF4444, "italic", 1);
    return;
  }

  let parsedData = JSON.parse(rawData);
  // 🎯 Đã sửa thành >= 3 trận để đồng bộ với lúc chốt sổ cuối ngày
  let players = Object.keys(parsedData).map(k => ({ ...parsedData[k], auth: k })).filter(p => p.games >= 3);

  if (players.length === 0) {
    if (playerId) room.sendAnnouncement("⚠️ Hôm nay chưa có ai đá đủ 3 trận để lên Bảng Vinh Danh!", playerId, 0xFF4444, "italic", 1);
    return;
  }

  let rankByGoals = [...players].sort((a, b) => (b.goals || 0) - (a.goals || 0));
  let rankByAssists = [...players].sort((a, b) => (b.assists || 0) - (a.assists || 0));
  let rankByMotms = [...players].sort((a, b) => (b.motms || 0) - (a.motms || 0));
  let rankByPoints = [...players].sort((a, b) => (b.points || 0) - (a.points || 0));
  let rankByCleanSheets = [...players].sort((a, b) => (b.cleansheets || 0) - (a.cleansheets || 0));

  // ⚖️ LUẬT CÔNG LÝ: Đồng điểm thì đồng hạng
  const getFairRank = (list, key, value) => {
    return list.findIndex(x => (x[key] || 0) === (value || 0)) + 1;
  };

  players.forEach(p => {
    let rGoals = getFairRank(rankByGoals, 'goals', p.goals);
    let rAssists = getFairRank(rankByAssists, 'assists', p.assists);
    let rMotms = getFairRank(rankByMotms, 'motms', p.motms);
    let rPoints = getFairRank(rankByPoints, 'points', p.points);
    let rCleanSheets = getFairRank(rankByCleanSheets, 'cleansheets', p.cleansheets);

    p.avgRank = (rGoals + rAssists + rMotms + rPoints + rCleanSheets) / 5;
  });

  let currentMVP = [...players].sort((a, b) => a.avgRank - b.avgRank)[0];

  // Hàm hỗ trợ in ra Top 3 trên cùng 1 dòng cho gọn gàng
  const getTop3Str = (list, key, suffix) => {
    let top3 = list.slice(0, 3).filter(p => p[key] > 0);
    if (top3.length === 0) return "_Chưa có_";
    let medals = ["🥇", "🥈", "🥉"];
    return top3.map((p, i) => `${medals[i]} ${p.name} (${p[key]}${suffix})`).join("   ");
  };

  // 🎯 PHÂN LUỒNG THÔNG BÁO
  if (isFullTop) {
    // LUỒNG 1: KHI GÕ LỆNH !top -> Báo cáo Top 3 đầy đủ mọi hạng mục
    room.sendAnnouncement(`📊 BẢNG VÀNG HIỆN TẠI (Đá 3 trận trở lên) 📊`, playerId, 0x00FF00, "bold", 1);
    room.sendAnnouncement(`⚽ Vua Phá Lưới: ${getTop3Str(rankByGoals, 'goals', '')}`, playerId, 0xFFFFFF, "normal", 1);
    room.sendAnnouncement(`👟 Vua Kiến Tạo: ${getTop3Str(rankByAssists, 'assists', '')}`, playerId, 0xFFFFFF, "normal", 1);
    room.sendAnnouncement(`🏅 Nhiều MOTM Nhất: ${getTop3Str(rankByMotms, 'motms', '')}`, playerId, 0xFFFFFF, "normal", 1);
    room.sendAnnouncement(`⭐ Bú Sao Nhiều Nhất: ${getTop3Str(rankByPoints, 'points', '★')}`, playerId, 0xFFFFFF, "normal", 1);
    room.sendAnnouncement(`🧤 Găng Tay Vàng: ${getTop3Str(rankByCleanSheets, 'cleansheets', '')}`, playerId, 0xFFFFFF, "normal", 1);
    if (currentMVP) room.sendAnnouncement(`👑 MVP TOÀN DIỆN DẪN ĐẦU: ${currentMVP.name} (Hạng TB: Top ${currentMVP.avgRank.toFixed(1)})`, playerId, 0xFFD700, "bold", 2);

  } else {
    // LUỒNG 2: TỰ ĐỘNG BÁO MỖI 17 PHÚT -> Chữ nhỏ, KHÔNG Ping (âm thanh = 0)
    room.sendAnnouncement("📊 ĐIỂM TIN NHANH: TOP 1 CÁC HẠNG MỤC 📊", null, 0x00FFFF, "small-bold", 0);

    if (rankByGoals[0] && rankByGoals[0].goals > 0)
      room.sendAnnouncement(`⚽ Vua Phá Lưới: ${rankByGoals[0].name} (${rankByGoals[0].goals} bàn)`, null, 0xFFFFFF, "small", 0);
    if (rankByAssists[0] && rankByAssists[0].assists > 0)
      room.sendAnnouncement(`👟 Vua Kiến Tạo: ${rankByAssists[0].name} (${rankByAssists[0].assists} kiến tạo)`, null, 0xFFFFFF, "small", 0);
    if (rankByMotms[0] && rankByMotms[0].motms > 0)
      room.sendAnnouncement(`🏅 Vua Gánh Team (MOTM): ${rankByMotms[0].name} (${rankByMotms[0].motms} lần)`, null, 0xFFFFFF, "small", 0);
    if (rankByPoints[0] && rankByPoints[0].points > 0)
      room.sendAnnouncement(`⭐ Vua Bú Sao: ${rankByPoints[0].name} (${rankByPoints[0].points}★)`, null, 0xFFFFFF, "small", 0);
    if (rankByCleanSheets[0] && rankByCleanSheets[0].cleansheets > 0)
      room.sendAnnouncement(`🧤 Găng Tay Vàng: ${rankByCleanSheets[0].name} (${rankByCleanSheets[0].cleansheets} trận)`, null, 0xFFFFFF, "small", 0);

    if (currentMVP) {
      room.sendAnnouncement(`👑 MVP TOÀN DIỆN ĐANG DẪN ĐẦU: ${currentMVP.name} (Hạng TB: Top ${currentMVP.avgRank.toFixed(1)})`, null, 0xFFD700, "small-bold", 0);
    }
  }
}

// 🕒 TỰ ĐỘNG PHÁT THANH CHO CẢ PHÒNG XEM MỖI 23 PHÚT (isFullTop = false)
setInterval(() => {
  if (room.getPlayerList().length > 0) {
    announceDailyLeaders(null, false);
  }
}, 23 * 60 * 1000);

// HÀM CHO LỆNH !top (isFullTop = true)
function checkTopFunc(value, player) {
  announceDailyLeaders(player.id, true);
  return false;
}
function resetDayFunc(value, player) {
  localStorage.removeItem("daily_stats");
  room.sendAnnouncement("🧹 [HỆ THỐNG]: Super Admin đã quét sạch toàn bộ dữ liệu Đua Top ngày. Bắt đầu tính điểm lại từ con số 0!", null, 0xFF4444, "bold", 2);
  return false;
}

function celebrateGoal(team) {
  let scores = room.getScores();
  let goalDiff = scores.red - scores.blue;
  if (team == 2) goalDiff = -goalDiff;
  let scoreline = `${scores.red}-${scores.blue}`;

  // Tiếng hô ghi bàn nay chỉ còn là tiếng thở dài...
  var scream = "VÀO!";
  var comment = "Pha dứt điểm thành công. Bàn thắng được công nhận.";

  if (
    ((scores.scoreLimit != 0) && [scores.red, scores.blue].includes(scores.scoreLimit)) ||
    ((scores.timeLimit != 0) && (scores.time > scores.timeLimit - 7.5))
  ) {
    scream = "BÀN THẮNG ẤN ĐỊNH TRẬN ĐẤU!"; // Thông báo dứt khoát cho bàn thắng chốt hạ hoặc phút cuối
    comment = randomChoice(WINNING_GOAL_COMMENTARIES);
  } else {
    if ((scores.timeLimit != 0) && (scores.time > scores.timeLimit - 10)) goalDiff = -3;
    var comments = GOAL_COMMENTARIES[goalDiff];
    if (comments) comment = comments[Math.floor(Math.random() * comments.length)];
  };

  room.sendChat(`⚽ ${scream} [${scoreline}] - ${comment}`);
}


function celebratePenalty(team) {
  if (team == 1) {
    room.sendChat(randomChoice(PENALTY_GOAL_COMMENTARIES));
  } else {
    room.sendChat(randomChoice(PENALTY_MISS_COMMENTARIES));
  };
}

function checkSpam(player, message) {
  let time = new Date().getTime();
  if (
    (lastMessages.length >= 4) &&
    (message === lastMessages[0][0]) &&
    (message === lastMessages[1][0]) &&
    (message === lastMessages[2][0]) &&
    (message === lastMessages[3][0]) &&
    (time - lastMessages[0][2] < 8000)
  ) {
    muteFunc(`${getTag(player.name)} 1 Spam`, room.getPlayer(0));
    return true;
  } else if (
    (lastMessages.length == 4) &&
    (lastMessages.every(message => message[1] == player.id)) &&
    (time - lastMessages[3][2] < 8000)
  ) {
    muteFunc(`${getTag(player.name)} 1 Nhắn quá nhanh`, room.getPlayer(0));
    return true;
  };
  lastMessages.unshift([message, player.id, time]);
  if (lastMessages.length > 5) lastMessages.pop();
  return false;
}

function trackAfk() {
  // 🛡️ MIỄN TỬ: Bỏ qua máy quét AFK ở map Training và map 1v1
  if (stadium && (stadium.name === "training" || stadium.name === "1v1")) return;

  room.getPlayerList().forEach(function (player) {
    if (player.team == 0) return;
    if (timeouts.toAct[player.id] !== undefined) return;

    if (player.position) afkPositions[player.id] = { x: player.position.x, y: player.position.y };
    timeouts.toAct[player.id] = setTimeout(afkCallback.bind(null, player.id), ACTIVITY_TIMEOUT * 1000);
  });
}

function clearAfkRecords() {
  for (const id of Object.keys(timeouts.toAct)) {
    clearTimeout(timeouts.toAct[id]);
    delete timeouts.toAct[id];
  };
  afkPositions = {};
}

function clearAfkRecord(id) {
  if (!timeouts.toAct[id]) return;
  clearTimeout(timeouts.toAct[id]);
  delete timeouts.toAct[id];
  delete afkPositions[id];
}

function initiateChat(player) {
  let msg = `Nhập !help để xem các câu lệnh\nDiscord: ${DISCORD_LINK}`;
  room.sendAnnouncement(msg, player.id, GREEN, "normal", 0);
  room.sendAnnouncement(`Số cảnh cáo bạn đã nhận trong ngày: ${warnings[player.conn] || 0}/${MAX_WARNINGS_PER_PLAYER}`, player.id, YELLOW, "small-italic", 0);

  let _auth = getAuth(player.id);
  if (_auth) {
    let _stats = getStats(_auth);
    let _pts = _stats.points || 0;

    let roleObj = getFootballRole(_pts);
    let displayRole = roleObj.roleName;
    let displayColor = roleObj.color;

    // ĐỒNG BỘ ĐIỀU KIỆN CUSTOM KHI CHÀO
    if (_pts >= 150 && _stats.customColor !== undefined && _stats.customColor !== null) {
      displayColor = _stats.customColor;
    }
    if (_pts >= 500 && _stats.customRole) {
      displayRole = _stats.customRole;
    }

    room.sendAnnouncement(`✨ Chào mừng [${displayRole}] quay trở lại! Bạn đang có: ${_pts}★`, player.id, displayColor, "bold", 0);

    // 🛡️ NẾU CHƯA CÓ CLAN -> KHUYẾN KHÍCH
    if (!_stats.clan) {
      room.sendAnnouncement(`🛡️ MẸO: Bạn chưa có Clan nào! Dùng lệnh "!clan list" để xin vào 1 Clan, hoặc "!clan propose" để tự tạo. Đá có Clan sẽ được thưởng X2 SAO Clan War!`, player.id, 0xFFD700, "bold", 1);
    }
  }

  // Thông báo cập nhật chức năng
  room.sendAnnouncement(`[UPDATE ĐẶC QUYỀN]: 150★ Đổi Màu | 300★ Đổi Kiểu Chữ | 500★ Đổi Tên | 1000★ Tên dài hơn (Lệnh: !role).`, player.id, 0x00FFFF, "bold", 2);
}

async function startPenaltyShootout() {
  isTakingPenalty = true;
  prevScore = Array(2).fill(room.getScores().red).join("-");

  // FIX LỖI TÌM THỦ MÔN: Dùng Number.MAX_VALUE và -Number.MAX_VALUE
  // thay vì MAX_NUMBER (chữ này không tồn tại trong JS)
  let deepestPositions = [Number.MAX_VALUE, -Number.MAX_VALUE];

  room.getPlayerList().forEach(function (player) {
    if (player.team == 0) return;
    let group = game.penalty.groups[player.team - 1];
    if (
      (group.length == 0) ||
      ((player.position.x - deepestPositions[player.team - 1]) * (player.team * 2 - 3) > 0)
    ) {
      group.push(player.id);
      deepestPositions[player.team - 1] = player.position.x;
    } else {
      group.unshift(player.id);
    };
  });
  await room.stopGame();
  loadStadium("penalty");
  room.sendChat("Thời gian thi đấu chính thức đã kết thúc. Hai đội sẽ phân định thắng thua trên chấm luân lưu 11m!");
  await new Promise(r => setTimeout(r, AFTER_GAME_REST * 1000));
  takePenalty();
}

async function endPenaltyShootout(winner) {
  // 1. Trả cầu thủ về đúng đội để chuẩn bị tổng kết
  for (let i = 0; i < 2; i++) {
    for (const id of game.penalty.groups[i]) {
      await room.setPlayerTeam(id, i + 1);
    };
  };

  room.reorderPlayers(Object.values(captains), true);

  // 2. Cập nhật người thắng chung cuộc
  prevWinner = winner;

  // 🎯 GỌI HÀM TỔNG KẾT TẠI ĐÂY
  // Lúc này dữ liệu Pen (+1/-1 điểm) đã được cộng thẳng vào object của trận 120p
  handlePostGame(winner);

  room.stopGame(); // Dừng trận đấu

  isTakingPenalty = false;
  isPicking = false;

  // 3. Load lại map phù hợp
  let playerCount = getNonAfkPlayers().length;
  if (playerCount >= 8) loadStadium("5v5");
  else if (playerCount >= 6) loadStadium("3v3");
  else if (playerCount >= 2) loadStadium("1v1");
  else loadStadium("training");
}

async function takePenalty() {
  let winner = game.penalty.getPenaltyWinner();
  if (winner !== null) {
    room.sendChat(`Loạt sút luân lưu kết thúc. Đội ${TEAM_NAMES[winner]} giành chiến thắng chung cuộc!`);
    endPenaltyShootout(winner);
    return;
  };

  room.stopGame();
  for (const player of room.getPlayerList()) {
    await room.setPlayerTeam(player.id, 0);
  };
  switch (game.penalty.getTurn()) {
    case 0:
      room.setTeamColors(1, ...kits.red);
      room.setTeamColors(2, ...GOALKEEPER_COLORS.blue);
      break;
    case 1:
      room.setTeamColors(1, ...kits.blue);
      room.setTeamColors(2, ...GOALKEEPER_COLORS.red);
  };

  let [penaltyTaker, goalkeeper] = game.penalty.getPenaltyTakers();
  await room.setPlayerTeam(penaltyTaker, 1);
  await room.setPlayerTeam(goalkeeper, 2);
  room.startGame();
  room.setPlayerDiscProperties(penaltyTaker, { invMass: 9999 });

  let penResults = [[], []];
  for (let i = 0; i < 2; i++) {
    game.penalty.results[i].forEach(function (result) {
      switch (result) {
        case (true):
          penResults[i].push("🟢");
          break;
        case (false):
          penResults[i].push("🔴");
      };
    });
    if (penResults[i].length < 5) {
      penResults[i].push("⚪".repeat(5 - penResults[i].length));
    } else if (game.penalty.getTurn() <= i) {
      penResults[i].push("⚪");
    };
  };
  room.sendAnnouncement(` RED ${penResults[0].reverse().join("")} - ${penResults[1].join("")} BLUE`, null, BLUE, "bold", 0);
  if (game.penalty.results.flat(1).length == 10) {
    room.sendChat('Hai đội bước vào loạt sút "Sudden Death" (Cái chết bất ngờ). Mỗi cú sút từ bây giờ đều mang tính chất quyết định!');
  };
  room.sendChat(`Cầu thủ ${getTag(room.getPlayer(penaltyTaker).name)} bước lên thực hiện quả luân lưu.`);
  room.sendAnnouncement(`Bạn có ${PENALTY_TIMEOUT} giây để thực hiện cú sút.`, penaltyTaker, 0x00FFFF, "bold", 2);
  timeouts.toTakePenalty = setTimeout(penaltyTimeoutCallback, PENALTY_TIMEOUT * 1000);
}

async function randPlayers() {
  let predictionWinners = getPredictionWinners();
  (predictionWinners.length != 0) && room.sendChat(`Chúc mừng ${predictionWinners.map(winner => getTag(winner.name)).join(", ")} đã dự đoán đúng tỉ số và nhận được 1 suất đá chính`);

  let players = getNonAfkPlayers();

  // Tự động lấy số người tối đa tùy Map
  let currentMaxPlayers = MAX_PLAYERS;
  if (stadium && stadium.name && stadium.name.includes("3v3")) currentMaxPlayers = 3;
  if (stadium && stadium.name && stadium.name.includes("1v1")) currentMaxPlayers = 2;

  let idList = players.sort(function (player1, player2) {
    if (players.length <= currentMaxPlayers * 2 + 1) return Math.random() - 0.5;
    if (player1.team == prevWinner) return -1;
    if (player2.team == prevWinner) return 1;
    for (const winner of predictionWinners) {
      if (player1.id == winner.id) return -1;
      if (player2.id == winner.id) return 1;
    };
    return Math.random() - 0.5;
  }).map(player => player.id);

  let maxIndex = Math.min(idList.length, currentMaxPlayers * 2);
  let winnerMaxIndex = ~~(maxIndex / 2);

  idList.forEach(function (id, index) {
    if (index < winnerMaxIndex) {
      room.setPlayerTeam(id, prevWinner);
    } else if (index < maxIndex) {
      room.setPlayerTeam(id, getOppositeTeamId(prevWinner));
    } else {
      room.setPlayerTeam(id, 0);
    };
  });

  room.startGame();
}
function startPickMode() {
  if (room.getScores() != null) room.pauseGame(true);
  isPicking = true;
  requestPick();
}
async function pickPlayers() {
  // 🔴 [FIX BUG] Xóa sạch danh sách đào tẩu của trận cũ khi bắt đầu đợt pick mới
  leaversFromCurrentMatch.clear();

  let players = getNonAfkPlayers();

  let currentMaxPlayers = MAX_PLAYERS;
  if (stadium && stadium.name && stadium.name.includes("3v3")) currentMaxPlayers = 3;
  if (stadium && stadium.name && stadium.name.includes("1v1")) currentMaxPlayers = 2;

  // Đổi đội trưởng cho đội thua
  let captain = getPredictionWinners()[0];
  if (captain !== undefined) {
    room.sendChat(`Chúc mừng ${getTag(captain.name)} đã dự đoán đúng tỉ số và nhận được chiếc băng đội trưởng`);
  } else {
    captain = (afkList.has(selectedCaptain) ? null : room.getPlayer(selectedCaptain)) || players.find(player => player.team == 0);
    selectedCaptain = null;
  };
  await updateCaptain(getOppositeTeamId(prevWinner), captain);

  // Đưa tất cả ra ghế dự bị trừ đội thắng
  for (const player of players) {
    if (
      isCaptain(player.id) ||
      ((players.length > currentMaxPlayers * 2 + 1) && (player.team == prevWinner))
    ) continue;
    await room.setPlayerTeam(player.id, 0);
  };

  startPickMode();
}

function getFootballRole(points) {
  if (points >= 1000) return { roleName: "👑 Legend", color: 0xFF4500 };    // Đỏ cam (Cao nhất - Được custom tên & màu)
  if (points >= 500) return { roleName: "🏆 Champion", color: 0xFF0000 };   // Đỏ
  if (points >= 300) return { roleName: "🌟 Master", color: 0xFF00FF };     // Hồng / Tím
  if (points >= 150) return { roleName: "💎 Superstar", color: 0x00FFFF };  // Xanh Neon (Bắt đầu được custom màu)
  if (points >= 100) return { roleName: "🥇 Pro", color: 0xFFD700 };        // Vàng Gold
  if (points >= 50) return { roleName: "🥈 Semi-Pro", color: 0xFFFFFF };   // Trắng
  return { roleName: "🥉 Rookie", color: 0xAAAAAA };                         // Xám
}
function personalizeMsg(message, player) {
  const role = getRole(player);
  const stats = getStats(getAuth(player.id));
  const points = stats.points || 0;

  // 1. LẤY THÔNG TIN CLAN
  let clanTag = "";
  let clanColor = null;
  let useClanColor = (stats.useClanColor !== false); // Mặc định là True

  if (stats.clan && clans[stats.clan]) {
    let myClan = clans[stats.clan];
    let displayIcon = myClan.icon ? myClan.icon : "";
    clanTag = displayIcon + (myClan.tag || stats.clan);
    clanColor = (myClan.color !== null && myClan.color !== undefined) ? myClan.color : 0xFFFFFF;
  }

  // 2. LẤY RANK MẶC ĐỊNH THEO SAO
  let defaultRoleObj = getFootballRole(points);
  let baseColor = defaultRoleObj.color;
  let finalRoleName = defaultRoleObj.roleName;

  // 3. ĐIỀU KIỆN GHI ĐÈ TÊN VÀ MÀU TÙY CHỈNH (MỚI)
  // 💎 150★: Được đổi màu
  if (points >= 150 && stats.customColor !== undefined && stats.customColor !== null) {
    baseColor = stats.customColor;
  }
  // 🏆 500★: Được đổi tên
  if (points >= 500 && stats.customRole) {
    finalRoleName = stats.customRole;
  }

  // 4. LẤY KIỂU CHỮ (🌟 300★ MỚI ĐƯỢC DÙNG)
  let chatStyle = null; // Mặc định là normal
  if (points >= 300 && stats.customFontStyle && stats.customFontStyle !== "normal") {
    chatStyle = stats.customFontStyle;
  }

  // 5. QUYẾT ĐỊNH MÀU CUỐI CÙNG (Dùng màu Clan hay Cá nhân)
  let finalColor = (clanColor !== null && useClanColor) ? clanColor : baseColor;

  let rolePart = clanTag ? `[${clanTag} | ${finalRoleName} | ${points}★]` : `[${finalRoleName} | ${points}★]`;

  if (role === ROLE.SUPER_ADMIN) {
    rolePart = clanTag ? `[${clanTag} | 👑 LỎ | ${points}★]` : `[👑 LỎ | ${points}★]`;
    finalColor = 0xFBFC92;
  } else if (role === ROLE.ADMIN) {
    rolePart = clanTag ? `[${clanTag} | 🐦‍🔥 PHÓ VUA | ${points}★]` : `[🐦‍🔥 PHÓ VUA | ${points}★]`;
    finalColor = 0x2ECC71;
  }

  const newMessage = `${rolePart} ${player.name.trim()}: ${message}`;

  if (message.includes("@")) {
    for (const _player of room.getPlayerList()) {
      const tag = (typeof getTag === "function") ? getTag(_player.name) : `@${_player.name.replace(/ /g, "_")}`;
      const isTagged = message.includes(tag);

      // Nếu bị tag thì ưu tiên in đậm (bold) và hú còi, còn không thì dùng kiểu chữ của người chat
      let finalStyle = isTagged ? "bold" : chatStyle;
      room.sendAnnouncement(newMessage, _player.id, finalColor, finalStyle, isTagged ? 2 : null);
    }
    return;
  }

  // Xuất tin nhắn bình thường ra màn hình kèm Font Style
  room.sendAnnouncement(newMessage, null, finalColor, chatStyle);
}

function reset() {
  game.reset();
  surrenderVoter.reset();
  predictions = {};
}

function handlePostGame(winner) {
  if (postGameHandled) return; // Chặn gọi lại
  postGameHandled = true;
  if (winner == prevWinner) {
    winningStreak++;
  } else {
    winningStreak = 1;
    prevWinner = winner;
  };

  let scores = room.getScores();
  let matchTime = scores ? scores.time : 0;
  let MIN_MATCH_TIME = 40; // Tối thiểu 40s mới tính trận

  if (matchTime < MIN_MATCH_TIME && stadium.name !== "penalty") {
    room.sendChat(`Trận đấu kết thúc quá sớm (${Math.floor(matchTime)} giây). Hệ thống hủy kết quả do không đủ thời gian thi đấu tối thiểu.`);
    room.stopRecording(); // 🛡️ VÁ LỖI TRÀN RAM: Xả RAM khi trận hủy sớm
    return;
  }

  let initialParticipantsCount = Object.keys(game.teams[1].players).length + Object.keys(game.teams[2].players).length;
  let timeRatio = Math.min(1, matchTime / (TIME_LIMIT * 60));
  let reqTouchesL1 = Math.max(1, Math.round(3 * timeRatio));
  let reqTouchesL2 = Math.max(2, Math.round(6 * timeRatio));

  let filteredPlayersToNotify = [];

  for (let i = 1; i <= 2; i++) {
    let scoreArray = prevScore.split("-");
    let opponentScore = (i === 1) ? parseInt(scoreArray[1]) : parseInt(scoreArray[0]);
    let teamEntries = Object.entries(game.teams[i].players).sort((a, b) =>
      (i === 1) ? (a[1].meanPosition - b[1].meanPosition) : (b[1].meanPosition - a[1].meanPosition)
    );
    let gkAuth = teamEntries.length > 0 ? teamEntries[0][0] : null;

    for (const auth in game.teams[i].players) {
      let pStats = game.teams[i].players[auth];
      let matchRating = pStats.getPoints();

      if (auth === gkAuth) {
        if (opponentScore === 0) matchRating += 6.0;
        else if (opponentScore === 1) matchRating += 3.5;
        else if (opponentScore === 2) matchRating += 2.0;
      }

      if (auth === gkAuth) continue;
      if (stadium.name === "penalty") continue;

      let isTooLate = (pStats.touches < reqTouchesL1 && pStats.goals === 0 && pStats.assists === 0 && pStats.stoppedShots === 0);
      let isUseless = (pStats.touches < reqTouchesL2 && matchRating < 0.5);

      if (isTooLate || isUseless) {
        delete game.teams[i].players[auth];

        let pInRoom = room.getPlayerList().find(p => p.id !== 0 && getAuth(p.id) === auth);
        if (pInRoom) {
          let reasonMsg = isTooLate
            ? `chỉ chạm bóng ${pStats.touches} lần (Không đủ định mức thi đấu)`
            : `không có đóng góp chuyên môn (Rating < 0.5)`;

          filteredPlayersToNotify.push({ id: pInRoom.id, reason: reasonMsg });
        }
      }
    }
  }

  let validRed = Object.keys(game.teams[1].players).length;
  let validBlue = Object.keys(game.teams[2].players).length;
  let isBalanced = (validRed >= 1 && validBlue >= 1);

  if ((stadium.name === "5v5" || stadium.name === "penalty") && initialParticipantsCount >= MIN_PLAYERS_FOR_STATS * 2) {
    if (isBalanced) {
      reportStats();
      saveStats();

      filteredPlayersToNotify.forEach(p => {
        room.sendAnnouncement(`[HỆ THỐNG]: Bạn bị xác định là thiếu đóng góp trong trận đấu (${p.reason}). Kết quả trận này sẽ không được ghi nhận cho bạn.`, p.id, 0xFFFFFF, "italic", 0);
      });

    } else {
      room.sendChat(`Trận đấu bị hủy kết quả do có một đội đã bị gạch tên gần như toàn bộ thành viên.`);
      room.stopRecording(); // 🛡️ VÁ LỖI TRÀN RAM: Xả RAM khi team bị unbalance
    }
  } else {
    if (stadium.name === "5v5" || stadium.name === "penalty") {
      room.sendChat(`Không đủ số lượng người chơi tối thiểu ban đầu để ghi nhận dữ liệu thi đấu.`);
    }
    room.stopRecording(); // 🛡️ VÁ LỖI TRÀN RAM: Xả RAM cho map 1v1, 3v3, training
  }
}
room.onPlayerJoin = async function (player) {
  // ==========================================
  // 👑 HIỆU ỨNG CHÀO MỪNG VIP ĐẦU THÁNG (CHỈ CHẠY TRONG MÙNG 1, 2, 3)
  // ==========================================
  let now = new Date();
  if (now.getDate() <= 3) {
    let winnersRaw = localStorage.getItem("last_month_winners");
    if (winnersRaw) {
      let winners = JSON.parse(winnersRaw);
      // Lấy mã định danh của người vừa vào
      let pAuth = (typeof getAuth === "function") ? getAuth(player.id) : player.auth;

      // Chờ 1.5 giây để tránh bị trôi tin nhắn hệ thống mặc định
      if (pAuth === winners[1]) {
        setTimeout(() => {
          room.sendAnnouncement(`👑 [QUÁN QUÂN] Hãy tránh đường! Hoàng Đế tháng trước - ${player.name} giá lâm!`, null, 0xFFFF00, "bold", 2);
          room.sendAnnouncement(`💰 Phần thưởng (+50★) đã được tự động cộng vào quỹ của ngài!`, player.id, 0x00FF00, "italic", 1);
        }, 1500);
      } else if (pAuth === winners[2]) {
        setTimeout(() => {
          room.sendAnnouncement(`🌟 [Á QUÂN] Chào mừng Á Quân tháng trước - ${player.name} giá lâm!`, null, 0xC0C0C0, "bold", 2);
          room.sendAnnouncement(`💰 Phần thưởng (+30★) đã được tự động cộng vào quỹ của ngài!`, player.id, 0x00FF00, "italic", 1);
        }, 1500);
      } else if (pAuth === winners[3]) {
        setTimeout(() => {
          room.sendAnnouncement(`⭐ [QUÝ QUÂN] Chào mừng Cao thủ tháng trước - ${player.name} giá lâm!`, null, 0xCD7F32, "bold", 2);
          room.sendAnnouncement(`💰 Phần thưởng (+15★) đã được tự động cộng vào quỹ của ngài!`, player.id, 0x00FF00, "italic", 1);
        }, 1500);
      }
    }
  }

  // ... (Giữ nguyên các đoạn code cũ của ngài ở dưới) ...

  if (!isPlayerValid(player)) return;
  saveIdentities(player);

  if (SUPER_ADMIN_AUTHS.includes(player.auth)) {
    room.setPlayerAdmin(player.id, true);
    setTimeout(() => {
      room.sendAnnouncement(`👑 NHA VUA ${player.name} DA DEN! SAY HI TO NHÀ VUA! 👑`, null, 0xFBFC92, "bold", 2);
    }, 500);
  }
  initiateChat(player);
  await updateTeamPlayers();
  reorderPlayers();
  checkBan(player);

  if (MODE == "pick") {
    for (let teamId = 1; teamId < 3; teamId++) {
      if (captains[teamId] == 0) {
        updateCaptain(teamId, player);
        break;
      };
    };
    showSpecTable();
  };

  // 🎯 CƠ CHẾ ĐỔI MAP CHUẨN CỦA ROOM3.JS (Lúc người vào)
  switch (getNonAfkPlayers().length) {
    case 8: loadStadium("5v5"); break;
    case 6: loadStadium("3v3"); break;
    case 2: loadStadium("1v1"); break;
  }
  // =========================================================================
  // 👑 TRẢI THẢM ĐỎ ĐÓN MVP & PHÁT TÍN THƯ CHO TOÀN BỘ TOP 1 (CHỈ 1 LẦN)
  // =========================================================================
  let vipDataStr = localStorage.getItem("daily_vip_guests");
  if (vipDataStr) {
    try {
      let vips = JSON.parse(vipDataStr);
      let auth = getAuth(player.id);

      if (vips[auth]) {
        let vip = vips[auth];
        setTimeout(() => {
          // Đặc quyền trải thảm đỏ cho cả phòng thấy CHỈ DÀNH CHO MVP
          if (vip.mvp) {
            room.sendAnnouncement(`👑 ĐÓN CHÀO VUA NGHIỆN: ${player.name.toUpperCase()} ĐÃ VÀO PHÒNG! 👑`, null, 0xFFD700, "bold", 2);
            room.sendAnnouncement(`Anh ấy chính là "MVP Toàn Diện" của ngày hôm qua. Tất cả QUỲ XUỐNG!!!`, null, 0xFFFFFF, "italic", 1);
          }

          // Phát thư báo riêng (Private) cho BẤT KỲ AI lọt Top 1
          if (!vip.notified) {
            let titleStr = vip.titles.join(", "); // Gộp tên các danh hiệu lại

            room.sendAnnouncement(`🎁 [PHẦN THƯỞNG ĐUA TOP NGÀY HÔM QUA]`, player.id, 0x00FF00, "bold", 2);
            room.sendAnnouncement(`Hệ thống đã cộng tổng cộng +${vip.totalBonus}★ vào tài khoản của bạn cho các danh hiệu: ${titleStr}!`, player.id, 0xFFFFFF, "italic", 2);

            // Cập nhật cờ để không báo lại lần 2
            vip.notified = true;
            localStorage.setItem("daily_vip_guests", JSON.stringify(vips));
          }
        }, 2000);
      }
    } catch (e) { console.log(e); }
  }
}

room.onPlayerLeave = async function (player) {
  if (player.team != 0) {
    await updateTeamPlayers();
    punishQuitGame(player);
  } else if (afkList.has(player.id)) {
    afkList.delete(player.id);
  };
  delete identities[player.id];

  if (typeof isTakingPenalty !== "undefined" && isTakingPenalty) {
    for (let i = 0; i < 2; i++) {
      let index = game.penalty.groups[i].indexOf(player.id);
      if (index == -1) continue;
      game.penalty.groups[i].splice(index, 1);
      if (game.penalty.groups[i].length == 0) {
        room.sendChat(`Toàn bộ cầu thủ sút luân lưu của ${TEAM_NAMES[i + 1]} đã rời phòng, ${TEAM_NAMES[i + 1]} đã bị xử thua`);
        await endPenaltyShootout(2 - i);
        break;
      };
    };
  } else {
    switch (getNonAfkPlayers().length) {
      case 7:
        loadStadium("3v3");
        break;
      case 5:
        loadStadium("1v1");
        break;
      case 1:
        loadStadium("training");
    };
  };

  // A captain left, assign another one (LOGIC CHUẨN ROOM3.JS)
  let isCaptainOf = (player.id == captains[1]) ? 1 : (player.id == captains[2]) ? 2 : 0;
  if (isCaptainOf != 0) {
    await updateCaptain(isCaptainOf);
  };
  checkAutoPick() || showSpecTable();
};
room.onPlayerTeamChange = async function (changedPlayer, byPlayer) {

  if (typeof isTakingPenalty !== "undefined" && isTakingPenalty) {
    // Nếu cầu thủ đang sút penalty bị Admin chuyển sang Spectators, coi như sút hỏng
    if ((changedPlayer.team == 0) && (byPlayer.id != 0) && Object.values(game.penalty.groups).some(group => group.includes(changedPlayer.id))) {
      clearTimeout(timeouts.toTakePenalty);
      penaltyTimeoutCallback();
    };
    return;
  };

  if (changedPlayer.team == 0) {
    // Khi người chơi ra Spectators
    clearAfkRecord(changedPlayer.id);
    reorderPlayers();
    if (MODE == "pick") {
      // Nếu Đội trưởng ra sân, chọn Đội trưởng mới
      let isCaptainOf = (changedPlayer.id == captains[1]) ? 1 : (changedPlayer.id == captains[2]) ? 2 : 0;
      if (isCaptainOf != 0) {
        updateCaptain(isCaptainOf);
      } else {
        showSpecTable();
      };
    };

    // 🎯 FIX ĐIỂM MÙ 2: Khi Admin kéo một người từ sân ra Spec (gây ra 4v5), Bot lập tức đếm lại và bốc 1 Spec khác lấp vào
    setTimeout(updateTeamPlayers, 100);

  } else if (afkList.has(changedPlayer.id)) {
    // Nếu người AFK bị kéo vào sân, đẩy ngược ra lại
    room.setPlayerTeam(changedPlayer.id, 0);
    room.sendAnnouncement("Người chơi đang ở trạng thái AFK", byPlayer.id, RED);
  } else {
    // Khi người chơi vào sân
    let scores = room.getScores();
    if (scores === null) return;
    resizePlayer(changedPlayer.id);

    // Ghi nhận sự tham gia của cầu thủ để cộng sao lúc hết trận (Không bấm giờ)
    getGameStats(changedPlayer);

    room.sendAnnouncement("Bạn đã được thay vào sân", changedPlayer.id, BLUE, "small", 2);

    if (isPlaying) {
      timeouts.toAct[changedPlayer.id] = setTimeout(afkCallback.bind(null, changedPlayer.id), ACTIVITY_TIMEOUT * 1000);
    };

    // 🎯 VÁ LỖI 3: Nếu Admin tự tay ném người vào sân, đánh thức Bộ Cân Bằng Dọn Dẹp ngay lập tức
    if (byPlayer !== null && byPlayer.id !== 0) {
      setTimeout(updateTeamPlayers, 100);
    }
  };
}

room.onPlayerBallKick = function (player) {
  if (isTakingPenalty) return;
  updateBallKick(player);
}

room.onTeamGoal = function (team) {
  if (isTakingPenalty) {
    clearTimeout(timeouts.toTakePenalty);
    getGameStats(room.getPlayerList().find(player => player.team == 1), game.penalty.getTurn() + 1)[(team == 1) ? "penaltiesScored" : "penaltiesMissed"]++;
    celebratePenalty(team);
    game.penalty.push(team == 1);
    return;
  };
  cleanupEffectDiscs(); // ✅ Thêm vào đây — dọn ngay lập tức khi có bàn
  isPlaying = false;
  celebrateGoal(team);
  updateGoalStats(team);
}

room.onPositionsReset = function () {
  playerBlockCache = {};
  cleanupEffectDiscs(); // <--- THÊM DÒNG NÀY VÀO ĐÂY
  // --- CÁC TÍNH NĂNG CŨ BÊN DƯỚI GIỮ NGUYÊN ---
  if (isTakingPenalty) {
    takePenalty();
    return;
  };

  resizePlayers();
  isPlaying = true;
  game.resetBallRecords();

  room.getPlayerList().forEach(player => {
    if (player.team === 1 || player.team === 2) {
      getGameStats(player);
    }
  });

  let scores = room.getScores();
  if ((MODE == "pick") && scores !== null && (scores.time != 0) && getSpectators().length) {
    canPause = true;
  };
}
// 💬 Webhook Discord để theo dõi Chat của người chơi trong room
const DISCORD_CHAT_WEBHOOK = ""; // Thay link webhook của bạn vào đây
var isDiscordChatEnabled = false; // Mặc định là TẮT

async function sendChatToDiscord(playerName, message) {
  if (!isDiscordChatEnabled) return; // Chỉ đẩy lên Discord khi lệnh !xemchat được bật
  if (!DISCORD_CHAT_WEBHOOK || DISCORD_CHAT_WEBHOOK === "") return;
  try {
    await fetch(DISCORD_CHAT_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({
        content: `**[${playerName}]**: ${message}`
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Lỗi gửi chat webhook: ", error);
  }
}

// 🎯 Khai báo sổ đen chứa án phạt Mute (lưu ở ngay trên hàm onPlayerChat)
const mutedPlayers = new Map();

room.onPlayerChat = function (player, message) {
  if (player.id == 0) return;
  message = message.trim();
  if (!message) return false;

  // Gửi tin nhắn lên Discord Webhook
  sendChatToDiscord(player.name, message);

  clearAfkRecord(player.id); // Tránh bị kick AFK khi đang thao tác

  // =========================================================================
  // 👑 ĐẶC QUYỀN ĐỘI TRƯỞNG: ĐƯỢC PHÉP GÕ SỐ PICK NGƯỜI NGAY CẢ KHI BỊ MUTE
  // =========================================================================

  // --- 1. DÀNH CHO PICK ĐẦU TRẬN ---
  if (typeof isPicking !== 'undefined' && isPicking && isCaptain(player.id) && !message.includes(" ") && (Number.isInteger(+message) || message.startsWith("@"))) {
    if (player.team != pickTurn) {
      room.sendAnnouncement("Chưa đến lượt bạn chọn", player.id, 0xFF0000);
      return false;
    }
    let pickedPlayer;
    switch (message[0]) {
      case "0": pick(null, player.team); return false;
      case "@": pickedPlayer = getPlayerByName(message); break;
      default: pickedPlayer = getPlayerByPos(message);
    }

    if (pickedPlayer === undefined) {
      room.sendAnnouncement("Người chơi không tồn tại hoặc đã rời đi", player.id, 0xFF0000);
    } else if (afkList.has(pickedPlayer.id)) {
      room.sendAnnouncement("Người chơi đang ở trạng thái AFK", player.id, 0xFF0000);
    } else if (pickedPlayer.team != 0) {
      room.sendAnnouncement("Người chơi không ở Spectators", player.id, 0xFF0000);
    } else {
      pick(pickedPlayer, player.team);
    }
    return false;
  }

  // =========================================================================
  // 🛑 HỆ THỐNG KIỂM TRA ÁN PHẠT MUTE (ĐỊNH DANH KÉP CHỐNG F5)
  // =========================================================================
  let playerKey = getAuth(player.id) || getConn(player.id) || player.id;

  if (typeof mutedPlayers !== 'undefined' && mutedPlayers.has(playerKey)) {
    let expireTime = mutedPlayers.get(playerKey);
    if (Date.now() < expireTime) {
      let remainingMinutes = Math.ceil((expireTime - Date.now()) / 60000);
      room.sendAnnouncement(`🔇 Bạn đang bị KHÓA MÕM. Thời gian cấm chat còn lại: ${remainingMinutes} phút.`, player.id, 0xFF0000, "bold", 2);
      return false; // Chặn không cho tin nhắn hiển thị ra phòng
    } else {
      mutedPlayers.delete(playerKey); // Đã hết thời gian phạt, thả tự do
    }
  }

  // =========================================================================
  // 🛑 BỘ LỌC TỪ NGỮ CHỬI BẬY & AUTO-MUTE
  // =========================================================================
  let msg = message.toLowerCase();
  let wordsInMsg = msg.split(/[\s,.\?!]+/);
  let containsBadWord = wordsInMsg.some(word => {
    if (typeof BAD_WORDS !== 'undefined' && BAD_WORDS.includes(word)) return true;
    let normalizedWord = word.replace(/(.)\1+/g, '$1'); // Ép chữ "cccc" -> "c"
    if (typeof BAD_WORDS !== 'undefined' && BAD_WORDS.includes(normalizedWord)) return true;
    return false;
  });

  if (containsBadWord) {
    if (typeof badWordCounts === 'undefined') badWordCounts = {}; // Tránh lỗi chưa khai báo
    badWordCounts[player.id] = (badWordCounts[player.id] || 0) + 1;
    let count = badWordCounts[player.id];
    let maxBadWords = typeof MAX_BAD_WORDS !== 'undefined' ? MAX_BAD_WORDS : 3;

    if (count > maxBadWords) {
      mutedPlayers.set(playerKey, Date.now() + 10 * 60 * 1000);
      room.sendAnnouncement(`🔇 Hệ thống đã KHÓA MÕM [${player.name}] 10 phút vì chửi bậy quá ${maxBadWords} lần!`, null, 0xFF0000, "bold", 2);
      delete badWordCounts[player.id];
    } else {
      room.sendAnnouncement(`⚠️ CẢNH BÁO TỪ NGỮ [${count}/${maxBadWords}]: Vui lòng không sử dụng từ ngữ thô tục!`, player.id, 0xFFCC00, "bold", 2);
      if (count === maxBadWords) {
        room.sendAnnouncement(`🚨 ĐÂY LÀ CẢNH BÁO CUỐI CÙNG! Vi phạm thêm 1 lần nữa bạn sẽ bị CẤM CHAT 10 phút!`, player.id, 0xFF0000, "bold", 2);
      }
    }
    return false;
  }

  if (!message.startsWith("!") || (typeof COMMANDS_TO_VALIDATE !== 'undefined' && COMMANDS_TO_VALIDATE.some(command => message.substring(1).startsWith(command)))) {
    if (typeof muteList !== 'undefined' && muteList.has(getConn(player.id))) {
      room.sendAnnouncement("Không thể chat, bạn đã bị cấm", player.id, typeof RED !== 'undefined' ? RED : 0xFF0000);
      return false;
    };
    if (typeof getRole === 'function' && getRole(player) < (typeof ROLE !== 'undefined' ? ROLE.ADMIN : 1)) {
      if (typeof isChatLocked !== 'undefined' && isChatLocked) {
        room.sendAnnouncement("Khung chat hiện đang bị khóa", player.id, typeof RED !== 'undefined' ? RED : 0xFF0000);
        return false;
      }
      if (typeof isTakingPenalty !== 'undefined' && isTakingPenalty && (player.team == 0)) {
        room.sendAnnouncement("Bạn chưa thể chat vào lúc này", player.id, typeof RED !== 'undefined' ? RED : 0xFF0000);
        return false;
      };
      if (typeof checkSpam === 'function' && checkSpam(player, message)) return false;
    };
  };

  // =========================================================================
  // 🎯 LỆNH ẨN DANH: CHỈ DÀNH CHO SUPER ADMIN
  // =========================================================================
  if (message.toLowerCase() === "!logout") {
    let currentAuth = getAuth(player.id);
    if (typeof SUPER_ADMIN_AUTHS !== 'undefined' && SUPER_ADMIN_AUTHS.includes(currentAuth)) {
      room.setPlayerAdmin(player.id, false);
      room.sendAnnouncement(`👋 nha vua [${player.name}] đã cởi bỏ hoàng bào và trở lại làm người thường!`, null, 0x00FF00, "bold", 2);
    } else {
      room.sendChat("❌ Lệnh này chỉ có nha vua da den mới có thể sử dụng!", player.id);
    }
    return false;
  }

  // 🛑 CHỐT CHẶN SAU 10 GIÂY DÀNH CHO AFK VÀ SPEC
  let msgLower = message.toLowerCase();
  if (msgLower === "!afk" || msgLower.startsWith("!afk ") || msgLower === "!spec") {
    let scores = room.getScores();

    // 👑 Tấm kim bài: Kiểm tra Super Admin
    let isSuperAdmin = (typeof getRole === "function" && getRole(player) >= ROLE.SUPER_ADMIN);

    // CHỈ CHẶN NẾU:
    // 1. Không phải Super Admin
    // 2. Trận đấu đang diễn ra (isPlaying)
    // 3. Đang trong map 5v5 hoặc Penalty
    // 4. Người chơi đang ở Team (Red/Blue)
    // 5. Trận đấu đã qua 10 giây đầu
    if (!isSuperAdmin && typeof isPlaying !== 'undefined' && isPlaying && scores !== null && (stadium.name === "5v5" || stadium.name === "penalty") && player.team !== 0 && !isPicking) {

      // SỬA LỖI Ở ĐÂY: Dùng Math.floor để đảm bảo lấy số nguyên giây và kiểm tra an toàn
      if (Math.floor(scores.time) > 10) {
        room.sendAnnouncement("🚫 Trận đấu đã qua 10s đầu! Không thể dùng !afk hoặc !spec lúc này. Hãy nhờ đồng đội !sub.", player.id, 0xFF4444, "bold", 2);
        return false;
      }
    }
  }

  // =========================================================================
  // 🎯 BỘ XỬ LÝ TẤT CẢ CÁC LỆNH KHÁC (!help, !afk, !sub...) - KHÔNG ĐƯỢC XÓA
  // =========================================================================
  if (message.startsWith("!") && typeof handleCommand === 'function' && !handleCommand(player, message.slice(1))) {
    return false;
  };

  if (typeof personalizeMsg === 'function') personalizeMsg(message, player);
  console.log(`${player.name}: ${message}`);
  if (typeof log === 'function') log(`[${player.name}]: ${message}`);

  return false;
}

room.onPlayerActivity = function (player) {
  // 🛡️ MIỄN TỬ: Không bật Radar nếu đang ở map Training hoặc 1v1
  if (!isPlaying || player.team === 0 || (stadium && (stadium.name === "training" || stadium.name === "1v1"))) return;

  clearAfkRecord(player.id);

  // Ghi nhận tọa độ mới và reset lại đồng hồ 10 giây
  if (player.position) afkPositions[player.id] = { x: player.position.x, y: player.position.y };
  timeouts.toAct[player.id] = setTimeout(afkCallback.bind(null, player.id), ACTIVITY_TIMEOUT * 1000);
}
room.onPlayerKicked = function (kickedPlayer, reason, banned, byPlayer) {
  let action = "kicked";
  if (banned) {
    banList.push([kickedPlayer.id, kickedPlayer.name, reason]);
    action = "banned";
  };
  console.log(`${kickedPlayer.name} was ${action} by ${byPlayer.name} (reason: ${reason})`);
  log(`${kickedPlayer.name} was ${action} by ${byPlayer.name} (Lý do: ${reason})`);
}

room.onTeamVictory = function (scores) {
  // 🛡️ BUG FIX: Bỏ qua khi đang đá penalty shootout.
  // Nếu không có guard này, khi tỉ số thực trên map "penalty" đạt SCORE_LIMIT,
  // onTeamVictory sẽ bắn ra, gọi handlePostGame lần 2, ghi đè prevScore sai
  // và hiện thêm 1 dòng phong độ thừa.
  if (isTakingPenalty) return;

  isPlaying = false;
  isGameOver = true; // <--- KHÓA BOT LẠI: Trận đấu đã an bài!
  prevScore = `${scores.red}-${scores.blue}`;
  handlePostGame((scores.red > scores.blue) ? 1 : 2);
}

room.onGameStart = function (byPlayer) {
  isPlaying = true;
  isPicking = false;
  isGameOver = false;
  surrenderedTeam = 0;
  postGameHandled = false;
  clearTimeout(timeouts.toResume);
  pausedBy = 0;

  resizePlayers();
  if (isTakingPenalty) return;
  reset();
  clearTimeout(timeouts.toPick);
  setRandomColors();
  trackAfk();
  if (DISCORD_WEBHOOK && SAVE_RECORDINGS) room.startRecording();

  let players = getNonAfkPlayers();

  // ==========================================
  // ⚔️ TỰ ĐỘNG NHẬN DIỆN VÀ THÔNG BÁO CLAN WAR / FULL TEAM
  // ==========================================
  if (stadium && stadium.name === "5v5") {
    let redTeam = players.filter(p => p.team === 1);
    let blueTeam = players.filter(p => p.team === 2);

    // Hàm trả về Tag Clan đại diện VÀ Số lượng người của Clan đó
    let getTeamClanInfo = (teamPlayers) => {
      let clanCounts = {};
      if (teamPlayers.length === 0) return { tag: null, count: 0 };
      for (let p of teamPlayers) {
        let auth = getAuth(p.id);
        if (auth) {
          let st = getStats(auth);
          if (st && st.clan) clanCounts[st.clan] = (clanCounts[st.clan] || 0) + 1;
        }
      }
      for (let ct in clanCounts) {
        if (clanCounts[ct] >= 3) {
          return { tag: ct, count: clanCounts[ct] };
        }
      }
      return { tag: null, count: 0 };
    };

    let redClanInfo = getTeamClanInfo(redTeam);
    let blueClanInfo = getTeamClanInfo(blueTeam);

    let clan1 = redClanInfo.tag;
    let clan2 = blueClanInfo.tag;

    // 1. THÔNG BÁO CLAN 🆚 CLAN (Mỗi bên đều có >= 3 người cùng Clan)
    if (clan1 && clan2 && clan1 !== clan2 && clans[clan1] && clans[clan2]) {
      let c1Data = clans[clan1];
      let c2Data = clans[clan2];
      let icon1 = c1Data.icon ? c1Data.icon : "";
      let icon2 = c2Data.icon ? c2Data.icon : "";

      let isRivalry = (c1Data.rivals && c1Data.rivals.includes(clan2));

      setTimeout(() => {
        if (c1Data.members.length >= 5 && c2Data.members.length >= 5) {
          if (isRivalry) {
            room.sendAnnouncement(`⚡ ĐẠI CHIẾN TRUYỀN KIẾP - HỆ SỐ NHÂN ĐÔI ELO ⚡`, null, 0xFF0000, "bold", 2);
            room.sendAnnouncement(`[${icon1}${clan1}] (Elo: ${c1Data.elo || 1000})  🆚  [${icon2}${clan2}] (Elo: ${c2Data.elo || 1000})`, null, 0xFFD700, "bold", 2);
          } else {
            room.sendAnnouncement(`🔥 VAR CỰC CĂNG!!! ĐẠI CHIẾN GIỮA 2 CLAN 🔥`, null, 0xFF4444, "bold", 2);
            room.sendAnnouncement(`[${icon1}${clan1}] (Elo: ${c1Data.elo || 1000})  🆚  [${icon2}${clan2}] (Elo: ${c2Data.elo || 1000})`, null, 0xFFD700, "bold", 2);
          }
        } else {
          room.sendAnnouncement(`⚔️ GIAO HỮU CLAN BẮT ĐẦU ⚔️`, null, 0x00FFFF, "bold", 2);
          room.sendAnnouncement(`[${icon1}${clan1}]  🆚  [${icon2}${clan2}] (Trận này không tính Elo vì có Clan < 5 TV)`, null, 0xFFFFFF, "bold", 1);
        }
      }, 500);
    }
    // 2. THÔNG BÁO CLAN 🆚 ĐỘI MIX (1 bên có ĐỦ 5 NGƯỜI, bên kia là Mix)
    else if (clan1 && redClanInfo.count >= 5 && !clan2) {
      let cIcon = clans[clan1].icon || "";
      setTimeout(() => {
        room.sendAnnouncement(`🚨 BÁO ĐỘNG ĐỎ: Đội 🔴 đã triệu hồi FULL 5 THÀNH VIÊN Clan [${cIcon}${clan1}]!`, null, 0xFF4444, "bold", 2);
        room.sendAnnouncement(`Trận đấu này SẼ ĐƯỢC TÍNH ELO khi đối đầu với Đội MIX! Cố lên Đội Xanh!`, null, 0xFFFFFF, "bold", 1);
      }, 1000);
    }
    else if (clan2 && blueClanInfo.count >= 5 && !clan1) {
      let cIcon = clans[clan2].icon || "";
      setTimeout(() => {
        room.sendAnnouncement(`🚨 BÁO ĐỘNG XANH: Đội 🔵 đã triệu hồi FULL 5 THÀNH VIÊN Clan [${cIcon}${clan2}]!`, null, 0x00FFFF, "bold", 2);
        room.sendAnnouncement(`Trận đấu này SẼ ĐƯỢC TÍNH ELO khi đối đầu với Đội MIX! Cố lên Đội Đỏ!`, null, 0xFFFFFF, "bold", 1);
      }, 1000);
    }
    // 3. THÔNG BÁO EXODIA (Nếu có Clan gom đủ 5 người khi đá Clan vs Clan)
    else {
      setTimeout(() => {
        if (redClanInfo.count >= 5 && clans[redClanInfo.tag]) {
          let cIcon = clans[redClanInfo.tag].icon || "";
          room.sendAnnouncement(`🚨 BÁO ĐỘNG ĐỎ: Đội 🔴 đã triệu hồi đội hình FULL THÀNH VIÊN của Clan [${cIcon}${redClanInfo.tag}]!`, null, 0xFF4444, "bold", 2);
        }
        if (blueClanInfo.count >= 5 && clans[blueClanInfo.tag]) {
          let cIcon = clans[blueClanInfo.tag].icon || "";
          room.sendAnnouncement(`🚨 BÁO ĐỘNG XANH: Đội 🔵 đã triệu hồi đội hình FULL THÀNH VIÊN của Clan [${cIcon}${blueClanInfo.tag}]!`, null, 0x00FFFF, "bold", 2);
        }
      }, 1500);
    }
  }
  // ==========================================

  room.sendChat(`Quý vị khán giả có ${PREDICTION_PERIOD} giây để dự đoán tỉ số với !predict và có cơ hội nhận 1 suất đá chính.`);

  if (players.length >= 8) {
    let points = [0, 0];
    for (const player of players) {
      if (player.team == 0) continue;
      points[player.team - 1] += getStats(getAuth(player.id)).points;
    };
    let red_chance = ~~((50 + points[0]) / (100 + points[0] + points[1]) * 100);
    setTimeout(
      room.sendAnnouncement.bind(
        null,
        `Máy tính dự đoán tỉ lệ thắng: ${red_chance}% ${"🟥".repeat(Math.round(red_chance / 10))}${"🟦".repeat(10 - Math.round(red_chance / 10))} ${100 - red_chance}%`,
        null,
        YELLOW,
        "small",
        0
      ),
      3000,
    );
  };
}


room.onGameStop = async function (byPlayer) {
  isPlaying = false;
  isGameOver = true; // <--- CHỐT CHẶN: Game đã dừng hoàn toàn
  clearAfkRecords();
  cleanupEffectDiscs(); // <--- THÊM DÒNG NÀY VÀO ĐÂY

  clearTimeout(timeouts.toResume);

  // Nếu Admin chủ động bấm Stop bằng tay thì hủy ghi hình và dừng
  if ((byPlayer !== null) && (byPlayer.id != 0)) {
    room.sendChat("Trận đấu đã bị hủy bỏ bởi Admin");
    room.stopRecording();
    postGameHandled = false;
    return; // Đã xóa dòng midGamePick.active thừa ở đây vì đã dọn dẹp ở trên
  };

  // Nếu đang trong quá trình chuyển giao Penalty thì không chạy lệnh pick ở đây
  if (isTakingPenalty) return;

  // Đợi một chút để mọi người nhìn kết quả
  await new Promise(r => setTimeout(r, AFTER_GAME_REST * 1000));

  if (room.getScores() !== null) return;

  // Kích hoạt chế độ chọn người hoặc chia team ngẫu nhiên
  if (MODE == "rand") {
    randPlayers();
  } else {
    // Chỉ vào chế độ Pick nếu không phải đang ở map tập luyện
    if (stadium.name !== "training") {
      pickPlayers();
    }
  };
}


room.onGamePause = function (byPlayer) {
  isPlaying = false;
  clearAfkRecords();
}

room.onGameUnpause = function (byPlayer) {
  isPlaying = true;
  canPause = false;
  pausedBy = 0;
}

room.onTeamsLockChange = function (locked, byPlayer) {
  // 🎯 MỞ KHÓA TỰ DO: Không ép khóa Team nếu đang ở map Training hoặc phòng chỉ có 1 người
  let activeCount = room.getPlayerList().filter(p => !afkList.has(p.id)).length;
  let isFreeMode = (stadium && stadium.name === "training") || activeCount <= 1;

  if (!isFreeMode && !locked) {
    room.setTeamsLock(true); // Chỉ khóa lại khi bắt đầu đá giải
  }
};
// =========================================================================
// 🛠️ TỰ ĐỘNG BÙ ĐẮP DỮ LIỆU CHO CÁC CLAN CŨ (CHẠY 1 LẦN KHI MỞ ROOM)
// =========================================================================
setTimeout(() => {
  let isDataPatched = false;

  for (let tag in clans) {
    let c = clans[tag];

    // 1. Cập nhật Icon mặc định nếu Clan cũ chưa từng có thuộc tính này
    // Dùng strict check (=== undefined) để không đè lên các Clan đã cố tình clear Icon ("")
    if (c.icon === undefined) {
      c.icon = "🔰";
      isDataPatched = true;
    }

    // 2. Cập nhật Level và EXP nếu Clan cũ chưa có (đề phòng sót)
    if (c.level === undefined) {
      c.level = 1;
      c.exp = 0;
      isDataPatched = true;
    }
  }

  // Nếu có phát hiện và sửa Clan cũ, lập tức lưu lại vào Database
  if (isDataPatched) {
    saveClans();
    room.sendChat("📢 [HỆ THỐNG]: Đã quét và cập nhật Icon 🔰 & Level thành công cho các Clan phiên bản cũ!");
  }
}, 3000); // Chạy sau khi room khởi động 3 giây

// =========================================================================
// 🌐 TÍNH NĂNG NHẬN TIN NHẮN TỪ DISCORD VÀO GAME
// =========================================================================
const DISCORD_BOT_TOKEN = ""; // Thay Token Bot của bạn vào đây
const DISCORD_CHANNEL_ID = ""; // Thay ID kênh Discord vào đây

try {
  if (typeof process !== "undefined") {
    const { Client, GatewayIntentBits } = require('discord.js');
    const discordClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });

    discordClient.on('messageCreate', message => {
      if (message.author.bot) return; // Bỏ qua tin nhắn của bot
      if (message.channelId === DISCORD_CHANNEL_ID) {
        const text = message.content.trim().toLowerCase();
        if (text === '!xemchat') {
          isDiscordChatEnabled = true;
          message.reply('✅ Đã BẬT theo dõi chat: Tin nhắn trong game sẽ được chuyển tiếp lên đây!');
          return;
        }
        if (text === '!tatchat') {
          isDiscordChatEnabled = false;
          message.reply('🚫 Đã TẮT theo dõi chat: Dừng nhận tin nhắn từ game.');
          return;
        }

        if (typeof room !== 'undefined' && room.sendChat) {
          // Đẩy tin nhắn vào Haxball
          room.sendAnnouncement(`[ADMIN]: ${message.content}`, null, 0xFFD700, "bold", 2);
        }
      }
    });

    if (DISCORD_BOT_TOKEN && DISCORD_BOT_TOKEN !== "") {
      discordClient.login(DISCORD_BOT_TOKEN).then(() => {
        console.log("✅ Đã kết nối Discord Bot (Nhận tin nhắn) thành công!");
      }).catch(err => {
        console.error("❌ Lỗi đăng nhập Discord Bot:", err);
      });
    }
  }
} catch (e) {
  console.log("⚠️ Bạn chưa cài discord.js, hãy mở CMD chạy lệnh: npm install discord.js");
}


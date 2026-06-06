const SUPER_ADMIN_PASSWORD = "noibuonchientranh";
const ADMIN_PASSWORD = "traitimquacam";
const SUPER_ADMIN_AUTHS = ["_uCVm_mwqFh_1jY5HGtq_gF_dyKKlbuOihsnlI59JOc", "0VUyR2va1wEUT0GV3CcvEWA2VE53gcLeNPk0Mo7Sq3I", "b5fjNdYS0O1v_4Uk9ypNCMURKcOkn5FR9eX8gZATGYY"];
const MODE = "pick"; // can be "rand" or "pick"
const ROOM_NAME = `⚽𝘼𝙪𝙩𝙤 𝙍𝙤𝙤𝙢 (ELO) | LỎ NHẤT VN`;
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
  "To nhỏ thất thường",          // 0
  "Attack On Titan",                 // 1
  "Vòng tròn đồng đội",           // 2
  "Bóng 7 sắc cầu vồng",          // 3
  "Bom đẩy lùi đối thủ",          // 4
  "Gôn nổ tùm lum",               // 5
  "Vỡ bóng tùm lum",            // 6
  "Pháo hoa di động",             // 7
  "Súng máy (Machine Gun)",       // 8
  "Hố đen vũ trụ",                // 9
  "Vệ tinh hoàng kim",            // 10
  "Phi lôi thần thuật",           // 11
  "Quả Bom hẹn giờ",
  "Mưa sao băng",
  "Lốc xoáy cuồng phong"
];
// ===== HỆ THỐNG ANTI-TOXIC VOTEKICK =====
const BAD_WORDS = ["chịch", "buòi", "buồi", "buoi", "đit", "fucking", "cunt", "dcmm", "đcmm", "me may", "con mẹ mày", "con me may", "loz", "lòn", "lon", "lồn", "cặc", "fuck", "bitch", "shit", "concac", "nigga", "địt", "con cac", "dit", "đmm", "ad ngu", "duma", "đụ", "backy", "namky", "bắc kỳ", "nam kỳ", "namki", "backi", "bac ky", "nam ky", "nam kì", "bắc kì"];
const MAX_BAD_WORDS = 4;
let badWordCounts = {};
let activeVoteKick = null;
const TEAM_COLORS = [
  [[60, 0xFFCC00, [0xE83030]], [60, 0xFFCC00, [0x004170]]],
  [[60, 0xFFFFFF, [0xFF4A4A]], [60, 0xFFFFFF, [0x5ECFFF]]],
  [[60, 0xFFFFFF, [0xD60419]], [60, 0xFFFFFF, [0x0099FF]]],
  [[45, 0x000000, [0xFF2400, 0xFFFF00]], [45, 0x000000, [0x1F51FF, 0xFFFFFF]]],
  [[0, 0xF7FFF2, [0xE00202, 0xB00101, 0x800000]], [0, 0xF7FFF2, [0x00F7FF, 0x00D1D1, 0x00A7AD]]],
  [[90, 0xF7FFF2, [0xFF2121, 0xFF5757, 0xFC9595]], [90, 0xF7FFF2, [0x00C3FF, 0x45E0FF, 0xB5F5FC]]],
  [[45, 0xFFFFFF, [0x000000, 0xFF0000, 0x000000]], [45, 0x808080, [0xFFFFFF, 0x0096FF, 0xFFFFFF]]],
  [[45, 0xFFFFFF, [0xD60000, 0x000000, 0xD60000]], [45, 0xFFFFFF, [0x0058A3, 0x000000, 0x0058A3]]],
  [[-45, 0xFFCC00, [0xD10000, 0x8C0000, 0xD10000]], [-45, 0xFFCC00, [0x00DDFF, 0x87E3FF, 0x00DDFF]]],
  [[232, 0xFFFFFF, [0xFFCCFA, 0xFF99DD, 0xFF6176]], [129, 0xFFFFFF, [0x4D39CC, 0x7A70FF, 0x7DB1FF]]],
  [[45, 0xFFFFFF, [0x00C950, 0x007830]], [45, 0xFFFFFF, [0x9B59B6, 0x5B2C6F]]],
  [[90, 0x000000, [0xFFE600, 0xFFB300, 0xFF8000]], [90, 0x000000, [0x00FFFF, 0x00BFFF, 0x0080FF]]],
  [[135, 0xFFFFFF, [0x434343, 0x000000]], [135, 0x000000, [0xE0E0E0, 0xFFFFFF]]],
  [[60, 0xFFFFFF, [0xFF8C00, 0xFF4500]], [60, 0xFFFFFF, [0x000080, 0x0000CD]]],
  [[90, 0x000000, [0x55FF55, 0x00AA00]], [90, 0x000000, [0x55FFFF, 0x00AAAA]]],
  [[45, 0xFFFFFF, [0xFF00FF, 0x8A2BE2]], [45, 0xFFFFFF, [0x2E8B57, 0x006400]]],
  [[0, 0x000000, [0x00FF41, 0x008F11]], [0, 0x000000, [0xFF0000, 0x8B0000]]],
  [[60, 0x000000, [0xFCEE0A, 0x00FFFF]], [60, 0x000000, [0xFF003C, 0x0000FF]]],
  [[120, 0xFFFFFF, [0xFFD1DC, 0xFFB6C1]], [120, 0xFFFFFF, [0xAEC6CF, 0x98FF98]]],
  [[135, 0xFFFFFF, [0xFF512F, 0xDD2476, 0x900C3F]], [135, 0xFFFFFF, [0x1CB5E0, 0x000046, 0x000000]]],
  [[45, 0x000000, [0xBF953F, 0xFCF6BA, 0xB38728]], [45, 0xFFFFFF, [0x4A00E0, 0x8E2DE2, 0x4A00E0]]],
  [[90, 0xFFFFFF, [0xFF00A0, 0xFF8C00]], [90, 0xFFFFFF, [0x00E5FF, 0x001A98]]],
  [[60, 0xFFFFFF, [0x4D0000, 0x800000, 0xFF7300]], [60, 0xFFFFFF, [0x2E8B57, 0x8B4513, 0x228B22]]],
  [[0, 0xFFFFFF, [0x002B5B, 0xFFFFFF, 0x002B5B]], [0, 0x000000, [0xFFD700, 0xFFFFFF, 0xFFD700]]],
  [[135, 0xFFFFFF, [0x330066, 0x1A1A1A]], [135, 0x000000, [0xCCFF00, 0x1A1A1A]]],
  [[90, 0x000000, [0x75AADB, 0xFFFFFF, 0x75AADB]], [90, 0x000000, [0xFFD700, 0x009B3A, 0xFFD700]]],
  [[-45, 0xFFFFFF, [0xE74C3C, 0xC0392B]], [-45, 0xFFFFFF, [0x2C3E50, 0x34495E]]],
  [[45, 0xFFFFFF, [0xFF512F, 0xF09819, 0xFF512F]], [45, 0xFFFFFF, [0x0052D4, 0x4364F7, 0x6FB1FC]]],
  [[0, 0xB8860B, [0xFFFFFF, 0xF8F8F8]], [0, 0xFFD700, [0x004D98, 0xA50044, 0x004D98]]],
  [[0, 0xFFFFFF, [0xDA291C, 0xB50E12]], [0, 0xFFFFFF, [0x6CABDD, 0x98C5E9]]],
  [[0, 0xFFFFFF, [0x000000, 0xFB090B, 0x000000]], [0, 0xFFD700, [0x000000, 0x001EA0, 0x000000]]],
  [[0, 0xFFFFFF, [0xDC052D, 0x980000]], [0, 0x000000, [0xFDE100, 0x000000, 0xFDE100]]],
  [[0, 0xFFFFFF, [0xEF0107, 0xEF0107]], [0, 0xFFFFFF, [0x034694, 0x034694]]],
  [[0, 0xFFD700, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0xFFFFFF, [0x12A0D7, 0x12A0D7]]],
  [[0, 0xFFD700, [0xAA0000, 0xFF0000, 0xAA0000]], [0, 0xFFFFFF, [0x000080, 0xFFFFFF, 0x000080]]],
  [[135, 0xFFFFFF, [0x000000, 0x1A1A1A, 0x000000]], [135, 0xFFFFFF, [0x8E2DE2, 0x4A00E0, 0xFF0080]]],
  [[0, 0xFFFF00, [0xDA251D, 0xDA251D]], [0, 0xFFFFFF, [0x0000FF, 0x00008B]]],
  [[45, 0xFFFFFF, [0xFF9AA2, 0xFFB7B2, 0xFFDAC1]], [45, 0xFFFFFF, [0xB2CEFE, 0xC7CEEA, 0xBAEDF9]]],
  [[90, 0x000000, [0xFF4500, 0x8B0000]], [90, 0xFFFFFF, [0x32CD32, 0x006400]]],
  [[0, 0xD4AF37, [0x000000, 0x1A1A1A, 0x000000]], [0, 0x000000, [0xCFB53B, 0xFFD700, 0xCFB53B]]],
  [[0, 0xFFFFFF, [0xFF4F00, 0xFF4F00]], [90, 0x0000FF, [0xFFFFFF, 0xFF0000, 0xFFFFFF]]],
  [[0, 0x009B3A, [0xFFD700, 0xFFD700]], [0, 0x000000, [0x68A7D4, 0x68A7D4]]],
  [[0, 0x003893, [0xFCD116, 0xFCD116]], [0, 0xFFFFFF, [0xD52B1E, 0x0039A6, 0xD52B1E]]],
  [[0, 0xFFFFFF, [0x00008B, 0x0000CD]], [0, 0xFFFFFF, [0xED1C24, 0xED1C24]]],
  [[0, 0xFFFFFF, [0x006C35, 0x006C35]], [0, 0x00843D, [0xFFCD00, 0xFFCD00]]],
  [[60, 0xFFFFFF, [0xA29BFE, 0xCE9BFE]], [60, 0xA29BFE, [0xFFFFFF, 0xFFFFFF]]],
  [[0, 0xFFFFFF, [0x81ECEC, 0x74B9FF]], [0, 0x000000, [0xFFD700, 0xFFE600]]],
  [[45, 0xFFFFFF, [0xFFA502, 0xFFE066]], [45, 0x000000, [0x26DE81, 0x20BF6B]]],
  [[45, 0xFFFFFF, [0xFF007F, 0xEE1C24]], [45, 0xFFFFFF, [0x00A0E9, 0x034694]]],
  [[90, 0x000000, [0xFF00A0, 0xCCFF00]], [90, 0x000000, [0x00FFFF, 0x0080FF]]],
  [[135, 0xFFFFFF, [0xFF512F, 0xDD2476, 0x900C3F]], [135, 0xFFFFFF, [0x1CB5E0, 0x000046]]],
  [[45, 0x000000, [0xFCF6BA, 0xBF953F, 0xB38728]], [45, 0xFFFFFF, [0x7A2DE2, 0x4A00E0]]],
  // --- THÊM CÁC CÂU LẠC BỘ CHÂU ÂU ---
  [[0, 0x0000FF, [0xFFFFFF, 0xCB3524, 0xFFFFFF]], [0, 0x000000, [0xFFFFFF, 0xFFFFFF]]], // Atletico vs Valencia
  [[0, 0xFFFFFF, [0x004170, 0xE30613, 0x004170]], [45, 0xFFFFFF, [0xFFFFFF, 0xED1C24]]], // PSG vs Monaco
  [[0, 0x000000, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0xFFFFFF, [0x87CEEB, 0x87CEEB]]], // Juventus vs Lazio
  [[0, 0xFFD700, [0x8E1F2F, 0x8E1F2F]], [0, 0xFFFFFF, [0x12A0D7, 0x12A0D7]]], // AS Roma vs Napoli
  [[0, 0xFFFFFF, [0xA32638, 0xF2A900]], [0, 0x002395, [0xFEDD00, 0x002395, 0xFEDD00]]], // Galatasaray vs Fenerbahce
  [[0, 0xFFFFFF, [0x6CABDD, 0x6CABDD]], [0, 0xD4AF37, [0x000000, 0xFFFFFF, 0x000000]]], // Man City vs Newcastle
  [[0, 0x000000, [0xFDE100, 0xFDE100]], [0, 0xDD013F, [0xFFFFFF, 0xFFFFFF]]], // Dortmund vs RB Leipzig
];
let colorHistory = []; // Lưu trữ chỉ số (index) của các màu đã dùng gần đây
const HISTORY_LIMIT = 20; // Số trận tối đa không được lặp lại màu (bạn có thể tăng lên 5 nếu TEAM_COLORS nhiều)
// Tạo một danh sách các trận đấu đặc biệt.
// Để so sánh mảng trong Javascript khá phức tạp, ta dùng thủ thuật chuyển mảng thành chuỗi JSON để so sánh cho nhanh.
const SPECIAL_MATCHES = {
  // 🏆 CÂU LẠC BỘ - NGOẠI HẠNG ANH & CHÂU ÂU
  [JSON.stringify([[0, 0xB8860B, [0xFFFFFF, 0xF8F8F8]], [0, 0xFFD700, [0x004D98, 0xA50044, 0x004D98]]])]: {
    name: "EL CLÁSICO: REAL MADRID vs BARCELONA", color: 0xFFD700, icon: "🔥"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0xDA291C, 0xB50E12]], [0, 0xFFFFFF, [0x6CABDD, 0x98C5E9]]])]: {
    name: "DERBY MANCHESTER: MAN UTD vs MAN CITY", color: 0xDA291C, icon: "⚔️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0xEF0107, 0xEF0107]], [0, 0xFFFFFF, [0x034694, 0x034694]]])]: {
    name: "ĐẠI CHIẾN LONDON: ARSENAL vs CHELSEA", color: 0xEF0107, icon: "🛡️"
  },
  [JSON.stringify([[0, 0xFFFF00, [0xD00027, 0xA50022]], [0, 0xFFFFFF, [0x003399, 0x002060]]])]: {
    name: "MERSEYSIDE DERBY: LIVERPOOL vs EVERTON", color: 0xD00027, icon: "🔴"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x004170, 0xE30613, 0x004170]], [0, 0x2FAEE0, [0xFFFFFF, 0xFFFFFF]]])]: {
    name: "LE CLASSIQUE: PSG vs MARSEILLE", color: 0x004170, icon: "🗼"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x000000, 0xFB090B, 0x000000]], [0, 0xFFD700, [0x000000, 0x001EA0, 0x000000]]])]: {
    name: "DERBY DELLA MADONNINA: AC MILAN vs INTER MILAN", color: 0xFFFFFF, icon: "🏟️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0xDC052D, 0x980000]], [0, 0x000000, [0xFDE100, 0x000000, 0xFDE100]]])]: {
    name: "DER KLASSIKER: BAYERN MUNICH vs DORTMUND", color: 0xFDE100, icon: "⚡"
  },
  [JSON.stringify([[0, 0xFFD700, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0xFFFFFF, [0x12A0D7, 0x12A0D7]]])]: {
    name: "ĐẠI CHIẾN NƯỚC Ý: JUVENTUS vs NAPOLI", color: 0x12A0D7, icon: "🍕"
  },

  // 🌍 ĐỘI TUYỂN QUỐC GIA - WORLD CUP & EURO
  [JSON.stringify([[0, 0xFFFFFF, [0x002395, 0x002395]], [90, 0x000000, [0x75AADB, 0xFFFFFF, 0x75AADB]]])]: {
    name: "CHUNG KẾT TRONG MƠ: PHÁP vs ARGENTINA", color: 0x75AADB, icon: "🏆"
  },
  [JSON.stringify([[90, 0x000000, [0x75AADB, 0xFFFFFF, 0x75AADB]], [90, 0x000000, [0xFFD700, 0x009B3A, 0xFFD700]]])]: {
    name: "SIÊU KINH ĐIỂN NAM MỸ: ARGENTINA vs BRAZIL", color: 0x009B3A, icon: "🌞"
  },
  [JSON.stringify([[0, 0x000000, [0xFFFFFF, 0xFFFFFF]], [0, 0xFFFFFF, [0x004D98, 0x004D98]]])]: {
    name: "KINH ĐIỂN CHÂU ÂU: ĐỨC vs Ý", color: 0xFFFFFF, icon: "🦅"
  },
  [JSON.stringify([[0, 0x000080, [0xFFFFFF, 0xFFFFFF]], [0, 0xFFFFFF, [0xFF4F00, 0xFF4F00]]])]: {
    name: "ĐẠI CHIẾN CHÂU ÂU: ANH vs HÀ LAN", color: 0xFF4F00, icon: "🦁"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x00008B, 0x0000CD]], [0, 0xFFFFFF, [0xED1C24, 0xED1C24]]])]: {
    name: "DERBY ĐÔNG Á: NHẬT BẢN vs HÀN QUỐC", color: 0x0000CD, icon: "⛩️"
  },
  [JSON.stringify([[0, 0xFFFF00, [0xDA251D, 0xDA251D]], [0, 0xFFFFFF, [0x0000FF, 0x00008B]]])]: {
    name: "DERBY ĐÔNG NAM Á: VIỆT NAM vs THÁI LAN", color: 0xFFFF00, icon: "⭐"
  },

  // 🚀 CÁC CHỦ ĐỀ GIẢ TRÍ ĐẶC BIỆT
  [JSON.stringify([[0, 0xFFD700, [0xAA0000, 0xFF0000, 0xAA0000]], [0, 0xFFFFFF, [0x000080, 0xFFFFFF, 0x000080]]])]: {
    name: "MARVEL CIVIL WAR: IRON MAN vs CAPTAIN AMERICA", color: 0xFF0000, icon: "🦸‍♂️"
  },
  [JSON.stringify([[60, 0x000000, [0xFCEE0A, 0x00FFFF]], [60, 0x000000, [0xFF003C, 0x0000FF]]])]: {
    name: "CHẾ ĐỘ CYBERPUNK 2077 KÍCH HOẠT", color: 0x00FFFF, icon: "🤖"
  },
  [JSON.stringify([[0, 0xD4AF37, [0x000000, 0x1A1A1A, 0x000000]], [0, 0x000000, [0xCFB53B, 0xFFD700, 0xCFB53B]]])]: {
    name: "SỰ KIỆN VIP: ĐÊM HOÀNG KIM (GOLDEN NIGHT)", color: 0xFFD700, icon: "👑"
  },
  // 🌍 CÁC ĐỘI TUYỂN QUỐC GIA (Phần còn lại)
  [JSON.stringify([[0, 0xFFFFFF, [0xFF4F00, 0xFF4F00]], [90, 0x0000FF, [0xFFFFFF, 0xFF0000, 0xFFFFFF]]])]: {
    name: "ĐẠI CHIẾN CHÂU ÂU: HÀ LAN vs CROATIA", color: 0xFF4F00, icon: "🌪️"
  },
  [JSON.stringify([[0, 0x003893, [0xFCD116, 0xFCD116]], [0, 0xFFFFFF, [0xD52B1E, 0x0039A6, 0xD52B1E]]])]: {
    name: "RỰC LỬA NAM MỸ: COLOMBIA vs CHILE", color: 0xFCD116, icon: "☕"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x006C35, 0x006C35]], [0, 0x00843D, [0xFFCD00, 0xFFCD00]]])]: {
    name: "CHÂU Á TRANH BÁ: Ả RẬP XÊ ÚT vs AUSTRALIA", color: 0x00843D, icon: "🐪"
  },

  // 🏆 CÁC CÂU LẠC BỘ (Phần còn lại)
  [JSON.stringify([[0, 0x132257, [0xFFFFFF, 0xFFFFFF]], [0, 0x95BFEA, [0x670E36, 0x670E36]]])]: {
    name: "NGOẠI HẠNG ANH: TOTTENHAM vs ASTON VILLA", color: 0xFFFFFF, icon: "🐓"
  },
  [JSON.stringify([[90, 0xFFFFFF, [0xFFFFFF, 0xD00027, 0xFFFFFF]], [0, 0xFFFFFF, [0xE30613, 0xB00010]]])]: {
    name: "CÚP CHÂU ÂU: AJAX AMSTERDAM vs BENFICA", color: 0xD00027, icon: "⭐"
  },

  // 🎮 CÁC CHỦ ĐỀ GAME & KỸ THUẬT (Ánh xạ từ các màu Gradient)
  [JSON.stringify([[0, 0xFFFFFF, [0x002B5B, 0xFFFFFF, 0x002B5B]], [0, 0x000000, [0xFFD700, 0xFFFFFF, 0xFFD700]]])]: {
    name: "DERBY HÀNG HẢI: ĐÔ ĐỐC HẢI QUÂN vs THỦY THỦ ĐOÀN", color: 0x002B5B, icon: "⚓"
  },
  [JSON.stringify([[0, 0x000000, [0x00FF41, 0x008F11]], [0, 0x000000, [0xFF0000, 0x8B0000]]])]: {
    name: "TRẬN CHIẾN LẬP TRÌNH: HACKER vs FIREWALL HỆ THỐNG", color: 0x00FF41, icon: "💻"
  },
  [JSON.stringify([[90, 0x000000, [0x55FF55, 0x00AA00]], [90, 0x000000, [0x55FFFF, 0x00AAAA]]])]: {
    name: "SINH TỒN THẾ GIỚI KHỐI: LỤC BẢO vs KIM CƯƠNG", color: 0x55FF55, icon: "⛏️"
  },
  [JSON.stringify([[90, 0xFFFFFF, [0xFF00A0, 0xFF8C00]], [90, 0xFFFFFF, [0x00E5FF, 0x001A98]]])]: {
    name: "THÀNH PHỐ NGẦM VICE CITY: BĂNG ĐẢNG ĐƯỜNG PHỐ", color: 0xFF00A0, icon: "🌴"
  },

  // 🌌 CÁC SỰ KIỆN VIỄN TƯỞNG / FANTASY KHÁC
  [JSON.stringify([[135, 0xFFFFFF, [0x000000, 0x1A1A1A, 0x000000]], [135, 0xFFFFFF, [0x8E2DE2, 0x4A00E0, 0xFF0080]]])]: {
    name: "SỰ KIỆN VŨ TRỤ: HỐ ĐEN vs TINH VÂN", color: 0x8E2DE2, icon: "🌌"
  },
  [JSON.stringify([[90, 0x000000, [0xFF4500, 0x8B0000]], [90, 0xFFFFFF, [0x32CD32, 0x006400]]])]: {
    name: "TRẬN CHIẾN QUÁI THÚ: RỒNG LỬA vs RỒNG ĐỘC", color: 0xFF4500, icon: "🐉"
  },
  [JSON.stringify([[45, 0xFFFFFF, [0xFF9AA2, 0xFFB7B2, 0xFFDAC1]], [45, 0xFFFFFF, [0xB2CEFE, 0xC7CEEA, 0xBAEDF9]]])]: {
    name: "SỰ KIỆN GIẢI TRÍ: KẸO BÔNG GÒN", color: 0xFF9AA2, icon: "🍭"
  },
  // 🏆 BỔ SUNG CÁC CÂU LẠC BỘ CHÂU ÂU
  [JSON.stringify([[0, 0x0000FF, [0xFFFFFF, 0xCB3524, 0xFFFFFF]], [0, 0x000000, [0xFFFFFF, 0xFFFFFF]]])]: {
    name: "LA LIGA: ATLETICO MADRID vs VALENCIA", color: 0xCB3524, icon: "🛡️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x004170, 0xE30613, 0x004170]], [45, 0xFFFFFF, [0xFFFFFF, 0xED1C24]]])]: {
    name: "LIGUE 1: PSG vs AS MONACO", color: 0x004170, icon: "🗼"
  },
  [JSON.stringify([[0, 0x000000, [0xFFFFFF, 0x000000, 0xFFFFFF]], [0, 0xFFFFFF, [0x87CEEB, 0x87CEEB]]])]: {
    name: "SERIE A: JUVENTUS vs LAZIO", color: 0xFFFFFF, icon: "🦓"
  },
  [JSON.stringify([[0, 0xFFD700, [0x8E1F2F, 0x8E1F2F]], [0, 0xFFFFFF, [0x12A0D7, 0x12A0D7]]])]: {
    name: "DERBY DEL SOLE: AS ROMA vs NAPOLI", color: 0x8E1F2F, icon: "☀️"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0xA32638, 0xF2A900]], [0, 0x002395, [0xFEDD00, 0x002395, 0xFEDD00]]])]: {
    name: "KITALARARASI DERBI: GALATASARAY vs FENERBAHCE", color: 0xA32638, icon: "🔥"
  },
  [JSON.stringify([[0, 0xFFFFFF, [0x6CABDD, 0x6CABDD]], [0, 0xD4AF37, [0x000000, 0xFFFFFF, 0x000000]]])]: {
    name: "NGOẠI HẠNG ANH: MAN CITY vs NEWCASTLE", color: 0x6CABDD, icon: "🦅"
  },
  [JSON.stringify([[0, 0x000000, [0xFDE100, 0xFDE100]], [0, 0xDD013F, [0xFFFFFF, 0xFFFFFF]]])]: {
    name: "BUNDESLIGA: DORTMUND vs RB LEIPZIG", color: 0xFDE100, icon: "🐝"
  },
};
const NORMAL_MATCHES = {
  // 1. Vàng chanh - Đỏ vs Vàng chanh - Xanh navy
  [JSON.stringify([[60, 0xFFCC00, [0xE83030]], [60, 0xFFCC00, [0x004170]]])]: {
    name: "🔴 Đỏ Viền Vàng vs 🔵 Xanh Viền Vàng", icon: "☀️"
  },
  // 2. Trắng - Đỏ nhạt vs Trắng - Xanh ngọc
  [JSON.stringify([[60, 0xFFFFFF, [0xFF4A4A]], [60, 0xFFFFFF, [0x5ECFFF]]])]: {
    name: "🌸 Đỏ Pastel vs 🧊 Xanh Lơ", icon: "🎨"
  },
  // 3. Trắng - Đỏ mận vs Trắng - Xanh lam
  [JSON.stringify([[60, 0xFFFFFF, [0xD60419]], [60, 0xFFFFFF, [0x0099FF]]])]: {
    name: "🩸 Đỏ Mận vs 🌊 Xanh Biển", icon: "💧"
  },
  // 4. Đen - Cam/Vàng vs Đen - Xanh/Trắng
  [JSON.stringify([[45, 0x000000, [0xFF2400, 0xFFFF00]], [45, 0x000000, [0x1F51FF, 0xFFFFFF]]])]: {
    name: "🔥 Solar Flare vs ⚡ Electric Blue", icon: "☄️"
  },
  // 5. Trắng kem - Dải đỏ vs Trắng kem - Dải Cyan
  [JSON.stringify([[0, 0xF7FFF2, [0xE00202, 0xB00101, 0x800000]], [0, 0xF7FFF2, [0x00F7FF, 0x00D1D1, 0x00A7AD]]])]: {
    name: "🌋 Magma Sọc vs 🌊 Aqua Sọc", icon: "🌋"
  },
  // 6. Trắng kem - Hồng nhạt vs Trắng kem - Xanh nhạt
  [JSON.stringify([[90, 0xF7FFF2, [0xFF2121, 0xFF5757, 0xFC9595]], [90, 0xF7FFF2, [0x00C3FF, 0x45E0FF, 0xB5F5FC]]])]: {
    name: "🌅 Bình Minh vs ❄️ Băng Tuyết", icon: "⛅"
  },
  // 7. Trắng - Đen sọc Đỏ vs Xám - Trắng sọc Xanh
  [JSON.stringify([[45, 0xFFFFFF, [0x000000, 0xFF0000, 0x000000]], [45, 0x808080, [0xFFFFFF, 0x0096FF, 0xFFFFFF]]])]: {
    name: "⚫ Sọc Đen Đỏ vs ⚪ Sọc Trắng Xanh", icon: "🦓"
  },
  // 8. Trắng - Đỏ sọc Đen vs Trắng - Xanh sọc Đen
  [JSON.stringify([[45, 0xFFFFFF, [0xD60000, 0x000000, 0xD60000]], [45, 0xFFFFFF, [0x0058A3, 0x000000, 0x0058A3]]])]: {
    name: "🔴 Đỏ Cổ Điển vs 🔵 Xanh Cổ Điển", icon: "🛡️"
  },
  // 9. Vàng - Dải Đỏ đậm vs Vàng - Dải Xanh sáng
  [JSON.stringify([[-45, 0xFFCC00, [0xD10000, 0x8C0000, 0xD10000]], [-45, 0xFFCC00, [0x00DDFF, 0x87E3FF, 0x00DDFF]]])]: {
    name: "🟡 Vàng Nóng vs 💎 Xanh Kim Cương", icon: "🔆"
  },
  // 10. Trắng - Dải Hồng vs Trắng - Dải Tím Xanh
  [JSON.stringify([[232, 0xFFFFFF, [0xFFCCFA, 0xFF99DD, 0xFF6176]], [129, 0xFFFFFF, [0x4D39CC, 0x7A70FF, 0x7DB1FF]]])]: {
    name: "💖 Hồng Neon vs 🌌 Tím Galaxy", icon: "✨"
  },
  // 11. Trắng - Dải Xanh lá vs Trắng - Dải Tím đậm
  [JSON.stringify([[45, 0xFFFFFF, [0x00C950, 0x007830]], [45, 0xFFFFFF, [0x9B59B6, 0x5B2C6F]]])]: {
    name: "🌿 Rừng Sâu vs 🍇 Nho Tím", icon: "🍃"
  },
  // 12. Đen - Vàng/Cam vs Đen - Cyan/Blue
  [JSON.stringify([[90, 0x000000, [0xFFE600, 0xFFB300, 0xFF8000]], [90, 0x000000, [0x00FFFF, 0x00BFFF, 0x0080FF]]])]: {
    name: "🟡 Vàng Đen vs 🔵 Neon Blue", icon: "⚡"
  },
  // 13. Trắng - Xám sẫm vs Đen - Bạc
  [JSON.stringify([[135, 0xFFFFFF, [0x434343, 0x000000]], [135, 0x000000, [0xE0E0E0, 0xFFFFFF]]])]: {
    name: "🌑 Bóng Đêm vs ⚪ Ánh Trăng", icon: "🌘"
  },
  // 14. Trắng - Cam/Đỏ vs Trắng - Xanh Navy
  [JSON.stringify([[60, 0xFFFFFF, [0xFF8C00, 0xFF4500]], [60, 0xFFFFFF, [0x000080, 0x0000CD]]])]: {
    name: "🟠 Lửa Cam vs ⚓ Navy", icon: "🔥"
  },
  // 15. Trắng - Hồng/Tím vs Trắng - Xanh Rêu
  [JSON.stringify([[45, 0xFFFFFF, [0xFF00FF, 0x8A2BE2]], [45, 0xFFFFFF, [0x2E8B57, 0x006400]]])]: {
    name: "🔮 Tím Ma Thuật vs 🌲 Lục Lâm", icon: "🪄"
  },
  // 16. Trắng - Dải Hồng Mềm vs Trắng - Dải Xanh Mint
  [JSON.stringify([[120, 0xFFFFFF, [0xFFD1DC, 0xFFB6C1]], [120, 0xFFFFFF, [0xAEC6CF, 0x98FF98]]])]: {
    name: "🌸 Kẹo Hồng vs 🍃 Kẹo Bạc Hà", icon: "🍬"
  },
  // 17. Trắng - Dải Đỏ/Tím vs Trắng - Dải Cyan/Đen
  [JSON.stringify([[135, 0xFFFFFF, [0xFF512F, 0xDD2476, 0x900C3F]], [135, 0xFFFFFF, [0x1CB5E0, 0x000046, 0x000000]]])]: {
    name: "🌇 Hoàng Hôn vs 🌃 Đêm Sâu", icon: "🌆"
  },
  // 18. Đen - Vàng Hoàng Gia vs Trắng - Tím Hoàng Gia
  [JSON.stringify([[45, 0x000000, [0xBF953F, 0xFCF6BA, 0xB38728]], [45, 0xFFFFFF, [0x4A00E0, 0x8E2DE2, 0x4A00E0]]])]: {
    name: "👑 Vàng Hoàng Gia vs 🟣 Tím Hoàng Gia", icon: "⚜️"
  },
  // 19. Trắng - Đỏ tối sẫm vs Trắng - Xanh rêu/Nâu
  [JSON.stringify([[60, 0xFFFFFF, [0x4D0000, 0x800000, 0xFF7300]], [60, 0xFFFFFF, [0x2E8B57, 0x8B4513, 0x228B22]]])]: {
    name: "🩸 Máu vs 🌿 Thợ Săn", icon: "🏹"
  },
  // 20. Trắng - Xanh Navy vs Đen - Vàng
  [JSON.stringify([[135, 0xFFFFFF, [0x330066, 0x1A1A1A]], [135, 0x000000, [0xCCFF00, 0x1A1A1A]]])]: {
    name: "🟣 Đêm Tím vs 🟢 Neon Xanh", icon: "🎮"
  },
  // 21. Trắng - Đỏ/Hồng vs Trắng - Xám Xanh
  [JSON.stringify([[-45, 0xFFFFFF, [0xE74C3C, 0xC0392B]], [-45, 0xFFFFFF, [0x2C3E50, 0x34495E]]])]: {
    name: "🔴 Đỏ Thẫm vs 🌑 Thép Xanh", icon: "⚔️"
  },
  // 22. Trắng - Đỏ/Cam vs Trắng - Xanh lam dải
  [JSON.stringify([[45, 0xFFFFFF, [0xFF512F, 0xF09819, 0xFF512F]], [45, 0xFFFFFF, [0x0052D4, 0x4364F7, 0x6FB1FC]]])]: {
    name: "🔥 Hỏa Diệm vs ❄️ Băng Sương", icon: "☄️"
  },
  // 23. Vàng viền Đỏ vs Xanh viền Trắng (Tương tự CLB)
  [JSON.stringify([[0, 0x009B3A, [0xFFD700, 0xFFD700]], [0, 0x000000, [0x68A7D4, 0x68A7D4]]])]: {
    name: "🟡 Sọc Vàng vs 🔵 Sọc Lam", icon: "⭐"
  },
  // 24. Trắng - Xám Bạc vs Đen - Bạc
  [JSON.stringify([[60, 0xFFFFFF, [0x1034A6, 0x1338A8]], [60, 0x1034A6, [0xFFFFFF, 0xFFFFFF]]])]: {
    // Ánh xạ an toàn
    name: "⚪ Bạc Tinh vs ⚫ Xám Tối", icon: "🪙"
  },
  // 25. Trắng - Xanh sọc vàng vs Đen - Xanh nhạt (Phòng ngừa lỗi mã)
  [JSON.stringify([[0, 0xFFFFFF, [0x81ECEC, 0x74B9FF]], [0, 0x000000, [0xFFD700, 0xFFE600]]])]: {
    name: "🟢 Sọc Xanh vs 🟡 Sọc Vàng", icon: "🎗️"
  },
  // 26. Tím Oải Hương vs Sữa Tươi
  [JSON.stringify([[60, 0xFFFFFF, [0xA29BFE, 0xCE9BFE]], [60, 0xA29BFE, [0xFFFFFF, 0xFFFFFF]]])]: {
    name: "💜 Tím Lavender vs 🥛 Sữa Trắng", icon: "✨"
  },
  // 27. Bình minh biển vs Cát vàng
  [JSON.stringify([[0, 0xFFFFFF, [0x81ECEC, 0x74B9FF]], [0, 0x000000, [0xFFD700, 0xFFE600]]])]: {
    name: "🌅 Biển Ban Mai vs 🏜️ Cát Vàng", icon: "🌊"
  },
  // 28. Cam Chanh vs Xanh Mint
  [JSON.stringify([[45, 0xFFFFFF, [0xFFA502, 0xFFE066]], [45, 0x000000, [0x26DE81, 0x20BF6B]]])]: {
    name: "🍊 Cam Chanh vs 🌿 Xanh Bạc Hà", icon: "🍃"
  },
  // 29. Dạ quang vs Thiên thanh
  [JSON.stringify([[45, 0xFFFFFF, [0xFF007F, 0xEE1C24]], [45, 0xFFFFFF, [0x00A0E9, 0x034694]]])]: {
    name: "💖 Hồng Dạ Quang vs 🔵 Thiên Thanh", icon: "💫"
  },
  // 30. Tím Cam Hoàng Hôn
  [JSON.stringify([[135, 0xFFFFFF, [0xFF512F, 0xDD2476, 0x900C3F]], [135, 0xFFFFFF, [0x1CB5E0, 0x000046]]])]: {
    name: "🌇 Chiều Tà vs 🌃 Màn Đêm", icon: "🌆"
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

const DISCORD_LOG_WEBHOOK = "https://discord.com/api/webhooks/1485117622415527936/93auaAMEXtma8D_HH_7dl5UbyennvDtU0Sm2TiBkhaz6JMbCZjY5PVM_KC4iVcgVZQ2h";
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1388523871162077194/cw2SGaLdFt-cZU-ckrn2zBKd0lfExphspv0t7JN7VB9K-navldr88JnbE453jXP8zPHc";
const DISCORD_STATS_WEBHOOK = "https://discord.com/api/webhooks/1492333366106656768/WY8zu5fCY0eZSgK6raVOFM1fD0YJ9NGTrDyginbY6LIfBpSrCaew6DfMHOKNDCfVvinR"
// ⚠️ WEBHOOK BÁO CÁO LỖI: Dùng cùng DISCORD_WEBHOOK hoặc thay bằng webhook riêng nếu muốn kênh riêng
const DISCORD_REPORT_WEBHOOK = "https://discord.com/api/webhooks/1500881895150583849/PjI7fzgolN8Pp5dcNwRHXPxrVXK4iFXBZtDhe9BqCna0RZ7CPveRKiS2ujsjI2DPuc9F"; // ← Đổi thành URL webhook khác nếu muốn gửi vào kênh riêng
// Discord User ID của các admin cần được tag khi có báo cáo lỗi
// Hướng dẫn lấy ID: Bật Developer Mode trong Discord → chuột phải vào tên user → "Copy User ID"
const REPORT_TAG_USER_IDS = ["1138755902917328986", "566171771624226819"]; // ← Điền ID thật vào đây!
const STADIUM_TRAINING = '{"name": "Practice","width": 250,"height": 250,"cameraWidth": 0,"cameraHeight": 0,"maxViewWidth": 0,"cameraFollow": "ball","spawnDistance": 170,"redSpawnPoints": [],"blueSpawnPoints": [],"kickOffReset": "partial","bg": {"color": "718C5A","type": "grass","height": 150,"width": 150,"cornerRadius": 0,"kickOffRadius": 0},"traits": {"ballArea": {"vis": false,"bCoef": 1,"cMask": ["ball"]},"goalPost": {"radius": 8,"invMass": 0,"bCoef": 0.5},"goalNet": {"vis": true,"bCoef": 0.1,"cMask": ["ball"]},"kickOffBarrier": {"vis": false,"bCoef": 0.1,"cGroup": ["redKO","blueKO"],"cMask": ["red","blue"]},"line": {"vis": true,"bCoef": 0,"cMask": [""]}},"vertexes": [],"segments": [],"goals": [],"discs": [],"planes": [{"normal": [0,-1],"dist": -200},{"normal": [0,1],"dist": -200},{"normal": [-1,0],"dist": -200},{"normal": [1,0],"dist": -200},{"normal": [0,-1],"dist": -150,"trait": "ballArea"},{"normal": [0,1],"dist": -150,"trait": "ballArea"},{"normal": [-1,0],"dist": -150,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea"},{"normal": [1,0],"dist": -150,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea"}],"joints": [],"playerPhysics": {"radius": 15.5,"bCoef": 0.35,"invMass": 0.5,"damping": 0.96,"cGroup": ["red","blue"],"acceleration": 0.118,"gravity": [0,0],"kickingAcceleration": 0.083,"kickingDamping": 0.96,"kickStrength": 4.7,"kickback": 0},"ballPhysics": {"radius": 6,"bCoef": 0.468,"cMask": ["all"],"damping": 0.99,"invMass": 1.4,"gravity": [0,0],"color": "BDFF80","cGroup": ["ball"],"canBeStored": true},"canBeStored": true}';
const STADIUM_1v1 = '{"name" : "lỏ | 1v1 2v2","width" : 420,"height" : 200,"spawnDistance" : 180,"bg" : { "type" : "hockey", "width" : 368, "height" : 171, "kickOffRadius" : 65, "cornerRadius" : 0 },"vertexes" : [{ "x" : -368, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -368, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -368, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -368, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 368, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 368, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 368, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 368, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 0, "y" : 65, "trait" : "kickOffBarrier" },{ "x" : 0, "y" : -65, "trait" : "line" },{ "x" : 368, "y" : 171, "bCoef" : 1, "trait" : "ballArea" },{ "x" : 368, "y" : -171, "bCoef" : 1, "trait" : "ballArea" },{ "x" : 0, "y" : 171, "bCoef" : 0, "trait" : "line" },{ "x" : 0, "y" : -171, "bCoef" : 0, "trait" : "line" },{ "x" : 0, "y" : 65, "trait" : "kickOffBarrier" },{ "x" : 0, "y" : -65, "trait" : "kickOffBarrier" },{ "x" : 377, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : 377, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -377, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : -377, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -377, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : -377, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 377, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : 377, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 0, "y" : 199, "trait" : "kickOffBarrier" },{ "x" : 0, "y" : 65, "trait" : "kickOffBarrier" },{ "x" : 0, "y" : -65, "trait" : "kickOffBarrier" },{ "x" : 0, "y" : -199, "trait" : "kickOffBarrier" },{ "x" : -368.53340356886, "y" : -62.053454903872, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,-80 ] },{ "x" : -400.05760771891, "y" : -62.053454903872, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,-80 ] },{ "x" : -400.05760771891, "y" : 64.043361696331, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,80 ] },{ "x" : -368.53340356886, "y" : 64.043361696331, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,80 ] },{ "x" : 368.09926357786, "y" : 63.94882446641, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,-80 ] },{ "x" : 400, "y" : 64, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,-80 ] },{ "x" : 400, "y" : -61.927767991658, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,80 ] },{ "x" : 368.9681846993, "y" : -62.144998272018, "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,80 ] },{ "x" : -368, "y" : -142.37229643041, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : -90 },{ "x" : -260.90035258157, "y" : -50.168480548544, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },{ "x" : -368, "y" : -160.81305960678, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },{ "x" : -358.5379338963, "y" : -171, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },{ "x" : -368, "y" : 141.33175243687, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 90 },{ "x" : -260.90035258157, "y" : 49.127936555002, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },{ "x" : -368, "y" : 159.77251561324, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },{ "x" : -358.5379338963, "y" : 171, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },{ "x" : 368, "y" : 159.77251561324, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },{ "x" : 358.36266315432, "y" : 171, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },{ "x" : 368, "y" : -160.81305960678, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },{ "x" : 358.36266315432, "y" : -171, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },{ "x" : 368, "y" : -142.37229643041, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 90 },{ "x" : 260.72508183959, "y" : -50.168480548544, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 90 },{ "x" : 368, "y" : 141.33175243687, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : -90 },{ "x" : 260.72508183959, "y" : 49.127936555002, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : -90 },{ "x" : 260.72508183959, "y" : -50.168480548544, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },{ "x" : 260.72508183959, "y" : 49.127936555002, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },{ "x" : -250.86909422732, "y" : -1.2295321189394, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : 0.18898812539692, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : -2.6480523632758, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : 1.6075083697333, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : 0.89824824756514, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : -1.9387922411076, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : 1.9621384308174, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -250.86909422732, "y" : -3.0026824243599, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : -1.2295321189394, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : 0.18898812539692, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : -2.6480523632758, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : 1.6075083697333, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : 0.89824824756514, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : -1.9387922411076, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : 1.9621384308174, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 250.69382348534, "y" : -3.0026824243599, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : -1.2295321189394, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : 0.18898812539692, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : -2.6480523632758, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : 1.6075083697333, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : 0.89824824756514, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : -1.9387922411076, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : 1.9621384308174, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -185.66591492467, "y" : -3.0026824243599, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : -1.2295321189394, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : 0.18898812539692, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : -2.6480523632758, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : 1.6075083697333, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : 0.89824824756514, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : -1.9387922411076, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : 1.9621384308174, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : 185.49064418269, "y" : -3.0026824243599, "bCoef" : 0.1, "trait" : "line", "curve" : 180 },{ "x" : -160.58776903904, "y" : -159.39453936245, "bCoef" : 0.1, "trait" : "line" },{ "x" : -160.58776903904, "y" : -182.09086327183, "bCoef" : 0.1, "trait" : "line" },{ "x" : -80.337702205015, "y" : -159.39453936245, "bCoef" : 0.1, "trait" : "line" },{ "x" : -80.337702205015, "y" : -182.09086327183, "bCoef" : 0.1, "trait" : "line" },{ "x" : 160.41249829706, "y" : -159.39453936245, "bCoef" : 0.1, "trait" : "line" },{ "x" : 160.41249829706, "y" : -182.09086327183, "bCoef" : 0.1, "trait" : "line" },{ "x" : 80.162431463036, "y" : -159.39453936245, "bCoef" : 0.1, "trait" : "line" },{ "x" : 80.162431463036, "y" : -182.09086327183, "bCoef" : 0.1, "trait" : "line" },{ "x" : -254.88159756902, "y" : -171, "bCoef" : 0.1, "trait" : "line" },{ "x" : -254.88159756902, "y" : -182.09086327183, "bCoef" : 0.1, "trait" : "line" },{ "x" : -371.91294503531, "y" : -87.759267023458, "bCoef" : 0.1, "trait" : "line" },{ "x" : -384.61920561736, "y" : -87.759267023458, "bCoef" : 0.1, "trait" : "line" },{ "x" : 371.73767429333, "y" : -87.759267023458, "bCoef" : 0.1, "trait" : "line" },{ "x" : 384.44393487538, "y" : -87.759267023458, "bCoef" : 0.1, "trait" : "line" },{ "x" : -371.91294503531, "y" : 86.718723029916, "bCoef" : 0.1, "trait" : "line" },{ "x" : -384.61920561736, "y" : 86.718723029916, "bCoef" : 0.1, "trait" : "line" },{ "x" : 371.73767429333, "y" : 86.718723029916, "bCoef" : 0.1, "trait" : "line" },{ "x" : 384.44393487538, "y" : 86.718723029916, "bCoef" : 0.1, "trait" : "line" },{ "x" : -254.88159756902, "y" : 171, "bCoef" : 0.1, "trait" : "line" },{ "x" : -254.88159756902, "y" : 181.05031927829, "bCoef" : 0.1, "trait" : "line" },{ "x" : 254.70632682704, "y" : -171, "bCoef" : 0.1, "trait" : "line" },{ "x" : 254.70632682704, "y" : -182.09086327183, "bCoef" : 0.1, "trait" : "line" },{ "x" : 254.70632682704, "y" : 171, "bCoef" : 0.1, "trait" : "line" },{ "x" : 254.70632682704, "y" : 181.05031927829, "bCoef" : 0.1, "trait" : "line" },{ "x" : 377, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : 377, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -377, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : -377, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -377, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : -377, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 377, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },{ "x" : 377, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 371, "y" : -65, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 371, "y" : -171, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 371, "y" : 65, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : 371, "y" : 171, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -371, "y" : 65, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -371, "y" : 171, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -371, "y" : -65, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },{ "x" : -371, "y" : -171, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" }],"segments" : [{ "v0" : 0, "v1" : 1, "trait" : "ballArea" },{ "v0" : 2, "v1" : 3, "trait" : "ballArea" },{ "v0" : 4, "v1" : 5, "trait" : "ballArea" },{ "v0" : 6, "v1" : 7, "trait" : "ballArea" },{ "v0" : 8, "v1" : 9, "curve" : 180, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },{ "v0" : 8, "v1" : 9, "curve" : -180, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },{ "v0" : 1, "v1" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -368 },{ "v0" : 5, "v1" : 4, "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 368 },{ "v0" : 2, "v1" : 3, "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -368 },{ "v0" : 6, "v1" : 7, "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 368 },{ "v0" : 0, "v1" : 10, "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "y" : 171 },{ "v0" : 3, "v1" : 11, "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "y" : -171 },{ "v0" : 12, "v1" : 13, "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" },{ "v0" : 9, "v1" : 8, "curve" : -180, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" },{ "v0" : 15, "v1" : 14, "curve" : 180, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" },{ "v0" : 2, "v1" : 1, "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" },{ "v0" : 6, "v1" : 5, "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" },{ "v0" : 16, "v1" : 17, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 330 },{ "v0" : 18, "v1" : 19, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -330 },{ "v0" : 20, "v1" : 21, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -330 },{ "v0" : 22, "v1" : 23, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 330 },{ "v0" : 24, "v1" : 25, "trait" : "kickOffBarrier" },{ "v0" : 26, "v1" : 27, "trait" : "kickOffBarrier" },{ "v0" : 28, "v1" : 29, "curve" : 0, "color" : "F8F8F8", "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "pos" : [-700,-80 ], "y" : -80 },{ "v0" : 29, "v1" : 30, "color" : "F8F8F8", "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "x" : -590 },{ "v0" : 30, "v1" : 31, "curve" : 0, "color" : "F8F8F8", "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "pos" : [-700,80 ], "y" : 80 },{ "v0" : 32, "v1" : 33, "curve" : 0, "color" : "F8F8F8", "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "pos" : [-700,-80 ], "y" : -80 },{ "v0" : 33, "v1" : 34, "color" : "F8F8F8", "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "x" : -590 },{ "v0" : 34, "v1" : 35, "curve" : 0, "color" : "F8F8F8", "cMask" : ["red","blue","ball" ], "trait" : "goalNet", "pos" : [-700,80 ], "y" : 80 },{ "v0" : 36, "v1" : 37, "curve" : 94.0263701017, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 39, "v1" : 38, "curve" : 86.632306418889, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 40, "v1" : 41, "curve" : -94.026370101699, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 37, "v1" : 41, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 43, "v1" : 42, "curve" : -86.632306418888, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 45, "v1" : 44, "curve" : 86.632306418884, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 47, "v1" : 46, "curve" : -86.632306418899, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 48, "v1" : 49, "curve" : -94.026370101699, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 50, "v1" : 51, "curve" : 94.026370101699, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },{ "v0" : 52, "v1" : 53, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 390 },{ "v0" : 55, "v1" : 54, "curve" : -180.00692920292, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 54, "v1" : 55, "curve" : -180.00218240614, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 57, "v1" : 56, "curve" : -179.64823645332, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 56, "v1" : 57, "curve" : -180.35758668147, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 59, "v1" : 58, "curve" : -180.02357323962, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 58, "v1" : 59, "curve" : -180.00924102399, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 61, "v1" : 60, "curve" : -180.06885755885, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 60, "v1" : 61, "curve" : -180.02948353257, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -375 },{ "v0" : 63, "v1" : 62, "curve" : -179.99869069543, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 62, "v1" : 63, "curve" : -179.99939258776, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 65, "v1" : 64, "curve" : -180.08826047163, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 64, "v1" : 65, "curve" : -179.91186753664, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 67, "v1" : 66, "curve" : -179.99528711105, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 66, "v1" : 67, "curve" : -179.99743836358, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 69, "v1" : 68, "curve" : -179.98626041101, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 68, "v1" : 69, "curve" : -179.99175181595, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 375 },{ "v0" : 71, "v1" : 70, "curve" : -180.04715562398, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 70, "v1" : 71, "curve" : -179.95294709391, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 73, "v1" : 72, "curve" : -179.95715750564, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 72, "v1" : 73, "curve" : -179.89943871875, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 75, "v1" : 74, "curve" : -179.94773754738, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 74, "v1" : 75, "curve" : -179.98221351296, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 77, "v1" : 76, "curve" : -180.4151727218, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 76, "v1" : 77, "curve" : -179.58764458796, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -277.5 },{ "v0" : 79, "v1" : 78, "curve" : -180.00086646359, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 78, "v1" : 79, "curve" : -180.01965986376, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 81, "v1" : 80, "curve" : -180.03532601389, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 80, "v1" : 81, "curve" : -179.99380079, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 83, "v1" : 82, "curve" : -180.0044468452, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 82, "v1" : 83, "curve" : -180.01386779847, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 85, "v1" : 84, "curve" : -180.05158287563, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 84, "v1" : 85, "curve" : -180.01212223878, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 277.5 },{ "v0" : 86, "v1" : 87, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240 },{ "v0" : 88, "v1" : 89, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -120 },{ "v0" : 90, "v1" : 91, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 240 },{ "v0" : 92, "v1" : 93, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 120 },{ "v0" : 94, "v1" : 95, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -381 },{ "v0" : 96, "v1" : 97, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : 123 },{ "v0" : 98, "v1" : 99, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : 123 },{ "v0" : 100, "v1" : 101, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : -123 },{ "v0" : 102, "v1" : 103, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : -123 },{ "v0" : 104, "v1" : 105, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -381 },{ "v0" : 106, "v1" : 107, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 381 },{ "v0" : 108, "v1" : 109, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 381 },{ "v0" : 110, "v1" : 111, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 330 },{ "v0" : 112, "v1" : 113, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -330 },{ "v0" : 114, "v1" : 115, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -330 },{ "v0" : 116, "v1" : 117, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 330 },{ "v0" : 118, "v1" : 119, "vis" : false, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 371 },{ "v0" : 120, "v1" : 121, "vis" : false, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 371 },{ "v0" : 122, "v1" : 123, "vis" : false, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -371 },{ "v0" : 124, "v1" : 125, "vis" : false, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -371 }],"goals" : [{ "p0" : [-374.25,-62.053454903872 ], "p1" : [-374.25,64.043361696331 ], "team" : "red" },{ "p0" : [374.25,62 ], "p1" : [374.25,-62 ], "team" : "blue" }],"discs" : [{"radius":3.9405255187564,"pos":[-368.53340356886,64.043361696331],"color":"6666CC","trait":"goalPost","y":80},{"radius":3.9405255187564,"pos":[-368.53340356886,-62.053454903872],"color":"6666CC","trait":"goalPost","y":-80,"x":-560},{"radius":3.9405255187564,"pos":[368.9681846993,-62.144998272018],"color":"6666CC","trait":"goalPost","y":80},{"radius":3.9405255187564,"pos":[368.09926357786,63.94882446641],"color":"6666CC","trait":"goalPost","y":-80,"x":-560},{"radius":3,"invMass":0,"pos":[-368,-171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-368,171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[368,171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[368,-171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false},{"radius":6,"invMass":0,"pos":[10000,10000],"color":"FF0000","bCoef":0,"cMask":[],"cGroup":[],"vis":false}],"planes" : [{ "normal" : [0,1 ], "dist" : -171, "trait" : "ballArea" },{ "normal" : [0,-1 ], "dist" : -171, "trait" : "ballArea" },{ "normal" : [0,1 ], "dist" : -200, "bCoef" : 0.2, "cMask" : ["all" ] },{ "normal" : [0,-1 ], "dist" : -200, "bCoef" : 0.2, "cMask" : ["all" ] },{ "normal" : [1,0 ], "dist" : -420, "bCoef" : 0.2, "cMask" : ["all" ] },{ "normal" : [-1,0 ], "dist" : -420, "bCoef" : 0.2, "cMask" : ["all" ] }],"traits" : {"ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },"goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 1 },"goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ] },"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },"line" : { "vis" : true, "bCoef" : 0, "cMask" : ["" ] },"arco" : { "radius" : 2, "cMask" : ["n/d" ], "color" : "cccccc" }},"playerPhysics" : {"acceleration" : 0.11,"kickingAcceleration" : 0.083,"kickStrength" : 4.4,"bCoef" : 0},"ballPhysics" : {"radius" : 6.24,"color" : "FFCC00","bCoef" : 0.4,"invMass" : 1.5,"damping" : 0.99}}';
const STADIUM_3v3 = '{"name": "lỏ | 3v3","width": 800,"height": 350,"spawnDistance": 350,"bg": {"type": "hockey","width": 700,"height": 320,"kickOffRadius": 100,"cornerRadius": 0,"color": "6D925C"},"vertexes": [{"x": 701,"y": 320,"trait": "ballArea"},{"x": 698,"y": -317,"trait": "ballArea"},{"x": 0,"y": 100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 180},{"x": 0,"y": -100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 180},{"x": 0,"y": -349,"trait": "kickOffBarrier"},{"x": -701,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,-80],"p0": [-707.25,0]},{"x": -740,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,-80],"p0": [-707.25,0]},{"x": -740,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,80],"p0": [-707.25,0]},{"x": -701,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [-700,80],"p0": [-707.25,0]},{"x": 699,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,-80]},{"x": 740,"y": -80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,-80]},{"x": 740,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,80]},{"x": 699,"y": 80,"cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","curve": 0,"color": "FFFFFF","pos": [700,80]},{"x": -700,"y": 80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8","pos": [-700,80],"p0": [-707.25,0]},{"x": -700,"y": 321,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8"},{"x": -700,"y": -80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8","pos": [-700,-80],"p0": [-707.25,0]},{"x": -700,"y": -319,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8"},{"x": -700,"y": 320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF"},{"x": 701,"y": 320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF"},{"x": 700,"y": 80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","pos": [700,80]},{"x": 700,"y": 320,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea"},{"x": 700,"y": -317,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8"},{"x": 700,"y": -80,"bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","color": "F8F8F8","pos": [700,-80]},{"x": 698,"y": -317,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea"},{"x": 698,"y": -317,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea"},{"x": -701,"y": -320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"color": "FFFFFF"},{"x": 698,"y": -320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"color": "FFFFFF"},{"x": 0,"y": -319,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": -100,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": 100,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": 320,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "FFFFFF"},{"x": 0,"y": -100,"bCoef": 0.1,"cMask": ["red","blue"],"trait": "kickOffBarrier","vis": true,"color": "F8F8F8"},{"x": 0,"y": -100,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": -180},{"x": 0,"y": -100,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 0},{"x": -706.3571428571429,"y": 77.95238095238096,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false,"pos": [-700,80],"p0": [-707.25,0]},{"x": -706.3571428571429,"y": 318.95238095238096,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false},{"x": -706.3571428571429,"y": -320,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0},{"x": -706.3571428571429,"y": -81,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0,"pos": [-700,-80],"p0": [-707.25,0]},{"x": 708.2619047619047,"y": -319.0476190476191,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0},{"x": 708.2619047619047,"y": -82.0476190476191,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0,"pos": [700,-80]},{"x": 707.2619047619047,"y": 81.04761904761904,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false,"pos": [700,80]},{"x": 707.2619047619047,"y": 321.04761904761904,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"vis": false},{"x": 0,"y": -100,"bCoef": 0.1,"trait": "line"},{"x": -700,"y": -80,"bCoef": 0.1,"trait": "line","p0": [-707.25,0],"color": "ff9494"},{"x": -700,"y": 80,"bCoef": 0.1,"trait": "line","p0": [-707.25,0],"color": "ff9494"},{"x": 700,"y": -80,"bCoef": 0.1,"trait": "line","color": "a3baff"},{"x": 700,"y": 80,"bCoef": 0.1,"trait": "line","color": "a3baff"},{"x": -700,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -470,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -700,"y": 307,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": -686,"y": 320,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": -700,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -470,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -700,"y": -305,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": -687,"y": -320,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": 700,"y": -303,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": 684,"y": -320,"bCoef": 0.1,"trait": "line","curve": -90,"color": "FFFFFF"},{"x": 700,"y": 306,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": 687,"y": 320,"bCoef": 0.1,"trait": "line","curve": 90,"color": "FFFFFF"},{"x": 700,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 700,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": 270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 470,"y": -270,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -514,"y": 0.5555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -1.4444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": 2.5555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -3.4444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -2.4444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": 1.5555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": -3.9444444444444438,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": -514,"y": 3.0555555555555562,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -0.11111111111110983,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -2.11111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": 1.8888888888888902,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -4.11111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -3.11111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": 0.8888888888888902,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": -4.61111111111111,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 514,"y": 2.38888888888889,"bCoef": 0.1,"trait": "line","curve": 180,"color": "FFFFFF"},{"x": 703,"y": -319,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","vis": false,"curve": 0},{"x": 703,"y": -82,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","pos": [700,-80],"vis": false,"curve": 0},{"x": 703,"y": 81,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","pos": [700,80],"vis": false,"curve": 0,"color": "FFFFFF"},{"x": 703,"y": 321,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","vis": false,"curve": 0,"color": "FFFFFF"},{"x": -703,"y": 78,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","pos": [-700,80],"vis": false,"p0": [-707.25,0]},{"x": -703,"y": 319,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","vis": false},{"x": -703,"y": -82,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","pos": [-700,-80],"vis": false,"p0": [-707.25,0]},{"x": -703,"y": -321,"bCoef": 0,"cMask": ["ball"],"trait": "ballArea","color": "FFFFFF","vis": false},{"x": 0,"y": 100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": 0,"y": -100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": 0,"y": 100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": 0,"y": -100,"bCoef": 0.15,"trait": "kickOffBarrier","color": "FFFFFF","vis": true,"curve": 180},{"x": -0.13291470434327612,"y": 100,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -0.13291470434327612,"y": -100.36002093144947,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 0,"y": 99.04761904761905,"trait": "kickOffBarrier"},{"x": 0,"y": 350,"bCoef": 0.15,"trait": "kickOffBarrier","color": "F8F8F8","vis": true,"curve": 180},{"x": -699.4653214422947,"y": 168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -594.9755404186691,"y": 168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -699.4653214422947,"y": -168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -594.9755404186691,"y": -168.7268590662594,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 700.7870182057165,"y": 167.8781102469103,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 594.954218584181,"y": 167.8781102469103,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 700.7870182057165,"y": -169.57560788560852,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": 594.954218584181,"y": -169.57560788560852,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 0},{"x": -470.00000000000006,"y": 120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": -100},{"x": -470.00000000000006,"y": -120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": -100},{"x": 469.9999999999995,"y": 120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 100},{"x": 469.9999999999995,"y": -120,"bCoef": 0.1,"trait": "line","color": "FFFFFF","curve": 100}],"segments": [{"v0": 5,"v1": 6,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [-700,-80],"y": -80,"p0": [-707.25,0]},{"v0": 6,"v1": 7,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","x": -740,"p0": [-707.25,0]},{"v0": 7,"v1": 8,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [-700,80],"y": 80,"p0": [-707.25,0]},{"v0": 9,"v1": 10,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [700,-80],"y": -80},{"v0": 10,"v1": 11,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","x": 740},{"v0": 11,"v1": 12,"curve": 0,"color": "FFFFFF","cMask": ["ball"],"cGroup": ["red","blue"],"trait": "goalNet","pos": [700,80],"y": 80},{"v0": 2,"v1": 3,"curve": 180,"vis": true,"color": "F8F8F8","bCoef": 0.15,"cGroup": ["blueKO"],"trait": "kickOffBarrier"},{"v0": 2,"v1": 3,"curve": -180,"vis": true,"color": "F8F8F8","bCoef": 0.15,"cGroup": ["redKO"],"trait": "kickOffBarrier"},{"v0": 3,"v1": 4,"trait": "kickOffBarrier"},{"v0": 13,"v1": 14,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": -700},{"v0": 15,"v1": 16,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": -700},{"v0": 17,"v1": 18,"vis": true,"color": "FFFFFF","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","y": 320},{"v0": 19,"v1": 20,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": 700},{"v0": 21,"v1": 22,"vis": true,"color": "F8F8F8","bCoef": 1.15,"cMask": ["ball"],"trait": "ballArea","x": 700},{"v0": 23,"v1": 24,"vis": true,"color": "F8F8F8","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": 550,"y": -240},{"v0": 25,"v1": 26,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","y": -320},{"v0": 27,"v1": 28,"vis": true,"color": "FFFFFF","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier"},{"v0": 29,"v1": 30,"vis": true,"color": "FFFFFF","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier"},{"v0": 34,"v1": 35,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": -707.5},{"v0": 36,"v1": 37,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": -707.5},{"v0": 38,"v1": 39,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": 707.5},{"v0": 40,"v1": 41,"curve": 0,"vis": false,"color": "F8F8F8","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","x": 707.5},{"v0": 43,"v1": 44,"curve": 0,"vis": true,"color": "ff9494","bCoef": 0.1,"trait": "line","x": -700,"p0": [-707.25,0]},{"v0": 45,"v1": 46,"curve": 0,"vis": true,"color": "a3baff","bCoef": 0.1,"trait": "line","x": 700},{"v0": 47,"v1": 48,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 50,"v1": 49,"curve": -90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 51,"v1": 52,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 48,"v1": 52,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 54,"v1": 53,"curve": 90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 56,"v1": 55,"curve": -90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 58,"v1": 57,"curve": 90,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 59,"v1": 60,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 61,"v1": 62,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 63,"v1": 64,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 470},{"v0": 66,"v1": 65,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 65,"v1": 66,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 68,"v1": 67,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 67,"v1": 68,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 70,"v1": 69,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 69,"v1": 70,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 72,"v1": 71,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 71,"v1": 72,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -514},{"v0": 74,"v1": 73,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 73,"v1": 74,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 76,"v1": 75,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 75,"v1": 76,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 78,"v1": 77,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 77,"v1": 78,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 80,"v1": 79,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 79,"v1": 80,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": 514},{"v0": 81,"v1": 82,"curve": 0,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": 703},{"v0": 83,"v1": 84,"curve": 0,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": 703},{"v0": 85,"v1": 86,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": -703},{"v0": 87,"v1": 88,"vis": false,"color": "FFFFFF","bCoef": 0,"cMask": ["ball"],"trait": "ballArea","x": -703},{"v0": 89,"v1": 90,"curve": -180,"vis": true,"color": "FFFFFF","bCoef": 0.15,"cGroup": ["redKO"],"trait": "kickOffBarrier"},{"v0": 91,"v1": 92,"curve": 180,"vis": true,"color": "FFFFFF","bCoef": 0.15,"cGroup": ["blueKO"],"trait": "kickOffBarrier"},{"v0": 95,"v1": 96,"trait": "kickOffBarrier"},{"v0": 97,"v1": 98,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 99,"v1": 100,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 98,"v1": 100,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 101,"v1": 102,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 103,"v1": 104,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"v0": 102,"v1": 104,"curve": 0,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 105,"v1": 106,"curve": -100,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470},{"v0": 107,"v1": 108,"curve": 100,"vis": true,"color": "FFFFFF","bCoef": 0.1,"trait": "line","x": -470}],"goals": [{"p0": [-706.25,-75],"p1": [-706.25,80],"team": "red"},{"p0": [706.25,80],"p1": [706.25,-80],"team": "blue"}],"discs": [{"radius": 5,"pos": [-700,80],"color": "FFFFFF","trait": "goalPost","y": 80,"p0": [-707.25,0]},{"radius": 5,"pos": [-700,-80],"color": "FFFFFF","trait": "goalPost","y": -80,"x": -560,"p0": [-707.25,0]},{"radius": 5,"pos": [700,80],"color": "FFFFFF","trait": "goalPost","y": 80},{"radius": 5,"pos": [700,-80],"color": "FFFFFF","trait": "goalPost","y": -80},{"radius": 3,"invMass": 0,"pos": [-700,320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 3,"invMass": 0,"pos": [-700,-320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 3,"invMass": 0,"pos": [700,-320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 3,"invMass": 0,"pos": [700,320],"color": "FFFFFF","bCoef": 0.1,"trait": "line"},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false}],"planes": [{"normal": [0,1],"dist": -320,"bCoef": 1,"trait": "ballArea","vis": false,"curve": 0,"_data": {"extremes": {"normal": [0,1],"dist": -320,"canvas_rect": [-800,-350,10006,10006],"a": [-800,-320],"b": [10006,-320]}}},{"normal": [0,-1],"dist": -320,"bCoef": 1,"trait": "ballArea","_data": {"extremes": {"normal": [0,-1],"dist": -320,"canvas_rect": [-800,-350,10006,10006],"a": [-800,320],"b": [10006,320]}}},{"normal": [0,1],"dist": -350,"bCoef": 0.1,"_data": {"extremes": {"normal": [0,1],"dist": -350,"canvas_rect": [-800,-350,10006,10006],"a": [-800,-350],"b": [10006,-350]}}},{"normal": [0,-1],"dist": -350,"bCoef": 0.1,"_data": {"extremes": {"normal": [0,-1],"dist": -350,"canvas_rect": [-800,-350,10006,10006],"a": [-800,350],"b": [10006,350]}}},{"normal": [1,0],"dist": -760,"bCoef": 0.1,"_data": {"extremes": {"normal": [1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [-760,-350],"b": [-760,10006]}}},{"normal": [-1,0],"dist": -760,"bCoef": 0.1,"_data": {"extremes": {"normal": [-1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [760,-350],"b": [760,10006]}}},{"normal": [1,0],"dist": -760,"bCoef": 0.1,"trait": "ballArea","vis": false,"curve": 0,"_data": {"extremes": {"normal": [1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [-760,-350],"b": [-760,10006]}}},{"normal": [-1,0],"dist": -760,"bCoef": 0.1,"trait": "ballArea","vis": false,"curve": 0,"_data": {"extremes": {"normal": [-1,0],"dist": -760,"canvas_rect": [-800,-350,10006,10006],"a": [760,-350],"b": [760,10006]}}}],"traits": {"ballArea": {"vis": false,"bCoef": 1,"cMask": ["ball"]},"goalPost": {"radius": 8,"invMass": 0,"bCoef": 0.5},"goalNet": {"vis": true,"bCoef": 0.1,"cMask": ["all"]},"line": {"vis": true,"bCoef": 0.1,"cMask": [""]},"kickOffBarrier": {"vis": false,"bCoef": 0.1,"cGroup": ["redKO","blueKO"],"cMask": ["red","blue"]}},"playerPhysics": {"bCoef": 0,"acceleration": 0.11,"kickingAcceleration": 0.083,"kickStrength": 4.4},"ballPhysics": {"radius": 5.8,"bCoef": 0.412,"invMass": 1.5,"color": "BDFF80"},"joints": [],"redSpawnPoints": [[-200,0],[-200,-80],[-200,80]],"blueSpawnPoints": [[200,0],[200,-80],[200,80]],"cameraWidth": 0,"cameraHeight": 0,"maxViewWidth": 0,"cameraFollow": "ball","canBeStored": false,"kickOffReset": "partial"}';
const STADIUM = '{"name": "lỏ | Stadium","width": 900,"height": 400,"spawnDistance": 400,"bg": {"type": "grass","width": 800,"height": 350,"kickOffRadius": 95,"cornerRadius": 0,"color": "718B5B"},"vertexes": [{"x": -800,"y": 350,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"color": "ffffff","curve": 0,"vis": false},{"x": -800,"y": 100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": -30,"curve": 0,"vis": false,"color": "ffffff"},{"x": -800,"y": -100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 0,"curve": 0,"vis": true,"color": "ffffff"},{"x": -800,"y": -350,"bCoef": 0.95,"cMask": ["ball"],"trait": "ballArea","bias": -30,"color": "ffffff","curve": 0,"vis": false},{"x": 800,"y": 350,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"color": "ffffff","curve": 0,"vis": false},{"x": 800,"y": 100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 0,"curve": 0,"color": "ffffff","vis": false},{"x": 800,"y": -100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 30,"curve": 0,"color": "ffffff"},{"x": 800,"y": -350,"bCoef": 0.95,"cMask": ["ball"],"trait": "ballArea","bias": -30,"color": "ffffff","curve": 0,"vis": false},{"x": 0,"y": 404,"trait": "kickOffBarrier"},{"x": 0,"y": 95,"trait": "line","color": "ffffff"},{"x": 0,"y": -95,"trait": "line","color": "ffffff"},{"x": 0,"y": -404,"trait": "kickOffBarrier"},{"x": -835,"y": -100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": 835,"y": -100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": -835,"y": 100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": 835,"y": 100,"bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","radius": 0,"curve": 0,"color": "ffffff"},{"x": 0,"y": 95,"trait": "kickOffBarrier","curve": 180,"color": "ffffff"},{"x": 0,"y": -95,"trait": "kickOffBarrier","curve": 180,"color": "ffffff"},{"x": 800,"y": -100,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","curve": 0,"bias": -30,"vis": false},{"x": 0,"y": 350,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "ffffff"},{"x": 0,"y": -350,"bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","color": "ffffff"},{"x": -45,"y": -25,"bCoef": 0,"trait": "line"},{"x": -30,"y": -25,"bCoef": 0,"trait": "line"},{"x": -30,"y": 10,"bCoef": 0,"trait": "line"},{"x": -10,"y": 10,"bCoef": 0,"trait": "line"},{"x": -10,"y": 25,"bCoef": 0,"trait": "line"},{"x": -45,"y": 25,"bCoef": 0,"trait": "line"},{"x": 10,"y": -25,"bCoef": 0,"trait": "line"},{"x": 45,"y": -25,"bCoef": 0,"trait": "line"},{"x": 45,"y": 25,"bCoef": 0,"trait": "line"},{"x": 10,"y": 25,"bCoef": 0,"trait": "line"},{"x": 22,"y": -12,"bCoef": 0,"trait": "line"},{"x": 33,"y": -12,"bCoef": 0,"trait": "line"},{"x": 33,"y": 12,"bCoef": 0,"trait": "line"},{"x": 22,"y": 12,"bCoef": 0,"trait": "line"},{"x": 26.14449016918153,"y": -41,"bCoef": 0,"trait": "line","color": "ffffff","_data": {"mirror": {}}},{"x": 35.43832241020169,"y": -41.73215465122187,"bCoef": 0,"trait": "line","color": "ffffff","_data": {"mirror": {}}},{"x": 27.474013107757965,"y": -31.504851902657116,"bCoef": 0,"trait": "line","color": "ffffff","_data": {"mirror": {}}},{"x": 0,"y": 0,"bCoef": 0,"trait": "line","vis": false},{"x": 0,"y": 0,"bCoef": 0,"trait": "line","vis": false},{"x": 800,"y": 225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 800,"y": -225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 560,"y": -225,"bCoef": 0,"trait": "line","curve": 0,"color": "ffffff"},{"x": 560,"y": 225,"bCoef": 0,"trait": "line","curve": 0,"color": "ffffff"},{"x": 560,"y": 95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": 560,"y": -95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": -560,"y": -225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -560,"y": 225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -800,"y": 225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -800,"y": -225,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": -560,"y": 95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": -560,"y": -95,"bCoef": 0,"trait": "line","curve": 100,"color": "ffffff"},{"x": -800,"y": 345,"bCoef": 0,"trait": "line","color": "ffffff","curve": 180,"vis": true},{"x": 795,"y": 350,"bCoef": 1,"trait": "line","curve": 0,"bias": 30},{"x": 800,"y": 345,"trait": "line","curve": 180},{"x": -800,"y": -345,"trait": "line","curve": -180},{"x": -795,"y": -350,"trait": "line","curve": -180},{"x": 795,"y": -350,"bCoef": 0.95,"trait": "line","curve": 0,"vis": false},{"x": 800,"y": -345,"trait": "line","curve": -180},{"x": -795,"y": 350,"bCoef": 0,"cMask": ["ball"],"trait": "line","vis": true,"color": "ffffff","curve": 180},{"x": -457.142857143,"y": -348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": -457.142857143,"y": 348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": 457.142857143,"y": -348,"bCoef": 0,"trait": "line"},{"x": 457.142857143,"y": 348,"bCoef": 0,"trait": "line"},{"x": -800,"y": -155,"trait": "line","color": "ffffff"},{"x": -700,"y": -155,"trait": "line","color": "ffffff"},{"x": -700,"y": 155,"trait": "line"},{"x": -800,"y": 155,"trait": "line"},{"x": -630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 700,"y": -155,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 700,"y": 155,"bCoef": 0,"trait": "line","color": "ffffff"},{"x": 800,"y": 155,"bCoef": 0,"trait": "line"},{"x": 800,"y": -155,"bCoef": 0,"trait": "line"},{"x": 630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 630,"y": -1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": 630,"y": 1.5,"bCoef": 0,"trait": "line","curve": 180},{"x": -800,"y": -100,"bCoef": 0.95,"cMask": ["all"],"trait": "ballArea","bias": 0,"curve": 0,"vis": true,"color": "ffffff"},{"x": -800,"y": -350,"bCoef": 0.95,"cMask": ["ball"],"trait": "ballArea","bias": -30,"color": "ffffff","curve": 0,"vis": false},{"x": -457.142857143,"y": -348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": -457.142857143,"y": 348,"bCoef": 0,"trait": "line","color": "718B5B"},{"x": 457.142857143,"y": -348,"bCoef": 0,"trait": "line"},{"x": 457.142857143,"y": 348,"bCoef": 0,"trait": "line"},{"x": -490,"y": -450,"cGroup": ["c1"],"vis": false},{"x": -490,"y": 450,"cGroup": ["c1"],"vis": false},{"x": 490,"y": -450,"cGroup": ["c2"],"vis": false},{"x": 490,"y": 450,"cGroup": ["c2"],"vis": false}],"segments": [{"v0": 0,"v1": 1,"bCoef": 1,"trait": "ballArea","bias": -30},{"v0": 2,"v1": 3,"bCoef": 1,"trait": "ballArea","bias": -30},{"v0": 4,"v1": 5,"bCoef": 1,"trait": "ballArea","bias": 30},{"v0": 6,"v1": 7,"curve": 0,"bCoef": 1,"trait": "ballArea"},{"v0": 8,"v1": 9,"trait": "kickOffBarrier"},{"v0": 9,"v1": 10,"curve": 180,"cGroup": ["blueKO"],"trait": "kickOffBarrier"},{"v0": 9,"v1": 10,"curve": -180,"cGroup": ["redKO"],"trait": "kickOffBarrier"},{"v0": 10,"v1": 11,"trait": "kickOffBarrier"},{"v0": 2,"v1": 12,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["all"],"trait": "goalNet","y": -100},{"v0": 6,"v1": 13,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["all"],"trait": "goalNet","y": -100},{"v0": 1,"v1": 14,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["all"],"trait": "goalNet","y": 100},{"v0": 5,"v1": 15,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["all"],"trait": "goalNet","y": 100},{"v0": 1,"v1": 0,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"x": -800},{"v0": 5,"v1": 4,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30,"x": 800},{"v0": 2,"v1": 3,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30,"x": -800},{"v0": 6,"v1": 7,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"x": 800},{"v0": 10,"v1": 9,"curve": -180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 17,"v1": 16,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 2,"v1": 1,"curve": 0,"vis": true,"color": "ff9494","bCoef": 0,"trait": "line","x": -800},{"v0": 6,"v1": 5,"curve": 0,"vis": true,"color": "a3baff","bCoef": 0,"trait": "line","x": 795},{"v0": 17,"v1": 20,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier"},{"v0": 16,"v1": 19,"vis": true,"color": "ffffff","bCoef": 0.1,"cMask": ["red","blue"],"cGroup": ["redKO","blueKO"],"trait": "kickOffBarrier","x": 0},{"v0": 7,"v1": 3,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30,"y": -350},{"v0": 0,"v1": 4,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","y": 350},{"v0": 21,"v1": 22,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 22,"v1": 23,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 23,"v1": 24,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 24,"v1": 25,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 25,"v1": 26,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 26,"v1": 21,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 27,"v1": 28,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 28,"v1": 29,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 29,"v1": 30,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 30,"v1": 27,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 43,"v1": 40,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": 225},{"v0": 43,"v1": 42,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": 560},{"v0": 42,"v1": 41,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": -225},{"v0": 44,"v1": 45,"curve": 100,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": 560},{"v0": 48,"v1": 47,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": 225},{"v0": 47,"v1": 46,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": -560},{"v0": 46,"v1": 49,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","y": -225},{"v0": 51,"v1": 50,"curve": 100,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": -560},{"v0": 15,"v1": 13,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","x": 835},{"v0": 12,"v1": 14,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0.05,"cMask": ["all"],"trait": "goalNet","x": -835},{"v0": 53,"v1": 54,"curve": 180,"color": "ffffff","trait": "line"},{"v0": 55,"v1": 56,"curve": -180,"color": "ffffff","trait": "line"},{"v0": 57,"v1": 58,"curve": -180,"color": "ffffff","trait": "line"},{"v0": 0,"v1": 4,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30},{"v0": 0,"v1": 53,"curve": 0,"vis": true,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 30},{"v0": 3,"v1": 57,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea"},{"v0": 3,"v1": 7,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30},{"v0": 7,"v1": 18,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": -30},{"v0": 4,"v1": 5,"curve": 0,"vis": false,"color": "ffffff","bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 0},{"v0": 0,"v1": 1,"curve": 0,"vis": false,"color": "FFFFFF","bCoef": 1,"trait": "ballArea","bias": 0},{"v0": 3,"v1": 2,"curve": 0,"vis": false,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 0},{"v0": 52,"v1": 59,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","bias": 0},{"v0": 64,"v1": 65,"curve": 0,"vis": true,"color": "ffffff","trait": "line"},{"v0": 66,"v1": 67,"curve": 0,"vis": true,"color": "ffffff","trait": "line"},{"v0": 65,"v1": 66,"curve": 0,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 68,"v1": 69,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 70,"v1": 71,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 72,"v1": 73,"color": "ffffff","bCoef": 0,"trait": "line","x": 710},{"v0": 73,"v1": 74,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 72,"v1": 75,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 76,"v1": 77,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","x": 642.5},{"v0": 78,"v1": 79,"curve": 180,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 81,"v1": 80,"curve": 0,"vis": false,"bCoef": 1,"cMask": ["ball"],"trait": "ballArea","bias": 0},{"v0": 86,"v1": 87,"vis": false,"color": "eb387a","cMask": ["c1"]},{"v0": 88,"v1": 89,"vis": false,"color": "eb387a","cMask": ["c2"]},{"v0": 31,"v1": 32,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 32,"v1": 33,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 33,"v1": 34,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 34,"v1": 31,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line"},{"v0": 35,"v1": 36,"curve": 208.0275647476128,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","_data": {"mirror": {},"arc": {"a": [26.14449016918153,-41],"b": [35.43832241020169,-41.73215465122187],"curve": 208.0275647476128,"radius": 4.804301335717605,"center": [30.700039422357595,-42.525871005775045],"from": 2.81838982199157,"to": 0.16597045456351098}}},{"v0": 36,"v1": 37,"curve": 70.09948797392062,"vis": true,"color": "ffffff","bCoef": 0,"trait": "line","_data": {"mirror": {},"arc": {"a": [35.43832241020169,-41.73215465122187],"b": [27.474013107757965,-31.504851902657116],"curve": 70.09948797392062,"radius": 11.285777131053878,"center": [24.166594833963302,-42.29511370735805],"from": 0.04990287982944615,"to": 1.2733697489365303}}}],"goals": [{"p0": [-809.5,-99.5],"p1": [-809.5,99.5],"team": "red"},{"p0": [809.5,99.5],"p1": [809.5,-99.5],"team": "blue"}],"discs": [{"radius": 0,"pos": [-490,-350],"color": "ffffff","bCoef": 0,"cMask": ["c1"],"cGroup": ["none"],"trait": "line"},{"radius": 0,"pos": [-490,350],"color": "ffffff","bCoef": 0,"cMask": ["c1"],"cGroup": ["none"],"trait": "line"},{"radius": 0,"pos": [490,-350],"color": "ffffff","bCoef": 0,"cMask": ["c2"],"cGroup": ["none"],"trait": "line"},{"radius": 0,"pos": [490,350],"color": "ffffff","bCoef": 0,"cMask": ["c2"],"cGroup": ["none"],"trait": "line"},{"radius": 5.5,"pos": [-800,100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 5.5,"pos": [-800,-100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 5.5,"pos": [800,100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 5.5,"pos": [800,-100],"color": "FFFFFF","bCoef": 1.35,"trait": "goalPost"},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false},{"radius": 6,"invMass": 0,"pos": [10000,10000],"color": "FF0000","bCoef": 0,"cMask": [],"cGroup": [],"vis": false}],"planes": [{"normal": [0,1],"dist": -404,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [0,1],"dist": -404,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [-1133.7408,-404],"b": [12604.678272000001,-404]}}},{"normal": [0,-1],"dist": -404,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [0,-1],"dist": -404,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [-1133.7408,404],"b": [12604.678272000001,404]}}},{"normal": [1,0],"dist": -900,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [1,0],"dist": -900,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [-900,-508.92364800000007],"b": [-900,12604.678272000001]}}},{"normal": [-1,0],"dist": -900,"bCoef": 0.2,"cMask": ["all"],"_data": {"extremes": {"normal": [-1,0],"dist": -900,"canvas_rect": [-1133.7408,-508.92364800000007,12604.678272000001,12604.678272000001],"a": [900,-508.92364800000007],"b": [900,12604.678272000001]}}}],"traits": {"ballArea": {"vis": false,"bCoef": 1,"cMask": ["ball"]},"goalPost": {"radius": 8,"invMass": 0,"bCoef": 1},"goalNet": {"vis": true,"bCoef": 0.1,"cMask": ["all"]},"kickOffBarrier": {"vis": false,"bCoef": 0.1,"cGroup": ["redKO","blueKO"],"cMask": ["red","blue"]},"line": {"vis": true,"bCoef": 0,"cMask": [""]},"arco": {"radius": 2,"cMask": ["n/d"],"color": "cccccc"}},"playerPhysics": {"bCoef": 0,"acceleration": 0.11,"kickingAcceleration": 0.083,"kickStrength": 4.4},"ballPhysics": {"radius": 5.8,"bCoef": 0.412,"invMass": 1.5,"color": "BDFF80"},"joints": [{"d0": 1,"d1": 2,"strength": "rigid","color": "eb387a","length": null},{"d0": 3,"d1": 4,"strength": "rigid","color": "15bcd6","length": null}],"canBeStored": false,"redSpawnPoints": [[-400,0],[-400,50],[-400,-50],[-400,100],[-400,-100],[-400,380]],"blueSpawnPoints": [[400,0],[400,50],[400,-50],[400,100],[400,-100],[400,380]],"kickOffReset": "full"}';
const PENALTY_STADIUM = '{"name":"lỏ Stadium | PEN","width":420,"height":200,"spawnDistance":310,"bg":{"type":"grass","width":400,"height":260,"kickOffRadius":0,"cornerRadius":0,"color":"718B5B"},"vertexes":[{"x":323,"y":260,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30},{"x":323,"y":100,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30},{"x":323,"y":-100,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30},{"x":323,"y":-260,"bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30},{"x":370,"y":-100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","radius":0},{"x":370,"y":100,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","radius":0},{"x":332,"y":-98,"bCoef":1,"cMask":["ball"],"trait":"line"},{"x":323,"y":260,"bCoef":0,"trait":"line"},{"x":323,"y":-260,"bCoef":0,"trait":"line"},{"x":0,"y":-260,"bCoef":0,"trait":"line"},{"x":0,"y":260,"bCoef":0,"trait":"line"},{"x":323,"y":200,"bCoef":0,"trait":"line"},{"x":110,"y":200,"bCoef":0,"trait":"line"},{"x":110,"y":-200,"bCoef":0,"trait":"line"},{"x":323,"y":-200,"bCoef":0,"trait":"line"},{"x":0,"y":100,"bCoef":0,"trait":"line"},{"x":0,"y":-100,"bCoef":0,"trait":"line"},{"x":110,"y":5,"bCoef":0,"trait":"line"},{"x":110,"y":-5,"bCoef":0,"trait":"line"},{"x":55,"y":-260,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"x":65,"y":260,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"x":300,"y":-90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":365,"y":-90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":365,"y":90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":300,"y":90,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":2,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet","y":-100},{"v0":1,"v1":5,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet","y":100},{"v0":1,"v1":0,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":-30,"x":665},{"v0":2,"v1":3,"vis":true,"color":"FFFFFF","bCoef":1,"cMask":["ball"],"trait":"ballArea","bias":30,"x":665},{"v0":2,"v1":1,"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":7,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":10,"v1":9,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":9,"v1":8,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":11,"v1":12,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":12,"v1":13,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":13,"v1":14,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":15,"v1":16,"curve":150,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":18,"v1":17,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":17,"v1":18,"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line"},{"v0":5,"v1":4,"vis":true,"color":"FFFFFF","cMask":["ball"],"trait":"goalNet"},{"v0":19,"v1":20,"curve":45,"vis":false,"bCoef":0,"cMask":["red"],"trait":"penArea"},{"v0":21,"v1":22,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":22,"v1":23,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":23,"v1":24,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":24,"v1":21,"vis":false,"color":"FFFFFF","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"}],"goals":[{"p0":[332,100],"p1":[332,-100],"team":"blue"},{"p0":[325,-100],"p1":[100,0],"team":"red"},{"p0":[100,0],"p1":[320,100],"team":"red"}],"discs":[{"radius":5.75,"color":"FFDEAD","bCoef":0.4,"invMass":1.4,"pos":[110,0],"cGroup":["ball","kick","score"]},{"pos":[323,100],"trait":"goalPost"},{"pos":[323,-100],"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-260,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,1],"dist":-260,"canvas_rect":[-710,-260,710,260],"a":[-710,-260],"b":[710,-260]}}},{"normal":[0,-1],"dist":-260,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[0,-1],"dist":-260,"canvas_rect":[-710,-260,710,260],"a":[-710,260],"b":[710,260]}}},{"normal":[1,0],"dist":-499,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[1,0],"dist":-499,"canvas_rect":[-710,-260,710,260],"a":[-499,-260],"b":[-499,260]}}},{"normal":[-1,0],"dist":-376,"bCoef":0.2,"cMask":["all"],"_data":{"extremes":{"normal":[-1,0],"dist":-376,"canvas_rect":[-710,-260,710,260],"a":[376,-260],"b":[376,260]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":4.65,"invMass":0,"color":"C6D881","bCoef":1.25},"goalNet":{"vis":true,"bCoef":0.2,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n/d"],"color":"cccccc"},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]}},"playerPhysics":{"radius":14.5,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.655,"bCoef":0.25},"ballPhysics":"disc0","joints":[],"canBeStored":false,"redSpawnPoints":[[-100,0]],"blueSpawnPoints":[[323,0]],"kickOffReset":"full"}';
const DISCORD_LINK = "https://discord.gg/HTZD8HA";
const COMMANDS_TO_VALIDATE = ["discord", "kickafk", "afk", "captains", "unmute", "clearmutes", "report"]; // These commands can cause spam in the chat or bypass the mute
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

    let xOpponentGoal = (byPlayer.team == 1) ? stadium.goalLine.x : -stadium.goalLine.x; // The x position value of the opponent's goal
    this.isAShot = (
      Math.abs(ballProperties.xspeed) + Math.abs(ballProperties.yspeed) > 1.5 && // ✅ Bỏ qua nếu bóng gần đứng yên
      (xOpponentGoal * ballProperties.xspeed > 0) && // It's a kick toward the opponent goal
      (Math.abs(ballProperties.x + ballProperties.xspeed * 97.5) > stadium.goalLine.x) && // At this speed, the ball can cross the goal line
      (Math.abs(ballProperties.y + ballProperties.yspeed * (xOpponentGoal - ballProperties.x) / ballProperties.xspeed) < stadium.goalLine.y) // Check if it's on target (not really accurate because it might hit the post)
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
    this.groups = [[], []]; // Penalty takers
    this.results = [[], []]; // Results of taken penalties (first for RED, second for BLUE)
  }
  getTurn() {
    return this.results[0].length - this.results[1].length;
  }
  // Returns the team that wins the penalty shootout
  getPenaltyWinner() {
    if (this.results[0].length > 5) { // "Sudden Death" round
      if (this.results[0].length != this.results[1].length) return null;
      if (this.results[0].at(-1) == this.results[1].at(-1)) return null;
      return this.results[0].at(-1) ? 1 : 2;
    };

    // One team has more penalties scored than the other team even if the other team scores all the remaining penalties
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
      this.surrender(player.team); // Captains can surrender anytime
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

var commands = { // Format: "alias: [function, availableModes, minimumRole, captainOnly]"
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
  //sub: [subFunc, ["pick"], ROLE.PLAYER, true],
  leavecap: [leaveCaptainFunc, ["pick"], ROLE.PLAYER, true],
  //pause: [pauseFunc, ["pick"], ROLE.PLAYER, true],
  //resume: [resumeFunc, ["pick"], ROLE.PLAYER, true],
  //msgcolor: [setMsgColorFunc, ["rand", "pick"], ROLE.PLAYER, false],
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
var identities = {}; // Store connection string/public IDs of players
var adminAuths = new Set(); // Remember admin's auth for auto-login
var afkList = new Set([0]); // Host player is always in AFK mode
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
var lastMessages = []; // The last 4 messages in the form of [message, playerId, sendingTime]
var game = new Game;
var surrenderVoter = new Surrender;
var stadium = { // Stadium attributes
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
const playerRadius = 15;
const MAX_CB_PLAYERS = 4; // Tối đa 4 người được lui về thủ

function checkCbLimit() {
  // Chỉ hoạt động khi trận đấu đang diễn ra
  if (!isPlaying || MAX_CB_PLAYERS == 0) return;

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

  players.forEach(function (player) {
    if (player.team == 1) {
      if (player.position.x - playerRadius <= redLimitX - 0.1) ++redCount;
    } else if (player.team == 2) {
      if (player.position.x + playerRadius >= blueLimitX + 0.1) ++blueCount;
    }
  });

  players.forEach(function (player) {
    if (player.team == 2) return;
    let currentProps = room.getPlayerDiscProperties(player.id);
    if (!currentProps) return;
    let targetGroup = (redCount >= MAX_CB_PLAYERS && player.position.x - playerRadius > redLimitX - 0.1) ? 536870914 : 2;
    if (currentProps.cGroup !== targetGroup) {
      room.setPlayerDiscProperties(player.id, { cGroup: targetGroup });
    }
  });

  if (redCount >= MAX_CB_PLAYERS) {
    if (room.getDiscProperties(2) && room.getDiscProperties(2).y != 350) room.setDiscProperties(2, { y: 350 });
  } else {
    if (room.getDiscProperties(2) && room.getDiscProperties(2).y != -350) room.setDiscProperties(2, { y: -350 });
  }

  players.forEach(function (player) {
    if (player.team == 1) return;
    let currentProps = room.getPlayerDiscProperties(player.id);
    if (!currentProps) return;
    let targetGroup = (blueCount >= MAX_CB_PLAYERS && player.position.x + playerRadius < blueLimitX + 0.1) ? 1073741828 : 4;
    if (currentProps.cGroup !== targetGroup) {
      room.setPlayerDiscProperties(player.id, { cGroup: targetGroup });
    }
  });

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
if (MODE == "pick") setInterval(showSpecTable.bind(null), 5 * 1000); // Send Spectators table once every few seconds to prevent it from being faded away by other messages
// THÔNG BÁO NHẮC NHỞ ANTI-TOXIC & NỘI QUY (Lặp lại mỗi 5 phút)
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
    case 0: // Send Discord link
      msg = "🔔 Mã nguồn được viết bởi shelld3v (Discord). Mã nguồn: https://github.com/shelld3v/haxball-host";
      break;
    default: // Send a random quote
      try {
        (quotes.length == 0) && await fetch("https://api.quotable.io/quotes/random?limit=50", { method: "GET" }) // Fetch new quotes
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
}

function updateMetadata() {
  let month = new Date().getMonth() + 1;
  let lastPlayedMonth = localStorage.getItem("last_played_month");
  // Assign missing metadata items (inaccurately)
  lastPlayedMonth || (lastPlayedMonth = month); // This also prevents `month != lastPlayedMonth` condition below, which is good because calling `resetStorage()` would cause bugs as it uses "last_played_month" from localStorage
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

// Get months that are being monitored for statistics
function getMonths() {
  let starting_month = localStorage.getItem("starting_month");
  let ending_month = localStorage.getItem("last_played_month");
  if (starting_month != ending_month) return `${starting_month}-${ending_month}`;
  return starting_month;
}

// Get a chat-pingable tag from player's name
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

// Get a random number from a range (start from 0)
function getRandomInt(rangeEnd) {
  return Math.floor(Math.random() * rangeEnd);
}

// Get a random element from an array
function randomChoice(array) {
  return array[getRandomInt(array.length)];
}

// Get value in meters from haxball length unit
function convertToMeters(value) {
  // 37 is the ratio I got by comparing a haxball pitch with a real-life futsal pitch
  return ~~(value / 37);
}

// Get the distance knowing the coordinates of 2 points
function getDistance(x, y) {
  // Use Pythagoras
  return Math.sqrt(x ** 2 + y ** 2);
}

// Return the opposite team ID of a team ID
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

// Move AFK player to bottom of the Spectators list
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

// Return player's statistics in the room
function getStats(auth) {
  return new PlayerReport(JSON.parse(localStorage.getItem(auth)));
}

function getGameStats(player, team) {
  if (identities[player.id] === undefined) return new PlayerStats();
  let auth = getAuth(player.id);

  // 🎯 BỊT LỖ HỔNG NHÂN BẢN 2 BẢNG ĐIỂM
  // Bắt buộc lưu chỉ số vào đội gốc 120p, bất kể lúc luân lưu bị hệ thống kéo đi đâu
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
}

// Get a player by name or tag
function getPlayerByName(value) {
  if (!value) return null;
  // Find player by tag
  if (value.startsWith("@")) {
    return room.getPlayerList().find(player => getTag(player.name) == value);
  };
  // Find player by part of the name
  value = value.toLowerCase();
  return room.getPlayerList().find(player => player.name.toLowerCase().includes(value));
}

// Exclude AFK players from player list
function getNonAfkPlayers() {
  return room.getPlayerList().filter(player => !afkList.has(player.id));
}

function getSpectators() {
  return room.getPlayerList().filter(player => (player.team == 0) && !afkList.has(player.id));
}

// Get a player by position in Spectators list
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
      if (teamId == prevWinner) points++; // Winners get an extra point
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

// Get the spectator with the most points
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

// Change players' size according to their settings
function resizePlayers() {
  for (const player of room.getPlayerList()) {
    if (player.team == 0) continue;
    resizePlayer(player.id);
  };
}

// Set random colors for 2 teams
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
    case 0:
      let originalRadius = room.getPlayerDiscProperties(player.id).radius;
      for (let i = 1; i <= 5; i += 1) {
        await room.setPlayerDiscProperties(player.id, { radius: stadium.playerRadius - stadium.playerRadius * (i % 2) / 2 });
        await new Promise(r => setTimeout(r, 500));
      };
      room.setPlayerDiscProperties(player.id, { radius: originalRadius });
      break;

    case 1:
      room.setPlayerDiscProperties(player.id, { radius: stadium.playerRadius * 2 });
      break;

    case 2:
      playerIds = room.getPlayerList().flatMap(player_ => (player_.team == player.team) && (player_.id != player.id) ? [player_.id] : []);
      for (let pId of playerIds) {
        let pProps = room.getPlayerDiscProperties(pId);
        if (!pProps) continue;
        let dx = player.position.x - pProps.x;
        let dy = player.position.y - pProps.y;
        room.setPlayerDiscProperties(pId, { xspeed: dx / 4, yspeed: dy / 4 });
      };
      break;

    case 3:
      let originalColor = room.getDiscProperties(0).color;
      for (const color of [0xFF0000, 0xFF8000, 0xFFFF00, 0x80FF00, 0x00FF00, 0x00FF80, 0x00FFFF, 0x0080FF, 0x0000FF, 0x7F00FF, 0xFF00FF, 0xFF007F]) {
        await room.setDiscProperties(0, { color: color });
        await new Promise(r => setTimeout(r, 500));
      };
      room.setDiscProperties(0, { color: originalColor });
      break;

    case 4:
      for (const player_ of room.getPlayerList()) {
        if (player_.team == 0 || player_.id == player.id) continue;
        room.setPlayerDiscProperties(player_.id, { xspeed: 10 * ((player.team == 1) ? 1 : -1) });
      };
      break;

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
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "🌌");

      let players = room.getPlayerList();
      for (let i = 0; i < players.length; i++) {
        let p = players[i];
        if (p.team === 0 || p.id === player.id || !p.position) continue;
        let dx = player.position.x - p.position.x;
        let dy = player.position.y - p.position.y;
        room.setPlayerDiscProperties(p.id, { xspeed: dx / 25, yspeed: dy / 25 });
        room.setPlayerAvatar(p.id, "😵");
      }

      setSafeTimeout(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;
        let currentPlayers = room.getPlayerList();
        for (let i = 0; i < currentPlayers.length; i++) {
          let p = currentPlayers[i];
          if (p.team === 0 || p.id === player.id) continue;
          let p2Props = room.getPlayerDiscProperties(p.id);
          if (!p2Props) continue;
          let dx = p2Props.x - pProps.x;
          let dy = p2Props.y - pProps.y;
          room.setPlayerDiscProperties(p.id, { xspeed: dx / 3, yspeed: dy / 3 });
          room.setPlayerAvatar(p.id, null);
        }
        room.setPlayerAvatar(player.id, null);
      }, 1500);
      break;
    }

    case 10: {
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "👑");
      let angle = 0;
      const PI2_DIV_7 = (Math.PI * 2) / 7;
      const orbitRadius = 35;

      let auraInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;
        angle += 0.3;

        // 🎯 Lấy 7 đĩa từ ID 9 đến 15
        for (let i = 1; i <= 7; i++) {
          let offset = angle + (i * PI2_DIV_7);
          room.setDiscProperties(i + 8, {
            x: pProps.x + Math.cos(offset) * orbitRadius,
            y: pProps.y + Math.sin(offset) * orbitRadius,
            vis: true, color: 0xFFD700, radius: 4,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }
      }, 80);

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
      if (!player.position) return;
      let bombTimer = 3;
      room.setPlayerAvatar(player.id, "💣");

      let countdown = setSafeInterval(() => {
        bombTimer--;
        if (bombTimer > 0) room.setPlayerAvatar(player.id, bombTimer.toString());
      }, 500);

      setSafeTimeout(() => {
        clearInterval(countdown);
        room.setPlayerAvatar(player.id, "💥");
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        let playersOnField = room.getPlayerList();
        for (let i = 0; i < playersOnField.length; i++) {
          let p = playersOnField[i];
          if (p.team === 0 || p.id === player.id) continue;
          let p2Props = room.getPlayerDiscProperties(p.id);
          if (!p2Props) continue;
          let dx = p2Props.x - pProps.x;
          let dy = p2Props.y - pProps.y;
          let dist = Math.hypot(dx, dy) || 1;
          room.setPlayerDiscProperties(p.id, {
            xspeed: (dx / dist) * 20,
            yspeed: (dy / dist) * 20
          });
          room.setPlayerAvatar(p.id, "🚀");
        }

        const PI2_DIV_15 = (Math.PI * 2) / 15;
        // 🎯 Lấy 15 đĩa từ ID 9 đến 23
        for (let i = 1; i <= 15; i++) {
          let angle = i * PI2_DIV_15;
          room.setDiscProperties(i + 8, {
            x: pProps.x, y: pProps.y,
            xspeed: Math.cos(angle) * 18, yspeed: Math.sin(angle) * 18,
            vis: true, color: 0xFF4500, radius: 6,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
        }
      }, 1500);

      setSafeTimeout(() => {
        room.setPlayerAvatar(player.id, null);
        let playersOnField = room.getPlayerList();
        for (let i = 0; i < playersOnField.length; i++) {
          if (playersOnField[i].team !== 0) room.setPlayerAvatar(playersOnField[i].id, null);
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
      if (!player.position) return;
      room.setPlayerAvatar(player.id, "🌪️");
      let tornadoAngle = 0;
      let discIndex = 9; // 🎯 Bắt đầu từ 9

      const PI2_DIV_3 = (Math.PI * 2) / 3;
      const PI_DIV_2 = Math.PI / 2;

      let tornadoInterval = setSafeInterval(() => {
        let pProps = room.getPlayerDiscProperties(player.id);
        if (!pProps) return;

        for (let i = 0; i < 3; i++) {
          let offsetAngle = tornadoAngle + (i * PI2_DIV_3);
          room.setDiscProperties(discIndex, {
            x: pProps.x + Math.cos(offsetAngle) * 5,
            y: pProps.y + Math.sin(offsetAngle) * 5,
            xspeed: Math.cos(offsetAngle + PI_DIV_2) * 5 + Math.cos(offsetAngle) * 1,
            yspeed: Math.sin(offsetAngle + PI_DIV_2) * 5 + Math.sin(offsetAngle) * 1,
            vis: true, color: 0x87CEEB, radius: 4,
            invMass: 0, bCoef: 0, cMask: 0, cGroup: 0
          });
          discIndex++;
          if (discIndex > 38) discIndex = 9; // 🎯 Tận dụng full 30 đĩa
        }
        tornadoAngle += 0.4;

        let currentPlayers = room.getPlayerList();
        for (let i = 0; i < currentPlayers.length; i++) {
          let p = currentPlayers[i];
          if (p.team === 0 || p.id === player.id) continue;
          let p2Props = room.getPlayerDiscProperties(p.id);
          if (!p2Props) continue;
          let dx = pProps.x - p2Props.x;
          let dy = pProps.y - p2Props.y;
          let distSq = dx * dx + dy * dy;

          if (distSq < 32400) {
            let dist = Math.hypot(dx, dy) || 1;
            let pullForce = 2.0;
            let spinForce = 2.5;
            room.setPlayerDiscProperties(p.id, {
              xspeed: p2Props.xspeed * 0.5 + (dx / dist) * pullForce + (-dy / dist) * spinForce,
              yspeed: p2Props.yspeed * 0.5 + (dy / dist) * pullForce + (dx / dist) * spinForce
            });
            room.setPlayerAvatar(p.id, "😵‍💫");
          }
        }
      }, 110);

      setSafeTimeout(() => {
        clearInterval(tornadoInterval);
        for (let i = 9; i <= 38; i++) {
          room.setDiscProperties(i, { x: 10000, y: 10000, vis: false, xspeed: 0, yspeed: 0 });
        }
        let endPlayers = room.getPlayerList();
        for (let i = 0; i < endPlayers.length; i++) {
          if (endPlayers[i].team !== 0) room.setPlayerAvatar(endPlayers[i].id, null);
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

// Show spectators with their assigned numbers to captains for them to pick by number
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
  // Players without a name are not allowed
  if (player.name.trim().length == 0) {
    room.kickPlayer(player.id, "Người chơi không có tên");
    return false;
  };
  // Invisible characters aren't allowed
  if (INVISIBLE_CHARACTERS.some(char => player.name.includes(char))) {
    room.kickPlayer(player.id, "Tên người chơi chứa kí tự không hợp lệ");
    return false;
  };

  let tag = getTag(player.name.trim());
  for (const _player of room.getPlayerList()) {
    if (_player.id == player.id) continue;
    // Player joined by 2 tabs
    if ((_player.id != 0) && (getConn(_player.id) == player.conn)) {
      room.kickPlayer(_player.id, "Bạn đã vào room bằng 1 tab khác");
      continue;
    };
    // Duplicate tag
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
  if (!command[1].includes(MODE)) return false; // Command is not available in this mode
  if (getRole(player) < command[2]) return false; // Role is not high enough
  if (isCaptain(player.id) < command[3]) return false; // Captain required
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

// Kick if player doesn't quit AFK mode in time
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
  // Count as a miss if player doesn't perform the penalty in time
  game.penalty.push(false);
  takePenalty();
}

// Return true if the game is ongoing, false if the game is not yet started or is technically "over"
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
// Update information to monitor last kickers, possession and passing accuracy
function updateBallKick(player) {
  if (!isPlaying) return;
  let ballProperties = room.getDiscProperties(0);
  game.ballRecords.unshift(new Kick(ballProperties, player));
  game.ballRecords.pop();

  if (game.ballRecords[1] === null) { // Kick-off pass
    // Disallow pausing after kick-off
    canPause = false;
    return;
  };

  let timeGap = game.ballRecords[0].time - game.ballRecords[1].time;
  let travelingDistance = getDistance(ballProperties.x - game.ballRecords[1].properties.x, ballProperties.y - game.ballRecords[1].properties.y);
  let stats = getGameStats(player);
  stats.touches++;
  // If the previous kick was a shot on goal, check whether it was blocked and exclude that shot if it was
  if (
    game.ballRecords[1].isAShot &&
    (timeGap < 1) &&
    (travelingDistance < stadium.playerRadius)
  ) {
    getGameStats(game.ballRecords[1].player.id).shotsOnTarget--;
    game.ballRecords[1].isAShot = false;
  } else if (game.ballRecords[0].isAShot) {
    stats.shotsOnTarget++;
  } else if (Math.abs(ballProperties.x + ballProperties.xspeed * 100) < stadium.goalLine.x) { // Switch to penalty shootout when maximum added time reached
    let scores = room.getScores();
    if ((scores.timeLimit != 0) && (scores.time - scores.timeLimit > MAX_ADDED_TIME)) {
      startPenaltyShootout();
      return;
    };
  };

  stats = getGameStats(game.ballRecords[1].player);
  if ((game.ballRecords[2] !== null) && game.ballRecords[2].isAShot && (game.ballRecords[1].player.team != game.ballRecords[2].player.team)) stats.stoppedShots++;
  if (player.team != game.ballRecords[1].player.team) return; // Received the ball from an opponent player
  if ((player.id != game.ballRecords[1].player.id) && (travelingDistance > 12)) stats.passes++; // Received the ball from a teammate, so the previous kick was a pass
  game.teams[player.team].possession += timeGap; // Received the ball from a teammate or from yourself, so it was in possession
}

/// Change captain of a specific team
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
/// Under certain circumstances, automatically pick, start the game and return true
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

  // Sort players by points
  playerList.sort(function (player1, player2) {
    if (player1.points == player2.points) {
      return player2.goals + player2.assists - player1.goals - player1.assists;
    };
    return player2.points - player1.points;
  })
  let msg = `⭐ Danh sách cầu thủ hàng đầu tháng ${getMonths()} ⭐: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.points} ⭐)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;
  // Sort players by goals scored
  playerList.sort(function (player1, player2) {
    if (player1.goals == player2.goals) {
      return player2.assists - player1.assists;
    };
    return player2.goals - player1.goals;
  })
  msg += `\n⚽ Danh sách ghi bàn hàng đầu tháng ${getMonths()} ⚽: ${playerList.slice(0, 5).map((player, index) => `${index + 1}. ${player.name} (${player.goals} ⚽)`).join("  •  ")}`;
  msg += `\n (Xếp hạng của bạn: ${1 + playerList.findIndex(stats => stats.auth == getAuth(player.id)) || "Không có"})`;

  // Sort players by assists made
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
  if (Object.values(predictions).some(predictors => predictors.includes(player.id))) { // Has already had a prediction
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
  prediction = score.join("-"); // Re-format weird scores like "0x01-0x02", even though I don't know why I should even care
  if (predictions[prediction] === undefined) {
    predictions[prediction] = [player.id];
  } else if ((MODE != "pick") && (predictions[prediction].length <= MAX_PLAYERS)) {
    predictions[prediction].push(player.id);
  } else { // Maximum winners per match reached (1 in pick mode and maximum number of players each team in rand mode)
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
  // ----------------------------------------
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
    (getRole(player) >= ROLE.ADMIN) || // Admins receive no punishment
    (getGameStatus() === false) || // No punishment if the player quits after the game is over
    (getNonAfkPlayers().length < MAX_PLAYERS * 2 + 3) // No punishment if there are less than 3 spectators (the "captain slot" isn't that desired)
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
  delete warnings[playerConn]; // Reset warnings record after punishment
  room.sendAnnouncement(`${player.name} đã nhận hình phạt (ban ${VIOLATION_BAN_PERIOD} giờ) do mắc quá nhiều lỗi vi phạm`, null, RED, "small-bold", 0);
  if (room.getPlayer(player.id) === null) { // Player left, save ban record so the next time the player joins, ban them
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

// Pick a player from the Spectators to move to a team
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
  // Get alias and value from command
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

// Update stats about goals, assists and own goals
function updateGoalStats(team) {
  let [shot, assist] = game.ballRecords;
  if (shot === null) return;

  if (shot.player.team != team) { // Own goal
    // Not an own goal but probably a clearing/goalkeeping effort
    if (
      assist && // Someone's kick resulted in this goal
      assist.isAShot && // The previous kick was a shot on target
      (assist.player.team == team) && // The previous kick came from an opponent player
      (stadium.goalLine.x - Math.abs(shot.properties.x) < stadium.playerRadius * 4) && // The gap between the ball and the goal-line was pretty small it probably was an effort to clear the ball
      (shot.time - assist.time < 3) // The time between 2 kicks wasn't too big, otherwise, it sounds nothing like a save
    ) {
      // Correct the credits
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
    } else if (assist.player.id != shot.player.id) { // Not a solo goal
      assisterStats.assists++;
      if (assisterStats.assists != 1) { // Multiple assists O_O
        comment = comment.concat(", ", `${getTag(assist.player.name)} đã có cho mình kiến tạo thứ ${assisterStats.assists} trong trận đấu`);
      } else {
        comment = comment.concat(", ", `đường kiến tạo từ ${getTag(assist.player.name)}`);
      };
    };
  };
  room.sendChat(comment);

  // Calculate goal stats
  let speed = convertToMeters(getDistance(shot.properties.xspeed, shot.properties.yspeed) * 60); // There are 60 frames per second
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
  // Get ScoresObject
  let scores = room.getScores();
  let goalDiff = scores.red - scores.blue;
  if (team == 2) goalDiff = -goalDiff;
  // Get score line in string
  let scoreline = `${scores.red}-${scores.blue}`;

  // Tiếng hô ghi bàn nay chỉ còn là tiếng thở dài...
  var scream = "VÀO!";
  var comment = "Pha dứt điểm thành công. Bàn thắng được công nhận.";

  // Design a good comment :P
  if (
    ((scores.scoreLimit != 0) && [scores.red, scores.blue].includes(scores.scoreLimit)) || // Maximum goals reached
    ((scores.timeLimit != 0) && (scores.time > scores.timeLimit - 7.5)) // Overtime or last-second goal
  ) {
    scream = "BÀN THẮNG ẤN ĐỊNH TRẬN ĐẤU!"; // Thông báo dứt khoát cho bàn thắng chốt hạ hoặc phút cuối
    // Pick a random comment
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
  ) { // 5 duplicate messages in a row
    muteFunc(`${getTag(player.name)} 1 Spam`, room.getPlayer(0));
    return true;
  } else if (
    (lastMessages.length == 4) &&
    (lastMessages.every(message => message[1] == player.id)) &&
    (time - lastMessages[3][2] < 8000)
  ) { // Sending too many messages in a short period of time
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

  // Store players' team and role (GK or not) for the penalty shootout
  room.getPlayerList().forEach(function (player) {
    if (player.team == 0) return;
    let group = game.penalty.groups[player.team - 1];
    if (
      (group.length == 0) ||
      ((player.position.x - deepestPositions[player.team - 1]) * (player.team * 2 - 3) > 0)
    ) { // The lowest player will be assigned to the GK role
      group.push(player.id); // GK is the player in the last index of the array
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
  // Found the winner in this penalty shootout
  if (winner !== null) {
    room.sendChat(`Loạt sút luân lưu kết thúc. Đội ${TEAM_NAMES[winner]} giành chiến thắng chung cuộc!`);
    endPenaltyShootout(winner);
    return;
  };

  room.stopGame();
  // Put previous penalty taker and goalkeeper back to the Spectators
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
  room.setPlayerDiscProperties(penaltyTaker, { invMass: 9999 }); // Prevent penalty taker from mis-kicking the ball (in some penalty stadiums the ball's invMass is bigger than players')

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
    // Assign captains if missing
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
  // [LOGIC ROOM3.JS]
  if (player.team != 0) {
    await updateTeamPlayers();
    punishQuitGame(player);
  } else if (afkList.has(player.id)) { // Player was in AFK list
    // Remove from AFK list
    afkList.delete(player.id);
  };
  delete identities[player.id]; // Delete unused record

  if (typeof isTakingPenalty !== "undefined" && isTakingPenalty) {
    // A penalty taker left the room
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
  // (getRole(player) == ROLE.VIP) && room.setDiscProperties(0, {color: ballColor.getColor()}); // Switch ball color
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
// 🎯 Khai báo sổ đen chứa án phạt Mute (lưu ở ngay trên hàm onPlayerChat)
const mutedPlayers = new Map();

room.onPlayerChat = function (player, message) {
  if (player.id == 0) return;
  message = message.trim();
  if (!message) return false;

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

  // Perform some validations on the message
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
      // Disallow Spectators from messaging when 2 teams are taking penalty
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
  // Log this to monitor kicking activity
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
  clearAfkRecords(); // Stop monitoring AFK when the game is paused
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


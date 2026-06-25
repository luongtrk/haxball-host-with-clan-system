const HaxballJS = require('haxball.js');
const fs = require('fs');
const { LocalStorage } = require('node-localstorage');

process.on('uncaughtException', (err) => {
    if (err.message && err.message.includes('DataChannel is closed')) {
        return;
    }
    console.error('❌ Lỗi hệ thống chưa xác định:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    if (reason && reason.message && reason.message.includes('DataChannel is closed')) {
        return;
    }
    console.error('❌ Lỗi hứa (Promise) chưa xử lý:', reason);
});

global.localStorage = new LocalStorage('./haxball_data_native');
const TOKEN = "thr1.AAAAAGox9waDYsQyAX0DYQ.W2Jbh9A4zRo";

async function startRoom() {
    try {
        let exported = HaxballJS.default || HaxballJS;

        console.log("Đang tải Haxball Engine...");

        let engine;
        if (typeof exported === 'function') {
            engine = await exported();
        } else {
            engine = await exported;
        }

        let realHBInit = engine.HBInit || engine;

        if (typeof realHBInit !== 'function') {
            throw new Error("Không tìm thấy hàm HBInit!");
        }

        global.window = { HAXBALL_TOKEN: TOKEN };

        // Bọc HBInit để:
        // 1. Inject token tự động
        // 2. In link phòng ra console khi nhận được
        // codehaxballfinal.js sẽ gọi HBInit() ở dòng 783 và nhận room object
        global.HBInit = function(cfg) {
            cfg.token = TOKEN;
            cfg.public = true;

            let room = realHBInit(cfg);

            // Bắt link phòng và in ra console
            room.onRoomLink = function(url) {
                console.log("\n==========================================");
                console.log("🔗 LINK ROOM CỦA BẠN ĐÂY: " + url);
                console.log("==========================================\n");
            };

            room.onCaptcha = function() {
                console.log("\n❌ Token hết hạn! Hãy lấy Token mới tại https://www.haxball.com/headlesstoken\n");
            };

            return room;
        };

        let haxballScript = fs.readFileSync('./codehaxballfinal.js', 'utf8');

        // Vá lỗi quay Video Replay gửi lên Discord cho môi trường Node.js
        if (typeof global.Blob !== 'undefined' && typeof global.File === 'undefined') {
            global.File = class File extends Blob {
                constructor(chunks, name, options) {
                    super(chunks, options);
                    this.name = name;
                }
            };
        }
        haxballScript = haxballScript.replace('form.append(null,', 'form.append("files[0]",');

        console.log("Đang khởi động Room...");

        // eval script — bên trong có sẵn lệnh gọi HBInit() ở dòng 783
        // Nên KHÔNG cần gọi HBInit thêm lần nữa ở đây
        eval(haxballScript);

        console.log("✅ Code Game đã chạy qua trơn tru! Đang kết nối WebRTC lấy Link...");
        console.log("(Link phòng sẽ hiển thị ở trên khi kết nối thành công)");

    } catch (e) {
        console.error("Lỗi khởi tạo:", e);
    }
}

startRoom();

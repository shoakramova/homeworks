// ================== LOGGER MODULI ==================
let logs = [];

function log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}`;
    logs.push(logEntry);
    console.log(logEntry);
}

function readLogs() {
    if (logs.length === 0) {
        console.log("XATOLIK: Fayl topilmasa yoki hokazo");
        return;
    }
    
    console.log("\n=== LOGS.TXT MAZMUNI ===");
    logs.forEach(entry => console.log(entry));
    console.log("========================\n");
}


// ================== DASTUR ISHLASHI ==================

// Dastur boshlandi
log('APP STARTED');

// 2 soniyadan keyin birinchi timeout
setTimeout(() => {
    log('FIRST TIMEOUT EVENT');
}, 2000);

// Har 1 soniyada 3 marta interval
let count = 0;
const interval = setInterval(() => {
    count++;
    log(`INTERVAL TICK ${count}`);
    
    if (count >= 3) {
        clearInterval(interval);
    }
}, 1000);

// 5.5 soniyadan keyin barcha loglarni o'qish
setTimeout(() => {
    readLogs();
}, 5500);
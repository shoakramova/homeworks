// ================== A) GET /STUDENTS ==================
console.log("=== A) GET /STUDENTS ===");

setTimeout(() => {
    console.log("[GET /STUDENTS] TIMEOUT CALLBACK");
}, 500);

console.log("[GET /STUDENTS] HANDLER START");

// Simulyatsiya: STUDENTS massivi
const students = [
    { id: 1, name: "Ali", age: 20 },
    { id: 2, name: "Vali", age: 22 },
    { id: 3, name: "Sami", age: 21 }
];

console.log("Response: ", JSON.stringify({ students }));


// ================== B) POST /STUDENTS ==================
console.log("\n=== B) POST /STUDENTS ===");

const newStudent = { name: "Dilshod", age: 19 };

console.log("Request body:", JSON.stringify(newStudent));

// req.on('data') simulyatsiyasi
setTimeout(() => {
    console.log("[POST /STUDENTS] AFTER PARSING BODY (SETIMMEDIATE/SETTIMEOUT 0)");
}, 0);

// JSON parse va validatsiya
try {
    if (!newStudent.name || !newStudent.age) {
        throw new Error("INVALID JSON");
    }
    
    // Yangi student qo'shish
    const newId = students.length + 1;
    const studentToAdd = { id: newId, ...newStudent };
    students.push(studentToAdd);
    
    console.log("Response: 201 Created");
    console.log("New student added:", JSON.stringify(studentToAdd));
    
} catch (error) {
    console.log("Response: 400 Bad Request");
    console.log("ERROR:", error.message);
}


// ================== C) GET /STATS ==================
console.log("\n=== C) GET /STATS ===");

const stats = {
    totalRequests: 127,
    studentsCount: students.length,
    lastRequestTime: new Date().toISOString()
};

console.log("Response:", JSON.stringify(stats, null, 2));
console.log("BU ENDPOINT MURAKKAB EMAS, KECHIKTIRISHSIZ JAVOB BERSANGIZ HAM BO'LADI");


// ================== D) BOSHQA BARCHA YO'LLAR ==================
console.log("\n=== D) NOT FOUND ===");

// 404 simulyatsiyasi
const unknownPath = "/api/unknown";
console.log(`Request: GET ${unknownPath}`);
console.log("Response: 404 Not Found");
console.log("ERROR: Route not found");


// ================== EVENT LOOP TRACE ==================
console.log("\n=== EVENT LOOP TAHLILI ===");
console.log("Bu log qaysi tartibda chiqishini event loop orqali tahlil qilasiz:");
console.log("1. Sync kodlar (HANDLER START, Response)");
console.log("2. Timeout 0 (AFTER PARSING BODY)");
console.log("3. Timeout 500ms (TIMEOUT CALLBACK)");
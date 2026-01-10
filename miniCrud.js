const express = require('express');
const app = express();

// Middleware - JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverda turgdi massiv
let users = ['Ali', 'Vali', 'Abbos'];

// HTML sahifa qaytarish
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="uz">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mini CRUD - Users</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #333; margin-bottom: 20px; }
            form {
                margin-bottom: 30px;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 5px;
            }
            input {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
            }
            button {
                width: 100%;
                padding: 10px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover { background: #0056b3; }
            ul {
                list-style: none;
                padding: 0;
            }
            li {
                padding: 10px;
                margin-bottom: 5px;
                background: #e9ecef;
                border-radius: 5px;
            }
            .message {
                padding: 10px;
                margin-bottom: 20px;
                border-radius: 5px;
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📝 Mini CRUD - Users</h1>
            
            <form action="/users" method="POST">
                <h3>Yangi user qo'shish:</h3>
                <input type="text" name="name" placeholder="Ismingizni kiriting..." required>
                <button type="submit">✅ Qo'shish</button>
            </form>
            
            <h3>Ro'yxatdagi userlar:</h3>
            <ul>
                ${users.map(user => `<li>${user}</li>`).join('')}
            </ul>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

// GET /users - Barcha userlarni ko'rsatish
app.get('/users', (req, res) => {
    res.json({ users });
});

// POST /users - Yangi user qo'shish
app.post('/users', (req, res) => {
    const { name } = req.body;
    
    // Validatsiya: bo'sh bo'lsa
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name required' });
    }
    
    // Validatsiya: uzunligi < 3 bo'lsa
    if (name.trim().length < 3) {
        return res.status(400).json({ error: 'Min 3 chars' });
    }
    
    // Validatsiya: ro'yxatda bor bo'lsa
    if (users.includes(name.trim())) {
        return res.status(400).json({ error: 'Already exists' });
    }
    
    // To'g'ri bo'lsa - arrayga qo'shish
    users.push(name.trim());
    
    // HTML sahifaga redirect (success message bilan)
    const html = `
    <!DOCTYPE html>
    <html lang="uz">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mini CRUD - Users</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #333; margin-bottom: 20px; }
            form {
                margin-bottom: 30px;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 5px;
            }
            input {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
            }
            button {
                width: 100%;
                padding: 10px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover { background: #0056b3; }
            ul {
                list-style: none;
                padding: 0;
            }
            li {
                padding: 10px;
                margin-bottom: 5px;
                background: #e9ecef;
                border-radius: 5px;
            }
            .message {
                padding: 10px;
                margin-bottom: 20px;
                border-radius: 5px;
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📝 Mini CRUD - Users</h1>
            
            <div class="message">✅ Qo'shildi! User: ${name.trim()}</div>
            
            <form action="/users" method="POST">
                <h3>Yangi user qo'shish:</h3>
                <input type="text" name="name" placeholder="Ismingizni kiriting..." required>
                <button type="submit">✅ Qo'shish</button>
            </form>
            
            <h3>Ro'yxatdagi userlar:</h3>
            <ul>
                ${users.map(user => `<li>${user}</li>`).join('')}
            </ul>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

// Server ishga tushirish
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server ishlamoqda: http://localhost:${PORT}`);
});
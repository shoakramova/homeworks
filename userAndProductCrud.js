const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Boshlang'ich data
let users = [
    { id: 1, name: "Ali", age: 12 },
    { id: 2, name: "Vali", age: 15 }
];

let products = [
    { id: 1, title: "Mouse", price: 100 },
    { id: 2, title: "Keyboard", price: 200 }
];

// ==================== USERS ENDPOINTS ====================

// GET /users/:id - params orqali bitta user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User topilmadi' });
    }
    
    res.json(user);
});

// POST /users - yangi user qo'shish (name, age validatsiya)
app.post('/users', (req, res) => {
    const { name, age } = req.body;
    
    if (!name || !age) {
        return res.status(400).json({ error: 'Name va age kerak' });
    }
    
    if (name.length < 2) {
        return res.status(400).json({ error: 'Name kamida 2 ta harf bo\'lishi kerak' });
    }
    
    if (age < 1 || age > 120) {
        return res.status(400).json({ error: 'Age 1-120 oralig\'ida bo\'lishi kerak' });
    }
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        age: parseInt(age)
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - userni yangilash (validatsiya)
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User topilmadi' });
    }
    
    if (name && name.length < 2) {
        return res.status(400).json({ error: 'Name kamida 2 ta harf bo\'lishi kerak' });
    }
    
    if (age && (age < 1 || age > 120)) {
        return res.status(400).json({ error: 'Age 1-120 oralig\'ida bo\'lishi kerak' });
    }
    
    if (name) users[userIndex].name = name;
    if (age) users[userIndex].age = parseInt(age);
    
    res.json(users[userIndex]);
});

// DELETE /users/:id - userni o'chirish
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User topilmadi' });
    }
    
    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: 'User o\'chirildi', user: deletedUser[0] });
});

// GET /users/error - ataylab xato chiqarish
app.get('/users/error', (req, res, next) => {
    next(new Error('Bu ataylab chiqarilgan xato!'));
});


// ==================== PRODUCTS ENDPOINTS ====================

// GET /products/:id - params orqali bitta product
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product topilmadi' });
    }
    
    res.json(product);
});

// POST /products - yangi product qo'shish (title, price validatsiya)
app.post('/products', (req, res) => {
    const { title, price } = req.body;
    
    if (!title || !price) {
        return res.status(400).json({ error: 'Title va price kerak' });
    }
    
    if (title.length < 2) {
        return res.status(400).json({ error: 'Title kamida 2 ta harf bo\'lishi kerak' });
    }
    
    if (price < 0) {
        return res.status(400).json({ error: 'Price 0 dan katta bo\'lishi kerak' });
    }
    
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        title,
        price: parseFloat(price)
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT /products/:id - productni yangilash (validatsiya)
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, price } = req.body;
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product topilmadi' });
    }
    
    if (title && title.length < 2) {
        return res.status(400).json({ error: 'Title kamida 2 ta harf bo\'lishi kerak' });
    }
    
    if (price && price < 0) {
        return res.status(400).json({ error: 'Price 0 dan katta bo\'lishi kerak' });
    }
    
    if (title) products[productIndex].title = title;
    if (price) products[productIndex].price = parseFloat(price);
    
    res.json(products[productIndex]);
});

// DELETE /products/:id - productni o'chirish
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product topilmadi' });
    }
    
    const deletedProduct = products.splice(productIndex, 1);
    res.json({ message: 'Product o\'chirildi', product: deletedProduct[0] });
});

// GET /products/error - ataylab xato chiqarish
app.get('/products/error', (req, res, next) => {
    next(new Error('Bu ataylab chiqarilgan xato!'));
});


// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Server xatosi', 
        message: err.message 
    });
});


// ==================== SERVER ====================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server ishlamoqda: http://localhost:${PORT}`);
    console.log('\n=== USERS ENDPOINTS ===');
    console.log('GET    /users/:id');
    console.log('POST   /users');
    console.log('PUT    /users/:id');
    console.log('DELETE /users/:id');
    console.log('GET    /users/error');
    console.log('\n=== PRODUCTS ENDPOINTS ===');
    console.log('GET    /products/:id');
    console.log('POST   /products');
    console.log('PUT    /products/:id');
    console.log('DELETE /products/:id');
    console.log('GET    /products/error');
});
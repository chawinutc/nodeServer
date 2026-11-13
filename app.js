const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// ตั้งค่า Template Engine และ Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

// กำหนดให้ใช้ไฟล์ views/layout.ejs เป็น Layout เริ่มต้น
app.set('layout', 'layout'); 

// Route สำหรับหน้าแรก
app.get('/', (req, res) => {
    // เรนเดอร์ไฟล์ views/index.ejs ไปแทรกใน layout
    res.render('index', { title: 'หน้าแรก' }); 
});
    // Route สำหรับหน้า Product
app.get('/product', (req, res) => {
     // ใช้ req.query.id เพื่อดึงค่า '1' ออกมา (หากไม่มีการส่งค่ามา จะเป็น undefined)
    const dataId = req.query.id; 
    // สามารถนำ dataId ไปค้นหาในฐานข้อมูลต่อได้
    // ตัวอย่างนี้เป็นการจำลองข้อมูลเพื่อส่งไปแสดงผล
    let info = "ไม่พบข้อมูล";
    if (dataId === '1') {
        info = "ข้อมูลรายการที่ 1";
    }
    // ส่งค่าไปยังไฟล์ detail.ejs โดยแทรกผ่าน Layout เดิม
    res.render('product', { 
        title: 'รายละเอียดข้อมูล',
        id: dataId,
        detailInfo: info
    });
    // เรนเดอร์ไฟล์ views/product.ejs ไปแทรกใน layout
    //res.render('product', { title: 'สินค้า' });
});

// Route สำหรับหน้า Show Product
app.get('/showProduct', (req, res) => {
   const myProducts = [
        { id: 'P001', name: 'MikroTik hEX RB750Gr3', price: 2150.00, quantity: 15 },
        { id: 'P002', name: 'MikroTik Cloud Core Router CCR1009', price: 15500.00, quantity: 2 },
        { id: 'P003', name: 'UBIQUITI UniFi AP AC LR', price: 3850.00, quantity: 8 },
        { id: 'P004', name: 'Cisco Catalyst 2960-X 24-Port', price: 28000.00, quantity: 0 },
        { id: 'P005', name: 'LINK CAT6 UTP Cable (305m)', price: 4200.00, quantity: 5 },
        { id: 'P006', name: 'APC Smart-UPS 1000VA', price: 6500.00, quantity: 4 },
        { id: 'P007', name: '19" German Export Rack 42U', price: 12000.00, quantity: 1 },
        { id: 'P008', name: 'TP-Link 24-Port Gigabit Switch', price: 2100.00, quantity: 20 },
        { id: 'P009', name: 'Fiber Optic Patch Cord SC-SC', price: 150.00, quantity: 50 },
        { id: 'P010', name: 'RJ45 Connector LINK (100 Pack)', price: 550.00, quantity: 30 },
        { id: 'P011', name: 'MikroTik RouterBOARD RB2011UiAS-2HnD-IN', price: 3200.00, quantity: 10 },
        { id: 'P012', name: 'Ubiquiti EdgeRouter X', price: 2500.00, quantity: 12 },
        { id: 'P013', name: 'Cisco SG350-28 28-Port Managed Switch', price: 7500.00, quantity: 3 },
        { id: 'P014', name: 'TP-Link TL-SG108 8-Port Gigabit Switch', price: 1200.00, quantity: 25 },
        { id: 'P015', name: 'Netgear GS108 8-Port Gigabit Switch', price: 1300.00, quantity: 18 }
    ];
   // 1. รับค่าหน้าที่ต้องการจาก URL (ถ้าไม่มีให้ค่าเริ่มต้นเป็นหน้า 1)
    const page = parseInt(req.query.page) || 1; 
    
    // 2. กำหนดจำนวนรายการที่ต้องการแสดงต่อหน้า
    const limit = 5; 

    // 3. คำนวณหาจุดเริ่มต้นและจุดสิ้นสุดสำหรับการตัด Array
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // 4. ตัด Array เพื่อเอาเฉพาะข้อมูลของหน้านั้นๆ (เสมือนการใช้ Skip และ Take)
    const paginatedProducts = myProducts.slice(startIndex, endIndex);

    // 5. คำนวณจำนวนหน้าทั้งหมด (ปัดเศษขึ้นด้วย Math.ceil)
    const totalPages = Math.ceil(myProducts.length / limit);

    // 6. ส่งข้อมูลทั้งหมดไปยัง View
    res.render('showProduct', { 
        title: 'รายการอุปกรณ์เครือข่าย (แบบแบ่งหน้า)',
        products: paginatedProducts, // ส่งไปเฉพาะรายการของหน้านั้น
        currentPage: page,           // ส่งหมายเลขหน้าปัจจุบันไปแสดงผล
        totalPages: totalPages,      // ส่งจำนวนหน้าทั้งหมดไปสร้างปุ่ม
        limit: limit,
        startIndex: startIndex       // ส่งค่าเริ่มต้นไปเพื่อรันเลขลำดับให้ต่อเนื่อง
    });
});

// Route สำหรับหน้า About
app.get('/about', (req, res) => {
   
    let info = "ไม่พบข้อมูล";
    if (dataId === '1') {
        info = "ข้อมูลรายการที่ 1";
    }
    // เรนเดอร์ไฟล์ views/about.ejs ไปแทรกใน layout
    res.render('about', { 
        title: 'รายละเอียดข้อมูล',
        id: dataId,
        detailInfo: info
    });
    // res.render('about', { title: 'เกี่ยวกับเรา' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 (http://localhost:3000)');
});
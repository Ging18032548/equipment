// ฟังก์ชันสำหรับโหลดข้อมูลผู้ใช้จากฐานข้อมูล
function loadUserData() {
    // ส่งคำขอ GET ไปยัง API เพื่อนำข้อมูลผู้ใช้
    axios.get('http://localhost:8080/index.php?route=/sql&pos=0&db=webdb&table=user')
        .then(response => {
            const users = response.data; // ข้อมูลผู้ใช้ที่ได้รับจาก API
            const userTableBody = document.getElementById('user-body'); // หาตัว tbody ของตารางที่จะแสดงข้อมูล

            // ลบแถวเดิมที่มีอยู่
            userTableBody.innerHTML = '';

            // ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่
            if (users.length > 0) {
                // ถ้ามีข้อมูลผู้ใช้ ให้สร้างแถวใหม่สำหรับแสดงข้อมูล
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.user_id}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.department}</td>
                        <td>${user.role}</td>
                    `;
                    userTableBody.appendChild(row); // เพิ่มแถวที่สร้างลงใน tbody
                });
            } else {
                // ถ้าไม่มีข้อมูล ให้แสดงข้อความ "No data available"
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="9">No data available</td>';
                userTableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error); // ถ้ามีข้อผิดพลาดในการดึงข้อมูลจาก API
        });
}


// เลือกปุ่มและแถบเมนู
const menuToggle = document.getElementById('menuToggle');
const slideMenu = document.getElementById('slideMenu');

// เมื่อคลิกที่ปุ่มเมนู, ให้สลับคลาส 'active' ที่แถบเมนู
menuToggle.addEventListener('click', () => {
    slideMenu.classList.toggle('active');
});

// เมื่อคลิกที่แถบเมนู, ให้ซ่อนแถบเมนู
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menuButton');

    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active'); // ซ่อนแถบเมนู
        menuButton.classList.remove('hidden'); // แสดงปุ่มเมนูกลับมา
    } else {
        sidebar.classList.add('active'); // แสดงแถบเมนู
        menuButton.classList.add('hidden'); // ซ่อนปุ่มเมนู
    }
}
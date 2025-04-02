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
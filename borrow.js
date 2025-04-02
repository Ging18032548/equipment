document.addEventListener("DOMContentLoaded", function() {
    // ดึงข้อมูลจาก API
    axios.get('get_borrow_records.php')
        .then(function(response) {
            const borrowRecords = response.data;
            const tbody = document.getElementById('borrow-records-body');
            tbody.innerHTML = ""; // เคลียร์ข้อมูลเก่าออก

            borrowRecords.forEach(function(record) {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${record.borrow_id}</td>
                    <td>${record.equipment_id}</td>
                    <td>${record.user_id}</td>
                    <td>${record.borrow_date}</td>
                    <td>${record.return_date}</td>
                    <td>${record.status}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error('Error fetching borrow records:', error);
        });
});

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

document.addEventListener('DOMContentLoaded', function() {
    // ดึงข้อมูลจาก API
    axios.get('http://localhost:8080/index.php?route=/sql&pos=0&db=webdb&table=maintenance')
        .then(function(response) {
            const maintenanceData = response.data;
            const maintenanceTableBody = document.getElementById('maintenance');

            // ตรวจสอบข้อมูล หากไม่มีข้อมูลแสดงข้อความ
            if (maintenanceData.length === 0) {
                maintenanceTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No data available</td></tr>';
            } else {
                // หากมีข้อมูล ให้แสดงข้อมูลในตาราง
                maintenanceData.forEach(function(record) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${record.maintenance_id}</td>
                        <td>${record.equipment_id}</td>
                        <td>${record.maintenance_date}</td>
                        <td>${record.description}</td>
                        <td>${record.repairStatus}</td>
                        <td>${record.cost}</td>
                    `;
                    maintenanceTableBody.appendChild(row);
                });
                // แสดงข้อความว่าเจอข้อมูลแล้ว
                document.getElementById('infoMessage').style.display = 'block';
            }
        })
        .catch(function(error) {
            console.error("Error fetching data: ", error);
        });

    // ฟังก์ชันการค้นหาข้อมูล
    document.getElementById('search').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#maintenance-table tbody tr');
        
        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            let rowContainsQuery = false;

            // ตรวจสอบแต่ละเซลล์ในแถวว่าเกี่ยวข้องกับคำค้นหาหรือไม่
            for (let i = 0; i < cells.length; i++) {
                const cellText = cells[i].textContent.toLowerCase();
                if (cellText.includes(query)) {
                    rowContainsQuery = true;
                    break;
                }
            }

            // แสดงหรือซ่อนแถวตามการค้นหาของผู้ใช้
            if (rowContainsQuery) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
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
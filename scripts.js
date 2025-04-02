document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api.php?table=equipment")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("table-body");
            tableBody.innerHTML = "";

            if (data.length > 0) {
                data.forEach(row => {
                    let rowData = "<tr>";
                    Object.values(row).forEach(value => {
                        rowData += `<td>${value}</td>`;
                    });
                    rowData += "</tr>";
                    tableBody.innerHTML += rowData;
                });
            } else {
                tableBody.innerHTML = "<tr><td colspan='8'>No data available</td></tr>";
            }
        })
        .catch(error => console.error("Error loading data:", error));
});


// เพิ่มการทำงานเมื่อกดปุ่ม Search
document.getElementById('searchButton').addEventListener('click', function() {
    // ตัวอย่างการค้นหา: คุณสามารถเพิ่ม logic เช็คผลลัพธ์จากฐานข้อมูลได้
    let usernameFound = true; // ตัวอย่างกรณีที่ค้นหาเจอ

    if (usernameFound) {
        // แสดงข้อความเมื่อค้นหาเจอ
        document.getElementById('infoMessage').style.display = 'block';
    } else {
        // ซ่อนข้อความ (กรณีค้นหาไม่เจอ)
        document.getElementById('infoMessage').style.display = 'none';
    }
});

//path: login.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // ป้องกันไม่ให้หน้าเว็บรีเฟรช

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ตรวจสอบว่า username และ password ไม่ว่าง
    if (username === "" || password === "") {
        document.getElementById("errorMessage").textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
    }

    // สมมติว่า username และ password ถูกต้อง (แทนที่ด้วยการตรวจสอบฐานข้อมูลจริงในภายหลัง)
    if (username === "admin" && password === "1234") {
        window.location.href = "webpage.html";  // เปลี่ยนไปยังหน้า webpage.html
    } else {
        document.getElementById("errorMessage").textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    }
});


//path: register.js เชื่อมต่อการสมัครสมาชิก
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันหน้ารีเฟรช

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วน
    if (!fullname || !email || !username || !password || !confirmPassword) {
        errorMessage.textContent = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        return;
    }

    // ตรวจสอบว่ารหัสผ่านตรงกัน
    if (password !== confirmPassword) {
        errorMessage.textContent = "รหัสผ่านไม่ตรงกัน";
        return;
    }

    // จำลองการสมัครสำเร็จ และนำไปยังหน้า Welcome
    localStorage.setItem("registeredUser", JSON.stringify({ fullname, email, username }));
    window.location.href = "welcome.html"; // เมื่อสมัครเสร็จให้ไปยังหน้า Welcome
});




axios.get('http://localhost:8080/index.php?route=/sql&pos=0&db=webdb&table=user')
    .then(response => {
        console.log(response.data); // ตรวจสอบข้อมูลที่ได้รับจาก API
        const users = response.data;
        const userTableBody = document.getElementById('user');

        // เคลียร์ข้อมูลเก่า
        userTableBody.innerHTML = '';

        
        if (users.length > 0) {
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
                userTableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="9">No data available</td>';
            userTableBody.appendChild(row);
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });


    // EquipmentID
    document.addEventListener("DOMContentLoaded", function () {
        // ดึงข้อมูลจากฐานข้อมูลเมื่อโหลดหน้า
        axios.get('http://localhost:8080/index.php?route=/sql&pos=0&db=webdb&table=equipment')
            .then(response => {
                const data = response.data;
                const maintenanceTableBody = document.getElementById('maintenance');
                maintenanceTableBody.innerHTML = ''; // เคลียร์ข้อมูลเก่า
    
                if (data.length > 0) {
                    // ลูปผ่านข้อมูลที่ได้รับมา และสร้างแถวในตาราง
                    data.forEach(row => {
                        const tableRow = document.createElement('tr');
                        tableRow.innerHTML = `
                            <td>${row.MaintenanceID}</td>
                            <td>${row.EquipmentID}</td>
                            <td>${row.MaintenanceDate}</td>
                            <td>${row.Description}</td>
                            <td>${row.Repair}</td>
                            <td>${row.Cost}</td>
                        `;
                        maintenanceTableBody.appendChild(tableRow);
                    });
                } else {
                    // ถ้าไม่มีข้อมูลในฐานข้อมูล
                    const noDataRow = document.createElement('tr');
                    noDataRow.innerHTML = '<td colspan="6">No data available</td>';
                    maintenanceTableBody.appendChild(noDataRow);
                }
            })
            .catch(error => {
                console.error('Error fetching maintenance records:', error);
            });
    
        // ฟังก์ชันการค้นหา MaintenanceID
        document.getElementById('searchButton').addEventListener('click', function() {
            const searchTerm = prompt("Enter MaintenanceID to search:");
    
            if (searchTerm) {
                // ค้นหาข้อมูลในตาราง
                const rows = document.querySelectorAll('#maintenance-table tbody tr');
                let found = false;
    
                rows.forEach(row => {
                    const cells = row.getElementsByTagName('td');
                    const maintenanceID = cells[0].textContent;
    
                    if (maintenanceID === searchTerm) {
                        row.style.backgroundColor = 'yellow'; // ไฮไลท์แถวที่ค้นพบ
                        found = true;
                    } else {
                        row.style.backgroundColor = ''; // รีเซ็ตสีแถวที่ไม่ตรง
                    }
                });
    
                // แสดงข้อความเมื่อไม่พบข้อมูล
                const infoMessage = document.getElementById('infoMessage');
                if (found) {
                    infoMessage.style.display = 'block';
                } else {
                    infoMessage.style.display = 'none';
                    alert("No MaintenanceID found!");
                }
            }
        });
    });
    
// maintenance
document.addEventListener("DOMContentLoaded", function () {
    // ดึงข้อมูล Maintenance จากฐานข้อมูล
    axios.get('http://localhost:8080/index.php?route=/sql&pos=0&db=webdb&table=maintenance')
        .then(response => {
            const data = response.data;
            const maintenanceTableBody = document.getElementById('maintenance');
            maintenanceTableBody.innerHTML = ''; // เคลียร์ข้อมูลเก่า

            if (data.length > 0) {
                // ลูปผ่านข้อมูลที่ได้รับมา และสร้างแถวในตาราง
                data.forEach(row => {
                    const tableRow = document.createElement('tr');
                    tableRow.innerHTML = `
                        <td>${row.MaintenanceID}</td>
                        <td>${row.EquipmentID}</td>
                        <td>${row.MaintenanceDate}</td>
                        <td>${row.Description}</td>
                        <td>${row.Repair}</td>
                        <td>${row.Cost}</td>
                    `;
                    maintenanceTableBody.appendChild(tableRow);
                });
            } else {
                // ถ้าไม่มีข้อมูล
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = '<td colspan="6">No data available</td>';
                maintenanceTableBody.appendChild(noDataRow);
            }
        })
        .catch(error => {
            console.error('Error fetching maintenance records:', error);
        });

    // ฟังก์ชันค้นหา MaintenanceID
    document.querySelector('.search-button').addEventListener('click', function () {
        const searchTerm = prompt("Enter MaintenanceID to search:");

        if (searchTerm) {
            const rows = document.querySelectorAll('#maintenance-table tbody tr');
            let found = false;

            rows.forEach(row => {
                const maintenanceID = row.cells[0].textContent; // อ่านค่า MaintenanceID จาก column แรก

                if (maintenanceID === searchTerm) {
                    row.style.backgroundColor = 'yellow'; // ไฮไลท์แถวที่พบ
                    found = true;
                } else {
                    row.style.backgroundColor = ''; // รีเซ็ตสีถ้าไม่ตรง
                }
            });

            // แสดง/ซ่อนข้อความแจ้งเตือน
            const infoMessage = document.getElementById('infoMessage');
            if (found) {
                infoMessage.style.display = 'block';
            } else {
                infoMessage.style.display = 'none';
                alert("No MaintenanceID found!");
            }
        }
    });
});


// Fetch data from the backend API and display it
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/api/data');
        const data = await response.json();
        const container = document.getElementById('data-container');
        container.innerHTML = data.map(item => `<p>${item.name}: ${item.quantity}</p>`).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchData when the page loads
fetchData();

// Redirect to the specified page 
function goToPage(page) {
    window.location.href = page; // Redirect to the specified page
}


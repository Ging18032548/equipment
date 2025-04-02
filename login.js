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


//search function
document.getElementById('searchButton').addEventListener('click', function() {
    // รับค่าคำค้นหาจาก input search
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    if (!searchTerm) {
        // หากไม่มีคำค้นหาก็ไม่ทำการค้นหา
        return;
    }

    // ส่งคำค้นหาผ่าน GET request ไปยัง API
    axios.get(`http://localhost:8080/api.php?table=user&search=${searchTerm}`)
        .then(response => {
            const users = response.data;
            const userTableBody = document.getElementById('user');

            // เคลียร์ข้อมูลเก่า
            userTableBody.innerHTML = '';

            // แสดงข้อมูลที่ค้นพบ
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
                // แสดงข้อความเมื่อพบข้อมูล
                document.getElementById('infoMessage').style.display = 'block';
            } else {
                // หากไม่พบข้อมูล
                userTableBody.innerHTML = "<tr><td colspan='9'>No data found</td></tr>";
                document.getElementById('infoMessage').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});

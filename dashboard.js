document.addEventListener("DOMContentLoaded", async function () {
    try {
        // ดึงข้อมูลจาก phpMyAdmin API
        const response = await fetch("http://localhost:8080/api/sql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: "SELECT * FROM dashboard_id",
                database: "webdb"
            })
        });

        const data = await response.json();
        if (!data.success) throw new Error("Database query failed");

        // สมมติว่า database มีข้อมูลแค่ 1 แถว
        const dashboardData = data.rows[0];

        // แสดงข้อมูลพื้นฐาน
        document.getElementById("dashboard_id").textContent = dashboardData.dashboard_id;
        document.getElementById("user_id").textContent = dashboardData.user_id;
        document.getElementById("lastlogin").textContent = dashboardData.lastlogin;

        // แสดง Notifications
        const notificationsList = document.getElementById("notifications");
        dashboardData.notifications.split(",").forEach(notif => {
            const li = document.createElement("li");
            li.textContent = notif.trim();
            notificationsList.appendChild(li);
        });

        // แสดง Recent Activity
        const activityList = document.getElementById("recentactivity");
        dashboardData.recentactivity.split(",").forEach(activity => {
            const li = document.createElement("li");
            li.textContent = activity.trim();
            activityList.appendChild(li);
        });

        // แสดง Widgets (อุปกรณ์สำนักงาน)
        const widgetsContainer = document.getElementById("widgets");
        dashboardData.widgets.split(",").forEach(widget => {
            const widgetDiv = document.createElement("div");
            widgetDiv.classList.add("widget");
            widgetDiv.innerHTML = `<strong>${widget.split(":")[0]}</strong>: ${widget.split(":")[1]}`;
            widgetsContainer.appendChild(widgetDiv);
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
    }
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


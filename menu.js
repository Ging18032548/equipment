// ดึงองค์ประกอบจาก HTML
const menuToggle = document.getElementById("menuToggle"); // ปุ่มเปิด/ปิดเมนู
const sidebar = document.getElementById("sidebar"); // เมนู Sidebar

// ฟังก์ชันเปิด/ปิด Sidebar
menuToggle.addEventListener("click", function() {
  sidebar.classList.toggle("active"); // เพิ่ม/ลบ class active เพื่อแสดง/ซ่อนเมนู
});

// ฟังก์ชันปิด Sidebar เมื่อคลิกลิงก์
document.querySelectorAll(".sidebar ul li a").forEach(link => {
  link.addEventListener("click", function() {
    sidebar.classList.remove("active"); // ปิดเมนูเมื่อกดลิงก์
  });
});

function goToHomepage() {
    window.location.href = "webpage.html"; // นำผู้ใช้ไปยังหน้า webpage.html
  }
  
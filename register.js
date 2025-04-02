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

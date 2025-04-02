document.addEventListener("DOMContentLoaded", function () {
    // โหลดค่าเริ่มต้นจาก Local Storage (ถ้ามี)
    document.getElementById("username").value = localStorage.getItem("username") || "";
    document.getElementById("email").value = localStorage.getItem("email") || "";
    document.getElementById("darkMode").checked = localStorage.getItem("darkMode") === "true";
    document.getElementById("notifications").checked = localStorage.getItem("notifications") === "true";
});

function saveProfile() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (username && email) {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        alert("Profile updated successfully!");
    } else {
        alert("Please fill in all fields.");
    }
}

function saveSystemSettings() {
    let darkMode = document.getElementById("darkMode").checked;
    let notifications = document.getElementById("notifications").checked;

    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("notifications", notifications);
    alert("System settings saved!");
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        window.location.href = "login.html"; // เปลี่ยนเส้นทางไปหน้า Login
    }
}

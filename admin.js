// // JavaScript for admin dashboard

// // Mock data for the purpose of this example
// const userData = [
//     { username: 'john_doe', email: 'john@example.com', status: 'Active' },
//     { username: 'jane_smith', email: 'jane@example.com', status: 'Inactive' },
//     { username: 'sam_wilson', email: 'sam@example.com', status: 'Active' }
// ];

// document.addEventListener("DOMContentLoaded", () => {
//     // Display user data in the table
//     const userTable = document.querySelector("#userTable tbody");
//     userData.forEach(user => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${user.username}</td>
//             <td>${user.email}</td>
//             <td>${user.status}</td>
//         `;
//         userTable.appendChild(row);
//     });

//     // Update statistics dynamically (mock)
//     const userCount = document.getElementById("userCount");
//     userCount.textContent = userData.length;

//     const usageToday = document.getElementById("usageToday");
//     usageToday.textContent = Math.floor(Math.random() * 100); // Random usage count

//     // Handle logout button
//     const logoutBtn = document.getElementById("logoutBtn");
//     logoutBtn.addEventListener("click", () => {
//         alert("You have been logged out successfully");
//         // Redirect to login page or logout logic
//         window.location.href = "login.html"; // Example redirect
//     });

//     // Handle settings update button
//     const updateSettingsBtn = document.getElementById("updateSettingsBtn");
//     updateSettingsBtn.addEventListener("click", () => {
//         alert("Settings updated successfully");
//         // Add logic to update settings
//     });
// });

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // ดึงจำนวนผู้ใช้ที่ล็อกอิน
        let res = await fetch("http://localhost:8080/users/count");
        let data = await res.json();
        document.getElementById("userCount").innerText = data.count;

        // ดึงข้อมูลเนื้อหาเว็บ
        res = await fetch("http://localhost:8080/content");
        data = await res.json();
        document.getElementById("contentBox").value = data.content;

    } catch (err) {
        console.error("Error:", err);
    }
});

async function saveContent() {
    const content = document.getElementById("contentBox").value;
    const res = await fetch("http://localhost:8080/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    });

    const result = await res.json();
    alert(result.message);
}

function logout() {
    alert("Logging out...");
    window.location.href = "login.html";
}

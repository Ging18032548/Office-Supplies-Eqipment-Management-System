document.addEventListener("DOMContentLoaded", function () {
    const userTable = document.getElementById("user");

    // โหลดข้อมูลจาก API
    fetch("http://localhost:8880/users")
        .then(response => response.json())
        .then(users => {
            userTable.innerHTML = ""; // ล้างข้อมูลเดิม
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.department}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
});

// ฟังก์ชันลบข้อมูล
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`http://localhost:8880/users/${userId}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                location.reload(); // โหลดหน้าใหม่
            })
            .catch(error => console.error("Error deleting user:", error));
    }
}

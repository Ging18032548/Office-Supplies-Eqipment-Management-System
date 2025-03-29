document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");

    // โหลดข้อมูลจาก API
    fetch("http://localhost:8880/equipment")
        .then(response => response.json())
        .then(equipment => {
            tableBody.innerHTML = ""; // ล้างข้อมูลเดิม
            equipment.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.brand}</td>
                    <td>${item.quantity}</td>
                    <td>${item.purchase_date}</td>
                    <td>${item.status}</td>
                    <td>${item.description}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteEquipment(${item.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching equipment:", error));
});

// ฟังก์ชันลบข้อมูล
function deleteEquipment(id) {
    if (confirm("Are you sure you want to delete this equipment?")) {
        fetch(`http://localhost:8880/equipment/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                location.reload(); // โหลดหน้าใหม่
            })
            .catch(error => console.error("Error deleting equipment:", error));
}

// ฟังก์ชันกลับไปหน้า Homepage
function goBack() {
    window.location.href = "webpage.html"; // กลับไปหน้า homepage
}
}


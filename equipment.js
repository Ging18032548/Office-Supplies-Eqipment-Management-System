document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api.php?table=equipment")  // เปลี่ยนเป็น 'equipment'
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("table-body"); // ใช้ ID ที่ถูกต้อง
            tableBody.innerHTML = ""; // เคลียร์ข้อมูลเก่า

            if (data.length > 0) {
                data.forEach(row => {
                    let rowData = "<tr>";
                    Object.values(row).forEach(value => {
                        rowData += `<td>${value}</td>`;
                    });
                    rowData += "</tr>";
                    tableBody.innerHTML += rowData; // เพิ่มข้อมูลลงในตาราง
                });
            } else {
                tableBody.innerHTML = "<tr><td colspan='9'>No data available</td></tr>"; // กรณีไม่มีข้อมูล
            }
        })
        .catch(error => console.error("Error loading equipment data:", error)); // จัดการ error
});

// ฟังก์ชันกลับไปหน้า Homepage
function goBack() {
    window.location.href = "webpage.html"; // กลับไปหน้า homepage
}

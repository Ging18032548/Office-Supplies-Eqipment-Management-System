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

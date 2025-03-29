// document.addEventListener("DOMContentLoaded", function () {
//     const tableBody = document.getElementById("borrow_records");
//     const searchButton = document.querySelector(".search-button");
//     const addButton = document.getElementById("addBtn");
//     const infoMessage = document.getElementById("infoMessage");
    
//     // 📌 ดึงข้อมูลจาก API
//     function fetchBorrowRecords() {
//         axios.get("/borrow_records") // ใช้ URL ที่ถูกต้อง
//             .then(response => {
//                 populateTable(response.data);
//             })
//             .catch(error => console.error("Error fetching data:", error));
//     }
    
//     function populateTable(records) {
//         tableBody.innerHTML = "";
//         records.forEach(record => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${record.Record_ID}</td>
//                 <td>${record.User_ID}</td>
//                 <td>${record.Equipment_ID}</td>
//                 <td>${record.Borrow_Date}</td>
//                 <td>${record.Return_Date}</td>
//                 <td>${record.Status}</td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }
    
//     // 🔍 ค้นหา Record ID
//     searchButton.addEventListener("click", function () {
//         const searchValue = prompt("Enter Record ID:");
//         if (!searchValue) return;
        
//         axios.get(`/borrow_records/${searchValue}`)
//             .then(response => {
//                 if (response.data) {
//                     populateTable([response.data]);
//                     infoMessage.style.display = "block";
//                     setTimeout(() => infoMessage.style.display = "none", 3000);
//                 } else {
//                     alert("Record not found!");
//                 }
//             })
//             .catch(error => console.error("Error searching record:", error));
//     });
    
//     // ➕ เพิ่มข้อมูลใหม่
//     addButton.addEventListener("click", function () {
//         const newRecord = {
//             User_ID: prompt("Enter User ID:"),
//             Equipment_ID: prompt("Enter Equipment ID:"),
//             Borrow_Date: new Date().toISOString().split("T")[0],
//             Return_Date: "Pending",
//             Status: "Borrowed"
//         };

//         axios.post("/borrow_records", newRecord)
//             .then(() => {
//                 fetchBorrowRecords();
//                 alert("✅ Record added successfully!");
//             })
//             .catch(error => console.error("Error adding record:", error));
//     });
    
//     // 🔄 โหลดข้อมูลเริ่มต้น
//     fetchBorrowRecords();
// });

document.addEventListener("DOMContentLoaded", function () {
    const borrowRecordsBody = document.getElementById("borrow-records-body");

    // Fetch borrow records data from API
    fetch("http://localhost:8880/borrow_records") // URL ของ API ที่ดึงข้อมูล
        .then(response => response.json()) // เปลี่ยนข้อมูลที่ได้เป็น JSON
        .then(data => {
            borrowRecordsBody.innerHTML = ""; // Clear existing records

            data.forEach(record => {  // วนลูปข้อมูลที่ได้รับมาและแสดงในตาราง
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.Record_ID}</td>
                    <td>${record.User_ID}</td>
                    <td>${record.Equipment_ID}</td>
                    <td>${record.Borrow_Date}</td>
                    <td>${record.Return_Date}</td>
                    <td>${record.Status}</td>
                `;
                borrowRecordsBody.appendChild(row); // เพิ่มแถวใหม่ลงใน tbody
            });
        })
        .catch(error => {
            console.error("Error fetching borrow records:", error); // ถ้ามีข้อผิดพลาดเกิดขึ้น
        });
});

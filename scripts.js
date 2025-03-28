// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://localhost/equipment/api.php") // เรียก API
//         .then(response => response.json())
//         .then(data => {
//             let tableBody = document.querySelector("#equipment-table tbody");
//             tableBody.innerHTML = ""; // ล้างข้อมูลเก่าก่อนเติมใหม่

//             if (data.length > 0) {
//                 data.forEach(equipment => {
//                     let row = `<tr>
//                         <td>${equipment.equipment_id}</td>
//                         <td>${equipment.name}</td>
//                         <td>${equipment.category}</td>
//                         <td>${equipment.brand}</td>
//                         <td>${equipment.quantity}</td>
//                         <td>${equipment.purchase_date}</td>
//                         <td>${equipment.status}</td>
//                         <td>${equipment.description}</td>
//                     </tr>`;
//                     tableBody.innerHTML += row;
//                 });
//             } else {
//                 tableBody.innerHTML = "<tr><td colspan='8'>No data available</td></tr>";
//             }
//         })
//         .catch(error => console.error("Error fetching data:", error));
// });



document.addEventListener("DOMContentLoaded", function () {
    loadData("equipment"); // โหลดตารางเริ่มต้นเป็น Equipment
});

function loadData(tableName) {
    fetch(`http://localhost/project-folder/api.php?table=${tableName}`)
        .then(response => response.json())
        .then(data => {
            let tableTitle = document.getElementById("table-title");
            let tableHeader = document.getElementById("table-header");
            let tableBody = document.querySelector("#data-table tbody");

            // เปลี่ยนชื่อหัวข้อ
            tableTitle.innerText = tableName.charAt(0).toUpperCase() + tableName.slice(1);

            // ล้างข้อมูลเก่าก่อนเติมใหม่
            tableHeader.innerHTML = "";
            tableBody.innerHTML = "";

            if (data.length > 0) {
                // สร้างหัวข้อคอลัมน์จากคีย์ของ object
                let keys = Object.keys(data[0]);
                keys.forEach(key => {
                    let th = document.createElement("th");
                    th.innerText = key.replace(/_/g, " ").toUpperCase();
                    tableHeader.appendChild(th);
                });

                // แสดงข้อมูลแถวในตาราง
                data.forEach(row => {
                    let tr = document.createElement("tr");
                    keys.forEach(key => {
                        let td = document.createElement("td");
                        td.innerText = row[key];
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                });
            } else {
                tableBody.innerHTML = "<tr><td colspan='8'>No data available</td></tr>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://localhost:8080/api.php?table=equipment")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             let tableBody = document.getElementById("table-body");
//             tableBody.innerHTML = ""; // เคลียร์ข้อมูลเก่า
//             if (data.length > 0) {
//                 data.forEach(row => {
//                     let rowData = "<tr>";
//                     Object.values(row).forEach(value => {
//                         rowData += `<td>${value}</td>`;
//                     });
//                     rowData += "</tr>";
//                     tableBody.innerHTML += rowData;
//                 });
//             } else {
//                 tableBody.innerHTML = "<tr><td colspan='9'>No data available</td></tr>";
//             }
//         })
//         .catch(error => {
//             console.error("Error loading equipment data:", error);
//             document.getElementById("table-body").innerHTML = 
//                 "<tr><td colspan='9' style='color:red;'>Failed to load data</td></tr>";
//         });
// });

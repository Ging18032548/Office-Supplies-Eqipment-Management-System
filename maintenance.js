// ฟังก์ชันที่โหลดข้อมูลจาก API และแสดงในตาราง
document.addEventListener('DOMContentLoaded', function() {
    axios.get('http://localhost:8080/api.php?table=maintenance') // เปลี่ยน URL ให้ตรงกับ API ของคุณ
        .then(function(response) {
            const maintenanceData = response.data; // ข้อมูลที่ได้จาก API
            const maintenanceTableBody = document.getElementById('maintenance'); // tbody ของตาราง

            // ถ้าไม่มีข้อมูลใน API ให้แสดงข้อความ "No data available"
            if (maintenanceData.length === 0) {
                maintenanceTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No data available</td></tr>';
            } else {
                // ลูปข้อมูลและแสดงในตาราง
                maintenanceData.forEach(function(record) {
                    const row = document.createElement('tr');

                    // สร้างแต่ละคอลัมน์ในแถว
                    row.innerHTML = `
                        <td>${record.maintenance_id}</td>
                        <td>${record.equipment_id}</td>
                        <td>${record.maintenance_date}</td>
                        <td>${record.description}</td>
                        <td>${record.cost}</td>
                        <td>${record.repairStatus}</td>
                    `;
                    maintenanceTableBody.appendChild(row); // เพิ่มแถวลงใน tbody
                });
               
                // แสดงข้อความว่าเจอข้อมูล
                // document.getElementById('infoMessage').style.display = 'block';
            }
        })
        .catch(function(error) {
            console.error("Error fetching data: ", error);
        });
});


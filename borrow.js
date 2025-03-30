document.addEventListener("DOMContentLoaded", function() {
    // ดึงข้อมูลจาก API
    axios.get('get_borrow_records.php')
        .then(function(response) {
            const borrowRecords = response.data;
            const tbody = document.getElementById('borrow-records-body');
            tbody.innerHTML = ""; // เคลียร์ข้อมูลเก่าออก

            borrowRecords.forEach(function(record) {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${record.borrow_id}</td>
                    <td>${record.equipment_id}</td>
                    <td>${record.user_id}</td>
                    <td>${record.borrow_date}</td>
                    <td>${record.return_date}</td>
                    <td>${record.status}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error('Error fetching borrow records:', error);
        });
});

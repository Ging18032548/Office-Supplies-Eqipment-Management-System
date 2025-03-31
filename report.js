document.addEventListener("DOMContentLoaded", function () {
    loadReports();
});

function loadReports() {
    axios.get("http://localhost:8080/api/reports")
        .then(response => {
            const reports = response.data;
            const reportTableBody = document.getElementById("report-body");
            reportTableBody.innerHTML = "";

            if (reports.length === 0) {
                reportTableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>No reports available</td></tr>";
            } else {
                reports.forEach(report => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${report.report_id}</td>
                        <td>${report.report_name}</td>
                        <td>${report.report_type}</td>
                        <td>${report.created_date}</td>
                        <td>${report.modified_date || "Not Modified"}</td>
                        <td>
                            <button onclick="editReport(${report.report_id})">Edit</button>
                            <button onclick="deleteReport(${report.report_id})">Delete</button>
                        </td>
                    `;
                    reportTableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error("Error loading reports:", error));
}

function editReport(reportId) {
    alert(`Edit Report: ${reportId}`);
}

function deleteReport(reportId) {
    if (confirm("Are you sure you want to delete this report?")) {
        axios.delete(`http://localhost:8080/api/reports/${reportId}`)
            .then(() => {
                alert("Report deleted successfully");
                loadReports();
            })
            .catch(error => console.error("Error deleting report:", error));
    }
}

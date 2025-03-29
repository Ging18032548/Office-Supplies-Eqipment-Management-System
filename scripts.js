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

//path: login.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // ป้องกันไม่ให้หน้าเว็บรีเฟรช

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ตรวจสอบว่า username และ password ไม่ว่าง
    if (username === "" || password === "") {
        document.getElementById("errorMessage").textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
    }

    // สมมติว่า username และ password ถูกต้อง (แทนที่ด้วยการตรวจสอบฐานข้อมูลจริงในภายหลัง)
    if (username === "admin" && password === "1234") {
        window.location.href = "webpage.html";  // เปลี่ยนไปยังหน้า webpage.html
    } else {
        document.getElementById("errorMessage").textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    }
});


//path: register.js เชื่อมต่อการสมัครสมาชิก
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันหน้ารีเฟรช

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วน
    if (!fullname || !email || !username || !password || !confirmPassword) {
        errorMessage.textContent = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        return;
    }

    // ตรวจสอบว่ารหัสผ่านตรงกัน
    if (password !== confirmPassword) {
        errorMessage.textContent = "รหัสผ่านไม่ตรงกัน";
        return;
    }

    // จำลองการสมัครสำเร็จ และนำไปยังหน้า Welcome
    localStorage.setItem("registeredUser", JSON.stringify({ fullname, email, username }));
    window.location.href = "welcome.html"; // เมื่อสมัครเสร็จให้ไปยังหน้า Welcome
});

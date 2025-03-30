// Function to load user data from the database
function loadUserData() {
    axios.get('http://localhost:8080/index.php?route=/sql&pos=0&db=webdb&table=user')
        .then(response => {
            const users = response.data;
            const userTableBody = document.getElementById('user-body'); // Updated to user-body

            // Clear previous rows
            userTableBody.innerHTML = '';

            // Check if there is any data
            if (users.length > 0) {
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.user_id}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.department}</td>
                        <td>${user.role}</td>
                    `;
                    userTableBody.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="9">No data available</td>';
                userTableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Function to search user by username
function searchUser() {
    const searchTerm = document.getElementById('search').value.toLowerCase(); // Updated to 'search'
    const userTableBody = document.getElementById('user-body'); // Updated to user-body
    const rows = userTableBody.getElementsByTagName('tr');
    let found = false;

    // Loop through all rows and hide/show based on the search term
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const username = cells[1]?.textContent.toLowerCase();

        if (username && username.includes(searchTerm)) {
            rows[i].style.display = ''; // Show row if matches
            found = true;
        } else {
            rows[i].style.display = 'none'; // Hide row if doesn't match
        }
    }

    // Show or hide the search message based on the search result
    const searchMessage = document.getElementById('infoMessage'); // Updated to infoMessage
    if (found) {
        searchMessage.style.display = 'none'; // Hide message if found
    } else {
        searchMessage.style.display = 'block'; // Show message if not found
    }
}

// Load user data when the page is loaded
window.onload = loadUserData;

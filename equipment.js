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

// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://localhost:8080/api/equipment")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             let tableBody = document.getElementById("table-body");
//             tableBody.innerHTML = ""; // Clear old data

//             if (data.length > 0) {
//                 data.forEach(row => {
//                     let rowData = document.createElement("tr"); // Create a new row
//                     Object.values(row).forEach((value, index) => {
//                         let cell = document.createElement("td"); // Create a new cell
//                         cell.textContent = value; // Set cell data
//                         rowData.appendChild(cell); // Append cell to row

//                         // Add Edit and Delete buttons in the last column
//                         if (index === Object.keys(row).length - 1) {
//                             let editButton = document.createElement("button");
//                             editButton.textContent = "Edit";
//                             editButton.classList.add("edit");
//                             editButton.setAttribute("data-id", row.id);

//                             let deleteButton = document.createElement("button");
//                             deleteButton.textContent = "Delete";
//                             deleteButton.classList.add("delete");
//                             deleteButton.setAttribute("data-id", row.id);

//                             let actionsCell = document.createElement("td");
//                             actionsCell.appendChild(editButton);
//                             actionsCell.appendChild(deleteButton);
//                             rowData.appendChild(actionsCell);
//                         }
//                     });
//                     tableBody.appendChild(rowData); // Append row to table
//                 });
//             } else {
//                 let noDataRow = document.createElement("tr"); // Create a row for "No data"
//                 let noDataCell = document.createElement("td");
//                 noDataCell.colSpan = 10; // Span all columns
//                 noDataCell.textContent = "No data available"; // Display message
//                 noDataRow.appendChild(noDataCell); // Append cell to row
//                 tableBody.appendChild(noDataRow); // Append row to table
//             }
//         })
//         .catch(error => {
//             console.error("Error loading equipment data:", error);
//             document.getElementById("table-body").innerHTML = 
//                 "<tr><td colspan='10' style='color:red;'>Failed to load data</td></tr>";
//         });

//     attachEventListeners(); // Attach event listeners for Edit and Delete buttons
// });

// const attachEventListeners = () => {
//     // Edit button functionality
//     document.querySelectorAll('.edit').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const row = event.target.closest('tr'); // Locate the row
//             const cells = row.getElementsByTagName('td');
            
//             // Example: Populate form fields with existing data
//             // Here you can add your form for editing
//             document.getElementById('inputName').value = cells[1].textContent; // Name column
//             document.getElementById('inputCategory').value = cells[2].textContent; // Category column

//             // Optionally display the form for editing
//             document.getElementById('editForm').style.display = 'block';
//         });
//     });

//     // Delete button functionality
//     document.querySelectorAll('.delete').forEach(button => {
//         button.addEventListener('click', async (event) => {
//             const confirmDelete = confirm('Are you sure you want to delete this equipment?');
//             if (confirmDelete) {
//                 const equipmentId = event.target.getAttribute('data-id');
//                 try {
//                     await fetch(`http://localhost:8080/api/equipment/${equipmentId}`, {
//                         method: 'DELETE',
//                     });
//                     const row = event.target.closest('tr');
//                     row.remove(); // Remove the row from the table
//                 } catch (error) {
//                     console.error('Error deleting equipment:', error);
//                     alert('An error occurred while deleting the equipment.');
//                 }
//             }
//         });
//     });
// };

const express = require('express');
const router = express.Router();
const dbConnect = require('../db');

router.post('/', async (req, res) => {
    const { name, category, status } = req.body;
    try {
        const conn = await dbConnect();
        const sql = "INSERT INTO equipment (name, category, status) VALUES (?, ?, ?)";
        const [result] = await conn.execute(sql, [name, category, status]);
        res.json({ message: "Equipment added!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error adding equipment: ' + err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const conn = await dbConnect();
        const [rows] = await conn.execute('SELECT * FROM equipment');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching equipment: ' + err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { name, category, status } = req.body;
    try {
        const conn = await dbConnect();
        const sql = "UPDATE equipment SET name=?, category=?, status=? WHERE id=?";
        await conn.execute(sql, [name, category, status, req.params.id]);
        res.json({ message: "Equipment updated!" });
    } catch (err) {
        res.status(500).json({ error: 'Error updating equipment: ' + err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const conn = await dbConnect();
        const sql = "DELETE FROM equipment WHERE id=?";
        await conn.execute(sql, [req.params.id]);
        res.json({ message: "Equipment deleted!" });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting equipment: ' + err.message });
    }
});

module.exports = router;

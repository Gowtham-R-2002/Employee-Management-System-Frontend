$(document).ready(function () {
    $("#search").click(function () {
        let id = $("#id").val();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/employee/get/" + id,
            dataType: "JSON",
            success: function (employee) {
                console.log(employee)
                let table = "<table class='table table-dark table-striped table-bordered'>"
                    + "<thead>"
                    + "<tr>"
                    + "<th> ID </th>"
                    + "<th> Name </th>"
                    + "<th> DOB </th>"
                    + "<th> Phone Number </th>"
                    + "<th> Department </th>"
                    + "<th> Address </th>"
                    + "<th> Options </th>"
                    + "</thead>"

                let address = employee.doorNumber + " " + employee.locality + " " + employee.city;
                let employeeDetails = "<tbody>"
                    + "<tr>"
                    + `<td> ${employee.id} </td>`
                    + `<td> ${employee.name} </td>`
                    + `<td> ${employee.dateOfBirth} </td>`
                    + `<td> ${employee.phoneNumber} </td>`
                    + `<td> ${employee.departmentName} </td>`
                    + `<td> ${address} </td>`
                    + `<td> <button class="btn btn-warning"><a href = "update_employee.html?id=${employee.id}">Edit <i class="fa-solid fa-pen"></i></a></button>
                    <button class="btn btn-danger" id="delete-btn" onClick = "deleteEmployee(${employee.id})">Delete <i class="fa-solid fa-trash-can"></i></button></td>`
                    + "</tr>";
                table += employeeDetails;
                table += "</tbody></table>";
                $("#answer-div").append(table);

                let certificatesTable = "<table class='table table-dark table-striped table-bordered'>"
                    + "<thead>"
                    + "<tr>"
                    + "<th> Certificates </th>"
                    + "</thead>"

                let certificates = "";
                employee.certificates.forEach(certificate => {
                    certificates += certificate.name + ",";
                });

                let certificatesRow = "<tbody>"
                    + "<tr>"
                    + `<td> ${certificates} </td>`
                    + "</tr>"
                    + "</tbody></table>"

                certificatesTable += certificatesRow
                $("#answer-div").append(certificatesTable);

            }, error: function () {
                let errorMessage = `<div class="error-message"> No Employees Found! </div>`;
                $("#answer-div").append(errorMessage);
            }
        });
    });
});

function deleteEmployee(id) {
    if (confirm("Are you sure to delete?")) {
        $.ajax({
            url: "http://localhost:8080/employee/delete/" + id,
            type: "PUT",
            dataType: "JSON",
            success: function (response) {
                alert("Data deleted successfully !");
                location.reload();
            }, error: function () {
                alert("Deletion failed!");
            }
        });
    }
};
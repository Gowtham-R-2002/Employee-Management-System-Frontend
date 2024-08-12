$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/employees",
        dataType: "json",
        success: function (response) {
            console.log(response)
            let table = "<table class='table table-dark table-striped table-bordered'>"
                + "<thead>"
                + "<tr>"
                + "<th> ID </th>"
                + "<th> Name </th>"
                + "<th> Age </th>"
                + "<th> Phone Number </th>"
                + "<th> Department </th>"
                + "<th> Address </th>"
                + "<th> Options </th>"
                + "</thead>"

            response.forEach(employee => {
                let address = employee.doorNumber + " " + employee.locality + " " + employee.city;
                let employeeDetails = "<tbody>"
                    + "<tr>"
                    + `<td> ${employee.id} </td>`
                    + `<td> ${employee.name} </td>`
                    + `<td> ${employee.age} </td>`
                    + `<td> ${employee.phoneNumber} </td>`
                    + `<td> ${employee.departmentName} </td>`
                    + `<td> ${address} </td>`
                    + `<td> <button class="btn btn-warning"><a href = "update_employee.html?id=${employee.id}">Edit <i class="fa-solid fa-pen"></i></a></button>
                    <button class="btn btn-danger" id="delete-btn" onClick = "deleteEmployee(${employee.id})">Delete <i class="fa-solid fa-trash-can"></i></button></td>`
                    + "</tr>";
                table += employeeDetails;
            })
            table += "</tbody></table>";
            console.log(table);
            $("#answer-div").append(table);
        }
    });
});

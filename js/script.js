$(document).ready(function () {
    $("#get-employees").click(function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/employee/getAll",
            dataType: "json",
            success: function (response) {
                console.log(response)
                let table = "<table class='table'>"
                    + "<thead>"
                    + "<tr>"
                    + "<th> ID </th>"
                    + "<th> Name </th>"
                    + "<th> DOB </th>"
                    + "<th> Phone Number </th>"
                    + "<th> Department </th>"
                    + "<th> Address </th>"
                    + "</thead>"

                response.forEach(employee => {
                    let address = employee.doorNumber + " " + employee.locality + " " + employee.city;
                    let employeeDetails = "<tbody>"
                    + "<tr>"
                    + `<td> ${employee.id} </td>`
                    + `<td> ${employee.name} </td>`
                    + `<td> ${employee.dateOfBirth} </td>`
                    + `<td> ${employee.phoneNumber} </td>`
                    + `<td> ${employee.departmentName} </td>`
                    + `<td> ${address} </td>`
                    + "</tr>";
                    table += employeeDetails;
                })
                table += "</tbody></table>";
                console.log(table);
                $("#answer-div").append(table);
            }
        });
    });
});
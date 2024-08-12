$(document).ready(function () {
    $("#search").click(function () {
        let id = $("#id").val();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/v1/employees/" + id,
            dataType: "JSON",
            success: function (employee, xhr) {
                $(".table").remove();
                console.log(employee)
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
                table += "</tbody></table>";
                $("#answer-div").append(table);

                let certificatesTable = "<table class='table table-dark table-striped table-bordered'>"
                    + "<thead>"
                    + "<tr>"
                    + "<th> Certificates </th>"
                    + "</thead>"

                let certificates = "";
                employee.certificates.forEach(certificate => {
                    certificates += certificate.name + ", ";
                });

                if (certificates === "") {
                    certificates += "No Certificates found !"
                } else {
                    certificates = certificates.slice(0, -2)
                }

                let certificatesRow = "<tbody>"
                    + "<tr>"
                    + `<td> ${certificates} </td>`
                    + "</tr>"
                    + "</tbody></table>"

                certificatesTable += certificatesRow
                $("#answer-div").append(certificatesTable);

            }, error: function (xhr) {
                if (xhr.status === 404) {
                    $(".table").remove();
                    let errorMessage = `<div class="error-message"> No Employees Found! </div>`;
                    $("#answer-div").append(errorMessage);
                } else if (xhr.status === 500) {
                    let errorMessage = `<div class="error-message"> Server error !</div>`;
                    $("#answer-div").append(errorMessage);
                }
            }
        });
    });
});

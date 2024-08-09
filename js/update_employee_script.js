let searchParams = new URLSearchParams(window.location.search)
    let id = searchParams.get('id')
    console.log(id);
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/department/getAll",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            let departments = ""
            response.forEach(department => {
                departments += `<option id=${department.id} value=${department.name}>${department.name}</option>`
            });
            console.log(departments);
            $("#departments").append(departments);
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employee/get/" + id,
        dataType: "JSON",
        success: function (employee) {
            console.lo
            $("#name").val(employee.name);
            let dateOfBirth = employee.dateOfBirth.split("/").reverse().join("-");
            $("#dob").val(dateOfBirth);
            $("#phone_number").val(employee.phoneNumber);
            $("#departments option[id=" + employee.departmentId + "]").prop("selected", true);
            $("#door_number").val(employee.doorNumber);
            $("#locality").val(employee.locality);
            $("#city").val(employee.city);
        }
    });
});

$("#submit").click(function () {
    let name = $("#name").val();
    let dateOfBirth = $("#dob").val();
    dateOfBirth =dateOfBirth.split("-").reverse().join("/");
    let phoneNumber = $("#phone_number").val();
    let departmentId = $("#departments").find('option:selected').attr('id');
    let doorNumber = $("#door_number").val();
    let locality = $("#locality").val();
    let city = $("#city").val();
    let employee = {name : name, dateOfBirth : dateOfBirth, phoneNumber : phoneNumber,
        departmentId : departmentId, doorNumber : doorNumber, locality : locality,
        city :city
    }
    console.log(JSON.stringify(employee));
    if (null !== name && dateOfBirth !== null && /^\d+$/.test(phoneNumber) && null !== departmentId
        && null !== doorNumber && null !== locality && null !== city) {
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/employee/update/" + id,
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                alert("Employee updated Successful !")
                window.location.replace("/")
            }, error: function () { 
                alert("Employee add failed!")
             }
        });
    } else {
        alert("Enter valid inputs !");
    }
});
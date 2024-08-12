let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get('id')
console.log(id);
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/departments",
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
        url: "http://localhost:8080/api/v1/employees/" + id,
        dataType: "JSON",
        success: function (employee) {
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
    dateOfBirth = dateOfBirth.split("-").reverse().join("/");
    let phoneNumber = $("#phone_number").val();
    let departmentId = $("#departments").find('option:selected').attr('id');
    let doorNumber = $("#door_number").val();
    let locality = $("#locality").val();
    let city = $("#city").val();
    if (/^[a-zA-Z ]+$/.test(name) && /^[a-zA-Z ]+$/.test(city) && /^\d+$/.test(phoneNumber)) {
        let employee = {
            id: id, name: name, dateOfBirth: dateOfBirth, phoneNumber: phoneNumber,
            departmentId: departmentId, doorNumber: doorNumber, locality: locality,
            city: city
        }
        console.log(JSON.stringify(employee));
        if (null !== name && dateOfBirth !== null && null !== phoneNumber && null !== departmentId
            && null !== doorNumber && null !== locality && null !== city) {
            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/api/v1/employees",
                data: JSON.stringify(employee),
                contentType: "application/json; charset=utf-8",
                success: function () {
                    alert("Employee updated Successful !")
                    window.location.replace("/")
                }, error: function (xhr) {
                    if (xhr.status === 409) {
                        alert("Employee with similar data entered already exists!")
                    } else {
                        alert("Employee add failed!")
                    }
                }
            });
        }
    } else {
        alert("Enter valid inputs !");
    }
});
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
            if(departments === "") {
                alert("Add a department first!")
                window.location.replace("/")
            }
            $("#departments").append(departments);
        }
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
                name: name, dateOfBirth: dateOfBirth, phoneNumber: phoneNumber,
                departmentId: departmentId, doorNumber: doorNumber, locality: locality,
                city: city
            }
            console.log(JSON.stringify(employee));
            if (null !== name && dateOfBirth !== null && null !== (phoneNumber) && null !== departmentId
                && null !== doorNumber && null !== locality && null !== city) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/v1/employees",
                    data: JSON.stringify(employee),
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        alert("Employee added Successful !")
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
});


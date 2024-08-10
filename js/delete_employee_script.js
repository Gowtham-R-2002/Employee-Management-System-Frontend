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
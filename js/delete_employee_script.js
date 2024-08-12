function deleteEmployee(id) {
    if (confirm("Are you sure to delete?")) {
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/delete/" + id,
            type: "DELETE",
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
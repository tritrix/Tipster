 $("input[type=submit]").click(function() {
   $.ajax({
     url: "",
     type: "POST",
     contentType: "application/json;charset=utf-8",
     data: JSON.stringify({
       UserName: $("input[placeholder=Username]").val(),
       Password: $("input[placeholder=Password]").val()
     }),
     success: function(response) {
       alert("success");
     },
     error: function(e) {
       alert("error");
     }
   });
 });
//create enclica account jquery 
var $ = require('jquery');
var swal = require('sweetalert');

function register() {
    //jquery ajax request account creaton at enclica.com/api/user/signup POST
    $.post('https://enclica.com/api/user/signup/', {
        username: $('#username').val(),
        password: $('#password').val(),
        confirm_password: $('#password_confirm').val(),
        email: $('#email').val(),
    }).done(function(data) {

        console.log(data);

        if (data.data.email_err) {
            swal("Error", data.data.email_err, "error");
        } else if (data.data.username_err) {
            swal("Error", data.data.username_err, "error");
        } else if (data.data.password_err) {
            swal("Error", data.data.password_err, "error");
        } else if (data.data.confirm_password_err) {
            swal("Error", data.data.confirm_password_err, "error");
        }

        if (!data.error && !data.data.email_err && !data.data.username_err && !data.data.password_err && !data.data.password_confirm_err) {
            swal("Success", "Account created you can now exit this window.", "success");
        }
        if (data.error == false) {
            swal("Success", "Account created you can now exit this window.", "success");
        }
    });
}

$('#register').on('submit', function(e) {
    e.preventDefault();
    register();
});

$('#registerbtn').on('click', function(e) {
    e.preventDefault();
    register();
})
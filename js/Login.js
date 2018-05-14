class Login {
    checkLoginAdmin(name, pass, checked) {
        if (name == 'admin' && pass == '123' && checked == 'on') return true;
        return false;
    }

    logoutAdmin(event) {
        event.preventDefault();

        $('#log-in').show();
        $('#admin-content').hide();

        $('#admin-name').val('');
        $('#admin-password').val('');
        $('#check-box-login')[0].checked = false;
        swal("Logged out!", "You have logged out admin page!", "success");
    }

    loginAdmin(event) {
        event.preventDefault();

        let adminName = $('#admin-name').val();
        let adminPassword = $('#admin-password').val();
        let checked = $('#check-box-login').val();
        console.log(checked);

        if (this.checkLoginAdmin(adminName, adminPassword, checked)) {
            swal("Logged in!", "You have logged in admin page!", "success");
            $('#log-in').hide();
            $('#admin-content').show();
        } else {
            swal("Not Logged in!", "You should check again!", "error");
        }
    }

}
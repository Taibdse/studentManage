$(function () {
    let login = new Login();

    $('#log-in').show();
    $('#admin-content').hide();

    $('#submit-login-admin').on('click', login.loginAdmin.bind(login));
    $('.logout-link').on('click', login.logoutAdmin.bind(login));

    $('.statistic-component').hide();

    let studentManagement = new StudentManagement();

    $('.home-link').on('click', e => {
        e.preventDefault();

        $('.home-component').show();
        $('.statistic-component').hide();
    })

    $('.statistic-link').on('click', e => {
        e.preventDefault();

        $('.home-component').hide();
        $('.statistic-component').show();
        studentManagement.drawChart();
    })

    $('.go-to-top-page').on('click', () => {
        $('body, html').animate({
            'scrollTop': 0
        });
    })

    const arrYears = Student.getYears();
    arrYears.forEach(year => {
        $('#school-year').append(
            `
            <option value = "${year}">${year}</option>
            `
        )
    })

    const arrCates = Student.getCateArr();
    $('#category-search').append(`<option value = "all">all</option>`)
    arrCates.forEach(cate => {
        $('#category-search').append(`<option value = "${cate}">${cate}</option>`)
    })


    $('#add-student').on('click', studentManagement.addAndUpdate.bind(studentManagement));

    $('#category-search').on('change', studentManagement.filterCate.bind(studentManagement))

    $('#name-search').on('keyup', studentManagement.filterName.bind(studentManagement));

})






class StudentManagement {

    constructor() {
        this.addNew = true; //check whether user add or update
        this.studentArr = [];

        this.initData(); //init data into student array

    };

    initData() {
        let self = this;
        const url = 'http://5ac20b98cb6ba300142578ad.mockapi.io/students';

        $.ajax({
            url: url,
            type: 'GET'
        }).done(function (data) {
            self.studentArr = data.map(student => Student.getStudent(student))

            self.loadStudentToView(self.studentArr); //update view from student array data
        })
    }

    addAndUpdate() {

        let id = $('#id').val();
        let name = $('#name').val();
        let schoolYear = $('#school-year').val();
        let math = $('#math').val();
        let physics = $('#physics').val();
        let chemistry = $('#chemistry').val();

        if (this.checkValidate()) {
            if (this.addNew) {
                if (this.checkDuplicatedID(id)) {
                    let student = new Student(id, name, schoolYear, parseFloat(math), parseFloat(physics),
                        parseFloat(chemistry));

                    swal("Add successfully", "Have added 1 student with ID: " + id, "success");

                    this.studentArr.unshift(student);
                    this.resetInfo();

                } else {
                    swal("Duplicated ID!", "Change your input ID now", "error");
                }
            } else {
                let student = this.studentArr.find(student => id == student.id);
                student.name = name;
                student.schoolYear = schoolYear;
                student.math = parseFloat(math);
                student.physics = parseFloat(physics);
                student.chemistry = parseFloat(chemistry);

                this.resetInfo();
                this.addNew = true;
                swal("Updated successfully!", "Have updated student with ID : " + id, "success");
            }
            this.loadStudentToView(this.studentArr);
        }
    }

    deleteStudent() {
        let id = event.target.dataset.id;
        let self = this;
        swal({
                title: "Are you sure?",
                text: "Once deleted, you can not recover data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

                    swal("You have deleted student with ID: " + id, {
                        icon: "success",
                    });

                    let index = this.studentArr.findIndex(student => student.id == id);
                    this.studentArr.splice(index, 1);
                    this.loadStudentToView(this.studentArr);
                    this.resetInfo();
                    this.addNew = true;
                } else {
                    swal("Not deleted!");
                }
            });
    }

    loadStudentToView(studentsList) {
        const self = this;
        $('.home-component').find('table').remove();

        if (studentsList.length > 0) {

            let table = $('<table class = "table table-striped table-hover text-center text-capitalize"></table>');
            let tbody = $('<tbody></tbody>');
            let thead = $('<thead></thead>');

            table.append(thead).append(tbody);

            thead.append(
                `
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Math</th>
                        <th>Physics</th>
                        <th>Chemistry</th>
                        <th>Avg Score</th>
                        <th>Category<th>
                        <th></th>
                    </tr>
                `
            )

            studentsList.forEach(student => {
                tbody.append(
                    ` 
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.math}</td>
                            <td>${student.physics}</td>
                            <td>${student.chemistry}</td>
                            <td>${student.calAvgScore().toFixed(2)}</td>
                            <td>${student.getCategory()}</td>
                            <td>
                                <button class = "delete btn btn-danger" data-id = "${student.id}" >Delete</button>
                                <button class = "update btn btn-success" data-id = "${student.id}">Update</button>
                            </td>
                        </tr>
                    `
                )
            })

            $('.home-component').append(table);


            $('.home-component').find('table').find('button.delete').click(self.deleteStudent.bind(self));

            $('.home-component').find('table').find('button.update').click(self.update.bind(self));

            $('.home-component').find('table thead th').click(self.sort.bind(self));
        }
    }

    update() {

        $('body, html').animate({
            'scrollTop': 0
        });

        this.addNew = false;

        $('#add-student').text('Update student');
        let id = event.target.dataset.id;
        let student = this.studentArr.find(student => student.id == id)

        $('#id').val(student.id).attr({
            'disabled': 'disabled'
        });
        $('#name').val(student.name);
        $('#school-year').val(student.schoolYear);
        $('#math').val(student.math);
        $('#chemistry').val(student.chemistry);
        $('#physics').val(student.physics);
    }

    resetInfo() {
        $('#id').val('').attr({
            'disabled': false
        });
        $('#name').val('');
        $('#school-year').val('');
        $('#math').val('');
        $('#chemistry').val('');
        $('#physics').val('');

        $('#add-student').text('Add student');
    }

    checkValidate() {
        let id = $('#id').val();
        let name = $('#name').val();
        let schoolYear = $('#school-year').val();
        let math = $('#math').val();
        let physics = $('#physics').val();
        let chemistry = $('#chemistry').val();

        let check = true;
        let errMsg = '';

        if (!Validation.validateID(id)) {
            check = false;
            errMsg += 'ID must be SEx ( x is any number)\n';
        }

        if (!Validation.validateName(name)) {
            check = false;
            errMsg += 'Name cannot be blank\n';
        }

        if (!Validation.validateSchoolYear(schoolYear)) {
            errMsg += "School year is not selected\n";
        }

        if (!Validation.validateScore(math)) {
            check = false;
            errMsg += 'Math score must be form 0 - 10\n';
        }

        if (!Validation.validateScore(physics)) {
            check = false;
            errMsg += 'Physics score must be form 0 - 10\n';
        }

        if (!Validation.validateScore(chemistry)) {
            check = false;
            errMsg += 'Chemistry score must be form 0 - 10\n';
        }

        if (!check) {
            swal("Error data", errMsg, "error");
        }
        return check;
    }

    checkDuplicatedID(id) {
        let checkExisted = this.studentArr.some(student => student.id == id);
        return !checkExisted;
    }

    filterCate() {
        let cate = $('#category-search').val();
        if (cate == 'all') this.loadStudentToView(this.studentArr);
        else {
            let filtered = this.studentArr.filter(student => student.getCategory() == cate);
            this.loadStudentToView(filtered);
        }
    }

    filterName() {
        let name = $('#name-search').val();

        if (name == undefined) this.loadStudentToView(this.studentArr);
        else {
            let filtered = this.studentArr.filter(student => this.findMatching(student.name, name));
            this.loadStudentToView(filtered);
        }
    }

    sort() {
        let subject = $(event.target).text().toLowerCase();

        if (subject == 'math') {
            this.studentArr.sort((a, b) => a.math - b.math);
        }
        if (subject == 'physics') {
            this.studentArr.sort((a, b) => a.physics - b.physics);
        }
        if (subject == 'chemistry') {
            this.studentArr.sort((a, b) => a.chemistry - b.chemistry);
        }
        if (subject == 'avg score') {
            this.studentArr.sort((a, b) => a.calAvgScore() - b.calAvgScore());
        }
        if (subject == 'name') {
            this.studentArr.sort((a, b) => a.name > b.name ? 1 : -1);
        }

        this.loadStudentToView(this.studentArr);
    }

    calcPercentOfCates() {
        let objNumOfCates = this.studentArr.reduce((acc, student) => {
            let cate = student.getCategory();

            if (!acc[cate]) acc[cate] = 0;
            acc[cate]++;

            return acc;
        }, {});

        let total = this.studentArr.length;
        let data = []
        for (let prop in objNumOfCates) {
            let percent = (objNumOfCates[prop] / total * 100).toFixed(2)
            if (prop == 'excellent') data[0] = parseFloat(percent);
            if (prop == 'good') data[1] = parseFloat(percent);
            if (prop == 'fair') data[2] = parseFloat(percent);
            if (prop == 'average') data[3] = parseFloat(percent);
            if (prop == 'poor') data[4] = parseFloat(percent);
        }

        return data;
    }

    drawChart() {
        $('#chart').html('');

        var ctx = $('#chart')[0].getContext('2d');
        let self = this;

        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Student.getCateArr(),
                datasets: [{
                    label: 'Category percent',
                    data: self.calcPercentOfCates(),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: '#9aa7bc',
                        fontSize: 20
                    }
                },
                title: {
                    fontSize: 200
                }
            }
        });
    }

    findMatching(value_1, value_2) {
        value_1 = value_1.replace(/ /g, '').toLowerCase();
        value_2 = value_2.toLowerCase();

        let indexArr = [];
        let check = true;
        value_2.split('').forEach((letter, index) => {

            if (index != 0) {
                let x = value_1.indexOf(letter, indexArr[index - 1]);
                if (x == -1) check = false;
                else indexArr.push(x);
            } else if (index == 0) {
                let x = value_1.indexOf(letter);
                if (x == -1) check = false;
                else indexArr.push(x);
            }
            
        })

        return check;
    }
}
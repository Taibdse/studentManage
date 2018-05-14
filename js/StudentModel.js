class Student {

    constructor(id, name, schoolYear, math, chemistry, physics, ) {
        this.id = id;
        this.name = name;
        this.math = math;
        this.chemistry = chemistry;
        this.physics = physics;
        this.schoolYear = schoolYear;
    }

    static getStudent(student) {

        let id = student.id;
        let name = student.name;
        let schoolYear = student.schoolYear;
        let math = student.math;
        let chemistry = student.chemistry;
        let physics = student.physics;

        return new Student(id, name, schoolYear, math, chemistry, physics)
    }

    static getYears() {
        let curYear = new Date().getFullYear();
        let arrYears = [];
        for (let i = 2007; i <= curYear; i++) {
            arrYears.push(i);
        }
        return arrYears;
    }

    calAvgScore() {
        return (this.math + this.physics + this.chemistry) / 3;
    }

    getCategory() {
        let avgScore = this.calAvgScore();
        if (avgScore >= 9) return 'excellent';
        if (avgScore >= 8) return 'good';
        if (avgScore >= 6.5) return 'fair';
        if (avgScore >= 5) return 'average';
        return 'poor';
    }

    static getCateArr(){
        return ['excellent', 'good', 'fair', 'average', 'poor'];
    }

}
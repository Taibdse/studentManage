class Validation {

    static validateScore(score) {
        if (!/^[0-9]+([.][0-9]+)?$/.test(score)) return false;
        else if (parseFloat(score) > 10) return false;
        return true;
    }

    static validateName(name) {
        if (name == undefined) return false;
        else if (name.trim() == '') return false;
        return true;
    }

    static validateID(id) {
        if (!/^[S][E][0-9]+$/.test(id)) return false;
        return true;
    }

    static validateSchoolYear(year) {
        if (year == undefined) return false;
        return true;
    }
}
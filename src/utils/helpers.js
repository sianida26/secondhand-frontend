
//Untuk mengubah number menjadi formatted string
//Contoh:
//formatRupiah(20000)
//Output: "Rp 20.000"
export const formatRupiah = angka => "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Untuk mengubah string menjadi title case
export const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

//Validator
export class Validator{

    static rules = {
        array: (errorMsg) => ({
            test: (value) => Array.isArray(value),
            errorMsg: errorMsg || 'Harus berupa array'
        }),
        inArray: (array, errorMsg) => ({
            test: (value) => {
                if (!Array.isArray(array)) throw new Error("array parameter must be an array!");
                return array.includes(value);
            },
            errorMsg: errorMsg || 'Item tidak sesuai'
        }),
        max: (max, errorMsg) => ({
            test: (value) => typeof value === "number" ? value <= max : typeof value === "string" || Array.isArray(value) ? value.length <= max : false,
            errorMsg: errorMsg || `Nilai harus kurang dari ${ max }`
        }),
        min: (min, errorMsg) => ({
            test: (value) => typeof value === "number" ? value >= min : typeof value === "string" || Array.isArray(value) ? value.length >= min : false,
            errorMsg: errorMsg || `Nilai harus lebih dari ${ min }`
        }),
        number: (errorMsg) => ({
            test: (value) => !(isNaN(value) || isNaN(parseFloat(value))),
            errorMsg: errorMsg || 'Harus berupa angka',
        }),
        required: (errorMsg) => ({
            test: (value) => value === 0 || !!value,
            errorMsg: errorMsg || 'Harus diisi',
        })
    }

    #errors = {}
    
    constructor(data, givenRules){
        this.data = data;
        this.givenRules = givenRules;
        this.#validate()
    }

    #validate(){
        Object.entries(this.givenRules)
            .forEach(([ key, rules ]) => {
                if (!Array.isArray(rules)) throw new Error("Rule must be an array!");
                rules.forEach((rule) => {
                    try {

                        if (!rule.test(this.data[key])){
                            //if invalid
                            this.#errors[key] = this.#errors[key] ? [ ...this.#errors[key], rule.errorMsg] : [rule.errorMsg]
                            return false;
                        }
                    } catch (_){
                        //Any exception
                        this.#errors[key] = this.#errors[key] ? [ ...this.#errors[key], rule.errorMsg] : [rule.errorMsg]
                        return false;
                    }
                })
            })
    }

    fails(){
        return Object.keys(this.#errors).length !== 0;
    }

    ok(){
        return !this.fails();
    }

    getErrors(onlyFirstItem){
        return onlyFirstItem ? Object.entries(this.#errors)
                .reduce((prev, [ k, v ]) => ({ ...prev, [k]: v[0] }),{})
            : this.#errors 
    }
}
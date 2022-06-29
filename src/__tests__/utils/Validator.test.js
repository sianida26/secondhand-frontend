import Validator from '../../utils/Validator';

describe('Validator test', () => {

    const rules = Validator.rules;

    describe('array rule', () => {

        it('Should pass when value is array', () => {
            const validator = new Validator({
                testCase: ['aaa', 'bbb', 'ccc']
            }, {
                testCase: [rules.array()]
            })

            expect(validator.ok()).toBeTruthy();
        });

        it('Should pass when value is empty array', () => {
            const validator = new Validator({
                testCase: []
            }, {
                testCase: [rules.array()]
            })

            expect(validator.ok()).toBeTruthy();
        });

        it('Should not pass when value is non-array', () => {
            const validator = new Validator({
                testCase: null
            }, {
                testCase: [rules.array()]
            })

            expect(validator.ok()).toBeFalsy();
        });

        it('Should not pass when value is an object', () => {
            const validator = new Validator({
                testCase: { test: 'okee' }
            }, {
                testCase: [rules.array()]
            })

            expect(validator.ok()).toBeFalsy();
        });
    });

    describe('inArray rule', () => {

        it('Should pass when item exists in array', () => {
            const validator = new Validator({
                testCase: 'aaa'
            }, {
                testCase: [rules.inArray([ 'aaa', 'bbb', 'ccc' ])]
            })

            expect(validator.ok()).toBeTruthy();
        });

        it.todo('Should pass when item exists as array in array');

        it('Should not pass when empty item is validated', () => {
            const validator = new Validator({
                testCase: []
            }, {
                testCase: [rules.inArray([ 'aaa', 'bbb', 'ccc' ])]
            })

            expect(validator.ok()).toBe(false);
        });

        it('Should not pass when unmatched case string exists in array', () => {
            const validator = new Validator({
                testCase: ['aAa']
            }, {
                testCase: [rules.inArray([ 'aaa', 'bbb', 'ccc' ])]
            })

            expect(validator.ok()).toBe(false);
        });
    })
})
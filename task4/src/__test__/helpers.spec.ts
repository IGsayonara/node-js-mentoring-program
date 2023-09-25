import {shortenPublicHoliday, validateInput} from "../helpers.ts";
import {SUPPORTED_COUNTRIES} from "../config.ts";
describe('validateInput', ()=> {
    it('should return true when country and year is valid', ()=> {
        const year = new Date().getFullYear();
        const country = SUPPORTED_COUNTRIES[0];

        expect(validateInput({year, country})).toEqual(true);
    })

    it('should return true when country or year is valid and second param is missing', ()=> {
        const year = new Date().getFullYear();
        const country = SUPPORTED_COUNTRIES[0];

        expect(validateInput({year})).toEqual(true);
        expect(validateInput({country})).toEqual(true);
    })

    // find function vulnerability during writing unit tests lol
    it('should return true when both params are missing', ()=> {
        expect(validateInput({})).toEqual(true);
    })

    it('should throw error when country is invalid', ()=> {
        const year = new Date().getFullYear();
        const country = 'INVALID';

        expect(() => validateInput({year, country})).toThrowError();
        expect(() => validateInput({country})).toThrowError()
    })

    it('should throw error when country is invalid', ()=> {
        const year = new Date().getFullYear() + 1;
        const country = SUPPORTED_COUNTRIES[0];

        expect(() => validateInput({year, country})).toThrowError();
        expect(() => validateInput({year})).toThrowError()
    })

})

describe('shortenPublicHoliday', ()=> {
    it('should short PublicHoliday', ()=> {
        const publicHoliday = {
            date: 'date',
            localName: 'localName',
            name: 'name',
            countryCode: 'countryCode',
            fixed: true,
            global: true,
            counties: null,
            launchYear: null,
            types: ['type1', 'type2'],
        }

        expect(shortenPublicHoliday(publicHoliday)).toEqual({
            name: 'name',
            localName: 'localName',
            date: 'date'
        })
    })
})
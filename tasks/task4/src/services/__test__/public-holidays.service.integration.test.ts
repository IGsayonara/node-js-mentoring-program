import {
    checkIfTodayIsPublicHoliday,
    getListOfPublicHolidays,
    getNextPublicHolidays
} from "../public-holidays.service.ts";
import {SUPPORTED_COUNTRIES} from "../../config.ts";

describe('getListOfPublicHolidays', () => {
    it('should return values on valid args and api response', async () => {
        const year = new Date().getFullYear()

        const publicHolidaysPromise = SUPPORTED_COUNTRIES.map(async (country) => {
            return await getListOfPublicHolidays(year, country);
        })

        const publicHolidaysInSupportedCountries = await Promise.all(publicHolidaysPromise);

        publicHolidaysInSupportedCountries.forEach((publicHolidays) => {
            expect(publicHolidays.length).toBeTruthy();
        });
    });
});

describe('getNextPublicHolidays', () => {
    it('should return values on valid args and api response', async () => {
        const publicHolidaysPromise = SUPPORTED_COUNTRIES.map(async (country) => {
            return await getNextPublicHolidays(country);
        })

        const publicHolidaysInSupportedCountries = await Promise.all(publicHolidaysPromise);

        publicHolidaysInSupportedCountries.forEach((publicHolidays) => {
            expect(publicHolidays.length).toBeTruthy();
        });
    });
})

describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is public holiday', async () => {
        const year = new Date().getFullYear()

        const publicHolidaysPromise = SUPPORTED_COUNTRIES.map(async (country) => {
            return await getListOfPublicHolidays(year, country);
        })

        const isTodayPublicHolidayPromise = SUPPORTED_COUNTRIES.map(async(country)=> {
            return await checkIfTodayIsPublicHoliday(country);
        })

        const publicHolidaysInSupportedCountries = await Promise.all(publicHolidaysPromise);
        const isTodayPublicHolidayInSupportedCountries = await Promise.all(isTodayPublicHolidayPromise);

        const today = new Date();
        const todayDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + (today.getDay() + 1)).slice(-2)}`;

        publicHolidaysInSupportedCountries.forEach((holidays, index)=> {
            const holidayIndex = holidays.findIndex(({date}) => date === todayDate);
            if(holidayIndex !== -1) expect(isTodayPublicHolidayInSupportedCountries[index]).toEqual(true);
            else expect(isTodayPublicHolidayInSupportedCountries[index]).toEqual(false);
        })
    });
})


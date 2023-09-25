import {
    checkIfTodayIsPublicHoliday,
    getListOfPublicHolidays,
    getNextPublicHolidays
} from "./task4/src/services/public-holidays.service.ts";


getListOfPublicHolidays(2023, 'DE').then(console.log)
// getNextPublicHolidays('DE').then(console.log)
// checkIfTodayIsPublicHoliday('DE').then(console.log)
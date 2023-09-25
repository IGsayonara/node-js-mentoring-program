import {PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES} from "../src/config.ts";
import axios from "axios";

const country = SUPPORTED_COUNTRIES[0];

describe('PublicHolidays API', () => {
    describe('/isTodayPublicHoliday', () => {
        test('should return 200 or 204', async () => {
            const {status} = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);

            expect([200, 204].includes(status)).toEqual(true);
        });

        test('should return 404', async () => {
            const status = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${'INVALID'}`)
                .catch((error) => {
                    return error.response.status;
                });
            expect([404].includes(status)).toEqual(true);
        });

        // wasn't able to achieve a 400 status to make test
    });

    describe('AvailableCountries', () => {
        test('should return 200 and list of available countries', async () => {
            const {status, data} = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/AvailableCountries`);

            expect([200].includes(status)).toEqual(true);
            data.forEach((country)=>{
                expect(country).toEqual({
                    countryCode: expect.any(String),
                    name: expect.any(String),
                })
            })
        });
    });
});
import axios from "axios";

jest.mock('axios');

const validateInputMock = jest.fn(() => {
    return true
});
jest.mock('../../helpers', () => {
    const originalModule = jest.requireActual('../../helpers');

    return {
        __esModule: true,
        ...originalModule,
        validateInput: validateInputMock
    };

})

import {
    checkIfTodayIsPublicHoliday,
    getListOfPublicHolidays,
    getNextPublicHolidays
} from "../public-holidays.service.ts";

const axiosListResponse = {
    data: [
        {
            name: 'name',
            localName: 'Nameee',
            data: '2023-05-08'
        }
    ]
}


describe('getListOfPublicHolidays', () => {
    it('should return values on valid args and api response', async () => {
        jest.mocked(axios).get.mockResolvedValueOnce(axiosListResponse);

        const list = await getListOfPublicHolidays(0, 'COUNTRY');
        expect(list.length).toBeTruthy();
    })

    it('should return empty array on API fail', async () => {
        jest.mocked(axios).get.mockRejectedValueOnce({
            error: 'Mocked error message'
        });

        const list = await getListOfPublicHolidays(0, 'COUNTRY');
        expect(list.length).toBe(0);
    })

    it('should throw validation error', async () => {
        validateInputMock.mockImplementationOnce(() => {
            throw 'Validation error';
        });
        await expect(getListOfPublicHolidays(0, 'COUNTRY')).rejects.toEqual('Validation error');
    });
})

describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true on valid args and api status 200', async () => {
        jest.mocked(axios).get.mockResolvedValueOnce({status: 200});

        const isTodayPublicHoliday = await checkIfTodayIsPublicHoliday('COUNTRY');
        expect(isTodayPublicHoliday).toEqual(true);
    })

    it('should return false on valid args and api status different to 200', async () => {
        jest.mocked(axios).get.mockResolvedValueOnce({status: 400});

        const isTodayPublicHoliday = await checkIfTodayIsPublicHoliday('COUNTRY');
        expect(isTodayPublicHoliday).toEqual(false);
    })

    it('should return false on valid args and API fail', async () => {
        jest.mocked(axios).get.mockRejectedValueOnce({
            error: 'Mocked error message'
        });

        const isTodayPublicHoliday = await checkIfTodayIsPublicHoliday('COUNTRY');
        expect(isTodayPublicHoliday).toEqual(false);
    })

    it('should throw validation error', async () => {
        validateInputMock.mockImplementationOnce(() => {
            throw 'Validation error';
        });
        await expect(checkIfTodayIsPublicHoliday('COUNTRY')).rejects.toEqual('Validation error');
    });
})

describe('getNextPublicHolidays', () => {
    it('should return values on valid args and api response', async () => {
        jest.mocked(axios).get.mockResolvedValueOnce(axiosListResponse);

        const list = await getNextPublicHolidays('COUNTRY');
        expect(list.length).toBeTruthy();
    })

    it('should return empty array on API fail', async () => {
        jest.mocked(axios).get.mockRejectedValueOnce({
            error: 'Mocked error message'
        });

        const list = await getNextPublicHolidays('COUNTRY');
        expect(list.length).toBe(0);
    })

    it('should throw validation error', async () => {
        validateInputMock.mockImplementationOnce(() => {
            throw 'Validation error';
        });
        await expect(getNextPublicHolidays('COUNTRY')).rejects.toEqual('Validation error');
    });
})
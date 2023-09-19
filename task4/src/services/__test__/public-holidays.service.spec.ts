import {getListOfPublicHolidays} from "../public-holidays.service.ts";

test('first', async ()=> {
    const list = await getListOfPublicHolidays(2023, 'DE');
    expect(list.length).toBeTruthy();
})
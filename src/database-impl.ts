import {UserState} from "./types.ts";

const initialUsersState: UserState[] = [
    {
        id: 1,
        name: 'Ann',
        email: 'ann@google.com',
        hobbies: ['books', 'sport', 'dancing'],
    },
    {
        id: 2,
        name: 'Ben',
        email: 'ben@google.com',
        hobbies: ['series', 'sport'],
    },
];

export const userState: UserState[] = JSON.parse(JSON.stringify(initialUsersState));
import {UserHobbyDTO} from "./types.ts";

const hobbyCache: Record<string, UserHobbyDTO[]> = {};

export const resetCache = (userId: string) => {
    delete hobbyCache[userId];
}

export const addToCache = (userId: string, hobbies: UserHobbyDTO[]) => {
    hobbyCache[userId] = hobbies;
}

export const getCache = (userId: string): UserHobbyDTO[] => hobbyCache[userId];
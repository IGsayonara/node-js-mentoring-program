export type UserDTO = {
    id: number,
    name: string,
    email: string,
}

export type UserHobbyDTO = string;

export type UserHobby = string;

export type UserState = {
    id: number,
    name: string,
    email: string,
    hobbies: UserHobby[],
}

export type UserPayload = {
    name: string,
    email: string,
    hobbies?: string[],
}
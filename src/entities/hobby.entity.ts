import {userState} from "../core/database-impl.ts";
import {UserHobby, UserHobbyDTO, UserState} from "../types.ts";
import {stop} from "../utils/timeout.util.ts";

export default class HobbyEntity {
    static state: UserState[] = userState;

    async getAll(userId: number): Promise<UserHobbyDTO[]> {
        await stop(500);
        const user = this.getUserById(userId);
        return [...user.hobbies];
    }

    async add(userId: number, hobby: UserHobby): Promise<UserHobbyDTO[]> {
        const user = this.getUserById(userId);
        const index = user.hobbies.findIndex((userHobby) => userHobby === hobby);

        if (index === -1) {
            user.hobbies.push(hobby);
            return await this.getAll(userId);
        }

        throw {message: `Hobby: ${hobby} for user with id: ${userId} is already exists`, code: 403};
    }

    async delete(userId, hobby: UserHobby): Promise<UserHobbyDTO[]> {
        const user = this.getUserById(userId);
        const index = user.hobbies.findIndex((userHobby) => userHobby === hobby);

        if (index !== -1) {
            user.hobbies.splice(index, 1);
            return await this.getAll(userId);
        }

        throw {message: `Hobby: ${hobby} for user with id: ${userId} is not found`, code: 404};
    }

    private getUserById(userId: number): UserState {
        const user = HobbyEntity.state.find(({id}) => id === userId);
        if (user) return user;

        throw {message: `User with id: ${userId} is not found`, code: 404}
    }
}
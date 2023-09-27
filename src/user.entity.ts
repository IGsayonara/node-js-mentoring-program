import {userState} from "./database-impl.ts";
import {UserDTO, UserPayload, UserState} from "./types.ts";

export default class UserEntity {
    static state: UserState[] = userState;
    static userId: number = UserEntity.state.reduce((previousValue, currentValue) => {
        const maxId = previousValue.id;
        const currentId = currentValue.id;
        return maxId < currentId ? currentValue : previousValue;
    }).id + 1;

    getAll(): UserDTO[] {
        return UserEntity.state.map((user) => {
            return this.userPipe(user);
        })
    }

    getOne(userId: number): UserDTO {
        const user = UserEntity.state.find(({id}) => id === userId);
        if (user) return this.userPipe(user);

        throw {message: `User with id: ${userId} is not found`, code: 404};
    }

    add(user: UserPayload): UserDTO {
        const userEntity = {
            ...user,
            id: this.generateNewId(),
            hobbies: [],
        }

        UserEntity.state.push(userEntity);

        return this.userPipe(userEntity);
    }

    update(userId, user: Partial<UserPayload>): UserDTO {
        const index = UserEntity.state.findIndex(({id}) => id === userId);

        if (index !== -1) {
            const updatedUser = {
                ...UserEntity.state[index],
                ...user,
            }

            UserEntity.state[index] = updatedUser;

            return this.userPipe(updatedUser);
        }

        throw {message: `User with id: ${userId} is not found`, code: 404}
    }

    delete(userId: number) {
        const index = UserEntity.state.findIndex(({id}) => id === userId);
        if (index !== -1) {
            UserEntity.state.splice(index, 1);
            return;
        }

        throw {message: `User with id: ${userId} is not found`, code: 404}
    }

    private generateNewId(): number {
        return UserEntity.userId++;
    }

    private userPipe(user: UserState): UserDTO {
        const userCopy: UserState = JSON.parse(JSON.stringify(user));
        delete userCopy.hobbies;
        return userCopy;
    }
}
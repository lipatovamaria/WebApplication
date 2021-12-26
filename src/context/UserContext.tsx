import React from "react";
import {User} from "../App";

type UserContextType = {
    user: User | null
    logoutUser(): void,
    loginUser(username: string, password: string): void
}

let defaultUserContext: UserContextType = {
    user: null,
    logoutUser: async () => {
        console.error(`Logout user not implemented!`)
    },
    loginUser: async (email: string, password: string) => {
        console.error(`Login user not implemented!`)
    }
}
const UserContext = React.createContext(defaultUserContext)
UserContext.displayName = 'UserContext';

export default UserContext
import { createContext } from "react";

interface IAuthContext {
    account: any,
    photo: string,
    theme?: string,
    setTheme?: React.Dispatch<React.SetStateAction<string>> | void,
    schema?: object | null,
    selects?: object | null,
}

const defaultState = {
    account: {},
    photo: '',
    opt: null,
}

export const AuthContext = createContext<IAuthContext>(defaultState)
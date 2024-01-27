// The NavContext holds the navigation state values
import {
    JSXElementConstructor, ReactElement, ReactFragment,
    ReactPortal, useEffect, useState
} from "react";
import { useMsal } from "@azure/msal-react";
import { getProfile } from "./authConfig"
//import { msalInstance } from "./auth"
import { AuthContext } from "./context/AuthContext"

interface IAuthContextProvider {
    msal: any;
    selects: any;
    schema?: any;
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
}

export const AuthContextProvider = (props: IAuthContextProvider) => {

    const [userAccount, setUserAccount] = useState({})
    const [userPhoto, setUserPhoto] = useState('')
    const [theme, setTheme] = useState('light');
    const { accounts } = useMsal()

    useEffect(() => {
        setUserAccount(accounts[0])
        getProfile(setUserPhoto, props.msal)
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (
        <>
            {userPhoto != '' ?
                <AuthContext.Provider value={{
                    account: userAccount,
                    photo: userPhoto,
                    theme: theme,
                    setTheme: setTheme,
                    schema: props.schema,
                    selects: props.selects
                }}>
                    {props.children}
                </AuthContext.Provider>
                :
                <div>Fetching your user profile...</div>
            }
        </>
    )
}
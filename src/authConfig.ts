/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";
import stockPhoto from './assets/msProfile.svg'
/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSALCLIENTID, // This is the ONLY mandatory field that you need to supply.
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AUTH}`, // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        //                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: []
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
    scopes: ["openid", "profile"],
    loginHint: "example@domain.net"
};

export const agentRequest = {

}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMePhoto: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
}

export async function getProfile(photoSetter: any, msalInstance: any) {
    const account = msalInstance.getAllAccounts();
    console.log(account)
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account[0]
    });
    console.log(response)
    var photo: any = null
    const headers = new Headers()
    const bearer = `Bearer ${response.accessToken}`
    headers.append("Authorization", bearer)
    const options = {
        method: "GET",
        headers: headers
    }

    await fetch(graphConfig.graphMePhoto, options)
        .then(response => {
            !response.ok && (photo = stockPhoto)
            return response.blob()
        })
        .then(photoBlob => {
            window.URL = window.URL || window.webkitURL
            !photo && (photo = window.URL.createObjectURL(photoBlob))
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            photoSetter(photo)
            return photo;
        });
}
import msal from "@azure/msal-browser"
import { graphConfig, callMSGraph } from "../ms-graph-api/graph";
import { msalConfig, loginRequest, tokenRequest } from "./authConfig";

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

// debugging functions from original msal example
function showWelcomeMessage(username: string) {
    console.log(`username is: ${username}`)
}
const updateUI = (data: any, endpoint: any) => {console.log('data is: ', data, 'endpoint is: ', endpoint)};

/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
 */
myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });

function selectAccount () {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

function handleResponse(response: any) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

export function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginRedirect(loginRequest);
}

export function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccount({username: username}),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
}

function getTokenRedirect(request: any) {
    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccount({username: username});

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using redirect");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenRedirect(request);
            } else {
                console.warn(error);   
            }
        });
}

export function seeProfile() {
    getTokenRedirect(loginRequest)
        .then(response => {
            if (response) {
                callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
            }
        }).catch(error => {
            console.error(error);
        });
}

export function readMail() {
    getTokenRedirect(tokenRequest)
        .then(response => {
            if (response) {
                callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
            }
        }).catch(error => {
            console.error(error);
        });
}

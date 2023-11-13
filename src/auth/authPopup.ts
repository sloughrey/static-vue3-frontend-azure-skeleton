import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser'
import { graphConfig, callMSGraph } from '../ms-graph-api/graph'
import { msalConfig, loginRequest, tokenRequest } from './authConfig.js'

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new PublicClientApplication(msalConfig)
myMSALObj.initialize();

let username = ''

// debugging functions from original msal example
function showWelcomeMessage(username: string) {
  console.log(`username is: ${username}`)
}
const updateUI = (data: any, endpoint: any) => {
  console.log('data is: ', data, 'endpoint is: ', endpoint)
}

export async function selectAccount() {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */

  const currentAccounts = await myMSALObj.getAllAccounts()
  if (currentAccounts.length === 0) {
    return
  } else if (currentAccounts.length > 1) {
    // Add choose account code here
    console.warn('Multiple accounts detected.')
  } else if (currentAccounts.length === 1) {
    username = currentAccounts[0].username
    showWelcomeMessage(username)
  }
}

function handleResponse(response: any) {
  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */

  if (response !== null) {
    username = response.account.username
    showWelcomeMessage(username)
  } else {
    selectAccount()
  }
}

export async function signIn() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */
  console.log(myMSALObj)
  await myMSALObj
    .loginPopup(loginRequest)
    .then(handleResponse)
    .catch((error) => {
      console.error(error)
    })
}

export function signOut() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  const logoutRequest = {
    account: myMSALObj.getAccount({ username: username }),
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri
  }

  myMSALObj.logoutPopup(logoutRequest)
}

function getTokenPopup(request: any) {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = myMSALObj.getAccount({ username: username })

  return myMSALObj.acquireTokenSilent(request).catch((error) => {
    console.warn('silent token acquisition fails. acquiring token using popup')
    if (error instanceof InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      return myMSALObj
        .acquireTokenPopup(request)
        .then((tokenResponse) => {
          console.log(tokenResponse)
          return tokenResponse
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      console.warn(error)
    }
  })
}

export function seeProfile() {
  getTokenPopup(loginRequest)
    .then((response) => {
      if (response) {
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export function readMail() {
  getTokenPopup(tokenRequest)
    .then((response) => {
      if (response) {
        callMSGraph(
          graphConfig.graphMailEndpoint,
          response.accessToken,
          (data: any, endpoint: any) => {
            console.log('data is: ', data, 'endpoint is: ', endpoint)
          }
        )
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

//selectAccount();

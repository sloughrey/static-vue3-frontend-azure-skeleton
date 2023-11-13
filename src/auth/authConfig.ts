import { LogLevel } from '@azure/msal-browser'

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: '047eb6ad-52c9-4d24-bdb6-ee9386c5e133',
    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
    authority: 'https://login.microsoftonline.com/f6c69f6a-8660-4441-b465-a537a90e1baf',
    // Full redirect URL, in form of http://localhost:5173
    redirectUri: 'http://localhost:5173'
  },
  /* cache: {
        //cacheLocation: "sessionStorage", // This configures where your cache will be stored
        //storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }, */
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: string, containsPii: any) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      }
    }
  }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['User.Read']
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const tokenRequest = {
  scopes: ['User.Read', 'Mail.Read'],
  forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
}

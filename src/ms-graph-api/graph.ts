// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMailEndpoint: 'https://graph.microsoft.com/v1.0/me/messages'
}

/**
 * Helper function to call MS Graph API endpoint
 * using the authorization bearer token scheme
 */
export function callMSGraph(endpoint: string, token: string, callback: Function) {
  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers
  }

  console.log('request made to Graph API at: ' + new Date().toString())

  fetch(endpoint, options)
    .then((response) => response.json())
    .then((response) => callback(response, endpoint))
    .catch((error) => console.log(error))
}

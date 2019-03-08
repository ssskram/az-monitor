export default async function fourHundo(resourceGroup, appName) {
    const response = await fetch("https://azureproxy.azurewebsites.us/metrics/fourHundo?minutes=180&resourceGroup=" + resourceGroup + "&appName=" + appName, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
        })
    })
    const requests = await response.json()
    return requests
}
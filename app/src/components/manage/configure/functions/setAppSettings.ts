export default async function setApplicationSettings (appName, resourceGroup, settings) {
    const response = await fetch("https://azureproxy.azurewebsites.us/config/appSettings?appName=" + appName + "&resourceGroup=" + resourceGroup, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(settings)
    })
    const newProperties = await response.json()
    return newProperties.settings
}
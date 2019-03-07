export default async function syncSourceRepository (appName, resourceGroup) {
    await fetch("https://azureproxy.azurewebsites.us/deployments/syncSource?appName=" + appName + "&resourceGroup=" + resourceGroup, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY,
            'Content-Type': 'application/json'
        })
    })
    return 
}
export default async function getSourceControl(app) {
    const response = await fetch("https://azureproxy.azurewebsites.us/deployments/sourceControl?resourceGroup=" + app.resourceGroup + "&appName=" + app.name, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
        })
    })
    const source = await response.json()
    return source
}
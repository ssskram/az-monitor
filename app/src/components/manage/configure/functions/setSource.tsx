export default async function setDeploymentSource(appName, resourceGroup, repo, branch) {

    const url = "https://azureproxy.azurewebsites.us/deployments/sourceControl?appName=" + appName + "&resourceGroup=" + resourceGroup
    const headers = new Headers({
        'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY,
        'Content-Type': 'application/json'
    })

    // first delete existing config, if existent
    await fetch(url, { method: 'DELETE', headers: headers })

    // then set new config
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            url: repo,
            branch: branch
        })
    })
    const newSource = await response.json()
    return newSource
}
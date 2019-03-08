export default async function memory(serviceName) {
    const response = await fetch("https://azureproxy.azurewebsites.us/metrics/memory?minutes=180&serviceName=" + serviceName, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
        })
    })
    const memory = await response.json()
    return memory
}
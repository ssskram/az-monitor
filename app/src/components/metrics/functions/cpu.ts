export default async function cpu(serviceName) {
    const response = await fetch("https://azureproxy.azurewebsites.us/metrics/cpu?serviceName=" + serviceName, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
        })
    })
    const cpu = await response.json()
    return cpu
}
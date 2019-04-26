export default async function memory(serviceName) {
    const response = await fetch("http://localhost:3000/metrics/appServiceMemory?minutes=180&serviceName=" + serviceName, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_AZURE_PROXY
        })
    })
    const memory = await response.json()
    return memory
}
export default async function cpu(machineName) {
  const response = await fetch(
    "https://azureproxy.azurewebsites.us/metrics/virtualMachineCPU?minutes=180&machineName=" +
      machineName,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
      })
    }
  );
  const cpu = await response.json();
  return cpu;
}

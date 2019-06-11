export default async function getDeployments(resourceGroup, appName) {
  const response = await fetch(
    "https://azureproxy.azurewebsites.us/deployments/allDeployments?resourceGroup=" +
      resourceGroup +
      "&appName=" +
      appName,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
      })
    }
  );
  const deployments = await response.json();
  return deployments;
}

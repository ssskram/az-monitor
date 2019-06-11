export default async function getAppSettings(app) {
  const response = await fetch(
    "https://azureproxy.azurewebsites.us/config/appSettings?resourceGroup=" +
      app.resourceGroup +
      "&appName=" +
      app.name,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
      })
    }
  );
  const settings = await response.json();
  return settings;
}

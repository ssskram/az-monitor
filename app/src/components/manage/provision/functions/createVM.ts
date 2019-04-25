export default async function addVirtualMachine(serverName, size) {
  const response = await fetch(
    "https://azureproxy.azurewebsites.us/provision/virtualMachine?serverName=" +
      serverName +
      "&size=" +
      size,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY,
        "Content-Type": "application/json"
      })
    }
  );
  const newVM = await response.json();
  return newVM;
}

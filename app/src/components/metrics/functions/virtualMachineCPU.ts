export default async function cpu(machineName) {
  const response = await fetch(
    "http://localhost:3000/metrics/virtualMachineCPU?minutes=180&machineName=" +
      machineName,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_AZURE_PROXY
      })
    }
  );
  const cpu = await response.json();
  console.log(cpu);
  return cpu;
}

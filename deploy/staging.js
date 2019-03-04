const shell = require('shelljs')

const name = "azmonitor-staging"
const command = 'az webapp deployment source sync --name ' + name + ' --resource-group client-applications'

console.log("Deploying to staging environment, " + name)
shell.exec(command, (err) => {
    if (err == 1) {
        shell.exec('az login')
        console.log("Deploying to staging environment, " + name)
        shell.exec(command)
        console.log("Success") 
    } else {
        console.log("Success") 
    }
})
const app = require('./src/Application')

app
    .register()
    .then(() => {
        app.connect()
    })
    .catch(
        console.error
    )

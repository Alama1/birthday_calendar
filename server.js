const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Still alive!')
})

app.listen(port, () => {
    console.log(`Replit keepAlive listening on port ${port}`)
})

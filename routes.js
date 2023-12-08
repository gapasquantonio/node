
const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === "/") {
        res.write("<html>")
        res.write("<header>")
        res.write("<title>")
        res.write("Hello Wrold")
        res.write("</title>")
        res.write("</header>")
        res.write("<body>")
        res.write("<h1> I will be a full stack developer earning in dollars </h1>")
        res.write("<form action='/message' method='POST'> ")
        res.write("<input type=`text` name='message'>")
        res.write("<button type=`submit`> Send")
        res.write("</button> ")
        res.write("</input> ")
        res.write("</form> ")
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[0]
            console.log(message)
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 303
                res.setHeader('Location', '/')
                return res.end()
            })

        })


    }
    res.setHeader("Content-Type", "text/html")
    res.write("<html>")
    res.write("<header>")
    res.write("<title>")
    res.write("Hello Wrold")
    res.write("</title>")
    res.write("</header>")
    res.write("<body>")
    res.write("<h1> teeeeee </h1>")
    res.write("</body>")
    res.write("</html>")
    res.end()
}


module.exports = requestHandler
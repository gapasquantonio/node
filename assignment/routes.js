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

        res.write("</body>")
        res.write("</html>")
        return res.end()
    }
    if (url === '/users') {
        res.write("<html>")
        res.write("<header>")
        res.write("<title>")
        res.write("Hello Wrold")
        res.write("</title>")
        res.write("</header>")
        res.write("<body>")
        res.write("<ul> <li> will be a full stack developer earning in dollars</li><li>will be a full stack developer earning in dollars </li></ul>")
        res.write("<form action='/create-user' method='POST'> ")
        res.write("<input type=`text` name='username'>")
        res.write("<button type=`submit`> Send")
        res.write("</button> ")
        res.write("</input> ")
        res.write("</form> ")
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            console.log(message)
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 303
                res.setHeader('Location', '/')
                return res.end()
            })

        })


    }

}


module.exports = requestHandler
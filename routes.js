const fs = require("fs");

const routeHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Submission</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" ><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const bufferBody = Buffer.concat(body).toString();
      console.log(bufferBody);
      messageArray = bufferBody.split("message=");
      console.log(messageArray);
      messageBody = messageArray[1];
      fs.writeFile("message.txt", messageBody, (error) => {
        if (!error) {
          res.statusCode = 302;
        } else {
          res.statusCode = 404;
        }
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Page</title></head>");
  res.write("<body><h1>Hello from Node</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  routeHandler,
};

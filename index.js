// console.log("Hello from node js ");

// (function (exports, require, module, __filename, __dirname) {});

// console.log(__dirname, __filename);
// const Person = require("./person");

// const person1 = new Person("Danh Phuong", 30);

// person1.greeting();

// console.log(perso n.name);

// const Logger = require("./logger");

// const logger = new Logger();
// logger.on("message", (data) => {
//   console.log("Call listener: ", data);
// });

// logger.log("Hello");
// logger.log("a");
// logger.log("b");

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     fs.readFileSync(
  //       path.join(__dirname, "public", "index.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end(content);
  //       }
  //     );
  //   }

  //   if (req.url === "/api/users") {
  //     const users = [
  //       {
  //         name: "Phuong",
  //         age: 20,
  //       },
  //       {
  //         name: "John",
  //         age: 1,
  //       },
  //     ];
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  //   console.log(filePath);
  //   res.end();

  // Extension of the file

  let extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // readfile
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

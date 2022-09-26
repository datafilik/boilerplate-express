let express = require('express');
let bodyParser = require('body-parser')

let app = express();

// console.log('Hello World');

//creating and setting up a root-level  Express request logger middleware
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip + " ")
  next();
});

//specify response for HTML GET request on route '/'
// app.get('/', (req, res) => {
//   res.send("Hello Express")
// });

// specify directory containing static assets available to users using Express middleware called static
absStaticAssetPath = __dirname + '/public';
app.use('/public', express.static(absStaticAssetPath));

//render files in reponse to GET request
absIndexFilePath = __dirname + '/views/index.html';
app.get('/', (req, res) => {
  res.sendFile(absIndexFilePath)
});

//render json in respone to GET request
// app.get('/json', (req, res) => {
//   res.json({"message": "Hello json"})
// });

//conditional json reponse rendering based on environment variable value
app.get('/json', (req, res) => {
  if (process.env['MESSAGE_STYLE'] === "uppercase"){
    res.json({"message": "Hello json".toUpperCase()})
  }else{
    res.json({"message": "Hello json"})
  }
});

// //creating and setting up a root-level  Express logger middleware
// app.use((req, res, next) => {
//   console.log(req.method + " " + req.path + " - " + req.ip + " ");
//   next();
// });

//chaining a middleware to a route definition to create a Time Server
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time});
});

//getting route parameter input (e.g /input1/echo) from client
app.get("/:word/echo", (req, res) => {
  res.json({"echo": req.params.word});
});

//getting query parameter input (e.g /name?first="input1"&last="input2") from client
// app.get("/name", (req, res) => {
//   res.json({"name": req.query.first + " " + req.query.last});
// });

//parse POST request using middleware in body-parser JavaScript package
app.use("/name", bodyParser.urlencoded({"extended": "false"}));

//extract dat from POST request                 
// app.post("/name", (req, res) =>{
//   res.json({"name": req.body.first + " " + req.body.last});
// })

//chaining various request verb handlers to same route
//(e.g. app.route(path).get(handler).post(handler))
app.route("/name").get((req, res) => {
  res.json({"name": req.query.first + " " + req.query.last});
}).post((req, res) =>{
  res.json({"name": req.body.first + " " + req.body.last});
});



































 module.exports = app;





































 module.exports = app;

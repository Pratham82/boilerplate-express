"use strict";
var express = require("express");
var app = express();
var path = require("path");
var absPath = path.join(__dirname, "./views/index.html");
var dotenv = require("dotenv");
dotenv.config();
var bodyParser = require("body-parser");

// --> 7)  Mount the Logger middleware here
app.use(function middleware(req, res, next) {
	console.log(`${req.method} ${req.path} - ::${req.ip}`);
	next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//* testing body parser
// app.get("/body-parse", (req, res) => {
// 	res.send({
// 		res: bodyParser.json(),
// 	});
// });

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */

/** 3) Serve an HTML file */
app.get("/", (req, res) => res.sendFile(absPath));

/** 4) Serve static assets  */
app.use(express.static("public"));

/** 5) serve JSON on a specific route */
// app.get("/json", (req, res) =>
// 	res.send({
// 		message: "Hello json",
// 	})
// );

/** 6) Use the .env file to configure the app */
app.get("/json", (req, res) =>
	res.send({
		message:
			process.env.MESSAGE_STYLE == "uppercase"
				? "Hello json".toUpperCase()
				: "Hello json",
	})
);

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		res.send({
			time: req.time,
		});
		next();
	},
	(req, res) => {}
);

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) =>
	res.send({
		echo: req.params.word,
	})
);
/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) =>
	res.send({
		name: `${req.query.first} ${req.query.last}`,
	})
);

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */
app.post("/name", (req, res) => {
	// console.log(req.body.first);
	res.send({
		name: `${req.body.first} ${req.body.last}`,
	});
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;

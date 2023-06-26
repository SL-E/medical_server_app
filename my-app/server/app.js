//Loads the express module
const express = require('express');
const WebSocket = require('ws');

const { createMysqlPool, dispatchOnlineUser } = require('./utils/index');
const loginRouter = require('./newRoutes/login-routes.js');
const reservationRouter = require('./newRoutes/reservation-routes.js');
const doctorsRouter = require('./newRoutes/doctors-routes.js');
const medicineRouter = require('./newRoutes/medicine-routes.js');
const hospitalRouter = require('./newRoutes/hospital-routes.js');
//Creates our express server
const app = express();
const port = 5001;
//Makes the app listen to port 5000
const server = app.listen(port, () => console.log(`App listening to port ${port}`));
const wss = new WebSocket.Server({ server });
const options = { wss };
// Create mysql pool
createMysqlPool();

wss.on('connection', async (ws, req) => {
    const account = new URL(req.url, 'ws://127.0.0.1:5001').searchParams.get('account');
    ws.account = account;
    const clients = wss.clients || [];
    dispatchOnlineUser(clients, account);

    // ws.on('message', (data) => {
    //   console.log(`received: ${data}`);
    //   ws.send(`you said: ${data}`);
    // });


    ws.on('close', () => {
        dispatchOnlineUser(clients, account);
    })
});
  

/*Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({defaultLayout: "index"}));*/

// Setup multer (files will temporarily be saved in the "temp" folder).
const path = require("path");

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname,"public")));

// ckeditor config
app.use(express.static(path.join(__dirname,"build")));



// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Setup express-session
const session = require("express-session");
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "CS719"
}));



// // Setup routes
// const hospitalRouter = require("./routes/hospital-routes.js");
// app.use(hospitalRouter);
app.use(loginRouter(options));
app.use(reservationRouter(options));
app.use(doctorsRouter(options));
app.use(medicineRouter(options));
app.use(hospitalRouter(options));
// const logoutRouter = require("./routes/logout-routes.js");
// app.use(logoutRouter);
// const doctorRouter = require("./routes/doctor-routes.js");
// app.use(doctorRouter);
// const medicineRouter = require("./routes/medicine-routes.js");
// app.use(medicineRouter);
// const pharmacyRouter = require("./routes/pharmacy-routes.js");
// app.use(pharmacyRouter);

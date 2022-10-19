let http = require("http");
require("dotenv").config()
let axios = require("axios")
let queryString = require('query-string');
let url = require("url")



let service = http.createServer(function (req, res) {
    console.log(urlParts(req));
    if (req.method === 'GET') {
        switch (req.url) {
            case "/list-user":
                getDataWeb("https://reqres.in/api/users?page=2")
                break
            case `${urlParts(req).pathname}${urlParts(req).search}`:
                weatherFromGet(req, res)
                break
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end("404 not found!!!")
        }
    } else if (req.method === 'POST') {
        switch (req.url) {
            case "/login-succes":
                loginSucces(req, res)
                break
            case "/login":
                login(req, res)
                breakno
            case "/vietnamWeather":
                weather(req, res)
                break
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end("404 not found!!!")
        }
    }
}
);

let Port = parseInt(process.env.PORT, 10) || 8988
console.log(Port);
service.listen(
    Port,
    console.log(
        `service on: http://localhost:${Port}`
    )
);

// let getDataWeb = (url) => {
//     let config = {
//         method: 'get',
//         url: url,
//         responseType: ''
//     }
//     // axios func to getdata from WEB API
//     axios(config).then(result => {
//         res.writeHead(200, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify(result.data));
//     }).catch(err => console.log(err))
// }

// let user = {
//     username: "dinhtatuanlinh",
//     password: "123456"
// }

// Getdata from Postman
function getData(req) {
    return new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            let str = decodeURIComponent(escape(String.fromCharCode(...chunk)))
            resolve(JSON.parse(str))
        });
    })
}

// async function login(req, res) {
//     let data = await getData(req)
//     console.log(data)
//     if (data.username !== user.username && data.password !== user.password) {
//         res.writeHead(400, { 'Content-Type': 'application/json' })
//         res.end("error input")
//     }

//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(data))
// }


// async function loginSucces(req, res) {
//     let data = await getData(req)
//     loginWebsite(data, res)
// }

// let loginWebsite = (data, res) => {
//     let config = {
//         method: 'post',
//         url: data.url,
//         data: {
//             email: data.email,
//             password: data.password
//         }
//     }
//     axios(config)
//         .then(result => {
//             console.log(result.data);
//             res.writeHead(200, { 'Content-Type': 'application/json' })
//             res.end(JSON.stringify(result.data));
//         })
//         .catch((err) => {
//             res.writeHead(200, { 'Content-Type': 'application/json' })
//             res.end(err)
//         })
// }


// async function weather(req, res) {
//     let data = await getData(req)
//     getApiWeather(data, res);
// }
// let getApiWeather = (data, res) => {
//     let key = process.env.KEY
//     let aqi = process.env.AQI
//     let alerts = process.env.ALERTS
//     let config = {
//         method: 'get',
//         url: `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${data.q}&days=${data.days}&aqi=${aqi}&alerts=${alerts}`
//     }

//     axios(config)
//         .then(result => {
//             let wetherData = {
//                 Location: result.data.location.name,
//                 Temperature: result.data.current.temp_c
//             }
//             res.writeHead(200, { 'Content-Type': 'application/json' })
//             res.end(JSON.stringify(wetherData));
//         })
//         .catch((err) => {
//             res.writeHead(200, { 'Content-Type': 'application/json' })
//             res.end(JSON.stringify(err))
//         })
// }


let urlParts = (req) => {
    let url_parts = url.parse(req.url, true)
    return url_parts
}

let weatherFromGet = (req, res) => {
    let key = process.env.KEY
    let capital = `${urlParts(req).query.Capital}`
    let days = `${urlParts(req).query.Day}`
    let aqi = process.env.AQI
    let alerts = process.env.ALERTS
    let config = {
        method: 'get',
        url: `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${capital}&days=${days}&aqi=${aqi}&alerts=${alerts}`
    }
    axios(config)
        .then(result => {
            let wetherData = {
                Location: result.data.location.name,
                Temperature: result.data.current.temp_c
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(wetherData));
        })
        .catch((err) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(err))
        })
}
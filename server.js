const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = process.env.APIKEY

app.get('/api/hello', (req, res) => {
    const { term, location } = req.query
    const config = {
        method: 'get',
        url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data, null, 2)
        })
        .then(function (jsonResponse) {
            res.send(jsonResponse)
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));











// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const apiKey = process.env.APIKEY

// app.get('/api/hello/:term', (req, res) => {
//     const term = req.query.term
//     const config = {
//         method: 'get',
//         url: 'https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}',
//         headers: {
//             'Authorization': `Bearer ${apiKey}`
//         }
//     };

//     axios(config)
//         .then(function (response) {
//             // res.send(JSON.stringify(response.data, null, 2));
//             // res.send(term)
//             return JSON.stringify(response.data, null, 2)
//         }) // start below
//         .then(function (jsonResponse) {
//             res.send(jsonResponse + term)
//         }) // end above
//         .catch(function (error) {
//             console.log(error);
//         });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));







// GET
// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello From Express' });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));

// GET AND POST
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`,
//     );
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));
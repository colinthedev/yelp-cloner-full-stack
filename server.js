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

// app.get('/api/hello', (req, res) => {
//     const { term, location, sortBy } = req.query
//     const config = {
//         method: 'get',
//         url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by='best_match'`,
//         headers: {
//             'Authorization': `Bearer ${apiKey}`
//         }
//     };

//     axios(config)
//         .then(function (response) {
//             return JSON.stringify(response.data, null, 2)
//         })
//         .then(function (jsonResponse) {
//             res.send(jsonResponse)
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));





const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = process.env.PORT || 2000;

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
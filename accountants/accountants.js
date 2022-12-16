const express = require('express');
const dotenv = require('dotenv').config({ path: '../.env' }).parsed;
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

app.use(bodyParser.json());

const statusService = `http://localhost:${dotenv.STATUS_PORT}`;

const accountants = [
    {
        id: 10,
        statusId: null,
        name: 'Sergey',
        status: null,
    },
    {
        id: 11,
        statusId: null,
        name: 'Alesya',
        status: null,
    },
    {
        id: 12,
        statusId: null,
        name: 'Victor',
        status: null,
    },
    {
        id: 13,
        statusId: null,
        name: 'Nastya',
        status: null,
    },
    {
        id: 14,
        statusId: null,
        name: 'Boris',
        status: null,
    },
];

app.get('/accountants', (req, res) => {
    console.log('Returning accountants list');
    res.send(accountants);
});

app.post('/determineAccountantStatus', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${statusService}/accountant/${req.body.statusId}`,
        body: JSON.stringify({ accountantId: req.body.accountantId })
    }, (err, response, body) => {
        if (!err) {
            const accountantId = parseInt(req.body.accountantId);
            const accountant = accountants.find(subject => subject.id === accountantId);
            accountant.status = body;
            accountant.statusId = req.body.statusId;
            res.status(202).send(accountant);
        } else {
            res.status(400).send({ problem: err });
        }
    });
});

app.post('/assignAccountant/**', (req, res) => {
    const accountantId = parseInt(req.params[0]);
    const accountant = accountants.find((acc) => acc.id === accountantId);

    if (accountant) {
        res.status(202).header({
            Location: `http://localhost:${dotenv.REPORT_PORT}/determineReportAccountant/${accountantId}`
        }).send(accountant.name);
    } else {
        console.log(`not found.`);
        res.status(404).send();
    }
});

app.listen(
    dotenv.ACCOUNTANT_PORT,
    () => console.log(`Accountants listening on port ${dotenv.ACCOUNTANT_PORT}`)
);

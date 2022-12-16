const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({ path: '../.env' }).parsed;
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.json());

const statusService = `http://localhost:${dotenv.STATUS_PORT}`;
const accountantService = `http://localhost:${dotenv.ACCOUNTANT_PORT}`;

const reports = [
    {
        id: 10,
        displayName: 'Report 1',
        status: null,
        statusId: null,
        accountant: null,
        accountantId: null,
    },
    {
        id: 11,
        displayName: 'Report 2',
        status: null,
        accountant: null,
        statusId: null,
        accountantId: null,
    },
    {
        id: 12,
        status: null,
        accountant: null,
        displayName: 'Report 3',
        statusId: null,
        accountantId: null,
    },
    {
        id: 13,
        status: null,
        accountant: null,
        displayName: 'Report 5',
        statusId: null,
        accountantId: null,
    },
    {
        id: 14,
        status: null,
        accountant: null,
        displayName: 'Report 5',
        statusId: null,
        accountantId: null,
    },
];

app.get('/reports', (req, res) => {
    console.log('Returning reports list');
    res.send(reports);
});

app.post('/determineReportAccountant', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${accountantService}/assignAccountant/${req.body.accountantId}`,
    }, (err, response, body) => {
        console.log(body);
        if (!err) {
            const reportId = parseInt(req.body.reportId);
            const report = reports.find(report => report.id === reportId);
            report.accountant = body;
            report.accountantId = req.body.accountantId;
            res.status(202).send(report);
        } else {
            res.status(400).send({ problem: err });
        }
    });
});

app.post('/determineReportStatus', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${statusService}/report/${req.body.statusId}`,
        body: JSON.stringify({ reportId: req.body.reportId })
    }, (err, response, body) => {
        if (!err) {
            const reportId = parseInt(req.body.reportId);
            const report = reports.find(report => report.id === reportId);
            report.status = body;
            report.statusId = req.body.statusId;
            res.status(202).send(report);
        } else {
            res.status(400).send({ problem: err });
        }
    });
});


app.listen(
    dotenv.REPORT_PORT,
    () => console.log(`Reports listening on port ${dotenv.REPORT_PORT}`)
);

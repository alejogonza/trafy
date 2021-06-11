import express from 'express';
import cors from 'cors';
import router from './routes';
import { HttpResponse } from './libs/httpResponse';
import logger from 'morgan';

require("dotenv").config();

const app=express();

// MongoDB
require("./libs/database");
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1', router);

app.all('*', (req, res) => { res.status(HttpResponse.BAD_REQUEST.STATUS).send(HttpResponse.BAD_REQUEST.MESSAGE) });

module.exports = app;
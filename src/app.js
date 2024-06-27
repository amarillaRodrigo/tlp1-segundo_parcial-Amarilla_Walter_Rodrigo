import express from "express";
import {database} from "./db.js"


const app = express();
const PORT = 5000;

app.listen(PORT, console.log('Server is on port:', PORT))



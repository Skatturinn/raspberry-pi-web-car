const express = require('express');
const { dirname, join } = require('path');
const { fileURLToPath } = require('url');

const path = dirname(fileURLToPath(import.meta.url));
const app = express();


console.log('test')



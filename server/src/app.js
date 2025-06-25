require('dotenv').config();

const { POST } = require('./configs/env.config');

const cors = require('cors');
const express = require('express');
const route = require('./routes/index.route');
const cookieParser = require('cookie-parser');
const sequelize = require('./configs/database.config');
const errorHandler = require('./middlewares/errorHandler.middleware');

const port = POST;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.set('trust proxy', true);

// Check connect Database
sequelize
    .authenticate()
    .then(() => console.log('Kết nối MySQL thành công'))
    .catch((err) => console.error('Lỗi kết nối MySQL:', err));

// Route init
route(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorHandler);

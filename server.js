// import dotenv from 'dotenv';
// import app from './app.js';
// import { startServer } from './config/hapi.js';

// dotenv.config();

// const PORT = process.env.PORT || 8754;

// // Start Express app
// app.listen(PORT, () => {
//     console.log(`Express Server running on port ${PORT}`);
// });

// // Start Hapi server + cron jobs
// startServer();


import app from './app.js';
import dotenv from 'dotenv';
import { startAddonCron } from './crons/addonCron.js';

dotenv.config();

startAddonCron()

const PORT = process.env.PORT || 8754;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

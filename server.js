import app from './app.js';
import dotenv from 'dotenv';
import { startAddonCron } from './crons/addonCron.js';

dotenv.config();

startAddonCron()

const PORT = process.env.PORT || 8754;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

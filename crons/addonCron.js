import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export function startAddonCron() {
    // Runs Every Night 12 O' Clock
    // cron.schedule('0 0 * * *', async () => {
    cron.schedule('35 5,17 * * *', async () => {
        // Runs every 1 minute
        // cron.schedule('*/1 * * * *', async () => {
        // ✅ Runs every day at 12:32 PM
        // cron.schedule('32 12 * * *', async () => {
        // const url = `${process.env.MAIN_API_URL}/api/testing-cron`; // ✅ FIXED URL
        const url = `${process.env.MAIN_API_URL}/api/add-addon`; // ✅ FIXED URL

        try {
            console.log('🕒 Cron: Triggering /add-addon route', url);
            await axios.post(url, {
                addOn: process.env.CRON_ADDON // 👈 Pass in request body
            });
        } catch (err) {
            console.error('❌ Cron failed:', err.message);
        }
    }, {
        timezone: "Asia/Kolkata" // ✅ ensures 5:30 AM IST, not server time
    });

    // Runs every 1 minute
    cron.schedule('*/1 * * * *', async () => {

        const url = `${process.env.MAIN_API_URL}/api/testing-cron`; // ✅ FIXED URL

        try {
            console.log('🕒 Cron: Triggering /add-addon route', url);
            await axios.post(url, {
                addOn: process.env.CRON_ADDON // 👈 Pass in request body
            });
        } catch (err) {
            console.error('❌ Cron failed:', err.message);
        }
    }, {
        timezone: "Asia/Kolkata" // ✅ ensures 5:30 AM IST, not server time
    });

    cron.schedule('35 11,23 * * *', async () => {
        const url = `${process.env.MAIN_API_URL}/api/testing-check-time`;
        try {
            console.log('🕒 Cron: Triggering /testing-check-time route', url, new Date().toString());
            await axios.post(url, { addOn: process.env.CRON_ADDON });
        } catch (err) {
            console.error('❌ Cron failed:', err.message);
        }
    }, {
        timezone: "Asia/Kolkata"   // change to your desired TZ
    });
}

// import Hapi from '@hapi/hapi';
// import HapiCron from 'hapi-cron';
// import dotenv from 'dotenv';
// import axios from 'axios';
// dotenv.config();

// let server; // will hold our Hapi server instance

// // Function to register cron jobs
// export async function registerCronJobs() {
//     if (!server) {
//         throw new Error('Hapi server is not initialized');
//     }

//     await server.register({
//         plugin: HapiCron,
//         options: {
//             jobs: [
//                 // Example cron job hitting local route
//                 {
//                     name: 'exampleJob',
//                     time: '*/1 * * * *', // every 1 minute
//                     timezone: 'Europe/Rome', // ✅ REQUIRED
//                     request: {
//                         method: 'GET',
//                         url: '/' // hits local root route
//                     },
//                     onComplete: (res) => {
//                         console.log('*** exampleJob executed ***', res);
//                     }
//                 },

//                 // Your addon cron job (POST to external API)
//                 {
//                     name: 'addAddonJob',
//                     time: '0 0 * * *', // every night at 12:00 AM
//                     timezone: 'Europe/Rome',
//                     request: {
//                         method: 'POST',
//                         url: '/addon-job', // this route will handle the axios call
//                         payload: {
//                             addOn: process.env.CRON_ADDON
//                         }
//                     },
//                     onComplete: (res) => {
//                         console.log('*** addAddonJob executed ***', res);
//                     }
//                 }
//             ]
//         }
//     });

//     console.log('✅ HapiCron jobs registered');
// }

// // Function to create and start Hapi server
// export async function startServer() {
//     server = Hapi.server({
//         port: process.env.PORT || 8754,
//         host: 'localhost'
//     });

//     // Root route
//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: (request, h) => 'Hello World!'
//     });

//     // Route to handle addon cron job
//     server.route({
//         method: 'POST',
//         path: '/addon-job',
//         handler: async (request, h) => {
//             try {
//                 const { addOn } = request.payload;
//                 const url = `${process.env.MAIN_API_URL}/api/add-addon`;

//                 console.log('🕒 Cron: Triggering /add-addon route', url);
//                 // await axios.post(url, { addOn });

//                 return { success: true };
//             } catch (err) {
//                 console.error('❌ Cron failed:', err.message);
//                 return { success: false, error: err.message };
//             }
//         }
//     });

//     await server.start();
//     console.log(`Hapi Server running on ${server.info.uri}`);
//     return server;
// }
import Hapi from '@hapi/hapi';
import HapiCron from 'hapi-cron';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

let server; // Hapi server instance

export async function startServer() {
    server = Hapi.server({
        port: process.env.HAPI_PORT || 8755,
        host: 'localhost'
    });

    // Root route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => 'Hapi server running!'
    });

    // Route to handle the addon cron POST
    server.route({
        method: 'POST',
        path: '/addon-job',
        handler: async (request, h) => {
            const url = `${process.env.MAIN_API_URL}/api/add-addon`;
            try {
                console.log('🕒 Cron: Triggering /add-addon route', url);
                // await axios.post(url, { addOn: process.env.CRON_ADDON });
                return { success: true };
            } catch (err) {
                console.error('❌ Cron failed:', err.message);
                return { success: false, error: err.message };
            }
        }
    });

    // Register HapiCron jobs
    await server.register({
        plugin: HapiCron,
        options: {
            jobs: [
                {
                    name: 'addAddonJob',
                    time: '0 0 * * *', // every night at 12:00 AM
                    timezone: 'Europe/Rome',
                    request: {
                        method: 'POST',
                        url: '/addon-job',
                        payload: {
                            addOn: process.env.CRON_ADDON
                        }
                    },
                    onComplete: (res) => {
                        console.log('*** addAddonJob executed ***', res);
                    }
                },

                // Test job — runs every 1 minute for testing only
                {
                    name: 'testJob',
                    time: '*/1 * * * *', // every minute
                    timezone: 'Europe/Rome',
                    request: {
                        method: 'POST',
                        url: '/testing-cron',
                        payload: { addOn: process.env.CRON_ADDON }
                    },
                    onComplete: async () => {
                        try {
                            const res = await axios.post(`http://localhost:${process.env.PORT || 8754}/api/testing-cron`, {
                                addOn: process.env.CRON_ADDON
                            });
                            console.log('✅ Cron job called Express route', res.data);
                        } catch (err) {
                            console.error('❌ Cron job failed', err.message);
                        }
                    }
                }
            ]
        }
    });

    await server.start();
    console.log(`Hapi Server running on ${server.info.uri}`);
    return server;
}
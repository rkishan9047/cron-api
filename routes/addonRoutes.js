import express from 'express';
import { addAddon } from '../controllers/addonController.js';

const router = express.Router();

router.post('/add-addon', addAddon);
router.post('/testing-cron', (req, res) => {
  console.log(req.body,"Req.body")
  console.log("✅ 1 Minute Cron route hit successfully");
  return res.json({ message: "Success Cron Done" });
});


export default router;

import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/stats
router.get('/', (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM Leads').get().count;
    const newCount = db.prepare("SELECT COUNT(*) as count FROM Leads WHERE status = 'New'").get().count;
    const contacted = db.prepare("SELECT COUNT(*) as count FROM Leads WHERE status = 'Contacted'").get().count;
    const closed = db.prepare("SELECT COUNT(*) as count FROM Leads WHERE status = 'Closed'").get().count;

    res.json({
      success: true,
      data: {
        totalLeads: total,
        newLeads: newCount,
        contactedLeads: contacted,
        closedLeads: closed,
      },
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

export default router;

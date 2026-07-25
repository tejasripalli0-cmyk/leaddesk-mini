import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import db from '../db.js';

const router = Router();

const BUDGET_OPTIONS = [
  'Below ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  'Above ₹50,000',
];

const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];

const leadValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),
  body('budget')
    .trim()
    .notEmpty()
    .withMessage('Budget is required')
    .isIn(BUDGET_OPTIONS)
    .withMessage('Invalid budget option'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be at least 10 characters'),
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// POST /api/leads - Create Lead
router.post('/', leadValidationRules, handleValidation, (req, res) => {
  try {
    const { name, email, budget, message } = req.body;
    const stmt = db.prepare(
      `INSERT INTO Leads (name, email, budget, message) VALUES (?, ?, ?, ?)`
    );
    const info = stmt.run(name, email, budget, message);
    const lead = db.prepare(`SELECT * FROM Leads WHERE id = ?`).get(info.lastInsertRowid);

    res.status(201).json({ success: true, message: 'Lead created successfully', data: lead });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ success: false, message: 'Failed to create lead' });
  }
});

// GET /api/leads - Get All Leads (supports search/filter/sort via query params)
router.get('/', (req, res) => {
  try {
    const { name, email, budget, status, sort } = req.query;

    let query = 'SELECT * FROM Leads WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (email) {
      query += ' AND email LIKE ?';
      params.push(`%${email}%`);
    }
    if (budget) {
      query += ' AND budget = ?';
      params.push(budget);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += sort === 'oldest' ? ' ORDER BY createdAt ASC' : ' ORDER BY createdAt DESC';

    const leads = db.prepare(query).all(...params);
    res.json({ success: true, data: leads });
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
});

// PATCH /api/leads/:id - Update Status
router.patch(
  '/:id',
  [
    body('status')
      .trim()
      .notEmpty()
      .withMessage('Status is required')
      .isIn(STATUS_OPTIONS)
      .withMessage('Invalid status value'),
  ],
  handleValidation,
  (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const existing = db.prepare(`SELECT * FROM Leads WHERE id = ?`).get(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }

      db.prepare(`UPDATE Leads SET status = ? WHERE id = ?`).run(status, id);
      const updated = db.prepare(`SELECT * FROM Leads WHERE id = ?`).get(id);

      res.json({ success: true, message: 'Status updated', data: updated });
    } catch (err) {
      console.error('Error updating lead:', err);
      res.status(500).json({ success: false, message: 'Failed to update lead' });
    }
  }
);

export default router;

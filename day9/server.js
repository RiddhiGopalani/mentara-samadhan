const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// multer config
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// validation schema
const studentSchema = Joi.object({
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().allow('', null),
  roll_number: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
  class: Joi.string().allow('', null),
  section: Joi.string().allow('', null),
  dob: Joi.string().allow('', null)
});

function buildSearchQuery(q) {
  return (builder) => {
    if (!q) return;
    builder.where(function() {
      this.where('first_name', 'like', `%${q}%`)
        .orWhere('last_name', 'like', `%${q}%`)
        .orWhere('roll_number', 'like', `%${q}%`)
        .orWhere('email', 'like', `%${q}%`);
    });
  };
}

app.get('/api/students', async (req, res) => {
  try {
    const q = req.query.q || '';
    const page = parseInt(req.query.page || '1', 10);
    const limit = Math.min(parseInt(req.query.limit || '10', 10), 100);
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'created_at:desc';
    const [sortField, sortDir] = sort.split(':');

    const totalQuery = knex('students').count('id as count').modify(buildSearchQuery(q));
    const totalResult = await totalQuery;
    const total = totalResult[0].count || 0;

    const rows = await knex('students')
      .select('*')
      .modify(buildSearchQuery(q))
      .orderBy(sortField, sortDir === 'asc' ? 'asc' : 'desc')
      .limit(limit)
      .offset(offset);

    res.json({ data: rows, meta: { total: Number(total), page, limit } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await knex('students').where({ id: req.params.id }).first();
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const { error, value } = studentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const [id] = await knex('students').insert(value);
    const student = await knex('students').where({ id }).first();
    res.status(201).json(student);
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Email or roll_number already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const { error, value } = studentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const updated = await knex('students').where({ id: req.params.id }).update({
      ...value,
      updated_at: knex.fn.now()
    });

    if (!updated) return res.status(404).json({ error: 'Not found' });
    const student = await knex('students').where({ id: req.params.id }).first();
    res.json(student);
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Email or roll_number already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const deleted = await knex('students').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// upload profile pic
app.post('/api/students/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filePath = `/uploads/${req.file.filename}`;
    await knex('students').where({ id: req.params.id }).update({ profile_pic: filePath, updated_at: knex.fn.now() });
    const student = await knex('students').where({ id: req.params.id }).first();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));

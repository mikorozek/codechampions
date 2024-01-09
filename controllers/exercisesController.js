const pool = require('../db');

const get_exercises = async (req, res) => {
  console.log('sacxz');
  try {
    const result = await pool`SELECT * FROM exercises`;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sort_exercises = async (req, res) => {
  try {
    const validKeys = ["exercise_id", "name", "category", "difficulty"];
    const { key } = req.query;
    if (!validKeys.includes(key)) {
      return res.status(400).json({ error: 'Invalid sort key' });
    }
    const result = await pool`
      SELECT * 
      FROM exercises 
      ORDER BY ${pool(key)};`;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  get_exercises,
  sort_exercises,
};
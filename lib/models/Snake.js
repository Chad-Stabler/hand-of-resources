const pool = require('../utils/pool');

class Snake {
  id;
  common_name;
  avg_lifespan;
  is_danger_noodle;

  constructor(row) {
    this.id = row.id;
    this.common_name = row.common_name;
    this.is_danger_noodle = row.is_danger_noodle;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from snakes;');

    return rows.map(row => new Snake(row));
  }
}

module.exports = Snake;

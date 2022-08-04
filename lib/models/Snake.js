const pool = require('../utils/pool');

class Snake {
  id;
  common_name;
  avg_lifespan;
  is_danger_noodle;

  constructor(row) {
    this.id = row.id;
    this.common_name = row.common_name;
    this.avg_lifespan = row.avg_lifespan;
    this.is_danger_noodle = row.is_danger_noodle;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from snakes;');

    return rows.map(row => new Snake(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('select * from snakes where id=$1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Snake(rows[0]);
  }

  static async insert(snake) {
    const { rows } = await pool.query('insert into snakes (common_name, avg_lifespan, is_danger_noodle) values ($1, $2, $3) returning *;', [snake.common_name, snake.avg_lifespan, snake.is_danger_noodle]);

    return new Snake(rows[0]);
  }

  static async update(id, newAttrs) {
    const snek = await Snake.getById(id);

    if (!snek) return null;

    const updatedSnek = { ...snek, ...newAttrs };

    const { rows } = await pool.query('update snakes set common_name = $2, avg_lifespan = $3, is_danger_noodle = $4 where id = $1 returning*;', [id, updatedSnek.common_name, updatedSnek.avg_lifespan, updatedSnek.is_danger_noodle]);

    return new Snake(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('delete from snakes where id = $1 returning *;', [id]);

    return new Snake(rows[0]);
  }
}

module.exports = Snake;

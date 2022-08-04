const pool = require('../utils/pool');

class Fish {
  id;
  name;
  size;
  catch_difficulty;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.size = row.size;
    this.catch_difficulty = row.catch_difficulty;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from fish;');

    return rows.map(row => new Fish(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('select * from fish where id=$1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Fish(rows[0]);
  }

  static async insert(fish) {
    const { rows } = await pool.query('insert into fish (name, size, catch_difficulty) values ($1, $2, $3) returning *;', [fish.name, fish.size, fish.catch_difficulty]);

    return new Fish(rows[0]);
  }
}

module.exports = Fish;

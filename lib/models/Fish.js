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

  static async update(id, newAttrs) {
    const fish = await Fish.getById(id);

    if (!fish) return null;

    const updatedFish = { ...fish, ...newAttrs };

    const { rows } = await pool.query('update fish set name = $2, size = $3, catch_difficulty = $4 where id = $1 returning*;', [id, updatedFish.name, updatedFish.size, updatedFish.catch_difficulty]);

    return new Fish(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('delete from fish where id = $1 returning *;', [id]);

    return new Fish(rows[0]);
  }
}

module.exports = Fish;

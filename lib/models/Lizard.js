const pool = require('../utils/pool');


class Lizard {
  id;
  name;
  avg_size;
  handleable;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.avg_size = row.avg_size;
    this.handleable = row.handleable;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from lizards;');

    return rows.map(row => new Lizard(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('select * from lizards where id=$1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Lizard(rows[0]);
  }

  static async insert(lizard) {
    const { rows } = await pool.query('insert into lizards (name, avg_size, handleable) values ($1, $2, $3) returning *;', [lizard.name, lizard.avg_size, lizard.handleable]);

    return new Lizard(rows[0]);
  }

  static async update(id, newAttrs) {
    const lizard = await Lizard.getById(id);

    if (!lizard) return null;

    const updatedLiz = { ...lizard, ...newAttrs };

    const { rows } = await pool.query('update lizards set name = $2, avg_size = $3, handleable = $4 where id = $1 returning*;', [id, updatedLiz.name, updatedLiz.avg_size, updatedLiz.handleable]);

    return new Lizard(rows[0]);
  }

}

module.exports = Lizard;

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
}

module.exports = Lizard;

const pool = require('../utils/pool');

class Candy {
  id;
  name;
  type;
  consistency;
    
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.consistency = row.consistency;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from candy;');

    return rows.map(row => new Candy(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('select * from candy where id=$1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Candy(rows[0]);
  }
}

module.exports = Candy;

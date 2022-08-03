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
}

module.exports = Candy;

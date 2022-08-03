const pool = require('../utils/pool');


class Dog {
  id;
  name;
  age;
  is_cool;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.is_cool = row.is_cool;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from dogs;');

    return rows.map(row => new Dog(row));
  }
}

module.exports = Dog;

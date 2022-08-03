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

  static async getById(id) {
    const { rows } = await pool.query('select * from dogs where id=$1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Dog(rows[0]);
  }

  static async insert(dog) {
    const { rows } = await pool.query('insert into dogs (name, age, is_cool) values ($1, $2, $3) returning *;', [dog.name, dog.age, dog.is_cool]);

    return new Dog(rows[0]);
  }
}

module.exports = Dog;

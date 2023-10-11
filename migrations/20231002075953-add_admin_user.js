const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    const hash = await bcrypt.hash('password123', 10);
    return await db.collection('users').insertMany([
      {
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: hash,
      }
    ], {});
  },

  async down(db, client) {
    return await db.collection('users').deleteMany({});
  }
};

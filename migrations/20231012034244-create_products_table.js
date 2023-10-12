module.exports = {
  async up(db, client) {
    return await db.collection('products');
  },

  async down(db, client) {
    return await db.collection('products').deleteMany({});
  }
};

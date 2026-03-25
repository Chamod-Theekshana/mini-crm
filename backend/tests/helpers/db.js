const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  await Promise.all(Object.keys(collections).map((key) => collections[key].deleteMany({})));
};

module.exports = {
  connect,
  close,
  clear
};

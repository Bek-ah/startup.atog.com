const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const teacherCollection = db.collection('teacher');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(user) {
  return userCollection.findOne({ user: user });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ user: user.user }, { $set: user });
}
function getTeacher(teacher) {
  return teacherCollection.findOne({ teacher: teacher });
}

function getTeacherByToken(token) {
  return teacherCollection.findOne({ token: token });
}

async function addTeacher(teacher) {
  await teacherCollection.insertOne(teacher);
}

async function updateTeacher(teacher) {
  await teacherCollection.updateOne({ teacher: teacher.teacher }, { $set: teacher });
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

function getScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    limit: 100,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getTeacher,
  getTeacherByToken,
  addTeacher,
  updateTeacher,
  addScore,
  getScores,
};

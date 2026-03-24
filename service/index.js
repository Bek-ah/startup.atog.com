
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(express.static('public'));
const authCookieName = 'token';
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('user', req.body.user)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.user, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ user: user.user });
  }
});

// CreateAuth a new teacher
apiRouter.post('/auth/createTeacher', async (req, res) => {
  if (await findTeacher('teacher', req.body.teacher)) {
    res.status(409).send({ msg: 'Existing teacher' });
  } else {
    const teacher = await createTeacher(req.body.teacher, req.body.passwordT);
    setAuthCookie(res, teacher.token);
    res.send({ teacher: teacher.teacher });
  }
});

// GetAuth login an existing teacher
apiRouter.post('/auth/loginTeacher', async (req, res) => {
  const teacher = await findTeacher('teacher', req.body.teacher);
  if (teacher) {
    if (await bcrypt.compare(req.body.passwordT, teacher.passwordT)) {
      teacher.token = uuid.v4();
      await DB.updateTeacher(teacher);
      setAuthCookie(res, teacher.token);
      res.send({ teacher: teacher.teacher });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('user', req.body.user);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ user: user.user });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.delete('/auth/logoutTeacher', async (req, res) => {
  const teacher = await findTeacher('token', req.cookies[authCookieName]);
  if (teacher) {
    delete teacher.token;
    DB.updateTeacher(teacher);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};
// Middleware to verify that the user is a teacher
const verifyAuthTeacher = async (req, res, next) => {
  const teacher = await findTeacher('token', req.cookies[authCookieName]);
  if (teacher) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};
// GetScores
apiRouter.get('/teacher', verifyAuthTeacher, async (_req, res) => {
  const scores = await DB.getScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const scores = updateScores(req.body);
  res.send(scores);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// updateScores considers a new score for inclusion in the high scores.
async function updateScores(newScore) {
  await DB.addScore(newScore);
  return DB.getScores();
}

async function createUser(user, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const userData = {
    user: user,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(userData);

  return user;
}

async function createTeacher(teacher, passwordT) {
  const passwordHash = await bcrypt.hash(passwordT, 10);

  const teacherData = {
    teacher: teacher,
    passwordT: passwordHash,
    token: uuid.v4(),
  };
  await DB.addTeacher(teacherData);

  return teacher;
}

async function findUser(field, value) {
  if (!value) return null;
  if (field === 'token'){
      return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

async function findTeacher(field, value) {
  if (!value) return null;
  if (field === 'token'){
      return DB.getTeacherByToken(value);
  }
  return DB.getTeacher(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//nodeWebService
const http = require('http');
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Hello Node.js! [${req.method}] ${req.url}</h1>`);
  res.end();
});

server.listen(5000, () => {
  console.log(`Web service listening on port 5000`);
});
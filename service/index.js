
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(express.static('public'));
const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];
let teachers = [];

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
    console.log("entered api router password: ");
    const teacher = await createTeacher(req.body.teacher, req.body.passwordT);
    console.log("created Teacher, starting Cookie");
    setAuthCookie(res, teacher.token);
    res.send({ teacher: teacher.teacher });
  }
});

// GetAuth login an existing teacher
apiRouter.post('/auth/loginTeacher', async (req, res) => {
  const teacher = await findTeacher('teacher', req.body.teacher);
  console.log('Login attempt:', req.body);
  if (teacher) {
    if (await bcrypt.compare(req.body.passwordT, teacher.passwordT)) {
      teacher.token = uuid.v4();
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
  console.log('Login attempt:', req.body);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
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
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.delete('/auth/logoutTeacher', async (req, res) => {
  const teacher = await findTeacher('token', req.cookies[authCookieName]);
  if (teacher) {
    delete teacher.token;
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
apiRouter.get('/teacher', verifyAuthTeacher, (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
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
function updateScores(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

async function createUser(user, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const userData = {
    user: user,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(userData);

  return user;
}

async function createTeacher(teacher, passwordT) {
  console.log("password to hash: ", passwordT);
  const passwordHash = await bcrypt.hash(passwordT, 10);
  console.log("creating teacher");
  const teacherData = {
    teacher: teacher,
    passwordT: passwordHash,
    token: uuid.v4(),
  };
  teachers.push(teacherData);
  console.log("teachers: ", teachers);
  return teacher;
}

async function findUser(field, value) {
  if (!value) return null;
  for (const u in users) {
    if (users[u][field] === value){
      return users[u];
    }
  }
  return null;
}

async function findTeacher(field, value) {
  if (!value) return null;
  for (const t in teachers) {
    if (teachers[t][field] === value){
      return teachers[t];
    }
  }
  return null;
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

server.listen(port, () => {
  console.log(`Web service listening on port ${port}`);
});
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import db from './database.js';

const THRESHOLD = 2000;
const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);

  setTimeout(() => {
    next();
  }, delayTime);
});

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

app.get('/api/counter', (req, res) => {
  const counter = Number(req.query.latest);

  if (Math.floor(Math.random() * 10) <= 3) {
    res.status(400).send({
      status: 'Error',
      data: null,
    });
  } else {
    res.status(200).send({
      status: 'OK',
      data: counter + 1,
    });
  }
});

app.get('/api/users.json', (req, res) => {
  fs.readFile('./server/data/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send({
        status: 'Internal Server Error',
        message: err,
        data: null,
      });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON file:', parseErr);
      return res.status(500).send({
        status: 'Internal Server Error',
        message: parseErr,
        data: null,
      });
    }
  });
});

app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM Users';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }
    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`ready to ${port}`);
});

import InMemoDatabase from './inMemoDatabase.js';

//인메모리 데이터베이스, node 서버 껐다가 키면 사라지도록 db가 초기화 되도록 설정해둠.
const indb = new InMemoDatabase();

const employees = [
  {
    name: '홍길동',
    email: '765idoll@gmail.com',
    phone: '010-1234-5678',
    position: '사원',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '김길동',
    email: 'kimPhoneHi256@gmail.com',
    phone: '010-1234-5678',
    position: '대리',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
];

// employees 배열 안의 직원 정보들을 다 Employees 테이블에 넣음.
indb.insertEmployees(employees);

app.get('/api/employees', (req, res) => {
  indb.getAllEmployees((employees) => {
    res.json({
      status: 'OK',
      data: employees,
    });
  });
});

const attendances = [
  {
    name: '프론트',
    type: '조퇴',
    content: '조퇴 할래요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    type: '연차',
    content: '연차를 쓰고 싶어요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '고낙연',
    type: '기타',
    content: '기타 사유',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '젠슨황',
    type: '반차',
    content: '나 반차 쓴다.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '김나성',
    type: '조퇴',
    content: ' 급성 장염으로 질병 조퇴 요청합니다.',
  },
];

indb.insertAttendances(attendances);

app.get('/api/attendances', (req, res) => {
  indb.getAllAttendances((attendance) => {
    res.json({
      status: 'OK',
      data: attendance,
    });
  });
});

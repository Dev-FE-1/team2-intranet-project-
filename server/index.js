import express from 'express';
import morgan from 'morgan';
import { indb, initializeDatabase, galleryData } from './initalizeData.js';
import history from 'connect-history-api-fallback';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));

app.use(
  history({
    verbose: true,
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        },
      },
      {
        from: /^\/dist\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        },
      },
    ],
  }),
);

app.use(express.static('dist'));
app.use(express.json());

app.use(
  express.static(path.join(__dirname, '../dist'), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === '.css') {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.extname(filePath) === '.js') {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }),
);

//employees, attendances 테이블 데이터베이스 초기화
initializeDatabase();

app.get('/api/employees', cors(), (req, res) => {
  indb.getAllEmployees((employees) => {
    res.json({
      status: 'OK',
      data: employees,
    });
  });
});

app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  indb.getEmployeeById(id, (employee) => {
    res.json({
      status: 'OK',
      data: employee,
    });
  });
});

app.post('/api/employees', (req, res) => {
  const employee = req.body;
  indb.insertEmployee(employee);
  res.json({
    status: 'OK',
  });
});

app.put('/api/employees', (req, res) => {
  const employee = req.body;
  indb.updateEmployee(employee);
  res.json({
    status: 'OK',
  });
});

app.get('/api/attendances', (req, res) => {
  indb.getAllAttendances((attendance) => {
    res.json({
      status: 'OK',
      data: attendance,
    });
  });
});

app.get('/api/v2/users', (req, res) => {
  res.json({
    user: {
      1234: {
        userId: '1234',
        userPassword: 'password',
        userName: '홍길동',
        userEmail: 'hong@gmail.com',
        userPhone: '123-456-7890',
        userPosition: '차장',
      },
      4567: {
        userId: '4567',
        userPassword: 'password',
        userName: '세종대왕',
        userEmail: 'se@gmail.com',
        userPhone: '098-765-4321',
        userPosition: '부장',
      },
    },
  });
});

app.get('/api/gallery/contents', (req, res) => {
  res.json({
    status: 'OK',
    data: galleryData,
  });
});

app.listen(port, () => {
  console.log(`ready to ${port}`);
});

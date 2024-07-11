import { container } from './container.js';
import express from 'express';
import history from 'connect-history-api-fallback';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import { indb, initializeDatabase } from './initalizeData.js';
import date from 'date-and-time';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
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

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }),
);

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

// 서버 포트 지정
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// api/v1/users, api/v1/attendance, api/v1/gallery 라우팅
const userController = container.resolve('userController');
app.use('/api/v1/users', userController.router);

const attendanceController = container.resolve('attendanceController');
app.use('/api/v1/attendance', attendanceController.router);

const galleryController = container.resolve('galleryController');
app.use('/api/v1/gallery', galleryController.router);

//employees, attendances 테이블 데이터베이스 초기화
initializeDatabase();

// api/ 경로들 라우팅
app.get('/api/employees', (req, res) => {
  indb.getAllEmployees((employees) => {
    res.json({
      status: 'OK',
      data: employees,
    });
  });
});

app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  console.log(`/api/employees/${id} 라우팅 확인`);
  indb.getEmployeeById(id, (employee) => {
    res.json({
      status: 'OK',
      data: employee,
    });
  });
});

app.post('/api/employees', (req, res) => {
  const employee = req.body;
  console.log(employee);
  indb.insertEmployee(employee);
  res.json({
    status: 'OK',
  });
});

app.put('/api/employees', (req, res) => {
  const employee = req.body;
  console.log(employee);
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

//시간값 넣기
app.post('/api/employees/setTime', async(req, res) => {
  

  //초기에 필요한 변수 세팅
  const dayPattern = 'YYYY-MM-DD';
  const insertingPattern = 'YYYY-MM-DD HH:mm:ss';

  //요청값에서 파생되는 변수
  const requestset=req.body

  const requestTime = requestset.INtime
  const requestId = requestset.employeeId
  const requestIntime =requestset.INtime
  const requestOuttime = requestset.OUTtime
  let requestStatus = Number(requestset.status)

  //db에서 꺼내온 값에서 파생된 변수
  const latesTimeset = await indb.getTime(requestset.employeeId)
  const latestStatus = latesTimeset.status
  const latestIntime = latesTimeset.INtime
  const latestParsedOutDay = date.parse(latesTimeset.OUTtime,dayPattern)

  const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
  const formattedNow = date.format(now, insertingPattern)
  const parsedNow = date.parse(formattedNow,dayPattern)




  if (requestStatus == latestStatus) {
    switch (requestStatus) {
      case 0:
        try {
          requestStatus += 1;
          const result = await indb.updateTime(requestId, formattedNow,"" , requestStatus);
          const checkData = await indb.getTime(requestId)
          console.log(checkData)
          console.log("상태 0 - 업무 시작 시간 입력 완료");
          res.status(200).json(result)
        } catch (error) {
          console.error("Error setting time:", error);
          res.status(500).json({
            message: "업무 시작 시간 입력 중 오류 발생",
            error: error.message
          });
        }
        break;
  
      case 1:
        try {
          requestStatus += 1;
          const result = await indb.updateTime(requestId, latestIntime, formattedNow, requestStatus);
          const checkData = await indb.getTime(requestId)
          console.log(`체크 데이터 ${checkData}`)
          console.log("상태 1 - 업무 종료 시간 입력 완료");
          res.status(200).json(result)
        } catch (error) {
          console.error("Error setting time:", error);
          res.status(500).json({
            message: "업무 종료 시간 입력 중 오류 발생",
            error: error.message
          });
        }
        break;

      case 2:
        console.log('현재시간')
        console.log(formattedNow)
        console.log('현재날짜')
        console.log(parsedNow)
        console.log('최근기록시간')
        console.log(latesTimeset.OUTtime)
        console.log('최근기록날짜')
        console.log(latestParsedOutDay)
        if(parsedNow>latestParsedOutDay){
          console.log("로직 통과 새 데이터 row를 삽입합니다")
        }else(
          console.log("로직 통과 실패")
        )
        //createTime
        break;
    }
  } else {
    console.error('데이터 값 이상 -status값이 다름');
  }

})

//시간값 꺼내기
app.get('/api/employees/getTime/:id', async(req, res) => {
  const id = req.params.id;
  console.log(`/api/employees/getTime/${id} 라우팅 확인`);
  const result = await indb.getTime(id);
  res.status(200).json(result)
});

//아이디 비밀번호 체크
app.post('/api/employees/loginCheck', (req, res) => {
  const employee = req.body;
  console.log(employee);
  indb.getEmployeeByIdPw(employee.username, employee.password, (employee) => {
    res.json({
      status: 'OK',
      data: employee,
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

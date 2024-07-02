-- SQLite

-- 외래키 제약 조건 옵션 허용
PRAGMA foreign_keys;
PRAGMA foreign_keys = ON;

-- 출근 시간
CREATE TABLE IF NOT EXISTS time_punch (
    internal_id integer PRIMARY KEY,
    punch_in text current_timestamp,
    punch_out text current_timestamp,
    FOREIGN KEY (internal_id) REFERENCES users(internal_id)
);

-- 직원 정보
CREATE TABLE IF NOT EXISTS users (
    internal_id integer primary key,
    user_id text KEY unique,
    password TEXT not null ,
    name TEXT not null,
    email TEXT,
    position TEXT,
    phone TEXT,
    img TEXT
);

-- 삭제된 직원 정보
CREATE TABLE IF NOT EXISTS deleted_users (
    internal_id integer primary key,
    user_id text PRIMARY KEY unique,
    password TEXT not null ,
    name TEXT not null,
    email TEXT,
    position TEXT,
    phone TEXT,
    img TEXT
);


-- 근태 신청
create table if not exists attendance(
    attendance_id integer PRIMARY KEY,
    internal_id TEXT not null,
    title text,
    content text,
    attendance_date text,
    attendance_days integer,
    attendance_type text,
    attendance_apply_time text current_timestamp,
    FOREIGN KEY (internal_id) REFERENCES users(internal_id)
);

-- 관리자 계정
create table if not exists manager(
    manager_id TEXT PRIMARY KEY,
    internal_id TEXT unique,
    FOREIGN KEY (internal_id) REFERENCES users(internal_id)
);


-- 갤러리 공지사항
create table if not exists gallery_notification(
    notification_id integer PRIMARY KEY,
    manager_id TEXT,
    title TEXT,
    FOREIGN KEY (manager_id) REFERENCES manager(manager_id)
);



-- 직원 로그인 --
select user_id, password, name, email, position, phone, img
from users where user_id = 'C1234';

-- 관리자 로그인
select manager_id, internal_id
from manager where manager_id = 'M1234';

-- 직원 CRUD --
-- 직원 등록
insert into users(user_id, password, name) values('C1234', '12345','고낙연');

-- 직원 정보 조회
----특정 직원 조회
select user_id, password, name, email, position, phone, img
from users u
where u.user_id = 'C1234';
---- 전체 직원 조회
select *
from users;


-- 직원 정보 수정
---- 관리자의 직원 정보 수정
update users
set user_id = 'C1235',
    password='2345',
    email='dada@company.com',
    phone='010-1234-5679',
    position = '부장'
where user_id = 'C1234';
---- 직원의 직원 정보 수정
update users
set
    password='2345',
    email='dada@company.com',
    phone='010-1234-5679'
where user_id = 'C1234';


-- 직원 삭제
---- 삭제된 직원 백업
insert into deleted_users
select *
from users where user_id='C1235';
--- 직원 목록에서 삭제
delete
from users
where user_id = 'C1235';


-- 근태신청 CRUD

-- 근태 신청 하기
select u.internal_id
from users u
where u.user_id = 'C1235';

insert into attendance(internal_id, title, content, attendance_date, attendance_type)
values((select u.internal_id from users u where u.user_id = 'C1235'),
       '근태신청합니다',
       '친정어머니 생신으로 연차 신청합니다.'
        '2024-04-06',

      )



-- select *
-- from time_punch;

-- drop table if exists time_punch;
-- drop table if exists users;

-- select *
-- from users;
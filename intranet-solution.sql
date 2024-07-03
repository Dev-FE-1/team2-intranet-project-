

from manager where manager_id = 'M1234';
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

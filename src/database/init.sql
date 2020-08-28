begin transaction;
CREATE TABLE users (
  id integer primary key autoincrement,
  username varchar(30) not null unique,
  email varchar(40) not null unique,
  password varchar(100) not null
);

insert into users values(1, 'diana', 'diana@test.com', '1234');
commit;

CREATE TABLE blogs (
  	id SERIAL PRIMARY KEY,
  	author text,
  	url text NOT NULL,
  	title text NOT NULL,
  	likes int DEFAULT 0
);
  insert into blogs (author, url, title) values ('Michael', 'http://www.michaelohayon.com', 'random blog title');
  insert into blogs (author, url, title, likes) values ('canary', 'no website :(', 'best bird songs for new hatchlings', 9001);

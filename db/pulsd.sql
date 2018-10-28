DROP DATABASE IF EXISTS pulsd;
CREATE DATABASE pulsd;

\c pulsd;


DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR, 
  product_description VARCHAR,
  price Smallmoney
);

INSERT INTO events (product_name, price, product_description)
    VALUES('Party on the brooklyn bridge', 'Come have fun on the brooklyn bridge with some drink and friends', $100.00)
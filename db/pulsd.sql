DROP DATABASE IF EXISTS pulsd;
CREATE DATABASE pulsd;

\c pulsd;


DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR, 
  product_description VARCHAR,
  price Decimal,
  dateCreated timestamp without time zone DEFAULT now()
);

INSERT INTO events (product_name, product_description, price)
    VALUES('Party on the brooklyn bridge', 'Come have fun on the brooklyn bridge with some drink and friends', 100.00),
    ('Party on the Williamsburg bridge', 'Come have fun on the Williamsburg bridge with some drink and friends', 200.00)
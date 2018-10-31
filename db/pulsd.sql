DROP DATABASE IF EXISTS pulsd;
CREATE DATABASE pulsd;

\c pulsd;


DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR, 
  product_description VARCHAR,
  price Decimal,
  startTime time without time zone,
  endTime time without time zone, 
  timezone VARCHAR,
  date_created timestamp DEFAULT (current_timestamp AT TIME ZONE 'EST')
);

INSERT INTO events (product_name, product_description, price, startTime, endTime, timezone)
    VALUES('Party on the brooklyn bridge', 'Come have fun on the brooklyn bridge with some drink and friends', 100.00, '0405', '1405', 'America/New_York'),
    ('Party on the Williamsburg bridge', 'Come have fun on the Williamsburg bridge with some drink and friends', 200.00, '0405', '1405', 'America/New_York')
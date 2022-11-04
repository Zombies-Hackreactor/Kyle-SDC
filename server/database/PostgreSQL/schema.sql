CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  text VARCHAR(500) NOT NULL,
  recommend BOOLEAN NOT NULL,
  response VARCHAR(500),
  date DATE,
  name VARCHAR(30),
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS review_photos (
id SERIAL PRIMARY KEY NOT NULL,
review_id VARCHAR(10) FOREIGN KEY NOT NULL,
url VARCHAR(10) FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
id SERIAL PRIMARY KEY NOT NULL,
characteristic_id INT NOT NULL,
review_id INT NOT NULL,
value INT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristics (
id SERIAL PRIMARY KEY NOT NULL,
product_id INT NOT NULL,
name VARCHAR(20) NOT NULL
);

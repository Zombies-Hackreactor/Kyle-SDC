CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  text VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  response VARCHAR(500),
  date bigint,
  reviewer_name VARCHAR(30),
  reviewer_email VARCHAR(100),
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS review_photos (
id SERIAL PRIMARY KEY NOT NULL,
review_id VARCHAR(10) FOREIGN KEY NOT NULL,
url VARCHAR(200) FOREIGN KEY
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

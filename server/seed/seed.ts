import { Pool } from 'pg'

// Connect to database
const myPool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'SDC',
  password: process.env.DBPASS,
  port: 5432,
})

// SEED REVIEWS DATA

// \COPY reviews(review_id, product_id, rating, date, title, text, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/kyle/hackreactor/SDC/zombies/server/seed/reviews.csv' DELIMITER ',' CSV HEADER;

// \COPY review_photos(id, review_id, url) FROM '/Users/kyle/hackreactor/SDC/zombies/server/seed/reviews_photos.csv' DELIMITER ',' CSV HEADER;

// \COPY characteristics(id, product_id, name) FROM '/Users/kyle/hackreactor/SDC/zombies/server/seed/characteristics.csv' DELIMITER ',' CSV HEADER;

// \COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/Users/kyle/hackreactor/SDC/zombies/server/seed/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

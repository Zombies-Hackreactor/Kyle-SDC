import { Client, Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const db = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
})
// const db = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   port: 5432,
//   database: 'SDC',
//   password: 'PASSWORD',
// })

db.connect((err: any) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

export async function getReviews(id: number, count = 5, sort = 'newest', cb: any) {
  type Results = {
    product?: number
    count?: number
    results?: any
  }
  const output: Results = {
    product: id,
    count: count,
  }
  if (sort === 'newest') {
    // put newest query here
    const reviews: any = await db.query(
      `SELECT review_id,product_id, rating, title, text, recommend, response, reviewer_name, helpfulness, reviewer_email, TO_TIMESTAMP(date/1000) AS date FROM reviews WHERE product_id = ${id} ORDER BY date DESC`
    )
    await Promise.all(
      reviews.rows.map(async (review: any, index: number) => {
        const outcome = await db.query(
          `SELECT review_id, COALESCE (json_agg( json_build_object ('id', id, 'url', url)), '[]') FROM review_photos WHERE review_id = ${review.review_id} GROUP BY review_id`
        )
        if (outcome.rows.length === 0) {
          reviews.rows[index].photos = []
        } else {
          reviews.rows[index].photos = outcome.rows[0].coalesce
        }
      })
    )
    cb(reviews.rows)
  }
  if (sort === 'helpful') {
    const reviews: any = db.query(
      `SELECT review_id,product_id, rating, title, text, recommend, response, reviewer_name, helpfulness, reviewer_email, TO_TIMESTAMP(date/1000) AS timestamp FROM reviews WHERE product_id = ${id} ORDER BY helpfulness DESC`
    )
    await Promise.all(
      reviews.rows.map(async (review: any, index: number) => {
        const outcome = await db.query(
          `SELECT review_id, COALESCE (json_agg( json_build_object ('id', id, 'url', url)), '[]') FROM review_photos WHERE review_id = ${review.review_id} GROUP BY review_id`
        )
        if (outcome.rows.length === 0) {
          reviews.rows[index].photos = []
        } else {
          reviews.rows[index].photos = outcome.rows[0].coalesce
        }
      })
    )
  }
  if (sort === 'relevant') {
    // put relevant query here
    cb(output)
  }
}

export async function incHelpfulness(id: number, cb: any) {
  db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${id}`)
    .then(() => {
      cb()
    })
    .catch((err: any) => {
      if (err) {
        cb(err)
      }
    })
}

export async function addReview(formData: any, cb: any) {
  db.query('SELECT review_id FROM reviews order by review_id desc limit 1')
    .then((newID) => {
      newID = newID.rows[0].review_id + 1
      db.query(
        `INSERT INTO reviews (product_id, rating, title, text, recommend, reviewer_name, reviewer_email, date, review_id) VALUES (
        ${formData.product_id},
        ${formData.rating},
        ${formData.summary},
        ${formData.body},
        ${formData.recommend},
        ${formData.name},
        ${formData.email},
        ${Date.now()},
        ${newID})`
      )
      db.query(`INSERT INTO review_photos (url, review_id) VALUES (${formData.photos}, ${newID})`)
    })
    .catch((err: any) => {
      console.log('err', err)
      cb(err)
    })
    .then(() => {
      cb()
    })
}

export async function reportReview(id: number, cb: any) {
  db.query(`UPDATE reviews SET reported = true WHERE review_id = ${id}`)
    .then(() => {
      cb()
    })
    .catch((err: any) => {
      console.log('err', err)
      cb(err)
    })
}

export async function getMeta(id: number, cb: any) {
  const output: any = {
    product_id: id,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    recommended: {},
    characteristics: {},
  }
  const ratings = await db.query(`SELECT rating FROM reviews WHERE product_id = ${id}`)
  ratings.rows.map((review: any) => {
    output.ratings[String(review.rating)]++
  })
  const recommend = await db.query(
    `SELECT product_id, COALESCE(JSON_BUILD_OBJECT(true, COUNT(*) filter (where recommend), false, COUNT(*) filter (where not recommend))) FROM reviews WHERE product_id = ${id} GROUP BY product_id`
  )
  if (recommend.rows.length !== 0) {
    output.recommended = recommend.rows[0].coalesce
  }
  const characteristics = await db.query(`SELECT * FROM characteristics WHERE product_id = ${id}`)
  await Promise.all(
    characteristics.rows.map(async (char: any) => {
      const characteristic_reviews = await db.query(
        `SELECT characteristic_id AS id, AVG(value) AS value FROM characteristic_reviews WHERE characteristic_id = ${char.id} GROUP BY characteristic_id`
      )
      output.characteristics[char.name] = characteristic_reviews.rows[0]
    })
  )
  cb(output)
}

export default {
  getMeta,
  getReviews,
  addReview,
  incHelpfulness,
  reportReview,
}

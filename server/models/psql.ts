import { Client, Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const db = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'SDC',
  password: process.env.DBPASS,
})

db.connect((err) => {
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
    db.query(
      `SELECT review_id,product_id, rating, title, text, recommend, response, reviewer_name, helpfulness, reported, reviewer_email, TO_TIMESTAMP(date/1000) AS date FROM reviews WHERE product_id = ${id} ORDER BY date DESC`,
      (err, result) => {
        cb(result.rows)
      }
    )
  }
  if (sort === 'helpful') {
    db.query(
      `SELECT review_id,product_id, rating, title, text, recommend, response, reviewer_name, helpfulness, reported, reviewer_email, TO_TIMESTAMP(date/1000) AS timestamp FROM reviews WHERE product_id = ${id} ORDER BY helpfulness DESC`,
      (err, result) => {
        cb(result.rows)
      }
    )
    cb(output)
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

// export async function getMeta(id: number, cb: any) {}

export default {
  // getMeta,
  getReviews,
  addReview,
  incHelpfulness,
  reportReview,
}

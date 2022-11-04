// import db from '../database/MongoDB/db'
import { reviewModel } from '../database/MongoDB/db'

export default async function getReviews(id: number, count = 5, sort = 'newest', cb: any) {
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
    await reviewModel
      .find(
        { product_id: id, reported: false },
        { _id: 0, product_id: 0, reported: 0 },
        { limit: count }
      )
      .sort({ date: -1 })
      .then((results: object) => {
        output.results = results
      })
    cb(output)
  }
  if (sort === 'helpful') {
    await reviewModel
      .find(
        { product_id: id, reported: false },
        { _id: 0, product_id: 0, reported: 0 },
        { limit: count }
      )
      .sort({ helpfulness: -1 })
      .then((results: object) => {
        output.results = results
      })
    cb(output)
  }
  if (sort === 'relevant') {
    cb(output)
  }
}

import { reviewModel } from '../database/MongoDB/db'

export async function getMeta(id: number, cb: any) {}

export async function addReview(formData: any, cb: any) {
  reviewModel
    .find()
    .sort({ review_id: -1 })
    .limit(1)
    .exec((err, data: any) => {
      const newID = data[0].review_id + 1
      reviewModel
        .create({
          product_id: formData.product_id,
          rating: formData.rating,
          summary: formData.summary,
          body: formData.body,
          recommend: formData.recommend,
          name: formData.name,
          email: formData.email,
          photos: formData.photos,
          characteristics: formData.characteristics,
          date: Date.now(),
          review_id: newID,
        })
        .catch((err) => {
          cb(err)
        })
        .then(() => {
          cb()
        })
    })
}

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

export async function incHelpfulness(id: number, cb: any) {
  reviewModel
    .updateOne({ review_id: id }, { $inc: { helpfulness: 1 } })
    .catch((err: any) => {
      cb(err)
    })
    .then(() => {
      cb()
    })
}

export async function reportReview(id: number, cb: any) {
  reviewModel
    .updateOne({ review_id: id }, { reported: true })
    .catch((err: any) => {
      cb(err)
    })
    .then(() => {
      cb()
    })
}

export default {
  getMeta,
  getReviews,
  addReview,
  incHelpfulness,
  reportReview,
}

import { reviewModel } from '../database/MongoDB/db'

export default async function addReview(formData: any, cb: any) {
  let currID: any
  reviewModel
    .find()
    .sort({ review_id: -1 })
    .limit(1)
    .then((result: any) => {
      currID = result[0].review_id
    })
    .then(() => {
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
          review_id: currID + 1,
        })
        .then((err) => {
          if (err) {
            cb(err)
          } else {
            cb()
          }
        })
    })
}

import { reviewModel } from '../database/MongoDB/db'

export default async function addReview(formData: any, cb: any) {
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
        .then((err) => {
          if (err) {
            cb(err)
          } else {
            cb()
          }
        })
    })
}

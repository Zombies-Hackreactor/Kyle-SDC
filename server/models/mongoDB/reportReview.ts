import { reviewModel } from '../../database/MongoDB/db'

export default async function reportReview(id: number, cb: any) {
  reviewModel
    .updateOne({ review_id: id }, { reported: true })
    .catch((err: any) => {
      cb(err)
    })
    .then(() => {
      cb()
    })
}

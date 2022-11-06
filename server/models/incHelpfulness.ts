import { reviewModel } from '../database/MongoDB/db'

export default async function incHelpfulness(id: number, cb: any) {
  reviewModel
    .updateOne({ review_id: id }, { $inc: { helpfulness: 1 } })
    .catch((err) => {
      if (err) {
        cb(err)
      }
    })
    .then(() => {
      cb()
    })
}

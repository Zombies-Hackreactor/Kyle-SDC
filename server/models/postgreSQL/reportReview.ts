import { reviewModel } from '../../database/MongoDB/db'

export default async function reportReview(id: number, cb: any) {
    //put query here
    .catch((err: any) => {
      cb(err)
    })
    .then(() => {
      cb()
    })
}

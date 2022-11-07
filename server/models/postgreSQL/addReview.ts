import { reviewModel } from '../../database/MongoDB/db'

export default async function addReview(formData: any, cb: any) {
// put query here
        .catch((err) => {
          cb(err)
        })
        .then(() => {
          cb()
        })
    })
}

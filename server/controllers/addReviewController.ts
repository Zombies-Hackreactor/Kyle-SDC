import addReview from '../models/addReview'

export const addReviewController = (req: Request, res: Response) => {
  addReview(req.body, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.status(200).json('review added')
    }
  })
}

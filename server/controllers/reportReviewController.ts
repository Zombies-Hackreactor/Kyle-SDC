import reportReview from '../models/reportReview'

export const reportReviewController = (req: Request, res: Response) => {
  reportReview(req.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.status(201).json('review reported')
    }
  })
}

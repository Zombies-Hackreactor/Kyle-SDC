import reportReview from '../../models/mongoDB/reportReview'

export const reportReviewController = (req: Request, res: Response) => {
  reportReview(req.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(204)
    }
  })
}

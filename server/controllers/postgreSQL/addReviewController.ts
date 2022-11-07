import addReview from '../../models/mongoDB/addReview'

export const addReviewController = (req: Request, res: Response) => {
  addReview(req.body, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(201)
    }
  })
}

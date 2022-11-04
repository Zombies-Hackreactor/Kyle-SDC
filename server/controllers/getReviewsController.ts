import getReviews from '../models/getReviews'

export const getReviewsController = (req: Request, res: Response) => {
  console.log(req.params)
  getReviews(req.params.product_id, req.params.count, req.params.sort, (result: any) => {
    res.status(200).json(result)
  })
}

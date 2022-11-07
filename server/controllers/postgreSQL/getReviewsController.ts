import getReviews from '../../models/postgresql/getReviews'

export const getReviewsController = (req: Request, res: Response) => {
  getReviews(req.params.product_id, req.params.count, req.params.sort, (result: any) => {
    res.status(200).json(result)
  })
}

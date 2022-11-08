import { getReviews, incHelpfulness, getMeta, addReview, reportReview } from '../models/psql'

export const getReviewsController = (req: Request, res: Response) => {
  getReviews(req.params.product_id, req.params.count, req.params.sort, (result: any) => {
    res.status(200).json(result)
  })
}

export const incHelpfulnessController = (req: Request, res: Response) => {
  incHelpfulness(req.params.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(204)
    }
  })
}

export const getMetaController = (req: Request, res: Response) => {
  getMeta(req.params.product_id, (result: any) => {
    res.status(200).json(result)
  })
}

export const addReviewController = (req: Request, res: Response) => {
  addReview(req.body, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(201)
    }
  })
}

export const reportReviewController = (req: Request, res: Response) => {
  reportReview(req.params.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(204)
    }
  })
}

export default {
  getReviewsController,
  getMetaController,
  addReviewController,
  incHelpfulnessController,
  reportReviewController,
}

import { reportReview, incHelpfulness, getReviews, getMeta, addReview } from '@/models/psql'

export const reportReviewController = (req: Request, res: Response) => {
  reportReview(req.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(204)
    }
  })
}

export const incHelpfulnessController = (req: Request, res: Response) => {
  incHelpfulness(req.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(204)
    }
  })
}

export const getReviewsController = (req: Request, res: Response) => {
  getReviews(req.params.product_id, req.params.count, req.params.sort, (result: any) => {
    res.status(200).json(result)
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

export default {
  getReviewsController,
  getMetaController,
  addReviewController,
  incHelpfulnessController,
  reportReviewController,
}

import incHelpfulness from '../models/incHelpfulness'

export const incHelpfulnessController = (req: Request, res: Response) => {
  incHelpfulness(req.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.status(201).json('incremented helpfulness')
    }
  })
}

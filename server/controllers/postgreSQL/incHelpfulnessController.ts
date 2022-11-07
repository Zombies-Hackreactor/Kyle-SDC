import incHelpfulness from '../../models/mongoDB/incHelpfulness'

export const incHelpfulnessController = (req: Request, res: Response) => {
  incHelpfulness(req.review_id, (err: any) => {
    if (err) {
      res.status(404).json(err)
    } else {
      res.sendStatus(204)
    }
  })
}

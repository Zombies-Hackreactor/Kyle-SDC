import getMeta from '../models/getMeta'

export const getMetaController = (req: Request, res: Response) => {
  getMeta(req.params.product_id, (result: any) => {
    res.status(200).json(result)
  })
}

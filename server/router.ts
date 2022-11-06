import { Router } from 'express'
import controllers from './controllers'

const router = Router()

export default router
  .get('/', (req, res) => {
    res.send('hello world')
  })
  .get('/reviews/:product_id', controllers.getReviewsController)
  .get('/reviews/meta/:product_id', controllers.getMetaController)
  .post('/reviews/post', controllers.addReviewController)
  .put('/reviews/helpful/:review_id', controllers.incHelpfulnessController)
  .put('/reviews/report/:review_id', controllers.reportReviewController)

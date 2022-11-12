import { Router } from 'express'
import MDBcontrollers from './controllers/mongodb'
import PSQLcontrollers from './controllers/psql'

const router = Router()

export default router
  .get('/', (req: any, res: any) => {
    res.send('hello world')
  })

  // MONGODB
  // .get('/reviews/:product_id', MDBcontrollers.getReviewsController)
  // .get('/reviews/meta/:product_id', MDBcontrollers.getMetaController)
  // .post('/reviews/post', MDBcontrollers.addReviewController)
  // .put('/reviews/helpful/:review_id', MDBcontrollers.incHelpfulnessController)
  // .put('/reviews/report/:review_id', MDBcontrollers.reportReviewController)

  // POSTGRESQL
  .get('/reviews', PSQLcontrollers.getReviewsController)
  .get('/reviews/meta/:product_id', PSQLcontrollers.getMetaController)
  .post('/reviews/post', PSQLcontrollers.addReviewController)
  .put('/reviews/helpful/:review_id', PSQLcontrollers.incHelpfulnessController)
  .put('/reviews/report/:review_id', PSQLcontrollers.reportReviewController)

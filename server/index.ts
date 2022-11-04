import app from './app'
import db from './database/MongoDB/db'

const port = process.env.PORT || 4000

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port} in ${process.env.NODE_ENV} mode`)
)

console.log('connected to db, models: ', db.models)

// metaModel.create({
//   product_id: 1,
//   ratings: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 },
//   recommended: { true: 4, false: 5 },
//   characteristics: { 1: 3 },
// })

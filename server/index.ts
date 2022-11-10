import app from './app'
import db from './database/MongoDB/db'

const port = process.env.PORT || 4000

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port} in ${process.env.NODE_ENV} mode`)
)

// console.log('connected to db, models: ', db.models)

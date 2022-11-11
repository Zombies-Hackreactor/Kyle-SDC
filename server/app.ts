import express from 'express'
import compression from 'compression'
import router from './router'

const app = express()
app.use(compression())
app.use(express.json())

app.use('/api', router)

app.get('/loaderio-9c2280f546a969f1a0b4c8bcd188f1b6', function(req: any, res: any) {
res.send('loaderio-9c2280f546a969f1a0b4c8bcd188f1b6')
})

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Not found' })
})

export default app

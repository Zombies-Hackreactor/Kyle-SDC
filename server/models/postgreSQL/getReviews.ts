import { PrismaClient } from '@prisma/client'

const Client = new PrismaClient()

export default async function getReviews(id: number, count = 5, sort = 'newest', cb: any) {
  type Results = {
    product?: number
    count?: number
    results?: any
  }
  const output: Results = {
    product: id,
    count: count,
  }
  if (sort === 'newest') {
    const reviews = await Client.reviews.findMany()
    console.log(reviews)
  }
  if (sort === 'helpful') {
    // put helpful query here
    cb(output)
  }
  if (sort === 'relevant') {
    // put relevant query here
    cb(output)
  }
}

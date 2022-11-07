import mongoose, { Schema } from 'mongoose'

mongoose.connect('mongodb://localhost/SDC')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const metaSchema = new mongoose.Schema({
  product_id: Number,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  recommended: {
    true: Number,
    false: Number,
  },
  characteristics: Schema.Types.Mixed,
})

export const metaModel = mongoose.model('meta', metaSchema)

metaModel.createCollection().then(function (collection) {
  // console.log('Meta collection is created!')
})

const reviewSchema = new mongoose.Schema({
  review_id: Number,
  product_id: Number,
  rating: Object,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: {
    type: Boolean,
    default: false,
  },
  name: String,
  email: String,
  response: String,
  helpfulness: Number,
  photos: Array,
})

export const reviewModel = mongoose.model('review', reviewSchema)

reviewModel.createCollection().then(function (collection) {
  // console.log('Review collection is created!')
})

const char_reviewsSchema = new mongoose.Schema({
  characteristic_id: Number,
  review_id: Number,
  value: Number,
})

const char_reviewsModel = mongoose.model('char_review', char_reviewsSchema)

char_reviewsModel.createCollection().then(function (collection) {
  // console.log('char_reviews collection is created!')
})

const characteristicsSchema = new mongoose.Schema({
  characteristic_id: Number,
  review_id: Number,
  value: Number,
})

const characteristicsModel = mongoose.model('characteristic', characteristicsSchema)

characteristicsModel.createCollection().then(function (collection) {
  // console.log('characteristics collection is created!')
})

const review_photosSchema = new mongoose.Schema({
  characteristic_id: Number,
  review_id: Number,
  value: Number,
})

const review_photosModel = mongoose.model('review_photo', review_photosSchema)

review_photosModel.createCollection().then(function (collection) {
  // console.log('review_photos collection is created!')
})

export default db

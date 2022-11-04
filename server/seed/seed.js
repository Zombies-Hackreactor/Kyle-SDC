// import db from '../Models/MongoDB/db'
import fs from 'fs'

let characteristic_reviews_filename = 'characteristic_reviews.csv'
let characteristics_filename = 'characteristics.csv'
let reviews_photos_filename = 'reviews_photos.csv'
let reviews_filename = 'reviews.csv'

const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter)
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map((v) => {
      const values = v.split(delimiter)
      return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {})
    })
}

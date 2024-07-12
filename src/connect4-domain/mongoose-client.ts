import 'dotenv/config'
import mongoose from 'mongoose'

interface MongooseClientInterface {
  connect: () => void
}

class MongooseClient implements MongooseClientInterface {
  connect() {
    mongoose.connect(process.env.MONGODB_URI!)
  }
}

export default MongooseClient

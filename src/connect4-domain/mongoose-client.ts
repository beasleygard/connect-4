import mongoose from 'mongoose'
const connectionString = import.meta.env.VITE_MONGODB_URI
interface MongooseClientInterface {
  connect: () => Promise<void>
}

class MongooseClient implements MongooseClientInterface {
  async connect() {
    await mongoose.connect(connectionString!)
  }
}

export default MongooseClient

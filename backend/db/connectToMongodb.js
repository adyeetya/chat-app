import mongoose from 'mongoose'

 const connectToMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error message :',error.message)
    }   
}

export default connectToMongodb
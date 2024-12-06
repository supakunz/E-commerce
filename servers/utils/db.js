const mongoose = require('mongoose')

const ConnectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('ConnectDB !!!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = ConnectDB
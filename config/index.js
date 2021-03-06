const dotenv = require('dotenv')
const path = require('path')

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

dotenv.config({ path: path.join(__dirname, '..', '.env') })
module.exports = {
  mongoUri: process.env.MONGO_URI,
  port: normalizePort(process.env.PORT || 5000),
  authSecret: process.env.AUTH_SECRET,
  tokenIssuer: process.env.TOKEN_ISSUER,
  host: process.env.BE_URL,
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  }
}

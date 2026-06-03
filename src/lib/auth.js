const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET || 'togetherdropshipping-secret'

async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken
}

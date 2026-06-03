const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('admin123', 12)
  
  const user = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@togetherdropshipping.com',
      password: hash,
      role: 'admin',
      uniqueCode: 'TD001'
    }
  })
  
  console.log('User ban gaya:', user.email)
  await prisma.$disconnect()
}

main()
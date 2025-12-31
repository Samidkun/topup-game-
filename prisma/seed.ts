import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Create Games
  const mlbb = await prisma.game.upsert({
    where: { slug: 'mobile-legends' },
    update: {},
    create: {
      name: 'Mobile Legends',
      slug: 'mobile-legends',
      developer: 'Moonton',
      category: 'MOBA',
      thumbnail: '/images/games/mlbb.png',
      banner: '/images/banners/mlbb.png',
    },
  })

  // 2. Create Nominals for MLBB
  const nominals = [
    { name: '3 Diamonds', amount: 3, price: 1500 },
    { name: '86 Diamonds', amount: 86, price: 20000 },
    { name: '172 Diamonds', amount: 172, price: 40000 },
    { name: '257 Diamonds', amount: 257, price: 60000 },
    { name: '706 Diamonds', amount: 706, price: 150000 },
    { name: '2195 Diamonds', amount: 2195, price: 500000 },
  ]

  for (const n of nominals) {
    await prisma.nominal.create({
      data: {
        ...n,
        gameId: mlbb.id
      }
    })
  }

  // 3. Create Payment Methods
  const payments = [
    { name: 'GoPay', code: 'gopay', category: 'E-Wallet', adminFee: 0 },
    { name: 'DANA', code: 'dana', category: 'E-Wallet', adminFee: 0 },
    { name: 'OVO', code: 'ovo', category: 'E-Wallet', adminFee: 0 },
    { name: 'BCA Virtual Account', code: 'bca_va', category: 'Virtual Account', adminFee: 4000 },
    { name: 'Mandiri Virtual Account', code: 'mandiri_va', category: 'Virtual Account', adminFee: 4000 },
    { name: 'Alfamart', code: 'alfamart', category: 'Minimarket', adminFee: 2500 },
  ]

  for (const p of payments) {
    await prisma.paymentMethod.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    })
  }

  console.log('Seed data inserted!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

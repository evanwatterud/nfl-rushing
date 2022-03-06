const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const rushingData = require('../rushing.json')

async function main() {
  rushingData.forEach(async (playerObject) => {
    const player = await prisma.player.upsert({
      where: { name: playerObject['Player'] },
      update: {},
      create: {
        name: playerObject['Player'],
        team: playerObject['Team'],
        position: playerObject['Pos']
      }
    })

    await prisma.rushingStats.upsert({
      where: { playerId: player.id },
      update: {},
      create: {
        player: {
          connect: {
            id: player.id
          }
        },
        att: playerObject['Att'],
        att_per_game: playerObject['Att/G'],
        yards: isNaN(playerObject['Yds'].toString().replace(',', '')) 
          ? null
          : Number(playerObject['Yds'].toString().replace(',', '')),
        avg: playerObject['Avg'],
        yardsPerGame: playerObject['Yds/G'],
        touchdowns: playerObject['TD'],
        longest: playerObject['Lng'].toString(),
        firstDowns: playerObject['1st'],
        firstDownPercent: playerObject['1st%'],
        twentyPlus: playerObject['20+'],
        fortyPlus: playerObject['40+'],
        fumbles: playerObject['FUM'],
      }
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
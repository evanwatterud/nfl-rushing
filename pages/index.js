import PlayerTable from '../components/playerTable'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function Home({ players }) {
  return (
    <PlayerTable players={players} />
  )
}

export async function getStaticProps() {
  const players = await prisma.player.findMany({ include: { stats: true } })

  return {
    props: {
      players
    }
  }
}

export default Home

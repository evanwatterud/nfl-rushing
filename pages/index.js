import { useMemo } from 'react'
import PlayerTable from '../components/PlayerTable'
import columnDefinitions from '../util/constants/columnDefinitions'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function Home({ players }) {
  const columns = useMemo(() => columnDefinitions, [])

  const data = useMemo(() => players.map((player) => {
    const { stats, ...relevantStats } = { ...player, ...player.stats }

    return relevantStats
  }), [players])

  return (
    <div className="flex justify-center no-scrollbar">
      <PlayerTable columns={columns} data={data} />
    </div>
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

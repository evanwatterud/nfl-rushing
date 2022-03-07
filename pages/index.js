import { useMemo } from 'react'
import PlayerTable from '../components/PlayerTable'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function Home({ players }) {
  const columns = useMemo(() => [
    {
      Header: 'Player Name',
      accessor: 'name'
    },
    {
      Header: 'Team',
      accessor: 'team'
    },
    {
      Header: 'Position',
      accessor: 'position'
    },
    {
      Header: 'Rushing Attempts Per Game Average',
      accessor: 'attPerGame'
    },
    {
      Header: 'Rushing Attempts',
      accessor: 'att'
    },
    {
      Header: 'Total Rushing Yards',
      accessor: 'yards'
    },
    {
      Header: 'Rushing Average Yards Per Attempt',
      accessor: 'avg'
    },
    {
      Header: 'Rushing Yards Per Game',
      accessor: 'yardsPerGame'
    },
    {
      Header: 'Total Rushing Touchdowns',
      accessor: 'touchdowns'
    },
    {
      Header: 'Rushing First Downs',
      accessor: 'firstDowns'
    },
    {
      Header: 'Rushing First Down Percentage',
      accessor: 'firstDownPercent'
    },
    {
      Header: 'Rushing 20+ Yards Each',
      accessor: 'twentyPlus'
    },
    {
      Header: 'Rushing 40+ Yards Each',
      accessor: 'fortyPlus'
    },
    {
      Header: 'Rushing Fumbles',
      accessor: 'fumbles'
    }
  ], [])

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

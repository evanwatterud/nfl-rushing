const playerTableHeaderStrings = [
  'Player Name',
  'Team',
  'Position',
  'Rushing Attempts Per Game Average',
  'Rushing Attempts',
  'Total Rushing Yards',
  'Rushing Average Yards Per Attempt',
  'Rushing Yards Per Game',
  'Total Rushing Touchdowns',
  'Rushing First Downs',
  'Rushing First Down Percentage',
  'Rushing 20+ Yards Each',
  'Rushing 40+ Yards Each',
  'Rushing Fumbles'
]

function PlayerTable({ players }) {
  const generateTableHeaders = () => {
    return playerTableHeaderStrings.map((headerString) => (
      <th
        key={headerString}
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {headerString}
      </th>
    ))
  }

  const generatePlayerRows = () => {
    console.log(players)
    return players.map((player) => (
      <tr key={player.id}>
        {
          [
            player.name,
            player.team,
            player.position,
            player.stats.attPerGame,
            player.stats.att,
            player.stats.yards,
            player.stats.avg,
            player.stats.yardsPerGame,
            player.stats.touchdowns,
            player.stats.firstDowns,
            player.stats.firstDownPercent,
            player.stats.twentyPlus,
            player.stats.fortyPlus,
            player.stats.fumbles
          ].map(playerStat => <td key={playerStat} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{playerStat}</td>)
        }
      </tr>
    ))
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {generateTableHeaders()}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {generatePlayerRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerTable

import { addLog, getClimbs, getGyms, getLogs } from '../actions'

export default async function Home() {
  const climbs = await getClimbs()
  const gyms = await getGyms()
  const logs = await getLogs()

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Bouldering Tracker</h1>
        
        {/* Log a Climb Form */}
        <form action={addLog} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Log a Climb</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select status</option>
                <option value="attempted">Attempted</option>
                <option value="completed">Completed</option>
                <option value="flashed">Flashed</option>
              </select>
            </div>

            <div>
              <label htmlFor="attempts" className="block text-sm font-medium mb-1">
                Number of Attempts
              </label>
              <input
                type="number"
                id="attempts"
                name="attempts"
                min="1"
                defaultValue="1"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full p-2 border rounded"
                placeholder="Beta, feelings, what worked..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Log Climb
            </button>
          </div>
        </form>

        {/* Your Logs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Climbing Log</h2>
          {logs.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded-lg text-center">
              No climbs logged yet. Log your first climb above!
            </p>
          ) : (
            <div className="space-y-3">
              {logs.map((log: any) => (
                <div key={log.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {log.climbs?.grade}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm" 
                              style={{backgroundColor: log.climbs?.color + '40', color: log.climbs?.color}}>
                          {log.climbs?.color}
                        </span>
                        <span className="text-sm text-gray-600">
                          {log.climbs?.style}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">
                        📍 {log.climbs?.gyms?.name} - {log.climbs?.gyms?.location}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="capitalize font-medium text-gray-700">
                          {log.status}
                        </span>
                        <span>
                          {log.attempts} attempt{log.attempts !== 1 ? 's' : ''}
                        </span>
                        <span>
                          {new Date(log.logged_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {log.notes && (
                        <p className="text-sm text-gray-700 mt-2 italic">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
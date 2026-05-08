import React, { useState, useEffect } from 'react';

interface Match {
  id: number;
  home_country: string;
  away_country: string;
  sport: string;
  home_score: number;
  away_score: number;
  status: string;
  scheduled_time: string;
}

const Dashboard: React.FC<{ user: any; onLogout: () => void }> = ({ user, onLogout }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('matches');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/matches');
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'finished':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">MAPSCORE</h1>
          <div className="flex items-center gap-4">
            <span className="text-lg">{user.username}</span>
            {user.is_admin && <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">ADMIN</span>}
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 shadow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {['matches', 'table', 'favorites', 'teams'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold border-b-2 transition ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'matches' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Matches</h2>
            {loading ? (
              <p className="text-gray-600">Loading matches...</p>
            ) : matches.length === 0 ? (
              <p className="text-gray-600">No matches yet.</p>
            ) : (
              matches.map((match) => (
                <div key={match.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm">{match.sport}</p>
                      <p className="text-xl font-bold">
                        {match.home_country} <span className="text-2xl font-bold text-blue-600">{match.home_score}</span> - <span className="text-2xl font-bold text-blue-600">{match.away_score}</span> {match.away_country}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(match.status)}`}>
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'table' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Standings</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-800">Rank</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-800">Country</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-800">W</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-800">L</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-800">D</th>
                    <th className="px-6 py-3 text-right font-semibold text-gray-800">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Data will be populated here */}
                  <tr className="border-t border-gray-200 text-center text-gray-500 h-12">
                    <td colSpan={6}>No standings data yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Favorite Countries</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}

        {activeTab === 'teams' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">National Teams</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';

interface Country {
  id: number;
  code: string;
  name: string;
  is_fictional: boolean;
}

interface AdminPanelProps {
  user: any;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onLogout }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [homeCountry, setHomeCountry] = useState('');
  const [awayCountry, setAwayCountry] = useState('');
  const [sport, setSport] = useState('');
  const [homeScore, setHomeScore] = useState('0');
  const [awayScore, setAwayScore] = useState('0');
  const [matchTime, setMatchTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sports = [
    'Football',
    'Basketball',
    'Volleyball',
    'Tennis',
    'Hockey',
    'Handball',
    'NWM'
  ];

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          home_country_id: parseInt(homeCountry),
          away_country_id: parseInt(awayCountry),
          sport_id: parseInt(sport),
          home_score: parseInt(homeScore),
          away_score: parseInt(awayScore),
          scheduled_time: matchTime,
          created_by: user.id
        })
      });

      if (response.ok) {
        setMessage('Match created successfully!');
        setHomeCountry('');
        setAwayCountry('');
        setSport('');
        setHomeScore('0');
        setAwayScore('0');
        setMatchTime('');
      } else {
        setMessage('Failed to create match');
      }
    } catch (error) {
      setMessage('Error creating match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">MAPSCORE ADMIN PANEL</h1>
          <div className="flex items-center gap-4">
            <span className="text-lg">Welcome, {user.username}</span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Match</h2>

          <form onSubmit={handleCreateMatch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Country */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Home Country</label>
                <select
                  value={homeCountry}
                  onChange={(e) => setHomeCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.is_fictional ? '🎭' : '🌍'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Away Country */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Away Country</label>
                <select
                  value={awayCountry}
                  onChange={(e) => setAwayCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.is_fictional ? '🎭' : '🌍'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sport</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a sport</option>
                {sports.map((s, i) => (
                  <option key={i} value={i + 1}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Home Score</label>
                <input
                  type="number"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Away Score</label>
                <input
                  type="number"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Match Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Match Time (1 min = 10 seconds)</label>
              <input
                type="datetime-local"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {message && (
              <p className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition text-lg"
            >
              {loading ? 'Creating Match...' : 'Create Match'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin } from 'lucide-react';

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

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('All');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/matches`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMatches(response.data);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const sports = ['All', ...new Set(matches.map((m) => m.sport))];
  const filteredMatches =
    selectedSport === 'All'
      ? matches
      : matches.filter((m) => m.sport === selectedSport);

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
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Matches</h2>
        <div className="flex gap-2 flex-wrap">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded font-semibold transition ${
                selectedSport === sport
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading matches...</div>
      ) : filteredMatches.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No matches found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(match.status)}`}>
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{match.sport}</span>
              </div>

              <div className="text-center mb-4">
                <div className="text-sm text-gray-600 mb-2">{match.home_country}</div>
                <div className="text-3xl font-bold">
                  {match.home_score} - {match.away_score}
                </div>
                <div className="text-sm text-gray-600 mt-2">{match.away_country}</div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 border-t pt-3">
                <Calendar size={16} />
                <span>{new Date(match.scheduled_time).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;

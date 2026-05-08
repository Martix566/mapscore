import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Standing {
  id: number;
  country_id: number;
  country_name: string;
  sport: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
}

const Standings: React.FC = () => {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [selectedSport, setSelectedSport] = useState('Football');
  const [loading, setLoading] = useState(true);
  const [sports, setSports] = useState<string[]>([]);

  useEffect(() => {
    fetchStandings();
  }, [selectedSport]);

  const fetchStandings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/standings?sport=${selectedSport}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStandings(response.data);
      
      if (sports.length === 0) {
        const uniqueSports = [
          ...new Set(response.data.map((s: any) => s.sport)),
        ] as string[];
        setSports(uniqueSports);
      }
    } catch (error) {
      console.error('Failed to fetch standings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Standings</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Sport:
        </label>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
        >
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading standings...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Matches</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Wins</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Draws</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Losses</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr key={standing.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-700">{index + 1}</td>
                  <td className="px-6 py-3 text-gray-700">{standing.country_name}</td>
                  <td className="px-6 py-3 text-center text-gray-700">
                    {standing.wins + standing.draws + standing.losses}
                  </td>
                  <td className="px-6 py-3 text-center text-green-600 font-semibold">{standing.wins}</td>
                  <td className="px-6 py-3 text-center text-yellow-600 font-semibold">{standing.draws}</td>
                  <td className="px-6 py-3 text-center text-red-600 font-semibold">{standing.losses}</td>
                  <td className="px-6 py-3 text-center font-bold text-blue-600">{standing.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Standings;

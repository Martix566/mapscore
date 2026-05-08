import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';

interface Country {
  id: number;
  name: string;
  code: string;
  is_fictional: boolean;
  is_favorite?: boolean;
}

const FavoriteCountries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/countries`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCountries(response.data);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (countryId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(countryId)) {
      newFavorites.delete(countryId);
    } else {
      newFavorites.add(countryId);
    }
    setFavorites(newFavorites);
  };

  const favoriteCountries = countries.filter((c) => favorites.has(c.id));
  const otherCountries = countries.filter((c) => !favorites.has(c.id));

  return (
    <div className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">Favorite Countries</h2>

      {loading ? (
        <div>Loading countries...</div>
      ) : (
        <div className="grid gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              ⭐ Your Favorites ({favoriteCountries.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favoriteCountries.map((country) => (
                <div
                  key={country.id}
                  className="bg-yellow-100 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition"
                  onClick={() => toggleFavorite(country.id)}
                >
                  <Heart className="mx-auto mb-2 text-yellow-500 fill-yellow-500" />
                  <p className="font-semibold text-sm">{country.name}</p>
                  <p className="text-xs text-gray-600">{country.code}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              All Countries ({otherCountries.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {otherCountries.map((country) => (
                <div
                  key={country.id}
                  className={`rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition ${
                    country.is_fictional
                      ? 'bg-purple-100 text-purple-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  onClick={() => toggleFavorite(country.id)}
                >
                  <p className="text-2xl mb-2">{country.is_fictional ? '🏛️' : '🌍'}</p>
                  <p className="font-semibold text-sm">{country.name}</p>
                  <p className="text-xs text-gray-600">{country.code}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteCountries;

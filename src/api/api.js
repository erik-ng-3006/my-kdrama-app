const BASE = 'https://api.themoviedb.org/3';

const API_KEY = `api_key=${process.env.REACT_APP_API_KEY}`;

const DISCOVER_API_URL = `${BASE}/discover/tv?${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18&with_original_language=ko&first_air_date_year=2022&page=1`;

export { DISCOVER_API_URL };

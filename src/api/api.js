const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = `api_key=${process.env.REACT_APP_API_KEY}`;

const DISCOVER_API_URL = `${BASE_URL}/discover/tv?${API_KEY}&language=en-US&with_genres=18&with_original_language=ko&sort_by=vote_count.desc`;

const TRENDING_API_URL = `${BASE_URL}/discover/tv?${API_KEY}&language=en-US&with_genres=18&with_original_language=ko&sort_by=popularity.desc`;

export { BASE_URL, API_KEY, DISCOVER_API_URL, TRENDING_API_URL };

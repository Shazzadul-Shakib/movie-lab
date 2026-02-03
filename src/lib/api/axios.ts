import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TMDB_BASE_URL as  string,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
  },
});

export default axiosInstance;

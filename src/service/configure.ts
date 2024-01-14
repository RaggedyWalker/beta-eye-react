import axios from 'axios';

async function getConfigure(type: string) {
  const data = await axios.get('/configure', { params: { type } });
  return data.data;
}

export default { getConfigure };

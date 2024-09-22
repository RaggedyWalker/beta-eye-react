import axios from 'axios';
import CryptoJS from 'crypto-js';

const key = 'beta_secret_key';

const user = {
  async login(data: { userName?: string; password: string }) {
    data.password = CryptoJS.AES.encrypt(data.password, key).toString();
    const result = await axios.post('/user/login', data);
    return result;
  },

  async register(data: {
    userName: string;
    password: string;
    email?: string;
    phone?: string;
  }) {
    const result = await axios.post('/user/registry', data);
    return result;
  },
};

export default user;

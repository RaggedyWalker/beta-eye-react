import { LoginInfo } from '@/types/service';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const key = 'beta_secret_key';

const user = {
  async login(data: {
    userName?: string;
    password: string;
  }): Promise<LoginInfo> {
    data.password = CryptoJS.AES.encrypt(data.password, key).toString();
    const result = await axios.post('/user/login', data);
    return result.data;
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

  async applyForAccount(data: {
    userName: string;
    email: string;
    phone?: string;
    reason: string;
    inviteKey?: string;
  }): Promise<{ message: string }> {
    const result = await axios.post('/user/applyForAccount', data);
    return result.data;
  },

  async checkIfUserExist(data: {
    userName: string;
    email: string;
    phone?: string;
  }) {
    const result = await axios.post('/user/checkIfUserExist', data);
    return result.data;
  },

  async resetpw(data: {
    userName: string;
    oldpw: string;
    newpw: string;
  }) {
    const result = await axios.post('/user/resetpw', data);
    return result.data;
  }
};

export default user;

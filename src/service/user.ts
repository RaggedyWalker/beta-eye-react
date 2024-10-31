import { AccountApplication, LoginInfo } from '@/types/service';
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

  async resetpw(data: { userName: string; oldpw: string; newpw: string }) {
    const result = await axios.post('/user/resetpw', data);
    return result.data;
  },

  async info() {
    const result = await axios.get('/user/info');
    return result.data;
  },

  async getAccountApplicationList(data: {
    userName?: string;
  }): Promise<AccountApplication[]> {
    const result = await axios.post('/user/account/applyList', data);
    return result.data;
  },

  async approveAccountApplication(data: {
    id: number;
  }): Promise<AccountApplication[]> {
    const result = await axios.post('/user/account/approve', data);
    return result.data;
  },

  async rejectAccountApplication(data: {
    id: number;
    reason?: string;
  }): Promise<AccountApplication[]> {
    const result = await axios.post('/user/account/reject', data);
    return result.data;
  },
};

export default user;

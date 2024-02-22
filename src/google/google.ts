import axios from 'axios';

type GoogleUserInfo = {
  picture?: string;
  email: string;
  name: string;
};

export { GoogleUserInfo };

export class Google {
  static async getAccountInfo(token: string): Promise<GoogleUserInfo> {
    const config = {
      method: 'get',
      url: 'https://www.googleapis.com/userinfo/v2/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response = await axios(config);
      let userInfo = response.data;
      return userInfo as GoogleUserInfo;
    } catch (error) {
      throw error;
    }
  }
}

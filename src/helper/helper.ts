
import * as crypto from 'crypto';

export const getHashed = function (payload: string): String {
  return crypto.createHash('sha1').update(payload).digest('hex');
};

export const generateOrderId = () => {
  let code = 'SAN' + new Date().getTime();
  const randomRound = 3;
  for (let index = 0; index < randomRound; index++) {
    const randomNum = Math.floor(Math.random() * 10);
    code = code + randomNum.toString();
  }
  return code;
};



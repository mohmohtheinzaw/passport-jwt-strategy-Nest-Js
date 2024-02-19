
import * as crypto from 'crypto';

export const getHashed = function (payload: string): String {
  return crypto.createHash('sha1').update(payload).digest('hex');
};



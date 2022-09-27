import { InvalidTokenException } from './../company/exceptions/invalid-token-exception';
import jwt from 'jsonwebtoken';

export type GenerateJwtCallback = (
  error: Error | null,
  encoded: string | undefined
) => void;

export const generate = (email: any, callback: GenerateJwtCallback) => {
  const payload = { email };
  jwt.sign(payload, 'minha_chave', callback);
};

export const validate = (
  jwtToken: string,
  callback: () => void
) => {
  jwt.verify(jwtToken, 'minha_chave', (error) => {
    if (error != null) {
      throw new InvalidTokenException('Could not validate token');
    }
    callback();
  });
};

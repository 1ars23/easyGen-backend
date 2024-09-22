import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    try {
      const { encryptedData, iv } = payload;

      // Your encryption key (you should manage this securely)
      const encryptionKey = process.env.ACCESS_JWT_ENCRYPTION_KEY;

      // Convert IV from hexadecimal string to buffer
      const ivBuffer = Buffer.from(iv, 'hex');

      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(encryptionKey, 'hex'),
        ivBuffer,
      );
      let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
      decryptedData += decipher.final('utf8');
      const originalData = JSON.parse(decryptedData);
      return originalData;
    } catch (error) {
      console.error('Error decrypting data:', error);
    }
  }
}
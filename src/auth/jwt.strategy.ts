import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(private readonly userService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  async validate(payload: any): Promise<User> {
    return this.userService.findById(payload.sub);
  }
}

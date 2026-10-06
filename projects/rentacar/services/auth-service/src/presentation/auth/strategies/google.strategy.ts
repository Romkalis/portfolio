import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthConfigService } from '../../../config/auth-config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: AuthConfigService) {
    if (!config.env.GOOGLE_CLIENT_ID || !config.env.GOOGLE_CLIENT_SECRET || !config.env.GOOGLE_CALLBACK_URL) {
      // Keep strategy registered but fail fast with a clear message when called.
      super({
        clientID: 'missing-google-client-id',
        clientSecret: 'missing-google-client-secret',
        callbackURL: 'http://localhost/disabled',
        scope: ['email', 'profile'],
      });
      return;
    }

    super({
      clientID: config.env.GOOGLE_CLIENT_ID,
      clientSecret: config.env.GOOGLE_CLIENT_SECRET,
      callbackURL: config.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: {
      id: string;
      emails?: { value: string }[];
      name?: { givenName?: string; familyName?: string };
    },
    done: VerifyCallback,
  ): void {
    const email = profile.emails?.[0]?.value;
    if (!email || !profile.id) {
      done(new UnauthorizedException('Google profile incomplete'), undefined);
      return;
    }

    done(null, {
      email,
      providerUserId: profile.id,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
    });
  }
}

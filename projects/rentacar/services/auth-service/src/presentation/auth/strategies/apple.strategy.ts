import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-apple';
import { AuthConfigService } from '../../../config/auth-config.service';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(config: AuthConfigService) {
    const enabled = config.applePassportEnabled;

    super(
      enabled
        ? {
            clientID: config.env.APPLE_CLIENT_ID!,
            teamID: config.env.APPLE_TEAM_ID!,
            keyID: config.env.APPLE_KEY_ID!,
            privateKeyString: config.env.APPLE_PRIVATE_KEY!,
            callbackURL: config.env.APPLE_CALLBACK_URL!,
            scope: ['email', 'name'],
            passReqToCallback: true,
          }
        : {
            clientID: 'disabled',
            teamID: 'disabled',
            keyID: 'disabled',
            privateKeyString: 'disabled',
            callbackURL: 'http://localhost/disabled',
          },
    );
  }

  validate(
    _req: unknown,
    _accessToken: string,
    _refreshToken: string,
    _idToken: string,
    profile: Profile,
    done: (error: Error | null, user?: Record<string, string | undefined>) => void,
  ) {
    const providerUserId = profile.id;
    if (!providerUserId) {
      done(new UnauthorizedException('Apple profile missing subject id'), undefined);
      return;
    }

    const email = profile.email;
    done(null, {
      providerUserId,
      email: email ?? '',
      firstName: profile.name?.firstName,
      lastName: profile.name?.lastName,
    });
  }
}

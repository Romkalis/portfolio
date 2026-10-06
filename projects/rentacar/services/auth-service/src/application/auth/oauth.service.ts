import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuthProvider } from '@prisma/client';
import appleSignin from 'apple-signin-auth';
import { AuthConfigService } from '../../config/auth-config.service';
import { OAuthProfileInput } from '../../domain/repositories/user.repository.interface';
import { AuthService } from './auth.service';

@Injectable()
export class OAuthService {
  constructor(
    private readonly auth: AuthService,
    private readonly config: AuthConfigService,
  ) {}

  getProviders() {
    return {
      google: this.config.googleOAuthEnabled,
      apple: this.config.appleOAuthEnabled,
      appleIdToken: this.config.appleIdTokenEnabled,
    };
  }

  loginWithGoogle(
    profile: {
      email: string;
      firstName?: string;
      lastName?: string;
      providerUserId: string;
    },
    meta?: { userAgent?: string; ip?: string },
  ) {
    return this.auth.loginWithOAuth(
      {
        provider: OAuthProvider.GOOGLE,
        providerUserId: profile.providerUserId,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
      'GOOGLE',
      meta,
    );
  }

  loginWithAppleProfile(profile: OAuthProfileInput, meta?: { userAgent?: string; ip?: string }) {
    return this.auth.loginWithOAuth(profile, 'APPLE', meta);
  }

  async loginWithAppleIdToken(
    input: { idToken: string; firstName?: string; lastName?: string },
    meta?: { userAgent?: string; ip?: string },
  ) {
    if (!this.config.appleIdTokenEnabled) {
      throw new BadRequestException(
        'Apple Sign In is disabled. Set APPLE_CLIENT_ID (Service ID / Bundle ID).',
      );
    }

    const payload = await appleSignin.verifyIdToken(input.idToken, {
      audience: this.config.env.APPLE_CLIENT_ID!,
      ignoreExpiration: false,
    });

    const email = payload.email;
    if (!email && !payload.sub) {
      throw new BadRequestException('Invalid Apple identity token');
    }

    return this.auth.loginWithOAuth(
      {
        provider: OAuthProvider.APPLE,
        providerUserId: payload.sub,
        email: email ?? undefined,
        firstName: input.firstName,
        lastName: input.lastName,
      },
      'APPLE',
      meta,
    );
  }
}

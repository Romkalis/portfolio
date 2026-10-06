import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../../application/auth/auth.service';
import { OAuthService } from '../../application/auth/oauth.service';
import { AuthConfigService } from '../../config/auth-config.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { OAuthProvider } from '@prisma/client';
import { JwtPayload } from '@rentacar/shared-types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AppleTokenDto } from './dto/apple-token.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauth: OAuthService,
    private readonly config: AuthConfigService,
  ) {}

  private meta(req: Request) {
    return {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    };
  }

  @Get('oauth/providers')
  @ApiOperation({ summary: 'List enabled OAuth providers' })
  providers() {
    return this.oauth.getProviders();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new client user' })
  register(@Body() dto: RegisterDto, @Req() req: Request) {
    return this.authService.register(dto, this.meta(req));
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email/password' })
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, this.meta(req));
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  refresh(@Body() dto: RefreshDto, @Req() req: Request) {
    return this.authService.refresh(dto.refreshToken, this.meta(req));
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke current session' })
  logout(@CurrentUser() user: JwtPayload) {
    return this.authService.logout(user.sessionId);
  }

  @Post('apple')
  @ApiOperation({ summary: 'Sign in with Apple via identity token (mobile / SPA)' })
  appleToken(@Body() dto: AppleTokenDto, @Req() req: Request, @Res() res: Response) {
    return this.oauth.loginWithAppleIdToken(dto, this.meta(req)).then((tokens) => {
      this.respondOAuth(res, tokens);
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth redirect start' })
  googleAuth() {
    if (!this.config.googleOAuthEnabled) {
      throw new BadRequestException('Google OAuth is disabled. Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET.');
    }
    return { success: true };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  googleCallback(
    @Req()
    req: Request & {
      user: {
        email: string;
        providerUserId: string;
        firstName?: string;
        lastName?: string;
      };
    },
    @Res() res: Response,
  ) {
    if (!this.config.googleOAuthEnabled) {
      throw new BadRequestException('Google OAuth is disabled.');
    }
    return this.oauth.loginWithGoogle(req.user, this.meta(req)).then((tokens) => {
      this.respondOAuth(res, tokens);
    });
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Apple OAuth redirect start (requires .p8 key)' })
  appleAuth() {
    if (!this.config.applePassportEnabled) {
      throw new BadRequestException(
        'Apple web OAuth is disabled. Set APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY or use POST /auth/apple.',
      );
    }
    return { success: true };
  }

  @Post('apple/callback')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Apple OAuth callback (form_post)' })
  appleCallback(
    @Req()
    req: Request & {
      user: {
        providerUserId: string;
        email: string;
        firstName?: string;
        lastName?: string;
      };
    },
    @Res() res: Response,
  ) {
    if (!this.config.applePassportEnabled) {
      throw new BadRequestException('Apple web OAuth is disabled.');
    }

    return this.oauth
      .loginWithAppleProfile(
        {
          provider: OAuthProvider.APPLE,
          providerUserId: req.user.providerUserId,
          email: req.user.email || undefined,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        },
        this.meta(req),
      )
      .then((tokens) => this.respondOAuth(res, tokens));
  }

  private respondOAuth(
    res: Response,
    tokens: Awaited<ReturnType<AuthService['login']>>,
  ) {
    const redirectUrl = this.config.env.OAUTH_FRONTEND_REDIRECT_URL;
    if (redirectUrl) {
      const url = new URL(redirectUrl);
      url.searchParams.set('accessToken', tokens.accessToken);
      url.searchParams.set('refreshToken', tokens.refreshToken);
      return res.redirect(url.toString());
    }
    return res.json(tokens);
  }
}

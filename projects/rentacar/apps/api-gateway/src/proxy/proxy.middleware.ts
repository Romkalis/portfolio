import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const SERVICE_ROUTES: Record<string, string> = {
  '/api/v1/auth': process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001',
  '/api/v1/users': process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001',
  '/api/v1/cars': process.env.CAR_SERVICE_URL ?? 'http://localhost:3002',
  '/api/v1/locations': process.env.CAR_SERVICE_URL ?? 'http://localhost:3002',
  '/api/v1/bookings': process.env.BOOKING_SERVICE_URL ?? 'http://localhost:3003',
  '/api/v1/pricing': process.env.PRICING_SERVICE_URL ?? 'http://localhost:3004',
  '/api/v1/customers': process.env.CUSTOMER_SERVICE_URL ?? 'http://localhost:3005',
  '/api/v1/payments': process.env.PAYMENT_SERVICE_URL ?? 'http://localhost:3006',
  '/api/v1/search': process.env.SEARCH_SERVICE_URL ?? 'http://localhost:3010',
  '/api/v1/settings': process.env.SETTINGS_SERVICE_URL ?? 'http://localhost:3011',
  '/api/v1/finance': process.env.FINANCE_SERVICE_URL ?? 'http://localhost:3007',
  '/api/v1/maintenance': process.env.MAINTENANCE_SERVICE_URL ?? 'http://localhost:3008',
  '/api/v1/notifications': process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3009',
};

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private readonly proxies = new Map<string, ReturnType<typeof createProxyMiddleware>>();

  use(req: Request, res: Response, next: NextFunction) {
    const path = req.originalUrl.split('?')[0] ?? req.path;
    const match = Object.keys(SERVICE_ROUTES).find((prefix) => path.startsWith(prefix));

    if (!match) {
      return next();
    }

    const target = SERVICE_ROUTES[match]!;
    let proxy = this.proxies.get(match);

    if (!proxy) {
      proxy = createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: (p) => p,
      });
      this.proxies.set(match, proxy);
    }

    return proxy(req, res, next);
  }
}

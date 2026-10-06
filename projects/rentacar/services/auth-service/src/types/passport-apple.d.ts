declare module 'passport-apple' {
  import { Strategy as PassportStrategy } from 'passport';

  export interface Profile {
    id: string;
    email?: string;
    name?: { firstName?: string; lastName?: string };
  }

  export class Strategy extends PassportStrategy {
    constructor(options: Record<string, unknown>, verify: (...args: unknown[]) => void);
  }
}

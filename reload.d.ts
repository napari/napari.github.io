declare module 'reload' {
  import { Express } from 'express';

  export class Reloader {
    reload(): void;
  }

  function reload(app: Express): Promise<Reloader>;
  export default reload;
}

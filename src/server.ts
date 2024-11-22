// server.ts
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
const angularApp = new AngularAppEngine();
/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
const reqHandler = createRequestHandler(async (req: Request) => {
  return await angularApp.handle(req);
  // ...
});

export default reqHandler

import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {AngularAppEngine, createRequestHandler} from '@angular/ssr';
import {Hono} from 'hono';
import {serveStatic} from 'hono/bun';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = new Hono();
const angularApp = new AngularAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use('*', serveStatic({root: './dist/app/browser'}));


/**
 * Handle all other requests by rendering the Angular application.
 */
app.all('*', async (c, next) => {

  const response = await angularApp.handle(c.req.raw)
  if (response) {
    return response
  }
  return next()
})

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(app.fetch);

/** Archivo de configuración de rutas */

import { environment } from "src/environments/environment";

/** Ruta actual */
export const current_route = window.location.pathname;

/** Ruta de peticiones al servidor */
export const route_web = `${window.location.origin}`;

/** Ruta de peticiones al servidor */
const protocol_api = (environment.production) ? 'http' : 'http';
const dir_api = (environment.production) ? 'localhost' : 'localhost';
const port_api = (environment.production) ? '4200' : '8000';
const pathname_api = (environment.production) ? 'api/v1' : 'api/v1'
export const route_api = `${protocol_api}://${dir_api}:${port_api}/${pathname_api}`;

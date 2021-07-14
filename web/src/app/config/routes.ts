/** Archivo de configuración de rutas */

import { environment } from "src/environments/environment";

/** Ruta actual */
export const current_route = window.location.pathname;

/** Ruta de peticiones al servidor */
export const route_web = `${window.location.origin}`;

/** Ruta de peticiones al servidor */
const protocol_api = (environment.development) ? 'http' : 'http';
const dir_api = (environment.development) ? 'localhost' : 'localhost';
const port_api = (environment.development) ? '4200' : '8000';
const pathname_api = (environment.development) ? 'api/v1' : 'api/v1'
export const route_api = `${protocol_api}://${dir_api}:${port_api}/${pathname_api}` ;

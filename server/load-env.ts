import { config } from 'dotenv';
import { fatalErrorHandler } from './event-handlers';

config();

const _useRobot = process.env.USE_ROBOT || 'false';
const _proxyRules = process.env.PROXY_RULES || '[]';

export const port = parseInt(process.env.PORT || '3000', 10);
export const env = process.env.NODE_ENV || 'development';
export const dev = env !== 'production';
export const hostname = process.env.HOST_NAME || 'http://localhost/';
export let useRobot = false;
export let proxyRules: {
  prefix: string;
  upstream: string;
  rewritePrefix: string;
  http2?: boolean;
}[] = [];

function validate() {
  if (!port) {
    fatalErrorHandler({
      message: 'Invalid process.env.PORT (port must be a number)',
    });
  }

  if (!['development', 'test', 'staging', 'production'].includes(env)) {
    fatalErrorHandler({ message: 'Invalid process.env.NODE_ENV' });
  }

  try {
    if (!['true', 'false'].includes(_useRobot)) {
      throw {};
    }
    useRobot = JSON.parse(_useRobot);
  } catch {
    fatalErrorHandler({
      message: 'Invalid process.env.USE_ROBOT (must be true or false)',
    });
  }

  try {
    proxyRules = JSON.parse(_proxyRules);
    if (proxyRules.length) {
      const keys = Object.keys(proxyRules[0]);
      if (!keys.includes('prefix')) {
        throw {};
      }
    }
  } catch {
    fatalErrorHandler({
      message: 'Invalid process.env.PROXY_RULES (must be JSON)',
    });
  }
}
validate();

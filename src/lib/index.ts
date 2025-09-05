import { generators } from './generator';
import type { Instructions } from './types';
import { targets, type Target } from './target';

export interface Options {
  name?: string;
  url: string;
  target: Target;
}

export function generateMCPInstructions(options: Options): Instructions {
  const name = options.name ?? generateNameFromURL(options.url);
  if (name === undefined) {
    throw new Error('failed to generate name');
  }

  return generators[options.target]({ ...options, name });
}

export { targets, type Target };

function generateNameFromURL(url: string): string {
  const parsedUrl = URL.parse(url);
  if (parsedUrl === null) {
    throw new Error('Invalid URL: ' + url);
  }

  const name =
    parsedUrl.pathname
      .split('/')
      .find((segment) => segment !== '' && segment !== 'mcp') ??
    parsedUrl.hostname
      .split('.')
      .find((segment) => segment !== '' && segment !== 'mcp');

  if (name === undefined) {
    throw new Error('failed to generate name');
  }

  return name;
}

import { generators } from './generator';
import { getTargetName, targets, type Target } from './target';
import { Output } from './output';
import { watermark } from './util/watermark';

export interface Options {
  name?: string;
  url: string;
  target: Target | 'all';
  output: Output;
  watermark?: boolean;
}

export function generateMCPInstructions(
  options: Options & { output: 'md' },
): string;
export function generateMCPInstructions(
  options: Options & { output: 'json'; target: Target },
): unknown;
export function generateMCPInstructions(
  options: Options & { output: 'link'; target: Target },
): string;
export function generateMCPInstructions(options: Options): unknown {
  const name = options.name ?? generateNameFromURL(options.url);

  switch (options.output) {
    case 'md':
      let out: string;
      if (options.target === 'all') {
        out =
          targets
            .map(
              (target) =>
                `<details name="mcp-install-instructions">\n<summary>${getTargetName(target)}</summary>\n\n${generators[
                  target
                ]({ ...options, name })
                  .getMarkdown()
                  .trim()}\n</details>`,
            )
            .join('\n\n') + '\n\n';
      } else {
        out = generators[options.target]({ ...options, name }).getMarkdown();
      }
      if (options.watermark !== false) {
        out = out.trim() + `\n\n${watermark}`;
      }

      return out;
    case 'json':
      if (options.target === 'all') {
        throw new Error(
          `Invalid target ${options.target} for output type ${options.output}`,
        );
      }
      return generators[options.target]({ ...options, name }).getJSON();
    case 'link':
      if (options.target === 'all') {
        throw new Error(
          `Invalid target ${options.target} for output type ${options.output}`,
        );
      }
      return generators[options.target]({ ...options, name }).getLink();
    default:
      throw new Error('Invalid output type');
  }
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

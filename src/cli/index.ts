#!/usr/bin/env node

import minimist from 'minimist';
import { generateMCPInstructions } from '../lib';
import type { Target } from '../lib/target';
import { targets } from '../lib/target';

const args = minimist(process.argv.slice(2));

function usage(exitCode = 1): never {
  console.log(`Usage:
  mcp-install-instructions-generator <url>
  mcp-install-instructions-generator <name> <url>

Flags:
  -t, --target    Specify the target (${targets.join(', ')}) - default: vscode
  -o, --output    Specify the output type (json, md, link) - default: json
  -h, --help      Show this help message`);
  return process.exit(exitCode);
}

if (args['h'] || args['help']) {
  usage(0);
}

let url: string;
let name: string | undefined = undefined;
const output = args['o'] ?? args['output'] ?? 'json';
const target = (args['t'] ??
  args['target'] ??
  (output === 'md' ? 'all' : 'vscode')) as Target;

switch (args._.length) {
  case 0:
    usage();
  case 1:
    url = args._[0];
    break;
  case 2:
    name = args._[0];
    url = args._[1];
    break;
  default:
    usage();
}

let instructions = generateMCPInstructions({ name, url, target, output });

if (instructions) {
  if (typeof instructions !== 'string') {
    instructions = JSON.stringify(instructions, null, 2);
  }

  console.log(instructions);
} else {
  console.log(`no '${output}' output available for target '${target}'`);
  process.exit(1);
}

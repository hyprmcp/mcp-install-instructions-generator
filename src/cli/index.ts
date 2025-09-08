#!/usr/bin/env node

import minimist from 'minimist';
import { targets } from '../lib/target';
import type { Target } from '../lib/target';
import { generateMCPInstructions } from '../lib';

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
const target = (args['t'] ?? args['target'] ?? 'vscode') as Target;
const output = args['o'] ?? args['output'] ?? 'json';

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

const instructions = generateMCPInstructions({ name, url, target });

let outputData: unknown;
switch (output) {
  case 'json':
    outputData = instructions.getJSON();
    break;
  case 'md':
    outputData = instructions.getMarkdown();
    break;
  case 'link':
    outputData = instructions.getLink();
    break;
  default:
    console.log(`unknown output type: '${output}'`);
    usage();
}

if (outputData) {
  if (typeof outputData !== 'string') {
    outputData = JSON.stringify(outputData, null, 2);
  }

  console.log(outputData);
} else {
  console.log(`no '${output}' output available for target '${target}'`);
  process.exit(1);
}

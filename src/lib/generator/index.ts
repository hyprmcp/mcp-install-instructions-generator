import type { GeneratorOptions, Instructions } from '../types';
import { ClaudeCodeInstruction as ClaudeCodeInstructions } from './claude_code';
import { CursorInstruction as CursorInstructions } from './cursor';
import { VscodeInstructions } from './vscode';
import { ChatGPTInstructions } from './chatgpt';
import { Target } from '../target';

export const generators: Record<
  Target,
  (options: GeneratorOptions) => Instructions
> = {
  cursor: (options) => new CursorInstructions(options),
  claude_code: (options) => new ClaudeCodeInstructions(options),
  vscode: (options) => new VscodeInstructions(options),
  chatgpt: (options) => new ChatGPTInstructions(options),
};

import { Target } from '../target';
import type { GeneratorOptions, Instructions } from '../types';
import { ClaudeCodeInstructions } from './claude_code';
import { ClaudeDesktopInstructions } from './claude_desktop';
import { CursorInstructions } from './cursor';
import { VscodeInstructions } from './vscode';
import { WindsurfInstructions } from './windsurf';
import { ChatGPTInstructions } from './chatgpt';
import { GeminiCLIInstructions } from './gemini_cli';
import { CodexInstructions } from './codex';

export const generators: Record<
  Target,
  (options: GeneratorOptions) => Instructions
> = {
  cursor: (options) => new CursorInstructions(options),
  'claude-code': (options) => new ClaudeCodeInstructions(options),
  'claude-desktop': (options) => new ClaudeDesktopInstructions(options),
  vscode: (options) => new VscodeInstructions(options),
  windsurf: (options) => new WindsurfInstructions(options),
  chatgpt: (options) => new ChatGPTInstructions(options),
  'gemini-cli': (options) => new GeminiCLIInstructions(options),
  codex: (options) => new CodexInstructions(options),
};

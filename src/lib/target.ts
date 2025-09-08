export const targets = [
  'cursor',
  'vscode',
  'claude-code',
  'claude-desktop',
  'windsurf',
  'chatgpt',
  'gemini-cli',
] as const;

export type Target = (typeof targets)[number];

const targetNames = [
  'Cursor',
  'VSCode',
  'Claude Code',
  'Claude Desktop',
  'Windsurf',
  'ChatGPT',
  'Gemini CLI',
] as const;

export function getTargetName(target: Target): string {
  const i = targets.indexOf(target);
  if (i < 0) {
    throw new Error(`Invalid target: ${target}`);
  }
  return targetNames[i];
}

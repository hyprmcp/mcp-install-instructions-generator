export const targets = ['cursor', 'vscode', 'claude_code', 'windsurf'] as const;
const targetNames = ['Cursor', 'VSCode', 'Claude Code', 'Windsurf'] as const;

export type Target = (typeof targets)[number];

export function getTargetName(target: Target): string {
  const i = targets.indexOf(target);
  if (i < 0) {
    throw new Error(`Invalid target: ${target}`);
  }
  return targetNames[i];
}

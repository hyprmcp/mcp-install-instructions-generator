export const targets = ['cursor', 'vscode', 'claude_code', 'chatgpt'] as const;

export type Target = (typeof targets)[number];

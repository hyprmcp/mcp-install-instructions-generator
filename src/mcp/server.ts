import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';
import { generateMCPInstructions, targets } from '../lib';

export function newServer() {
  const server = new McpServer({
    name: 'mcp-who-am-i',
    version: '0.1.0', // x-release-please-version
  });

  server.registerTool(
    'generate-mcp-instructions',
    {
      description:
        'This tool generates installation instructions for a given MCP server',
      inputSchema: {
        url: z.string().url().describe('The URL of the MCP server'),
        name: z
          .string()
          .optional()
          .describe(
            'The name of the MCP server (will be generated if not provided)',
          ),
        target: z
          .enum([...targets, 'all'])
          .default('all')
          .describe(
            `target client to generate instructions for (${targets.join(', ')} or all; all is only available for markdown output)`,
          ),
        output: z
          .enum(['md', 'json', 'link'])
          .default('md')
          .describe('The output format (either md, json or link)'),
      },
    },
    (args) => {
      try {
        const result: unknown = generateMCPInstructions(args as any);
        if (typeof result !== 'string') {
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
            structuredContent: { data: result },
          };
        } else {
          return { content: [{ type: 'text', text: result }] };
        }
      } catch (e) {
        console.error(e);
        return {
          isError: true,
          content: [{ type: 'text', text: 'Error: ' + e }],
        };
      }
    },
  );

  return server;
}

import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { generateMCPInstructions } from '../lib';
import { getTargetName, Target, targets } from '../lib/target';
import {
  btn,
  header,
  content,
  footer,
  selected,
  fullMarkdown,
} from './styles.module.css';

export class McpInstructions extends HTMLElement {
  public static observedAttributes = ['url', 'name'];

  private selectedTarget: Target = 'cursor';
  private url?: string;
  private name?: string;

  private readonly content: HTMLDivElement;
  private readonly header: HTMLDivElement;
  private readonly footer: HTMLDivElement;
  private root: DocumentFragment | HTMLElement;
  private rendered = false;

  private readonly markdownProcessor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<div class="${header}"></div>
<div class="${content}"></div>
<div class="${footer}">Created by <a href="https://hyprmcp.com/">Hypr MCP</a></div>`;
    this.root = template.content;

    this.header = this.root.querySelector(`.${header}`)!;
    this.content = this.root.querySelector(`.${content}`)!;
    this.footer = this.root.querySelector(`.${footer}`)!;

    this.header.classList.add(header);
    targets.forEach((target, i) => {
      const btnEl = document.createElement('button');
      btnEl.classList.add(btn);
      btnEl.textContent = getTargetName(target);
      btnEl.addEventListener('click', () =>
        this.setSelectedTarget(target, btnEl),
      );
      this.header.appendChild(btnEl);
      if (i === 0) {
        this.setSelectedTarget(target, btnEl);
      }
    });
  }

  public connectedCallback() {
    if (!this.rendered) {
      this.rendered = true;
      this.appendChild(this.root);
      this.root = this;
    }
  }

  public attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === 'url') {
      this.url = newValue;
      this.updateContent();
    } else if (name === 'name') {
      this.name = newValue;
      this.updateContent();
    }
  }

  private setSelectedTarget(target: Target, btn: HTMLButtonElement) {
    Array.from(this.header.children).forEach((child) =>
      child.classList.remove(selected),
    );
    btn.classList.add(selected);
    this.selectedTarget = target;
    this.updateContent();
  }

  private async updateContent() {
    if (!this.selectedTarget) {
      this.content.textContent = 'no target selected';
      return;
    }

    if (!this.url) {
      this.content.textContent = 'URL not provided';
      return;
    }

    const instructions = generateMCPInstructions({
      target: this.selectedTarget,
      output: 'md',
      url: this.url,
      name: this.name,
      watermark: false,
    });

    const nodes: Node[] = [];

    if (instructions) {
      const el = document.createElement('div');
      el.innerHTML = await this.md(instructions);
      nodes.push(el);
    }

    const fullInstructions = generateMCPInstructions({
      target: 'all',
      output: 'md',
      url: this.url,
      name: this.name,
    });

    const div = document.createElement('div');
    div.innerHTML = `
<hr>
<h3>Markdown Instructions</h3>
If you want to include instructions for all clients in your project's README.md file,
feel free to copy the following Markdown:
<pre class="${fullMarkdown}"></pre>
<button>Copy all</button>
`;
    div.querySelector('pre')!.textContent = fullInstructions;
    div.querySelector('button')!.addEventListener('click', (e) => {
      const btn = e.target as HTMLButtonElement;
      navigator.clipboard.writeText(fullInstructions);
      btn.textContent = 'copied!';
      setTimeout(() => {
        btn.textContent = 'Copy all';
      }, 2000);
    });
    nodes.push(div);

    this.content.replaceChildren(...nodes);
  }

  private async md(markdown: string): Promise<string> {
    return String(await this.markdownProcessor.process(markdown));
  }
}

customElements.define('mcp-install-instructions', McpInstructions);

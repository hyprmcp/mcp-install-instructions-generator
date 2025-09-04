import { generateMCPInstructions } from '../lib';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { Target, targets } from '../lib/target';
import { header, btn, selected } from './styles.module.css';

export class McpInstructions extends HTMLElement {
  public static observedAttributes = ['url', 'name'];

  private selectedTarget: Target = 'cursor';
  private url?: string;
  private name?: string;

  private readonly content: HTMLDivElement;
  private readonly header: HTMLDivElement;
  private root: DocumentFragment | HTMLElement;
  private rendered = false;

  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML =
      '<div class="header"></div><div class="content"></div>';
    this.root = template.content;

    this.header = this.root.querySelector('.header')!;
    this.content = this.root.querySelector('.content')!;

    this.header.classList.add(header);
    targets.forEach((target, i) => {
      const btnEl = document.createElement('button');
      btnEl.classList.add(btn);
      btnEl.textContent = target;
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
      url: this.url,
      name: this.name,
    });

    this.content.innerHTML = String(
      await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(instructions.getMarkdown()),
    );
  }
}

customElements.define('mcp-instructions', McpInstructions);

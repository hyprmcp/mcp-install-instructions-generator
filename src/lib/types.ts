export interface GeneratorOptions {
  name: string;
  url: string;
}

export interface Instructions {
  getLink(): string | undefined;
  getJSON(): unknown;
  getMarkdown(): string;
}

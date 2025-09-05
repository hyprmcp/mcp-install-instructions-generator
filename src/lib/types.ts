export interface GeneratorOptions {
  name: string;
  url: string;
}

export interface Instructions {
  getBadge(): string | undefined;
  getLink(): string | undefined;
  getJSON(): unknown;
  getMarkdown(): string;
}

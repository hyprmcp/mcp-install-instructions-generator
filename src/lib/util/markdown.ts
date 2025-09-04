export function badgeMarkdown(
  imageUrl: string,
  altText: string,
  url: string,
): string {
  return `[![${altText}](${imageUrl})](${url})`;
}

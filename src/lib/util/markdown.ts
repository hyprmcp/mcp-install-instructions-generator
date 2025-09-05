export function badgeMarkdown(
  altText: string,
  imageUrl: string,
  url: string,
): string {
  return `[![${altText}](${imageUrl})](${url})`;
}

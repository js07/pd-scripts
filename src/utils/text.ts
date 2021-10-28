export function aOrAn(text: string) {
  if (!text || !text[0]) {
    return '';
  }
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const article = vowels.includes(text[0].toLowerCase()) ? 'an' : 'a';
  return `${article} ${text}`;
}

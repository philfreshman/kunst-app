export function toPascalCase(inputString: string): string {
  if (!inputString || typeof inputString !== 'string') {
    return inputString;
  }

  const words = inputString.split(/\s+/);

  const pascalCaseString = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
  }).join('');

  return pascalCaseString;
}

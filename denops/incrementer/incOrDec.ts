export function incOrDec(
  values: string[],
  input: string,
  direction: string,
): string | null {
  if (direction === "increment") {
    if (values.includes(input)) {
      const index = values.indexOf(input);

      if (values.length === index + 1) {
        return values[0];
      } else {
        return values[index + 1];
      }
    }
  } else {
    if (values.includes(input)) {
      const index = values.indexOf(input);

      if (index === 0) {
        return values[values.length - 1];
      } else {
        return values[index - 1];
      }
    }
  }

  return null;
}

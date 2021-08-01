export function isNumeric(value: string | number): boolean {
  return (value != null) && !isNaN(Number(value.toString()));
}

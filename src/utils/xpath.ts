export function xPathExpression(value: string) {
  if (!value.includes("'")) {
    return "'" + value + "'";
  }
  if (!value.includes('"')) {
    return '"' + value + '"';
  }

  return "concat('" + value.replace(/[']/g, "',\"'\",'") + "')";
}

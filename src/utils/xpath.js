export function xPathExpression(value) {
  if (!value.includes("'")) {
    return "'" + value + "'";
  } else if (!value.includes('"')) {
    return '"' + value + '"';
  }

  return "concat('" + value.replace(/[']/g, "',\"'\",'") + "')";
}

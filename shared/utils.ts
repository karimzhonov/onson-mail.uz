export function getArrayParam(key: string): number[] {
  const val = useRoute().query[key];
  return val ? val.toString().split(",").map((value) => {
    return /^\d$/.test(value) ? parseFloat(value) : 0
  }) : [];
}

export function getNumberParam(key: string): number | undefined {
  const value = useRoute().query[key]?.toString() || ''
  if (/^\d$/.test(value)) {
    return parseInt(value)
  }
  return undefined
}

export function getStringArrayParam(key: string): string[] {
  const val = useRoute().query[key];
  return val ? val.toString().split(",") : [];
}

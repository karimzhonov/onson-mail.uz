import type { LocationQuery } from "vue-router"

export function getArrayParam(query: LocationQuery, key: string): number[] {
  const val = query[key];
  return val ? val.toString().split(",").map((value) => {
    return /^\d$/.test(value) ? parseFloat(value) : 0
  }) : [];
}

export function getNumberParam(query: LocationQuery, key: string): number | undefined {
  const value =query[key]?.toString() || ''
  if (/^\d$/.test(value)) {
    return parseInt(value)
  }
  return undefined
}

export function getStringArrayParam(query: LocationQuery, key: string): string[] {
  const val = query[key];
  return val ? val.toString().split(",") : [];
}

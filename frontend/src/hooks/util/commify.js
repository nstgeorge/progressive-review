export const commaify = (arr) => {
  if (arr.length === 1) return arr[0]
  const notLast = arr.slice(0, arr.length - 1)
  const last = arr[arr.length - 1]
  return notLast.length === 1 ? `${notLast} and ${last}` : `${notLast.join(', ')}, and ${last}`
}
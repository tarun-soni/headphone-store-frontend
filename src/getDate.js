export const getDate = (date) => {
  return `${date.substring(0, 2)} -
  ${date.substring(2, 4)} - ${date.substring(4, 8)}`
}

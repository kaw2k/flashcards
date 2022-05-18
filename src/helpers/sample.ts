export function sample<T>(items: T[], num: number): T[] {
  let usedIndecies: number[] = []
  let selectedItems: T[] = []

  while (items.length - usedIndecies.length > 0 && usedIndecies.length < num) {
    const i = Math.floor(Math.random() * items.length)
    if (usedIndecies.find((x) => x === i)) continue

    usedIndecies = usedIndecies.concat(i)
    selectedItems = selectedItems.concat(items[i])
  }

  return selectedItems
}

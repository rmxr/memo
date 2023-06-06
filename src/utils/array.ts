export function shuffleArray(arr: string[]) {
  const array = [...arr];
  for (let index = array.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * array.length);
    [array[index], array[newIndex]] = [array[newIndex], array[index]];
  }
  return array;
}

export function shuffleArray(arr: string[]) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * array.length);
    [array[i], array[newIndex]] = [array[newIndex], array[i]];
  }
  return array;
}

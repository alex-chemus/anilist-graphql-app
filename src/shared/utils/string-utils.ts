export function capitalizeFirstLetter(string: string) {
  console.log(string.split("")[0].toUpperCase());
  return (
    string.split("")[0].toUpperCase() + string.slice(1).toLocaleLowerCase()
  );
}

const handleTextCapitalize = (string) => {
  if (!string || string.length < 1) return "Clothing 26 Store";
  const pathname = string.split("/").at(-1);
  return pathname.slice(0, 1).toUpperCase() + pathname.slice(1);
};
export { handleTextCapitalize };

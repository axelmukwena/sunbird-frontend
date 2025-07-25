export const lightHexColors = [
  "#979CA6",
  "#AD8CF8",
  "#929DAD",
  "#57CEA6",
  "#93BE55",
  "#FEF6D7",
  "#F37C7C",
  "#E66767",
  "#EA607E",
  "#CE6060",
  "#F17EB7",
  "#B370F0",
  "#C288F9",
  "#AD8CF8",
  "#9193F5",
  "#837DEC",
  "#75A7F8",
  "#50CBE0",
  "#5ACDC0",
  "#50B596",
  "#64D68E",
  "#64D68E",
  "#CA8652",
  "#D9AD4F",
  "#B27956",
  "#FA9D5B",
  "#F8BB54",
  "#F0C952",
  "#A8DB5B",
  "#99EECC",
  "#56C0EF",
];

export const lightBackgroundColors = [
  "bg-gray-200",
  "bg-purple-200",
  "bg-slate-200",
  "bg-emerald-200",
  "bg-lime-200",
  "bg-amber-200",
  "bg-red-200",
  "bg-red-200",
  "bg-rose-200",
  "bg-red-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-purple-200",
  "bg-violet-200",
  "bg-indigo-200",
  "bg-indigo-200",
  "bg-blue-200",
  "bg-cyan-200",
  "bg-teal-200",
  "bg-emerald-200",
  "bg-green-200",
  "bg-green-200",
  "bg-amber-200",
  "bg-yellow-200",
  "bg-amber-200",
  "bg-orange-200",
  "bg-amber-200",
  "bg-yellow-200",
  "bg-lime-200",
  "bg-emerald-200",
  "bg-sky-200",
];

/* strip off the "bg-" prefix so the utility version matches Tailwind patterns */
export const lightBaseColors = lightBackgroundColors.map((c) => c.slice(3));

export const stringToHexColor = (input: string): string => {
  const index = input.charCodeAt(0) % lightHexColors.length;
  return lightHexColors[index];
};

export const stringToBackgroundColor = (input: string): string => {
  const index = input.charCodeAt(0) % lightBackgroundColors.length;
  return lightBackgroundColors[index];
};

export const stringToTailwindColor = (input: string): string => {
  const index = input.charCodeAt(0) % lightBaseColors.length;
  return lightBaseColors[index];
};

// Converts a camelCase or PascalCase string to snake_case
export const toSnakeCase = (string) =>
  string
    .split("")
    .map((letter, index) =>
      index !== 0 && letter === letter.toUpperCase() ? `_${letter}` : letter
    )
    .join("")
    .toLowerCase();

// Converts a snake_case string to PascalCase
export const snakeToPascalCase = (string) =>
  string
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

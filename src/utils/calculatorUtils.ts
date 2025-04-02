
export const calculateResult = (
  a: number,
  b: number,
  operator: string
): number | string => {
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) {
        return "Error: Division by zero";
      }
      return a / b;
    default:
      return "Error: Invalid operation";
  }
};

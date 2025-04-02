
import { useState } from "react";
import { calculateResult } from "@/utils/calculatorUtils";
import { toast } from "sonner";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const [operator, setOperator] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setCurrentValue(num);
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      const newValue = currentValue === "0" ? num : currentValue + num;
      setCurrentValue(newValue);
      setDisplay(newValue);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (currentValue) {
      if (storedValue && operator && !waitingForOperand) {
        const result = calculateResult(parseFloat(storedValue), parseFloat(currentValue), operator);
        if (typeof result === "string") {
          toast.error(result);
          handleClear();
          return;
        }
        setStoredValue(result.toString());
        setDisplay(result.toString());
      } else {
        setStoredValue(currentValue);
      }
      setWaitingForOperand(true);
      setOperator(op);
    } else if (storedValue && operator) {
      setOperator(op);
    }
  };

  const handleEqualsClick = () => {
    if (currentValue && storedValue && operator) {
      const result = calculateResult(parseFloat(storedValue), parseFloat(currentValue), operator);
      if (typeof result === "string") {
        toast.error(result);
        handleClear();
        return;
      }
      setDisplay(result.toString());
      setCurrentValue(result.toString());
      setStoredValue("");
      setOperator("");
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentValue("");
    setStoredValue("");
    setOperator("");
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    if (currentValue.length > 0 && !waitingForOperand) {
      const newValue = currentValue.slice(0, -1);
      setCurrentValue(newValue || "0");
      setDisplay(newValue || "0");
    }
  };

  const handleDecimalClick = () => {
    if (waitingForOperand) {
      setCurrentValue("0.");
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (currentValue.indexOf(".") === -1) {
      setCurrentValue(currentValue + ".");
      setDisplay(currentValue + ".");
    }
  };

  return (
    <div className="calculator-container border rounded-lg shadow-lg w-80 bg-white">
      <div className="calculator-display bg-gray-50 p-4 rounded-t-lg mb-4 text-right h-16 flex items-center justify-end overflow-hidden border-b">
        <span className="text-2xl font-mono text-gray-800 truncate">{display}</span>
      </div>
      
      <div className="calculator-keypad p-4 grid grid-cols-4 gap-2">
        <button 
          onClick={handleClear} 
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center"
        >
          <span>Clear</span>
        </button>
        <button 
          onClick={handleDelete} 
          className="col-span-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded flex items-center justify-center"
        >
          <span>Delete</span>
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleOperatorClick("divide")} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          ÷
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleOperatorClick("multiply")} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          ×
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleOperatorClick("subtract")} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          −
        </button>

        <button
          onClick={() => handleNumberClick("0")}
          className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          0
        </button>
        <button
          onClick={handleDecimalClick}
          className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          .
        </button>
        <button 
          onClick={handleEqualsClick} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          =
        </button>
        <button 
          onClick={() => handleOperatorClick("add")} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Calculator;

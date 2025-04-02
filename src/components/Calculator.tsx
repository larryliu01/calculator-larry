
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateResult } from "@/utils/calculatorUtils";
import { X, Delete, Divide, Plus, Minus, Equal } from "lucide-react";
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
    <Card className="w-80 shadow-lg">
      <CardContent className="p-4">
        <div className="bg-gray-50 p-4 rounded-md mb-4 text-right h-16 flex items-center justify-end overflow-hidden">
          <span className="text-2xl font-mono text-gray-800 truncate">{display}</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button 
            onClick={handleClear} 
            variant="destructive" 
            className="col-span-2"
          >
            <X className="mr-1 h-4 w-4" /> Clear
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="secondary"
            className="col-span-2"
          >
            <Delete className="mr-1 h-4 w-4" /> Delete
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              variant="outline"
              className="bg-white hover:bg-gray-100"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={() => handleOperatorClick("divide")} 
            variant="secondary"
          >
            <Divide className="h-4 w-4" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              variant="outline"
              className="bg-white hover:bg-gray-100"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={() => handleOperatorClick("multiply")} 
            variant="secondary"
          >
            <X className="h-4 w-4" />
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              variant="outline"
              className="bg-white hover:bg-gray-100"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={() => handleOperatorClick("subtract")} 
            variant="secondary"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => handleNumberClick("0")}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            0
          </Button>
          <Button
            onClick={handleDecimalClick}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            .
          </Button>
          <Button 
            onClick={handleEqualsClick} 
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Equal className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => handleOperatorClick("add")} 
            variant="secondary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;

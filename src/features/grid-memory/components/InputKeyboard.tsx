import { Button, Card, Input } from "@/components/ui";
import { InputType } from "@/features/grid-memory/types";
import { useState } from "react";

interface InputKeyboardProps {
  letters?: string[];
  numbers?: string[];
  symbols?: string[];
  onInput: (inputType: InputType, inputValue: string) => void;
}

const InputKeyboard = ({
  letters,
  numbers,
  symbols,
  onInput,
}: InputKeyboardProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputType, setInputType] = useState<InputType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputType || !inputValue) return;

    onInput(inputType, inputValue);

    setInputValue("");
    setInputType(null);
  };

  return (
    <div className="space-y-4">
      {/* Manual input */}
      <Card>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Manual Input
        </h4>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <label className="flex flex-col">
            Input Type
            <select
              value={inputType ?? ""}
              className="mt-1 p-2 border rounded"
              onChange={(e) => {
                const value = e.currentTarget.value;
                if (value) {
                  setInputType(value as InputType);
                }
              }}
            >
              <option value="">Select input type</option>
              <option value="letter">Letter</option>
              <option value="number">Number</option>
              {/* <option value="symbol">Symbol</option> */}
            </select>
          </label>
          <label className="flex flex-col">
            Value
            <Input
              value={inputValue}
              type="text"
              placeholder="Enter letter"
              className="mt-1 p-2 border rounded"
              onChange={(e) => {
                const value = e.currentTarget.value;
                setInputValue(value.slice(0, 3).toUpperCase()); // Limit to 3 characters
              }}
            />
          </label>
          <Button
            type="submit"
            disabled={!inputType || !inputValue}
            className="col-span-2"
          >
            Submit
          </Button>
        </form>
      </Card>

      {/* Letter input */}
      {letters && letters.length > 0 && (
        <Card className="bg-blue-50">
          <h4 className="text-sm font-semibold text-blue-700 mb-3">
            Letter Combinations
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {letters.map((letter, index) => (
              <Button
                key={index}
                onClick={() => onInput(InputType.LETTER, letter)}
                className="p-2 bg-white rounded border hover:bg-blue-100 transition-colors text-blue-600 font-semibold"
              >
                {letter}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Number input */}
      {numbers && numbers.length > 0 && (
        <Card className="bg-green-50">
          <h4 className="text-sm font-semibold text-green-700 mb-3">
            Number Combinations
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {numbers.map((number, index) => (
              <Button
                key={index}
                onClick={() => onInput(InputType.NUMBER, number)}
                className="p-2 bg-white rounded border hover:bg-green-100 transition-colors text-green-600 font-semibold"
              >
                {number}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Symbol Input */}
      {symbols && symbols.length > 0 && (
        <Card className="bg-purple-50">
          <h4 className="text-sm font-semibold text-purple-700 mb-3">
            Symbol Keyboard
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {symbols.map((symbol, index) => (
              <Button
                key={index}
                onClick={() => onInput(InputType.SYMBOL, symbol)}
                className="p-2 bg-white rounded border hover:bg-purple-100 transition-colors text-purple-600 font-semibold"
              >
                {symbol}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default InputKeyboard;

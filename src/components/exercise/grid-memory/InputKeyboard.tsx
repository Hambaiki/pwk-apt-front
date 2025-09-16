import { Button } from "@/components/ui";

import { InputType } from "@/types/exercises/grid";
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
  const [inputType, setInputType] = useState<InputType | null>(null);

  return (
    <div className="space-y-4">
      {/* Manual input */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Manual Input
        </h4>
        <div>
          <label>
            Input Type
            <select
              className="ml-2 p-2 border rounded"
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
              <option value="symbol">Symbol</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Enter letter"
            className="p-2 border rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onInput(InputType.LETTER, e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>

      {/* Letter input */}
      {letters && letters.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg">
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
        </div>
      )}

      {/* Number input */}
      {numbers && numbers.length > 0 && (
        <div className="p-4 bg-green-50 rounded-lg">
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
        </div>
      )}

      {/* Symbol Input */}
      {symbols && symbols.length > 0 && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-700 mb-3">
            Symbol Keyboard
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {symbols.map((symbol, index) => (
              <Button
                key={index}
                onClick={() => onInput(InputType.SYMBOL, symbol)}
                className="p-3 bg-white rounded border hover:bg-purple-100 transition-colors"
              >
                {symbol}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Clear cell button */}
      <Button onClick={() => onInput(InputType.EMPTY, "")}>Clear Cell</Button>
    </div>
  );
};

export default InputKeyboard;

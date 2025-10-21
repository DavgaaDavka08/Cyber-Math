"use client";

interface NumericKeypadProps {
  onInput: (value: string) => void;
  onDelete: () => void;
}

export function NumericKeypad({ onInput, onDelete }: NumericKeypadProps) {
  const keys = [
    { value: "1", letters: "" },
    { value: "2", letters: "ABC" },
    { value: "3", letters: "DEF" },
    { value: "4", letters: "GHI" },
    { value: "5", letters: "JKL" },
    { value: "6", letters: "MNO" },
    { value: "7", letters: "PQRS" },
    { value: "8", letters: "TUV" },
    { value: "9", letters: "WXYZ" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
      {keys.map((key) => (
        <button
          key={key.value}
          onClick={() => onInput(key.value)}
          className="aspect-square rounded-2xl bg-white border-2 border-gray-200 hover:bg-gray-50 active:scale-95 transition-all flex flex-col items-center justify-center shadow-sm"
        >
          <span className="text-2xl font-bold text-gray-900">{key.value}</span>
          {key.letters && (
            <span className="text-xs text-gray-500 font-medium">
              {key.letters}
            </span>
          )}
        </button>
      ))}
      <button
        onClick={() => onInput("+")}
        className="aspect-square rounded-2xl bg-white border-2 border-gray-200 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center text-2xl font-bold text-gray-700 shadow-sm"
      >
        + * #
      </button>
      <button
        onClick={() => onInput("0")}
        className="aspect-square rounded-2xl bg-white border-2 border-gray-200 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center text-2xl font-bold text-gray-900 shadow-sm"
      >
        0
      </button>
      <button
        onClick={onDelete}
        className="aspect-square rounded-2xl bg-white border-2 border-gray-200 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center shadow-sm"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
          />
        </svg>
      </button>
    </div>
  );
}

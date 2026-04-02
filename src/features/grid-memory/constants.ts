import { Config } from "@/features/grid-memory/types";

export const defaultConfig: Config = {
  memoryTime: 120, // 2 minutes in seconds
  timeLimit: 300, // 5 minutes in seconds
  letterCount: 8,
  symbolCount: 8,
  numberCount: 9,
  letterVariations: 6,
  symbolVariations: 10,
  numberVariations: 8,
};

// Content pools
export const letterPool = [
  "ABC",
  "DEF",
  "GHI",
  "JKL",
  "MNO",
  "PQR",
  "STU",
  "VWX",
  "YZA",
  "BCD",
  "EFG",
  "HIJ",
  "KLM",
  "NOP",
  "QRS",
  "TUV",
  "WXY",
  "ZAB",
  "CDE",
  "FGH",
];

export const symbolPool = [
  "←",
  "→",
  "=",
  "+",
  "-",
  "*",
  "/",
  "%",
  "&",
  "#",
  "@",
  "!",
  "?",
  "$",
];

export const numberPool = [
  "123",
  "456",
  "789",
  "012",
  "345",
  "678",
  "901",
  "234",
  "567",
  "890",
  "135",
  "246",
  "357",
  "468",
  "579",
  "680",
  "791",
  "802",
  "913",
  "024",
];

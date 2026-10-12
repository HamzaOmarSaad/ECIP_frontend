export interface Governorate {
  id: string;
  name: string;
  region: "upper" | "lower";
}

export const GOVERNORATES: Governorate[] = [
  { id: "alexandria", name: "Alexandria", region: "lower" },
  { id: "beheira", name: "Beheira", region: "lower" },
  { id: "dakahlia", name: "Dakahlia", region: "lower" },
  { id: "damietta", name: "Damietta", region: "lower" },
  { id: "gharbia", name: "Gharbia", region: "lower" },
  { id: "ismailia", name: "Ismailia", region: "lower" },
  { id: "kafr-el-sheikh", name: "Kafr El Sheikh", region: "lower" },
  { id: "matrouh", name: "Matrouh", region: "lower" },
  { id: "monufia", name: "Monufia", region: "lower" },
  { id: "port-said", name: "Port Said", region: "lower" },
  { id: "qalyubia", name: "Qalyubia", region: "lower" },
  { id: "sharqia", name: "Sharqia", region: "lower" },
  { id: "suez", name: "Suez", region: "lower" },
  { id: "cairo", name: "Cairo", region: "lower" },
  { id: "north-sinai", name: "North Sinai", region: "lower" },
  { id: "south-sinai", name: "South Sinai", region: "lower" },
  { id: "aswan", name: "Aswan", region: "upper" },
  { id: "asyut", name: "Asyut", region: "upper" },
  { id: "beni-suef", name: "Beni Suef", region: "upper" },
  { id: "fayoum", name: "Fayoum", region: "upper" },
  { id: "giza", name: "Giza", region: "upper" },
  { id: "luxor", name: "Luxor", region: "upper" },
  { id: "minya", name: "Minya", region: "upper" },
  { id: "new-valley", name: "New Valley", region: "upper" },
  { id: "qena", name: "Qena", region: "upper" },
  { id: "red-sea", name: "Red Sea", region: "upper" },
  { id: "sohag", name: "Sohag", region: "upper" },
];

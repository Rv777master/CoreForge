// Component catalog used by the PC Builder page.
// Prices are illustrative (INR) — adjust freely.

export const cpuOptions = [
  { brand: "Intel", name: "Intel Core i5-14600K", price: 28500 },
  { brand: "Intel", name: "Intel Core i7-14700K", price: 38900 },
  { brand: "Intel", name: "Intel Core i9-14900K", price: 54900 },
  { brand: "AMD", name: "AMD Ryzen 5 7600X", price: 22900 },
  { brand: "AMD", name: "AMD Ryzen 7 7800X3D", price: 39900 },
  { brand: "AMD", name: "AMD Ryzen 9 7950X", price: 56900 },
  { brand: "Apple Silicon", name: "Apple M3", price: 0, note: "Reference only — not user-upgradable" },
  { brand: "Apple Silicon", name: "Apple M3 Pro", price: 0, note: "Reference only — not user-upgradable" },
];

export const gpuOptions = [
  { brand: "NVIDIA", name: "NVIDIA RTX 4060", price: 32000 },
  { brand: "NVIDIA", name: "NVIDIA RTX 4070 SUPER", price: 58000 },
  { brand: "NVIDIA", name: "NVIDIA RTX 4080 SUPER", price: 99000 },
  { brand: "NVIDIA", name: "NVIDIA RTX 4090", price: 168000 },
  { brand: "AMD", name: "AMD Radeon RX 7700 XT", price: 42000 },
  { brand: "AMD", name: "AMD Radeon RX 7800 XT", price: 54000 },
  { brand: "AMD", name: "AMD Radeon RX 7900 XTX", price: 92000 },
  { brand: "Intel", name: "Intel Arc A770", price: 29000 },
];

export const motherboardOptions = [
  { brand: "ASUS", name: "ASUS ROG Strix B650-A", price: 21000 },
  { brand: "ASUS", name: "ASUS TUF Gaming Z790-Plus", price: 24500 },
  { brand: "MSI", name: "MSI MAG B650 Tomahawk", price: 19500 },
  { brand: "MSI", name: "MSI MPG Z790 Edge", price: 27000 },
  { brand: "Gigabyte", name: "Gigabyte B650 Aorus Elite", price: 18000 },
  { brand: "ASRock", name: "ASRock Z790 Pro RS", price: 20500 },
];

export const ramOptions = [
  { brand: "Corsair", name: "Corsair Vengeance 16GB DDR4", price: 4200 },
  { brand: "Corsair", name: "Corsair Vengeance 32GB DDR5", price: 9800 },
  { brand: "G.Skill", name: "G.Skill Trident Z5 32GB DDR5", price: 11500 },
  { brand: "Kingston", name: "Kingston Fury Beast 16GB DDR4", price: 3900 },
  { brand: "Kingston", name: "Kingston Fury Beast 64GB DDR5", price: 21000 },
];

export const storageOptions = [
  { brand: "Samsung", name: "Samsung 970 EVO Plus 1TB NVMe", price: 6500 },
  { brand: "Samsung", name: "Samsung 990 Pro 2TB NVMe", price: 15500 },
  { brand: "WD", name: "WD Black SN850X 1TB NVMe", price: 7200 },
  { brand: "Crucial", name: "Crucial MX500 1TB SATA SSD", price: 4800 },
];

export const coolingOptions = [
  { type: "Air", name: "Cooler Master Hyper 212", price: 2800 },
  { type: "Air", name: "Noctua NH-D15", price: 8500 },
  { type: "AIO Liquid", name: "Corsair iCUE H100i (240mm)", price: 9500 },
  { type: "AIO Liquid", name: "NZXT Kraken 280 RGB", price: 14000 },
  { type: "Custom Loop", name: "Full Custom Water Loop", price: 35000 },
];

export const thermalPasteOptions = [
  { name: "Arctic MX-6", price: 700 },
  { name: "Noctua NT-H2", price: 900 },
  { name: "Thermal Grizzly Kryonaut", price: 1500 },
];

export const psuOptions = [
  { brand: "Corsair", name: "Corsair RM750x 750W 80+ Gold", price: 9500 },
  { brand: "EVGA", name: "EVGA SuperNOVA 850W 80+ Gold", price: 11000 },
  { brand: "Cooler Master", name: "CM MWE 650W 80+ Bronze", price: 5500 },
];

export const caseOptions = [
  { brand: "NZXT", name: "NZXT H510 Flow", price: 6800 },
  { brand: "Lian Li", name: "Lian Li O11 Dynamic", price: 12500 },
  { brand: "Corsair", name: "Corsair 4000D Airflow", price: 8200 },
];

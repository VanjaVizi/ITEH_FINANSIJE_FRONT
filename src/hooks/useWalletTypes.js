const WALLET_TYPES = [
  { value: "banka", label: "Bankovni račun" },
  { value: "kes", label: "Keš" },
  { value: "stednja", label: "Štednja" },
  { value: "kripto", label: "Kripto" },
  { value: "ostalo", label: "Ostalo" },
];

const useWalletTypes = () => {
  return WALLET_TYPES;
};

export default useWalletTypes;
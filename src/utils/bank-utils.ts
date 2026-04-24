export const BANK_LOGOS: Record<string, string> = {
  nubank: "/banks/Nu Pagamentos S.A/nubank-logo-2021.svg",
  itau: "/banks/Itaú Unibanco S.A/logo-nova-letras-transparentes.svg",
  bradesco: "/banks/Bradesco S.A/bradesco.svg",
  santander: "/banks/Banco Santander Brasil S.A/banco-santander-logo.svg",
  default: "https://cdn-icons-png.flaticon.com/512/1669/1669668.png",
};

export const getBankLogo = (accountName: string = "") => {
  const name = accountName.toLowerCase();
  if (name.includes("nubank")) return BANK_LOGOS.nubank;
  if (name.includes("itau")) return BANK_LOGOS.itau;
  if (name.includes("bradesco")) return BANK_LOGOS.bradesco;
  if (name.includes("santander")) return BANK_LOGOS.santander;
  return BANK_LOGOS.default;
};

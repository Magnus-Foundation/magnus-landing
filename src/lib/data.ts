export const SECTION_IDS = {
  HERO: "hero",
  PROBLEM: "problem",
  ARCHITECTURE: "architecture",
  CORRIDORS: "corridors",
  BUILDERS: "builders",
  WHY_NOW: "why_now",
  ROADMAP: "roadmap",
  GATEWAY: "gateway",
};

export const ARCHITECTURE_FEATURES = [
  {
    number: "01",
    title: "Netting Engine",
    description:
      "A continuous netting engine that settles high volumes of stablecoin transfers efficiently, reducing the need for constant bridging.",
  },
  {
    number: "02",
    title: "Gateway Protocol",
    description:
      "Escrow-backed gateways for connecting directly to local bank rails like VietQR, M-Pesa, and UPI.",
  },
  {
    number: "03",
    title: "Standard EVM",
    description:
      "Fully compatible EVM execution layer. Use Solidity, Vyper, Hardhat, Foundry, and standard ABIs without modifications.",
  },
  {
    number: "04",
    title: "Multi-currency Gas",
    description:
      "Pay protocol fees in any supported stablecoin (USDT, USDC, BUSD, DAI). No native gas token required for users.",
  },
  {
    number: "05",
    title: "Compliance Layer",
    description:
      "Built-in consensus-level compliance features including allowlists, sanctions screening, and Travel Rule enforcement.",
  },
];

export const CORRIDORS = [
  {
    from: "US",
    fromCountry: "United States",
    to: "VN",
    toCountry: "Vietnam",
    stablecoins: "USDC, USDT",
    rail: "VietQR",
    volume: "live",
    fee: "$0.00",
  },
  {
    from: "EU",
    fromCountry: "Europe",
    to: "KE",
    toCountry: "Kenya",
    stablecoins: "EURC",
    rail: "M-Pesa",
    volume: "live",
    fee: "$0.00",
  },
  {
    from: "AE",
    fromCountry: "UAE",
    to: "IN",
    toCountry: "India",
    stablecoins: "USDT",
    rail: "UPI",
    volume: "live",
    fee: "$0.00",
  },
  {
    from: "PT",
    fromCountry: "Portugal",
    to: "BR",
    toCountry: "Brazil",
    stablecoins: "EURC",
    rail: "PIX",
    volume: "live",
    fee: "$0.00",
  },
];

export const WHY_NOW_STATS = [
  { label: "Demand for stablecoin settlements globally", value: "$1.2T+" },
  { label: "Wallets natively supporting stablecoins", value: "150M+" },
  { label: "Liquidity available on secondary markets", value: "$130B+" },
];

export const ROADMAP_MILESTONES = [
  {
    phase: "TESTNET",
    title: "Developer Preview",
    quarter: "Q2 2024",
    scope: ["EVM Compatibility", "Faucet & Explorer", "Initial SDKs"],
  },
  {
    phase: "MAINNET",
    title: "Beta Launch",
    quarter: "Q3 2024",
    scope: ["Live Corridors", "Gateway Protocol V1", "Production API"],
  },
  {
    phase: "SCALE",
    title: "Global Rollout",
    quarter: "Q4 2024+",
    scope: ["Multi-currency Gas", "Compliance Layer Active", "10+ Local Rails"],
  },
];

export const SDK_SAMPLE = `import { Magnus } from '@magnus/sdk';

const client = new Magnus({
// Use any stablecoin for gas directly
gasToken: 'usdc',
});

// Transfer settled instantly to target bank account
const receipt = await client.send({
to: 'vietqr:vcb-0123456789',
amount: '500.00',
token: 'usdt'
});
console.log('Settled in', receipt.duration);`;

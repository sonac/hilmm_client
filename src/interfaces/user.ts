interface Asset {
  name: string;
  ticker: string;
  price: number;
}

export interface UserAsset {
  asset: Asset;
  amount: number;
  currentValue: number;
  invested: number;
}

export interface UserPortfolio {
  userAssets: UserAsset[];
  totalValue: number;
}

export interface PortfolioState {
  portfolio: UserPortfolio
  timestamp: Date
}

export interface User {
  email: string, 
  portfolio: UserPortfolio,
  portfolioStates: Array<PortfolioState>
}
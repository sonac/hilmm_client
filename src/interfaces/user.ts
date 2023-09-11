interface Asset {
  name: string;
  ticker: string;
  price: number;
}

export interface UserAsset {
  asset: Asset;
  amount: number;
  currentValue: number;
}

export interface UserPortfolio {
  userAssets: UserAsset[];
}

export interface User {
  email: string, 
  portfolio: UserPortfolio
}
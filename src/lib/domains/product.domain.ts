export interface Product {
  $id?: string;
  name: string;
  apy: number;
  risk: ProductRisk;
  min_investment: number;
  max_investment: number;
  investors: number;
  status: ProductStatus;
  category: ProductCategory;
  features: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export enum ProductCategory {
  DEFI,
  RWD,
  NFT,
}

export enum ProductRisk {
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
  EXTREME,
}

export enum ProductStatus {
  ACTIVE,
  INACTIVE,
  COMING_SOON,
  DISCONTINUED,
}

export interface Client {
  $id?: string;
  name: string;
  location: string;
  investment: number;
  earnings: number;
  period: number;
  $createdAt?: string;
  $updatedAt?: string;
}

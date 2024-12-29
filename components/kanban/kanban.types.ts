import type { EnumStatus } from '~/types/deals.types';

export interface ICards {
    id: string;
    name: string;
    price: number;
    status: string;
    companyName: string;
    $createdAt?: string; 
    $updatedAt?: string;  
    $finalizedAt?: string;  
}

export interface IColumns{
    id: EnumStatus;
    name: string;
    items: ICards[];
}
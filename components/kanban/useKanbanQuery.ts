import { Databases } from 'appwrite';
import { useQuery } from '@tanstack/vue-query';
import client from '~/lib/appwrite';
import { DB_ID, COLLECTION_DEALS } from '~/consts/appconts';
import type { IDeal } from '~/types/deals.types';
import { kanbanData } from './kanban.data';

const DB = new Databases(client);

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: async () => {
            const response = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
            console.log('Response from Appwrite:', response);
            return response.documents as unknown as IDeal[];
        },
        select(data) {
            const newBoard = [...kanbanData];
            console.log('Initial Board:', newBoard);
        
            const deals = data as IDeal[];
            for (const deal of deals) {
                console.log('Processing deal:', deal);
                const column = newBoard.find((column) => column.id === deal.status);
        
                if (column) {
                    console.log('Adding to column:', column.name);
                    column.items.push({
                        id: deal.$id,
                        name: deal.name,
                        price: deal.price,
                        status: deal.status,
                        companyName: deal.custummer.name, // Исправлено
                        $createdAt: deal.$createdAt, // Добавлено
                        $updatedAt: deal.$updatedAt,  
                        $finalizedAt: deal.$finalizedAt,
                    });
                }
            }
        
            console.log('Updated Board:', newBoard);
            return newBoard;
        }
    });
}
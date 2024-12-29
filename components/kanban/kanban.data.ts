import { EnumStatus } from '~/types/deals.types';
import type { IColumns } from './kanban.types';

export const kanbanData: IColumns[] = [
    {
        id: EnumStatus['to-do'],
        name: 'To Do',
        items: []
    },
    {
        id: EnumStatus['to-be-agreed'],
        name: 'To be agreed',
        items: []
    },
    {
        id: EnumStatus['in-progress'],
        name: 'In progress',
        items: []
    },
    {
        id: EnumStatus['produced'],
        name: 'Produced',
        items: []
    },
    {
        id: EnumStatus['done'],
        name: 'Done',
        items: []
    }
]
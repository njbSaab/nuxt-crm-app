
export interface IBaseFiesld {
    $createAt: string;
    $id: string;  
}
export interface ICustomer extends IBaseFiesld {
    name: string;
    email: string;
    avatar_url: string;
    from_source?: string;
}
export interface IComment extends IBaseFiesld {
    text: string;
}
export enum EnumStatus {
    'to-do' = 'to-do',
    'to-be-agreed' = 'to-be-agreed',
    'in-progress' = 'in-progress',
    'produced' = 'produced',
    'done' = 'done',
}
export interface IDeal extends IBaseFiesld {
    customer: ICustomer;
    comments: IComment[];
    status: EnumStatus;
    name: string;
    price: number;
}

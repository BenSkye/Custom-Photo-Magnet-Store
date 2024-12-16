export interface IOrderStatus {
    _id?: string;
    code: string;
    name: string;   
    description?: string; 
    color?: string;     
    order: number;        
    isActive: boolean;    
    isDefault?: boolean;  
}
// ✅ Interface para CRUD completo seguindo DIP
export interface IRepositorio<T> {
    // Create
    adicionar(item: T): void;
    
    // Read
    listar(): Array<T>;
    buscarPorId(id: string): T | undefined;
    
    // Update
    atualizar(id: string, item: T): boolean;
    
    // Delete
    remover(id: string): boolean;
    
    // Outras operações úteis
    obterTodos(): Array<T>;
    contar(): number;
}
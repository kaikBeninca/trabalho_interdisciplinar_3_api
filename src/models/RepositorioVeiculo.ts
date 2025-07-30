import { Veiculo } from "./Veiculo";
import { IRepositorio } from "../interfaces/IRepositorio";
import { IPesquisavel } from "../interfaces/IPesquisavel";

// ✅ Implementa CRUD completo seguindo SOLID
export class RepositorioVeiculo implements IRepositorio<Veiculo>, IPesquisavel<Veiculo> {
    private _veiculos: Array<Veiculo>;

    constructor() {
        this._veiculos = [];
    }

    // ✅ CRUD - Create
    public adicionar(veiculo: Veiculo): void {
        // Verificar se já existe (evitar duplicatas)
        const existe = this._veiculos.find(v => v.getId() === veiculo.getId());
        if (!existe) {
            this._veiculos.push(veiculo);
        } else {
            throw new Error(`Veículo com código ${veiculo.getId()} já existe`);
        }
    }

    // ✅ CRUD - Read
    public listar(): Array<Veiculo> {
        return [...this._veiculos]; // Clone para evitar mutação externa
    }

    public buscarPorId(id: string): Veiculo | undefined {
        return this._veiculos.find(veiculo => veiculo.getId() === id);
    }

    public obterTodos(): Array<Veiculo> {
        return this.listar();
    }

    // ✅ CRUD - Update
    public atualizar(id: string, veiculoAtualizado: Veiculo): boolean {
        const index = this._veiculos.findIndex(veiculo => veiculo.getId() === id);
        if (index !== -1) {
            this._veiculos[index] = veiculoAtualizado;
            return true;
        }
        return false;
    }

    // ✅ CRUD - Delete
    public remover(id: string): boolean {
        const index = this._veiculos.findIndex(veiculo => veiculo.getId() === id);
        if (index !== -1) {
            this._veiculos.splice(index, 1);
            return true;
        }
        return false;
    }

    public contar(): number {
        return this._veiculos.length;
    }

    // ✅ Implementação da interface IPesquisavel
    public pesquisarPorCriterio(criterio: string): Array<Veiculo> {
        return this._veiculos.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(criterio.toLowerCase()) ||
            veiculo.ano.toString().includes(criterio) ||
            veiculo.combustivel.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    // ✅ Métodos de conveniência
    public listarPorTipo(tipo: string): Array<Veiculo> {
        return this._veiculos.filter(veiculo => veiculo.tipo === tipo);
    }

    public listarPorAno(ano: number): Array<Veiculo> {
        return this._veiculos.filter(veiculo => veiculo.ano === ano);
    }

    // ✅ Compatibilidade com código antigo
    get veiculos(): Array<Veiculo> {
        return this.listar();
    }
}
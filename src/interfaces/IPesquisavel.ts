// ✅ Interface corrigida seguindo SOLID
export interface IPesquisavel<T> {
    pesquisarPorCriterio(criterio: string): Array<T>;
}
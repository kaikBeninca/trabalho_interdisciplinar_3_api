import { Versao } from "../../models/Versao";

interface SelectVersoesProps {
  versoes: Versao[];
}

export default function SelectVersoes({ versoes }: SelectVersoesProps) {
  // Remove versões duplicadas com base no código
  const versoesUnicas = Array.from(
    new Map(versoes.map(v => [v.codigo, v])).values()
  );

  // Agrupa versões por nome base (primeira palavra)
  const versoesAgrupadas = versoesUnicas.reduce((acc: Record<string, Versao[]>, versao) => {
    const nomeBase = versao.nome.split(' ')[0];
    if (!acc[nomeBase]) {
      acc[nomeBase] = [];
    }
    acc[nomeBase].push(versao);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(versoesAgrupadas).map(([nomeBase, versoes]) => (
        <optgroup key={nomeBase} label={nomeBase}>
          {versoes.map((versao) => (
            <option 
              key={versao.codigo} 
              value={versao.nome}
            >
              {versao.nome}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );
}

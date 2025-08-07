import { Modelo } from "../../models/Modelo";

interface SelectModelosProps {
  modelos: Modelo[];
}

export default function SelectModelos({ modelos }: SelectModelosProps) {
  // Ordena os modelos alfabeticamente
  const modelosOrdenados = [...modelos].sort((a, b) => 
    a.nome.localeCompare(b.nome)
  );

  return (
    <>
      {modelosOrdenados.map((modelo) => (
        <option 
          value={modelo.nome}
        >
          {modelo.nome}
        </option>
      ))}
    </>
  );
}
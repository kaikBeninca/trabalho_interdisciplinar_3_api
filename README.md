# 🚗 Projeto FIPE React + TypeScript

Este projeto tem como objetivo desenvolver uma aplicação web para **pesquisa, comparação e cálculo de IPVA de veículos** com base na API da **Tabela FIPE**.

A proposta surgiu como Trabalho Final Interdisciplinar das disciplinas:

- **Arquitetura de Software**
- **Desenvolvimento Front-End II**
- **Programação Orientada a Objetos II**

---

## 🎯 Objetivos da Aplicação

A aplicação foi projetada para oferecer **três funcionalidades principais**:

### 🔍 Pesquisar Veículos
Filtrar veículos pela API da FIPE com base em **tipo, marca, modelo e ano**.

### ⚖️ Comparar Preços
Exibir **lado a lado os preços de dois veículos distintos** para auxiliar na comparação de mercado.

### 🧮 Simular Financiamento e Calcular IPVA
Calcular o valor do IPVA com base no **estado selecionado** e no **valor do veículo**, utilizando um **JSON com alíquotas estaduais**, bem como **simular um financiamento**.

---

## 🛠️ Estrutura do Projeto

A arquitetura do projeto foi baseada em **Programação Orientada a Objetos**, utilizando:

- **Classes abstratas**
- **Herança**
- **Polimorfismo**
- **Princípios SOLID/GRASP**

---

## 📦 Classes principais

- `Veiculo` (classe abstrata)
- `Carro`, `Moto`, `Caminhao` (herdam de `Veiculo`)
- `RepositorioVeiculo` (gerencia as instâncias)
- `IPesquisavel` (interface para filtro de pesquisa)

---

## 📉 Diagrama UML

Abaixo está o **diagrama de classes** utilizado como base para a modelagem do sistema:


<img width="1185" height="787" alt="Captura de tela 2025-07-30 153325" src="https://github.com/user-attachments/assets/e1d7f77b-ebdf-46a1-87f3-b0ba0f576e8c" />

---

## ⚠️ Status do Projeto

🚧 **Projeto em desenvolvimento**

- Atualmente, o projeto está **incompleto** e com funcionalidades ainda em fase de construção.
- Algumas classes estão sendo **testadas e refatoradas**.
- A integração completa com o **React** ainda não foi finalizada.

---

## 🔮 Próximos Passos

- Finalizar os métodos de **busca e criação de instâncias via API**
- **Integrar o backend TypeScript ao frontend React**
- Adicionar **tratamento de erros** e mensagens de **feedback para o usuário**
- Implementar **layout responsivo**

---

## 📚 Tecnologias Utilizadas

- React
- TypeScript
- API FIPE: [https://fipe.online/docs/api/fipe](https://fipe.online/docs/api/fipe)
- Programação Orientada a Objetos

---

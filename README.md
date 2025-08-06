# 🚗 Projeto FIPE React + TypeScript

Este projeto é uma aplicação web para pesquisa de preços de veículos com base na **API da Tabela FIPE**, incluindo o **cálculo do IPVA** e funcionalidades de favoritos.

> 🔍 Desenvolvido como **Trabalho Final Interdisciplinar** das disciplinas:
> - Arquitetura de Software  
> - Desenvolvimento Front-End II  
> - Programação Orientada a Objetos II  

---

## 📄 Páginas da Aplicação

### 1. **Home**
Página inicial com um resumo geral do projeto.

### 2. **Pesquisar FIPE**
Formulário para pesquisa de veículos com os seguintes critérios:
- Tipo de veículo
- Marca
- Modelo
- Versão
- Ano
- Combustível
- Estado (para cálculo do IPVA)

Após o preenchimento, um **card do veículo** é exibido com os dados:
- Código FIPE  
- Marca  
- Modelo  
- Preço (valor FIPE)  
- Tipo de veículo  
- Combustível  
- Valor do IPVA (calculado com base no estado)

✅ O card também inclui um **botão para adicionar aos favoritos**.

### 3. **Favoritos**
Exibe todos os veículos adicionados aos favoritos, com:
- Filtro por **marca**, **modelo** e **tipo de veículo**, basta digitar no input
- Opção de **remover** o veículo dos favoritos

---

## 🎯 Objetivos

- Permitir a pesquisa de veículos através de **requisições à API** FIPE
- Demonstrar **herança, polimorfismo** e uso de **interfaces** via POO
- Usar conceitos de **arquitetura** para planejamento e estruturação do trabalho, com utilização de **Diagrama de Classes**
- **Reutilização** de **componentes** criados no React
- Calcular o valor do **IPVA por estado**, utilizando um arquivo JSON com as alíquotas

---

## 🧠 Estrutura do Projeto

- Arquitetura baseada em **Programação Orientada a Objetos (POO)**
- Uso de **classes abstratas**, **herança**, **polimorfismo** e **interfaces**
- Aplicação dos princípios **SOLID** e **GRASP**
- Utilização do padrão de projeto **MVC**

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ [React](https://reactjs.org/)
- 🟦 TypeScript
- 💡 Programação Orientada a Objetos
- 🧮 Consumo de API REST

---

## 🔗 Links Úteis

- 📊 **API FIPE Pública**: [https://parallelum.com.br/fipe/api/v1/carros/marcas](https://parallelum.com.br/fipe/api/v1/carros/marcas)
- 💻 **Repositório GitHub**: [https://github.com/kaikBeninca/trabalho_interdisciplinar_3_api](https://github.com/kaikBeninca/trabalho_interdisciplinar_3_api)
- 🌐 **Deploy Vercel**: ([https://trabalho-interdisciplinar-3-api.vercel.app/](https://trabalho-interdisciplinar-3-api.vercel.app/))

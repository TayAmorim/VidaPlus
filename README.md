# VidaPlus - Sistema de Gestão Hospitalar (SGHSS)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## 🏥 Sobre o Projeto

Este projeto foi desenvolvido com o propósito de aplicar, de forma prática, os conceitos e habilidades adquiridas no decorrer do curso de Análise e Desenvolvimento de Sistemas. O estudo de caso baseia-se na instituição **VidaPlus**, responsável pela administração de uma rede complexa de hospitais, clínicas de bairro e equipes de *home care*.

O objetivo central é disponibilizar um **Sistema de Gestão Hospitalar e de Serviços de Saúde (SGHSS)** que centralize as operações da instituição, garantindo eficiência, segurança da informação e compliance com a LGPD.

## 🎯 Funcionalidades Implementadas

O sistema conta com módulos distintos para diferentes perfis de usuário, garantindo uma experiência personalizada e segura.

### 🔐 Autenticação e Segurança
- **Login Unificado:** Acesso centralizado para todos os perfis.
- **Controle de Acesso (RBAC):** Rotas protegidas e menus adaptados baseados no perfil do usuário (`admin`, `professional`, `patient`).

### 👨‍💼 Módulo Administrativo (Back-office)
- **Dashboard Gerencial:** Visão geral das operações.
- **Gestão de Usuários:** Administração de perfis e permissões.
- **Relatórios:** Métricas de atendimentos e ocupação.

### 👩‍⚕️ Módulo Profissional de Saúde
- **Agenda Médica:** Visualização de consultas agendadas.
- **Telemedicina:** Interface para realização de consultas remotas.
- **Prontuário:** Acesso rápido a informações dos pacientes.

### 🤒 Módulo Paciente
- **Agendamento Online:** Marcação de consultas de forma autônoma.
- **Minhas Consultas:** Histórico e status de agendamentos.
- **Teleconsulta:** Acesso direto à sala de atendimento virtual.

## 🛠 Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna e robusta:

- **Core:** React (Vite) + TypeScript
- **Estilização:** Tailwind CSS + Shadcn/ui (Radix UI)
- **Ícones:** Lucide React
- **Testes:** Vitest + React Testing Library
- **Qualidade de Código:** Husky (Git Hooks) + ESLint

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (v18 ou superior recomendado).

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/TayAmorim/VidaPlus.git
   cd VidaPlus
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   *Nota: Isso também configurará automaticamente os hooks do Husky.*

3. **Configuração de Ambiente:**
   - Renomeie o arquivo `.env.example` para `.env`.
   - Defina a senha padrão na variável `VITE_APP_PASSWORD`.

### Executando a Aplicação

```bash
npm run dev
```
O sistema estará acessível em `http://localhost:5173`.

### 🧪 Executando Testes

O projeto utiliza **Vitest** para testes automatizados.

- **Rodar todos os testes:**
  ```bash
  npm run test
  ```
- **Nota sobre Git Hooks:** O projeto possui um hook `pre-push` configurado via Husky que executa automaticamente os testes antes de qualquer envio para o repositório remoto, garantindo a integridade do código.

## 🔑 Credenciais de Acesso (Mock)

Para fins de teste e avaliação, utilize as seguintes credenciais (a senha deve corresponder ao valor definido em `VITE_APP_PASSWORD` no seu `.env`):

| Perfil | E-mail | Senha (Padrão) |
|--------|--------|----------------|
| **Admin** | `admin@vidaplus.com` | *Definida no .env* |
| **Profissional** | `doc@vidaplus.com` | *Definida no .env* |
| **Paciente** | `maria@vidaplus.com` | *Definida no .env* |

---
Desenvolvido por Tay Amorim no curso de ADS.

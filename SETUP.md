# Guia de Configuração - SellPro

## 🚀 Setup Inicial

### 1. Clonar e Instalar

```bash
git clone https://github.com/cordeirov797-art/sellpro.git
cd sellpro
npm install
```

### 2. Configurar Supabase

#### Passo 1: Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Aguarde a inicialização

#### Passo 2: Obter Credenciais
1. Vá para "Settings" → "API"
2. Copie:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service_role key)

#### Passo 3: Criar Arquivo `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SellPro
```

### 3. Criar Banco de Dados

#### Passo 1: Executar Schema
1. No Supabase, vá para "SQL Editor"
2. Clique em "New Query"
3. Copie e cole o conteúdo de `sql/schema.sql`
4. Clique em "Run"

#### Passo 2: Executar Row Level Security
1. Crie uma nova query
2. Copie e cole o conteúdo de `sql/rls.sql`
3. Clique em "Run"

#### Passo 3: Inserir Dados de Teste
1. Crie uma nova query
2. Copie e cole o conteúdo de `sql/seed.sql`
3. Clique em "Run"

### 4. Configurar Autenticação

1. No Supabase, vá para "Authentication" → "Providers"
2. Email está habilitado por padrão (OK)
3. Em "Settings" → "Email Auth", certifique-se que está habilitado

### 5. Rodar Aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📝 Dados de Teste

Apos executar o seed.sql, use:

### Super Admin
- **Email**: admin@sellpro.com
- **Senha**: demo123456

### Vendedor Demo
- **Email**: vendedor@sellpro.com
- **Senha**: demo123456

### Cliente Demo
- **Email**: cliente@sellpro.com
- **Senha**: demo123456

## 🔒 Segurança

✅ Row Level Security (RLS) habilitado
✅ Políticas de acesso por role implementadas
✅ Autenticação via Supabase Auth
✅ Variáveis de ambiente protegidas

## 📚 Estrutura do Projeto

```
sellpro/
├── src/
│   ├── app/              # Rotas Next.js
│   ├── components/       # Componentes React
│   ├── contexts/         # Contexts
│   ├── lib/              # Utilitários
│   ├── types/            # TypeScript types
│   └── styles/           # Estilos
├── sql/                  # Scripts SQL
│   ├── schema.sql        # Estrutura
│   ├── rls.sql           # Row Level Security
│   └── seed.sql          # Dados de teste
└── public/               # Arquivos estáticos
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Faça push para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Deploy automático

### Variáveis de Ambiente (Vercel)

Adicione no Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` (sua URL de produção)

## 🆘 Troubleshooting

### "Erro de conexão com Supabase"
- Verifique as variáveis de ambiente
- Certifique-se de que o projeto Supabase está ativo
- Teste a conexão no Supabase SQL Editor

### "Erro 401 ao fazer login"
- Verifique se a autenticação está habilitada no Supabase
- Confirme que o usuário foi criado no seed.sql
- Limpe o cache do navegador

### "Página em branco"
- Verifique o console do navegador (F12)
- Verifique os logs do terminal
- Limpe o build: `rm -rf .next && npm run dev`

## 📖 Próximos Passos

- [ ] Integrar gateway de pagamento (Stripe, Mercado Pago)
- [ ] Implementar editor de página de vendas
- [ ] Adicionar sistema de afiliados
- [ ] Criar área de membros com vídeos
- [ ] Integrar analytics avançados
- [ ] Implementar WhatsApp integrado
- [ ] Domínios personalizados

## 💬 Suporte

Para dúvidas ou problemas:
- GitHub Issues: [Abrir uma issue](https://github.com/cordeirov797-art/sellpro/issues)
- Email: cordeirov797@gmail.com

---

**Desenvolvido com ❤️ para empreendedores digitais brasileiros**

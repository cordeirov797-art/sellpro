// User Types
export type UserRole = 'super_admin' | 'admin' | 'vendedor' | 'cliente';

export interface User {
  id: string;
  email: string;
  nome: string;
  avatar_url?: string;
  telefone?: string;
  role: UserRole;
  status: 'ativo' | 'suspenso';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  nome: string;
  cnpj?: string;
  logo_url?: string;
  endereco?: string;
  descricao?: string;
  created_at: string;
  updated_at: string;
}

// Product Types
export type ProductType = 'ebook' | 'curso' | 'mentoria' | 'comunidade' | 'assinatura' | 'software' | 'fisico' | 'servico' | 'outro';

export interface Product {
  id: string;
  user_id: string;
  nome: string;
  slug: string;
  descricao: string;
  imagem_url?: string;
  categoria: string;
  preco: number;
  preco_promocional?: number;
  tipo: ProductType;
  status: 'rascunho' | 'publicado' | 'arquivado';
  link_entrega?: string;
  prazo_acesso?: number;
  created_at: string;
  updated_at: string;
}

// Order Types
export type OrderStatus = 'pendente' | 'aprovado' | 'recusado' | 'cancelado' | 'reembolsado' | 'chargeback';

export interface Order {
  id: string;
  numero_pedido: string;
  user_id: string;
  customer_id: string;
  product_id: string;
  valor: number;
  desconto?: number;
  valor_final: number;
  metodo_pagamento: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

// Customer Types
export interface Customer {
  id: string;
  user_id: string;
  nome: string;
  email: string;
  telefone?: string;
  total_gasto: number;
  ultima_compra?: string;
  created_at: string;
  updated_at: string;
}

// Coupon Types
export interface Coupon {
  id: string;
  user_id: string;
  codigo: string;
  desconto_percentual?: number;
  desconto_fixo?: number;
  data_inicio?: string;
  data_fim?: string;
  limite_utilizacao?: number;
  utilizacoes: number;
  product_id?: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

// Plan Types
export interface Plan {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  limite_produtos: number;
  limite_vendas: number;
  recursos: string[];
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

// Subscription Types
export type SubscriptionPeriod = 'mensal' | 'anual';
export type SubscriptionStatus = 'ativa' | 'cancelada' | 'expirada';

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  periodo: SubscriptionPeriod;
  valor: number;
  proxima_cobranca: string;
  status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
}

// Affiliate Types
export interface Affiliate {
  id: string;
  user_id: string;
  codigo: string;
  link_exclusivo: string;
  comissao_percentual: number;
  vendas: number;
  faturamento_gerado: number;
  saldo: number;
  created_at: string;
  updated_at: string;
}

// Notification Types
export type NotificationType = 
  | 'nova_venda'
  | 'pagamento_aprovado'
  | 'pagamento_recusado'
  | 'novo_cliente'
  | 'reembolso'
  | 'assinatura_criada'
  | 'assinatura_cancelada';

export interface Notification {
  id: string;
  user_id: string;
  tipo: NotificationType;
  titulo: string;
  mensagem: string;
  lido: boolean;
  created_at: string;
}

// Analytics Types
export interface AnalyticsEvent {
  id: string;
  user_id: string;
  tipo: string;
  dados: Record<string, any>;
  created_at: string;
}

// Settings Types
export interface Settings {
  id: string;
  user_id: string;
  nome_plataforma: string;
  logo_url?: string;
  favicon_url?: string;
  cor_primaria: string;
  cor_secundaria: string;
  tema: 'claro' | 'escuro';
  created_at: string;
  updated_at: string;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  user_id: string;
  acao: string;
  recurso: string;
  dados_alterados?: Record<string, any>;
  ip?: string;
  created_at: string;
}

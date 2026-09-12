export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          nome: string;
          avatar_url: string | null;
          telefone: string | null;
          role: 'super_admin' | 'admin' | 'vendedor' | 'cliente';
          status: 'ativo' | 'suspenso';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          nome: string;
          slug: string;
          descricao: string;
          imagem_url: string | null;
          categoria: string;
          preco: number;
          preco_promocional: number | null;
          tipo: string;
          status: 'rascunho' | 'publicado' | 'arquivado';
          link_entrega: string | null;
          prazo_acesso: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          numero_pedido: string;
          user_id: string;
          customer_id: string;
          product_id: string;
          valor: number;
          desconto: number | null;
          valor_final: number;
          metodo_pagamento: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
    };
  };
};

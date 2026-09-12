'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Plan } from '@/types';

export default function PlansPage() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    limite_produtos: '',
    limite_vendas: '',
  });

  if (user?.role !== 'super_admin') {
    return (
      <Layout>
        <Card className="text-center py-12">
          <p className="text-red-600">Acesso negado. Apenas Super Admin.</p>
        </Card>
      </Layout>
    );
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('preco', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('plans').insert([
        {
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          limite_produtos: parseInt(formData.limite_produtos),
          limite_vendas: parseInt(formData.limite_vendas),
          status: 'ativo',
        },
      ]);

      if (error) throw error;
      setFormData({ nome: '', descricao: '', preco: '', limite_produtos: '', limite_vendas: '' });
      setShowForm(false);
      fetchPlans();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Planos da Plataforma</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Gerencie os planos de assinatura</p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            + Novo Plano
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader title="Criar Novo Plano" />
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <Input
                label="Nome do Plano"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Plano Pro"
                required
              />

              <Input
                label="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descrição do plano"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Preço (R$)"
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  placeholder="29.90"
                  required
                />

                <Input
                  label="Limite de Produtos"
                  type="number"
                  value={formData.limite_produtos}
                  onChange={(e) => setFormData({ ...formData, limite_produtos: e.target.value })}
                  placeholder="50"
                  required
                />
              </div>

              <Input
                label="Limite de Vendas/Mês"
                type="number"
                value={formData.limite_vendas}
                onChange={(e) => setFormData({ ...formData, limite_vendas: e.target.value })}
                placeholder="500"
                required
              />

              <div className="flex gap-2">
                <Button type="submit" variant="primary">Criar Plano</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              </div>
            </form>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">Carregando...</div>
        ) : plans.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Nenhum plano criado ainda</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="border-2 border-primary-500">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.nome}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{plan.descricao}</p>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-4xl font-bold text-primary-600">R$ {plan.preco.toFixed(2)}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">/mês</p>
                  </div>

                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ {plan.limite_produtos} produtos</li>
                    <li>✓ {plan.limite_vendas} vendas/mês</li>
                    <li className={plan.recursos.includes('analytics') ? '' : 'line-through'}>✓ Analytics</li>
                    <li className={plan.recursos.includes('cupons') ? '' : 'line-through'}>✓ Cupons</li>
                  </ul>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">Editar</Button>
                    <Button variant="danger" size="sm" className="flex-1">Deletar</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

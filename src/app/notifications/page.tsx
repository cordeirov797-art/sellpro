'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Notification } from '@/types';
import { formatDate } from '@/lib/utils';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRead, setFilterRead] = useState('todos');

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ lido: true })
        .eq('id', notificationId);

      if (error) throw error;
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filterRead === 'lidas') return notif.lido;
    if (filterRead === 'nao_lidas') return !notif.lido;
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notificações</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Acompanhe todos os eventos da sua plataforma</p>
        </div>

        <Card>
          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            <option value="todos">Todas as Notificações</option>
            <option value="nao_lidas">Não Lidas</option>
            <option value="lidas">Lidas</option>
          </select>
        </Card>

        {loading ? (
          <div className="text-center py-12">Carregando...</div>
        ) : filteredNotifications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Nenhuma notificação encontrada</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <Card
                key={notif.id}
                className={`cursor-pointer transition-colors ${notif.lido ? 'opacity-60' : 'border-l-4 border-l-primary-500'}`}
                onClick={() => !notif.lido && markAsRead(notif.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{notif.titulo}</h3>
                      {!notif.lido && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{notif.mensagem}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {formatDate(notif.created_at)}
                    </p>
                  </div>
                  {!notif.lido && (
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-1"></div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

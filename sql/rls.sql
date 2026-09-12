-- Enable Row Level Security for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- User Policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id OR auth.jwt()->>'role' = 'super_admin');

CREATE POLICY "Super admin can view all users"
  ON users FOR SELECT
  USING (auth.jwt()->>'role' = 'super_admin');

-- Products Policies
CREATE POLICY "Users can view their own products"
  ON products FOR SELECT
  USING (auth.uid() = user_id OR status = 'publicado');

CREATE POLICY "Users can create their own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
  ON products FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
  ON products FOR DELETE
  USING (auth.uid() = user_id);

-- Orders Policies
CREATE POLICY "Vendors can view their orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'role' = 'super_admin');

-- Customers Policies  
CREATE POLICY "Vendors can view their customers"
  ON customers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Vendors can create customers"
  ON customers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Notifications Policies
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Settings Policies
CREATE POLICY "Super admin can manage global settings"
  ON settings FOR ALL
  USING (auth.uid() = user_id OR (user_id IS NULL AND auth.jwt()->>'role' = 'super_admin'));

-- Audit Logs Policies
CREATE POLICY "Super admin can view audit logs"
  ON audit_logs FOR SELECT
  USING (auth.jwt()->>'role' = 'super_admin');

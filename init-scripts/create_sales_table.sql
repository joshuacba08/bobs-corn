CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(255) NOT NULL,
  purchase_time TIMESTAMP NOT NULL DEFAULT NOW(),
  amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 
);

CREATE INDEX IF NOT EXISTS idx_client_id ON sales (client_id);

CREATE INDEX IF NOT EXISTS idx_purchase_time ON sales (purchase_time);
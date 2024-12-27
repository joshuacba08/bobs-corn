# Bob's corn

Bob's corn es un proyecto fullstack que de manera simple y minimalista permite el granjero Bob venda una unidad de maiz por minuto por cada `id` de cliente.

## Requerimientos

- Node.js 22.0.0
- pnpm 6.0.0 o superior
- PostgreSQL
- Docker

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/joshuacba08/bobs-corn.git
cd bobs-corn
```

2. Levantar todo el stack con Docker

```bash
docker-compose up --build
```

## Uso

Ya con el stack levantado, se puede acceder a la aplicación en `http://localhost:3000`.

## Frontend

### Rutas

- `/`: Página principal
- `/dashboard`: Página de administración

## Backend

- URL base: `http://localhost:8080`

### Endpoints API

- `GET /api/sales`: Obtiene todas las ventas
- `POST /api/sales`: Crea una nueva venta
- `GET /api/sales/clients/:client_id`: Obtiene las ventas de un cliente

## Base de datos

Solución de base de datos con PostgreSQL.

### Time limiter function

Se ha implementado una query que verifica primero si ha pasado un minuto desde la última venta del cliente. Si ha pasado, se crea una nueva venta. En caso contrario, no se crea la venta.

```typescript

  private async createSale(req: Request, res: Response): Promise<void> {
    const { client_id, amount } = req.body;

    try {
      const result = await pool.query(
        `
      WITH last_purchase AS (
        SELECT purchase_time
        FROM sales
        WHERE client_id = $1
        ORDER BY purchase_time DESC
        LIMIT 1
      )
      INSERT INTO sales (client_id, purchase_time, amount)
      SELECT $1, NOW(), $2
      WHERE NOT EXISTS (
        SELECT 1
        FROM last_purchase
        WHERE NOW() - INTERVAL '1 minute' < last_purchase.purchase_time
      )
      RETURNING *;
      `,
        [client_id, amount]
      );

      if (result.rows.length === 0) {
        res.status(429).json({
          message: "You must wait at least 1 minute between purchases.",
        });
        return;
      }

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating sale:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

```

Como se puede observar en la consulta anterior, se ha utilizado una CTE (Common Table Expression) para obtener la última compra del cliente. Luego, se verifica si ha pasado un minuto desde la última compra. Si ha pasado, se crea una nueva venta. En caso contrario, se retorna un error 429.

// Static OpenAPI 3.0 spec, hand-written from the actual route files (not
// generated from JSDoc comments — keeps route files clean, spec lives here).
// Served at GET /api-docs. Update this file when routes change.

const cookieAuth = {
  cookieAuth: {
    type: 'apiKey',
    in: 'cookie',
    name: 'token',
    description:
      'JWT set as an httpOnly cookie on /login. TOKEN_NAME in .env controls the cookie name (default "token").',
  },
};

const errorResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    message: { type: 'string' },
  },
};

function withAuthErrors(responses) {
  return {
    ...responses,
    401: {
      description: 'Not authenticated',
      content: { 'application/json': { schema: errorResponse } },
    },
    403: {
      description: 'Not authorized for this role',
      content: { 'application/json': { schema: errorResponse } },
    },
  };
}

const ok = (description, schema) => ({
  200: { description, content: { 'application/json': { schema: schema || { type: 'object' } } } },
});

export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'CartLoop API',
    version: '1.0.0',
    description:
      'Multi-vendor e-commerce backend: auth, product catalog, cart/wishlist, orders + Stripe checkout, ' +
      'vendor dashboard, and an item-based collaborative-filtering recommendation engine.',
  },
  servers: [{ url: '/api/v1' }],
  components: { securitySchemes: cookieAuth },
  tags: [
    { name: 'Auth' },
    { name: 'User' },
    { name: 'Products' },
    { name: 'Reviews' },
    { name: 'Orders' },
    { name: 'Vendor' },
    { name: 'Recommendations' },
  ],
  paths: {
    '/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password' },
                },
              },
            },
          },
        },
        responses: {
          ...ok('User created, auth cookie set'),
          400: { description: 'Validation error' },
          409: { description: 'Email already in use' },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password' },
                },
              },
            },
          },
        },
        responses: {
          ...ok('Logged in, auth cookie set'),
          401: { description: 'Wrong credentials' },
        },
      },
    },
    '/logout': {
      get: {
        tags: ['Auth'],
        summary: 'Log out',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Logged out')),
      },
    },
    '/password/forgot': {
      post: {
        tags: ['Auth'],
        summary: 'Request a password-reset email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { email: { type: 'string' } } },
            },
          },
        },
        responses: ok('Reset email sent (if the address exists)'),
      },
    },
    '/password/reset/{token}': {
      put: {
        tags: ['Auth'],
        summary: 'Reset password using the emailed token',
        parameters: [{ name: 'token', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { password: { type: 'string' }, confirmPassword: { type: 'string' } },
              },
            },
          },
        },
        responses: { ...ok('Password reset'), 400: { description: 'Invalid/expired token' } },
      },
    },
    '/me': {
      get: {
        tags: ['User'],
        summary: 'Get my profile',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Current user')),
      },
    },
    '/me/update': {
      put: {
        tags: ['User'],
        summary: 'Update my profile',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Updated user')),
      },
    },
    '/password/update': {
      put: {
        tags: ['User'],
        summary: 'Change my password',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Password updated')),
      },
    },
    '/update/{id}': {
      put: {
        tags: ['User'],
        summary: 'Admin: update any user',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Updated user')),
      },
    },
    '/user/delete/{id}': {
      delete: {
        tags: ['User'],
        summary: 'Admin: delete a user',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('User deleted')),
      },
    },
    '/user/updateRole/{id}': {
      put: {
        tags: ['User'],
        summary: "Admin: change a user's role",
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Role updated')),
      },
    },
    '/user/wishlist': {
      post: {
        tags: ['User'],
        summary: 'Add product to wishlist',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Wishlist updated')),
      },
      delete: {
        tags: ['User'],
        summary: 'Remove product from wishlist',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Wishlist updated')),
      },
    },
    '/user/cart': {
      post: {
        tags: ['User'],
        summary: 'Add product to cart',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Cart updated')),
      },
      delete: {
        tags: ['User'],
        summary: 'Remove product from cart',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Cart updated')),
      },
    },
    '/address': {
      post: {
        tags: ['User'],
        summary: 'Add a shipping address',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Address added')),
      },
      put: {
        tags: ['User'],
        summary: 'Update a shipping address',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Address updated')),
      },
      delete: {
        tags: ['User'],
        summary: 'Delete a shipping address',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Address deleted')),
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'List all products (unpaginated)',
        responses: ok('Product list'),
      },
    },
    '/product': {
      get: {
        tags: ['Products'],
        summary: 'List products, paginated',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: { ...ok('Paginated product list'), 400: { description: 'Invalid page/limit' } },
      },
    },
    '/product/new': {
      post: {
        tags: ['Products'],
        summary: 'Create a product (vendor/admin)',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                  category: { type: 'string' },
                  image: { type: 'array', items: { type: 'string', format: 'binary' } },
                },
              },
            },
          },
        },
        responses: withAuthErrors({
          ...ok('Product created'),
          400: { description: 'Validation error' },
        }),
      },
    },
    '/product/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product details',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { ...ok('Product detail'), 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Products'],
        summary: 'Update a product (owning vendor/admin)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Product updated')),
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product (owning vendor/admin)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Product deleted')),
      },
    },
    '/review': {
      put: {
        tags: ['Reviews'],
        summary: 'Create/update my review on a product',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  productId: { type: 'string' },
                  rating: { type: 'number' },
                  comment: { type: 'string' },
                },
              },
            },
          },
        },
        responses: withAuthErrors(ok('Review saved')),
      },
    },
    '/reviews/{id}': {
      get: {
        tags: ['Reviews'],
        summary: 'Get all reviews for a product',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: ok('Review list'),
      },
    },
    '/review/delete/{id}': {
      delete: {
        tags: ['Reviews'],
        summary: 'Delete a review by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: ok('Review deleted'),
      },
    },
    '/order/new': {
      post: {
        tags: ['Orders'],
        summary: 'Place a new order (COD or Stripe)',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors({
          ...ok('Order created'),
          400: { description: 'Out of stock / invalid cart' },
        }),
      },
    },
    '/webhook': {
      post: {
        tags: ['Orders'],
        summary: 'Stripe webhook — signature-verified, idempotent',
        description:
          'Receives Stripe Checkout events. Verifies the `Stripe-Signature` header against ' +
          'WEBHOOK_ENDPOINT_SECRET before touching the payload (see order.webhook.js). Each event ' +
          'id is claimed in Redis before processing so a Stripe retry cannot double-apply it. ' +
          'Handles: checkout.session.completed (marks the order paid) and checkout.session.expired ' +
          '(releases the stock reserved at order-creation time and cancels the order). Any other ' +
          'event type is acknowledged with 200 and ignored.',
        responses: {
          200: { description: 'Event processed or ignored' },
          400: { description: 'Invalid signature or missing session metadata' },
          404: { description: 'No order matches this checkout session' },
        },
      },
    },
    '/order/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get a single order',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Order detail')),
      },
    },
    '/orders/me': {
      get: {
        tags: ['Orders'],
        summary: 'My orders',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('My order list')),
      },
    },
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Admin: all orders',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('All orders')),
      },
    },
    '/order/update/{id}': {
      put: {
        tags: ['Orders'],
        summary: 'Admin: update order status',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Order status updated')),
      },
    },
    '/order/delete/{id}': {
      delete: {
        tags: ['Orders'],
        summary: 'Admin: delete order',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: withAuthErrors(ok('Order deleted')),
      },
    },
    '/vendor/products': {
      get: {
        tags: ['Vendor'],
        summary: 'My products (vendor/admin)',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Vendor product list')),
      },
    },
    '/vendor/orders': {
      get: {
        tags: ['Vendor'],
        summary: 'Orders containing my products (vendor/admin)',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Vendor order list')),
      },
    },
    '/vendor/analytics': {
      get: {
        tags: ['Vendor'],
        summary: 'My sales analytics (vendor/admin)',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Analytics: revenue, sales trend, category breakdown')),
      },
    },
    '/recommendations/similar/{productId}': {
      get: {
        tags: ['Recommendations'],
        summary:
          'Products frequently bought with this one (item-based collaborative filtering, Redis-cached)',
        parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: ok('Similar products'),
      },
    },
    '/recommendations/for-me': {
      get: {
        tags: ['Recommendations'],
        summary: 'Personalized feed from my order + viewed-products history',
        security: [{ cookieAuth: [] }],
        responses: withAuthErrors(ok('Recommended products')),
      },
    },
  },
};

import { ZodError } from 'zod';

const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Validate only the parts provided in schema
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      // Assign parsed (sanitized) values back to req
      if (parsed.body) req.body = parsed.body;
      if (parsed.params) req.params = parsed.params;
      if (parsed.query) req.query = parsed.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }

      next(error);
    }
  };
};

export default validate;

import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { Context } from 'express-validator/src/context';

type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const validate = (validations: ValidationChain[]): RouteHandler => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    await Promise.all(
      validations.map(
        (val: ValidationChain): Promise<Context> => val.run(request)
      )
    );

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(422).json({ errors: errors.array() });
      return;
    }
    next();
  };
};

export default validate;

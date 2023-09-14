import { NextFunction, Request, Response } from 'express';

const validadeUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  next();
};

const validateProductIds = (req: Request, res: Response, next: NextFunction) => {
  const { productIds } = req.body;
  if (!productIds) {
    return res.status(400).json({ message: '"productIds" is required' });
  }
  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }
  const productsIdsAreNumbers = productIds.every((productId) => typeof productId === 'number');
  if (productIds.length === 0 || !productsIdsAreNumbers) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  next();
};

export default {
  validateCreationFields: [validadeUserId, validateProductIds],
  validadeUserId,
  validateProductIds,
};

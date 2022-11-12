import { Router } from 'express';
import { categoriesRouter } from './categories/categoriesRoutes.js';
import { digitalContentsRouter } from './digitalContents/digitalContentsRoutes.js';
import { guidesRouter } from './guides/guidesRoutes.js';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/digitalContents', digitalContentsRouter);
router.use('/guides', guidesRouter);

export { router };

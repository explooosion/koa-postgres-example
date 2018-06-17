import compose from 'koa-compose';
import Router from 'koa-router';

import user from './user';

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Koa2',
    message: 'Hello Koa2',
  });
});

router.use('/user', user.routes(), user.allowedMethods());

router.get('*', async (ctx, next) => {
  ctx.throw(404);
});

// export default router
export default function routes() {
  return compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}

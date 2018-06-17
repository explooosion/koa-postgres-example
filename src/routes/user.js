require('dotenv').config();

import Router from 'koa-router';
import { Pool, Client } from 'pg';

const router = new Router();

const connectionString = 'postgresql://postgres@localhost:5432/mydb';
const pool = new Pool({
  // connectionString: connectionString,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

router.get('/', async (ctx, next) => {
  // http://localhost/api/user
  const { rows } = await pool.query('SELECT * FROM userlist');
  ctx.body = {
    user: rows,
  };
});

router.get('/:id', async (ctx, next) => {
  // http://localhost/api/user/Robby
  const { rows } = await pool.query('SELECT * FROM userlist WHERE userid = $1', [ctx.params.id]);
  ctx.body = {
    user: rows,
  };
});

router.put('/', async (ctx, next) => {
  const uid = ctx.request.body.uid;
  const pwd = ctx.request.body.pwd;
  const { err } = await pool.query('INSERT INTO userlist(userid, pwd) VALUES ($1, $2)', [uid, pwd]);
  ctx.body = {
    status: err || 'success',
  };
});

router.patch('/:id', async (ctx, next) => {
  const uid = ctx.params.id;
  const pwd = ctx.request.body.pwd;
  const { err } = await pool.query('UPDATE userlist SET pwd = $1 WHERE userid = $2', [pwd, uid]);
  ctx.body = {
    status: err || 'success',
  };
});

router.delete('/:id', async (ctx, next) => {
  const uid = ctx.params.id;
  const { err } = await pool.query('DELETE FROM userlist WHERE userid = $1', [uid]);
  ctx.body = {
    status: err || 'success',
  };
});

export default router;

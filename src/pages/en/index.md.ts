import type { APIRoute } from 'astro';
import { markdownPage } from '../../lib/documents';

export const GET: APIRoute = ({ site }) =>
  new Response(markdownPage('en', site!), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });

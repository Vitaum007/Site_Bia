import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getDictionary, locales, mediaItems, talkTopics } from '../src/content/index.ts';

const rootDir = process.cwd();
const read = (rel: string) => fs.readFileSync(path.join(rootDir, rel), 'utf8');
const exists = (rel: string) => fs.existsSync(path.join(rootDir, rel));

test('Rotas do App Router existem e Textos permanece desativado', () => {
  for (const rel of [
    'src/app/globals.css',
    'src/app/[lang]/layout.tsx',
    'src/app/[lang]/page.tsx',
    'src/app/[lang]/midia/page.tsx',
  ]) {
    assert.ok(exists(rel), `Rota ausente: ${rel}`);
  }
  assert.ok(!exists('src/app/[lang]/textos'), 'A rota Textos deve ficar desativada');
  assert.ok(!exists('src/app/[lang]/_textos'), 'Rotas arquivadas ficam em _archive, fora de src');
});

test('Componentes de layout e de secao existem', () => {
  for (const rel of [
    'src/components/layout/Navbar.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/SmoothScroll.tsx',
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/LiquidTransition.tsx',
    'src/components/sections/AboutSection.tsx',
    'src/components/sections/ServicesSection.tsx',
    'src/components/sections/MediaHighlightSection.tsx',
    'src/components/sections/MediaCarousel.tsx',
    'src/components/sections/ContactSection.tsx',
  ]) {
    assert.ok(exists(rel), `Componente ausente: ${rel}`);
  }
});

test('Dicionarios PT e EN tem a mesma estrutura e as 3 modalidades', () => {
  assert.deepEqual(locales, ['pt', 'en']);
  const pt = getDictionary('pt');
  const en = getDictionary('en');
  assert.deepEqual(Object.keys(pt), Object.keys(en));
  assert.deepEqual(pt.services.modalities.map((m) => m.id), ['semanal', 'quinzenal', 'pontual']);
  assert.deepEqual(en.services.modalities.map((m) => m.id), ['semanal', 'quinzenal', 'pontual']);
});

test('Dados de midia e palestras estao completos em PT e EN', () => {
  assert.ok(mediaItems.length >= 4, 'Deve haver itens de midia');
  assert.ok(talkTopics.length >= 2, 'Deve haver temas de palestra');
  for (const item of mediaItems) {
    assert.ok(item.title.pt.length > 0 && item.title.en.length > 0);
    assert.ok(item.description.pt.length > 0 && item.description.en.length > 0);
  }
});

test('globals.css importa todos os arquivos de src/styles, sem repeticao', () => {
  const css = read('src/app/globals.css');
  const imported = [...css.matchAll(/@import '\.\.\/styles\/([\w-]+\.css)';/g)].map((m) => m[1]);
  const onDisk = fs.readdirSync(path.join(rootDir, 'src/styles')).filter((f) => f.endsWith('.css'));
  assert.equal(new Set(imported).size, imported.length, 'Import duplicado');
  assert.deepEqual([...imported].sort(), [...onDisk].sort(), 'Todo CSS de src/styles deve ser importado');
});

test('Tokens da identidade visual estao nos estilos', () => {
  const css = fs
    .readdirSync(path.join(rootDir, 'src/styles'))
    .map((f) => read(`src/styles/${f}`))
    .join('\n');
  for (const color of ['#334B89', '#6593C4', '#E3B7CE', '#EFEBE8']) {
    assert.match(css, new RegExp(color, 'i'), `Cor ausente: ${color}`);
  }
  assert.match(css, /--font-playfair/, 'Variavel da Playfair Display');
  assert.match(css, /feTurbulence/, 'Textura de granulado');
});

test('Ancoras da navegacao existem na home', () => {
  const sources = [
    'src/app/[lang]/page.tsx',
    'src/components/sections/AboutSection.tsx',
    'src/components/sections/ContactSection.tsx',
  ]
    .map(read)
    .join('\n');
  for (const id of ['sobre', 'atendimento', 'contato']) {
    assert.match(sources, new RegExp(`id=["']${id}["']`), `Ancora #${id} ausente`);
  }
});

test('Arquivos de apoio fora do codigo ativo ficam em _archive', () => {
  for (const rel of ['preview-server.mjs', 'preview-pt.html', 'preview-en.html']) {
    assert.ok(!exists(rel), `${rel} deve ficar em _archive`);
  }
  assert.match(read('tsconfig.json'), /_archive/, '_archive deve ser excluido do TypeScript');
});
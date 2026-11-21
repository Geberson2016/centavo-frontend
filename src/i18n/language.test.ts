import { describe, expect, it } from 'vitest';
import { DEFAULT_LANGUAGE, resolveLanguage } from './language';

describe('resolveLanguage', () => {
  it('a escolha salva vence o idioma do navegador', () => {
    expect(resolveLanguage('en', ['pt-BR'])).toBe('en');
  });

  it('ignora valor salvo que não é um idioma suportado', () => {
    expect(resolveLanguage('fr', ['en-US'])).toBe('en');
  });

  it('casa variantes regionais pela tag base', () => {
    expect(resolveLanguage(null, ['en-GB'])).toBe('en');
    expect(resolveLanguage(null, ['pt-PT'])).toBe('pt-BR');
  });

  it('segue a ordem de preferência do navegador', () => {
    expect(resolveLanguage(null, ['de-DE', '', 'en-US', 'pt-BR'])).toBe('en');
  });

  it('sem nada aproveitável, usa o padrão', () => {
    expect(resolveLanguage(null, ['de-DE', 'ja'])).toBe(DEFAULT_LANGUAGE);
    expect(resolveLanguage(null)).toBe(DEFAULT_LANGUAGE);
  });
});

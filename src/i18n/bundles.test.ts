import { describe, expect, it } from 'vitest';
import { errorCodeValues } from '../api/types';
import en from './en.json';
import ptBR from './pt-BR.json';

type Bundle = { [key: string]: string | Bundle };

// Achata o JSON em chaves com ponto: { a: { b: 'x' } } → ['a.b'].
function keysOf(bundle: Bundle, prefix = ''): string[] {
  return Object.entries(bundle).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [`${prefix}${key}`]
      : keysOf(value, `${prefix}${key}.`)
  );
}

describe('bundles de i18n', () => {
  it('pt-BR e en têm exatamente as mesmas chaves', () => {
    expect(keysOf(en).sort()).toEqual(keysOf(ptBR).sort());
  });

  it('nenhuma tradução está vazia', () => {
    for (const bundle of [ptBR, en] as Bundle[]) {
      const empty = keysOf(bundle).filter((key) => {
        const value = key
          .split('.')
          .reduce<
            string | Bundle
          >((node, part) => (node as Bundle)[part], bundle);
        return typeof value === 'string' && value.trim() === '';
      });
      expect(empty).toEqual([]);
    }
  });

  // Code novo no contrato do BFF sem tradução cairia na mensagem genérica sem ninguém notar.
  it.each(errorCodeValues)(
    'o code %s tem mensagem nos dois idiomas',
    (code) => {
      expect(ptBR.errors[code]).toBeTruthy();
      expect(en.errors[code]).toBeTruthy();
    }
  );
});

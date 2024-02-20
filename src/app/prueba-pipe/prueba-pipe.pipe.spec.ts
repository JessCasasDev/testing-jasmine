import { PruebaPipePipe } from './prueba-pipe.pipe';

describe('PruebaPipePipe', () => {
  it('create an instance', () => {
    const pipe = new PruebaPipePipe();
    expect(pipe).toBeTruthy();
  });
  
  const tests = [
    {
      prueba: 'minuscula',
      esperado: 'MINUSCULA',
    },
    { prueba: 'MAYUSCULA', esperado: 'MAYUSCULA' },
    { prueba: undefined, esperado: '' },
    { prueba: null, esperado: '' },
    { prueba: '', esperado: '' },
  ];
  
  tests.forEach((test) => {
    it(`Debería retornar ${test.esperado} cuando se envia ${test.prueba}`, () => {
      const pipe = new PruebaPipePipe();
      const resultado = pipe.transform(test.prueba);
      expect(resultado).toBe(test.esperado);
    });
  });
});

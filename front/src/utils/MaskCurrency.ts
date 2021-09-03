function parserNumber(value: string | undefined): number {
  if (!value) return 0;
  return Number(value.toString().replace('R$', '').replace(',', '.'));
}

function formatterNumber(value: string | undefined | number): string {
  if (!value) return '0';
  if (Number.isNaN(value)) return 'Valor Inválido.';
  return Number(value.toString().replace(',', '.')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

function formatterNumberWithoutPrefix(value: string | number | undefined): string {
  if (!value) return '0';
  if (Number.isNaN(value)) return 'Valor Inválido.';
  return Number(value).toFixed(2).toString().replace('.', ',');
}

export {
  formatterNumber,
  parserNumber,
  formatterNumberWithoutPrefix,
};

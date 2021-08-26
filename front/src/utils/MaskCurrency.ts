function parserNumber(value: string | undefined): number {
  if (!value) return 0;
  return Number(value.replace('R$', '').replace(',', '.'));
}

function formatterNumber(value: string | undefined): string {
  if (!value) return '0';
  if (Number.isNaN(value)) return 'Valor Inválido.';
  return Number(value.replace(',', '.')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

export {
  formatterNumber,
  parserNumber,
};

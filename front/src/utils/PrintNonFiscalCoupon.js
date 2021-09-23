/* eslint-disable */
import {formatterNumber, formatterNumberWithoutPrefix} from './MaskCurrency';

const qz = require('qz-tray');

export async function teste(data) {
  const connect = await qz.websocket.connect().catch(() => { throw new Error('Verifique se o software da impressora (QZ TRAY) está sendo executado.') });
  console.log(connect);

  const printers = await qz.printers.find().catch(async () => {
    await qz.websocket.disconnect();
    throw new Error('Não foi possível buscar pelas impressoras conectadas.');
  });
  console.log(printers);

  const config = qz.configs.create('ELGIN i9(USB)');
  console.log(config);

  await qz.print(config, [{
    type: 'pixel',
    format: 'html',
    flavor: 'plain',
    data,
  }]).catch(async () => {
    await qz.websocket.disconnect();
    throw new Error('A impressora Elgin i9(USB) não está conectada ou houve um erro de driver.');
  });

  await qz.websocket.disconnect();
}

export const getTableProducts = (sale) => {
  let tableLayout = `
    <table>
      <thead>
        <tr>
          <td style="width: 20%">QTD</td>
          <td style="width: 40%">Produto</td>
          <td style="width: 20%">UNIT</td>
          <td style="width: 20%">TOTAL</td>
        </tr>
      </thead>
      <tbody>
        content
      <tbody/>
    </table>
  `;
  let itemsTable;

  sale.items.forEach((item) => {
    itemsTable += `
    <tr>
      <td>${item.quantity}</td>
      <td>${item.product.name}</td>
      <td>${formatterNumberWithoutPrefix(item.product.priceSell)}</td>
      <td>${formatterNumberWithoutPrefix(item.product.priceSell * item.quantity)}</td>
    </tr>
    `;
  });

  tableLayout = tableLayout
    .replace('content', itemsTable)
    .replace('undefined', '');

  return tableLayout;
}

export async function mountCoupon(data, createdDate, valueReceived) {
  let tableLayout = `
    <table>
      <tbody>
        content
      <tbody/>
    </table>
  `;
  let itemsTable;

  let paymentString = data.paymentMethod;
  switch (paymentString) {
    case 'CASH':
      paymentString = 'Dinheiro';
      break;
    case 'CREDIT_CARD':
      paymentString = 'Cartão de Credito';
      break;
    case 'DEBIT_CARD':
      paymentString = 'Cartão de Debito';
      break;
  }

  const dateSale = new Date(createdDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  let header = `
    <h1>Império Construções</h1>
    <p>CNPJ: 42.977.287/0001-54</p>
    <p>Av. Gregorio Manoel Pereira - Ceramica, 2140 | Miguelópolis-SP </p>
  `;
  let tableProducts = getTableProducts(data);
  let valuesFinal = `
    <tr>
        <td>Valor Total</td>
        <td>
            <h2 style="padding: 0; margin: 0">${formatterNumber(data.totalValue)}</h2>
        </td>
    </tr>
    <tr>
        <td>Valor Pago</td>
        <td>
            <h3 style="padding: 0; margin: 0">${formatterNumber(valueReceived)}</h3>
        </td>
    </tr>
    <tr>
        <td>Troco</td>
        <td>
            <h3 style="padding: 0; margin: 0">${formatterNumber(valueReceived - data.totalValue)}</h3>
        </td>
    </tr>
    <tr>
        <td>M. Pagamento</td>
        <td>
            <h3 style="padding: 0; margin: 0">${paymentString}</h3>
        </td>
    </tr>
  `;
  let footer = `
    <p>data da compra: ${dateSale}</p>
    <p>Esse cupom não possui valor fiscal.</p>
    <h3>Agradecemos a Preferencia, volte sempre.</h3>
  `;

  let couponFinal = header + tableProducts + tableLayout.replace('content', valuesFinal) + footer;

  await teste(couponFinal);
  await teste(couponFinal);
}

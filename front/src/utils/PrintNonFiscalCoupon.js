/* eslint-disable */
import {formatterNumber, formatterNumberWithoutPrefix} from './MaskCurrency';

const qz = require('qz-tray');

export function teste(data) {
  qz.websocket.connect().then(() => qz.printers.find()).then((printers) => {
    console.log(printers);
    const config = qz.configs.create('ELGIN i9(USB)');
    return qz.print(config, [{
      type: 'pixel',
      format: 'html',
      flavor: 'plain',
      data,
    }]);
  }).then(() => qz.websocket.disconnect())
    .then(() => {
      // process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      // process.exit(1);
    });
}

export const getTableProducts = (sale) => {
  let tableLayout = `
    <table>
      <thead>
        <tr>
          <td>QTD</td>
          <td>Produto</td>
          <td>UNIT</td>
          <td>TOTAL</td>
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

export function mountCoupon(data, valueReceived) {
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

  let header = `
    <h1>Império Construções</h1>
    <p>CNPJ: 60.732.697/0001-17</p>
    <p>Endereço: Centro — Av. das Dores, 1976 </p>
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
    <p>Esse cupom não possui valor fiscal.</p>
    <h3>Agradecemos a Preferencia, volte sempre.</h3>
  `;

  let couponFinal = header + tableProducts + tableLayout.replace('content', valuesFinal) + footer;

  teste(couponFinal);
}

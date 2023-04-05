import React from 'react';
import { canadianCurrencyFormatter } from '../../helpers/formatters';

const calculateIsaAmountAndTotalCost = (payment, maxUpfrontCost) => {
  const differenceCoveredByIsa = maxUpfrontCost - payment;
  const totalIsaCost = differenceCoveredByIsa * 1.5 + payment;
  return [differenceCoveredByIsa, totalIsaCost];
};

const IsaCalculatorTableRow = ({ upfrontPayment, maxUpfrontAmount }) => {
  const [differenceCoveredByIsa, totalIsaCost] = calculateIsaAmountAndTotalCost(
    upfrontPayment,
    maxUpfrontAmount
  );

  return (
    <tr>
      <td>{canadianCurrencyFormatter(upfrontPayment)}</td>
      <td>{canadianCurrencyFormatter(differenceCoveredByIsa)}</td>
      <td>{canadianCurrencyFormatter(totalIsaCost)}</td>
    </tr>
  );
};

export default IsaCalculatorTableRow;

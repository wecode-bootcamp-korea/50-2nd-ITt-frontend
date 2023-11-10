import React, { useEffect, useRef } from 'react';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import './PaymentWidget.scss';
import Button from '../../../../components/Button/Button';

const PaymentWidget = ({ title, totalPrice }) => {
  // const originUrl = process.env.originUrl;
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'; // 테스트키
  const customerKey = 'v5IQ9Xgi3DpNmW5T_QhDy'; // 테스트키
  const paymentWidgetRef = useRef(null);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    if (paymentWidget) {
      paymentWidget
        .requestPayment({
          orderId: 'qwjek3183',
          orderName: title,
          customerName: '맴',
          customerEmail: 'customer123@gmail.com',
          successUrl: 'http://localhost:3000/success',
          failUrl: 'http://localhost:3000/fail',
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidget.renderPaymentMethods('#payment-widget', totalPrice);
      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  return (
    <div className="paymentWidget">
      <div id="payment-widget" />

      <div className="btnArea">
        <Button width="200px" onClick={handlePayment}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentWidget;

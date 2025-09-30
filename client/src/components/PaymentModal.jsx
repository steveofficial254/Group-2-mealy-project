import React, { useState } from 'react';
import { X, CreditCard, Smartphone } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, orderTotal, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete({ method: paymentMethod, success: true });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Total Amount: KSh {orderTotal.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('mpesa')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                paymentMethod === 'mpesa' ? 'border-green-600 bg-green-50' : 'border-gray-300'
              }`}
            >
              <Smartphone className="h-8 w-8 mb-2" />
              <span className="font-medium">M-PESA</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                paymentMethod === 'card' ? 'border-green-600 bg-green-50' : 'border-gray-300'
              }`}
            >
              <CreditCard className="h-8 w-8 mb-2" />
              <span className="font-medium">Card</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {paymentMethod === 'mpesa' ? (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">M-PESA Phone Number</label>
              <input
                type="tel"
                placeholder="0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                You will receive an STK push to complete payment
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  maxLength="19"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    maxLength="5"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    required
                    maxLength="3"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Pay KSh ${orderTotal.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;

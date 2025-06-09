import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import Table from '../components/Table';
import Avatar from '../components/Avatar';
import { icons } from '../assets/icons/icons'; // Assuming icons are exported from here

const FinalizedOrderPage = () => {
  const finalizedOrder = useSelector((state) => state.order.finalizedOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (!finalizedOrder) {
      // Redirect if no finalized order data is present
      navigate('/home'); // Or wherever appropriate
    }
  }, [finalizedOrder, navigate]);

  if (!finalizedOrder) {
    return null; // Or a loading spinner
  }

  const collectiveTableHeaders = [
    { key: 'qty', label: 'Qty' },
    { key: 'itemName', label: 'Item Name' },
    { key: 'pricePerItem', label: 'Price/Item' },
    { key: 'subtotal', label: 'Subtotal' },
  ];

  const collectiveTableData = finalizedOrder.collectiveOrder.map(item => ({
    qty: item.qty,
    itemName: item.itemName,
    pricePerItem: `$${item.pricePerItem.toFixed(2)}`,
    subtotal: `$${item.subtotal.toFixed(2)}`,
  }));

  const handleBackToSpaces = () => {
    navigate('/home'); // Adjust as per your routing
  };

  const handleCopyOrder = () => {
    const orderSummary = `Order Finalized!
Here is the summary for your '${finalizedOrder.orderName}' from '${finalizedOrder.restaurant}'.

Collective Order:
${finalizedOrder.collectiveOrder.map(item => `${item.qty} x ${item.itemName} ($${item.pricePerItem.toFixed(2)}) = $${item.subtotal.toFixed(2)}`).join('\n')}
Grand Total: $${finalizedOrder.grandTotal.toFixed(2)}

Participant Orders:
${finalizedOrder.participantOrders.map(participant => `  ${participant.name}:
    ${participant.items.map(item => `${item.qty} x ${item.itemName}`).join('\n    ')}
    Total: $${participant.total.toFixed(2)}`).join('\n\n')}
    `;
    navigator.clipboard.writeText(orderSummary)
      .then(() => alert('Order summary copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Finalized!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Here is the summary for your '{finalizedOrder.orderName}' from '{finalizedOrder.restaurant}'.
      </p>

      <Container className="w-full max-w-3xl mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Collective Order</h2>
        <Table headers={collectiveTableHeaders} data={collectiveTableData} />
        <div className="text-right mt-4 text-xl font-bold text-gray-800">
          Grand Total: ${finalizedOrder.grandTotal.toFixed(2)}
        </div>
      </Container>

      <Container className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Participant Orders</h2>
        {finalizedOrder.participantOrders.map((participant, index) => (
          <div key={index} className="flex items-start mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <Avatar initials={participant.initials} className="mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-medium text-gray-800">{participant.name}</h3>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {participant.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item.qty} x {item.itemName}</li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-gray-700 mt-2">Total: ${participant.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </Container>

      <div className="flex justify-center mt-8 space-x-4">
        <Button onClick={handleBackToSpaces} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          {icons.arrowLeft} Back to Spaces
        </Button>
        <Button onClick={handleCopyOrder} className="bg-blue-600 text-white hover:bg-blue-700">
          {icons.copy} Copy Order to Clipboard
        </Button>
      </div>
    </div>
  );
};

export default FinalizedOrderPage;
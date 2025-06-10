import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Container from '../components/Container';
import Button from '../components/Button';
import Table from '../components/Table';
import Avatar from '../components/Avatar';
import { icons } from '../assets/icons/icons';
import { handleToast } from '../components/alerts';

const FinalizedOrderPage = () => {
  const finalizedOrder = useSelector((state) => state.order.finalizedOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (!finalizedOrder) {
      // Redirect if no finalized order data is present
      navigate("/home"); // Or wherever appropriate
    }
  }, [finalizedOrder, navigate]);

  if (!finalizedOrder) {
    return null; // Or a loading spinner
  }

  const collectiveTableHeaders = [
    { key: "qty", label: "Qty" },
    { key: "itemName", label: "Item Name" },
    { key: "pricePerItem", label: "Price/Item" },
    { key: "subtotal", label: "Subtotal" },
  ];

  const collectiveTableData = finalizedOrder.collectiveOrder.map((item) => ({
    qty: item.qty,
    itemName: item.itemName,
    pricePerItem: `$${item.pricePerItem.toFixed(2)}`,
    subtotal: `$${item.subtotal.toFixed(2)}`,
  }));

  const handleBackToSpaces = () => {
    navigate("/home"); // Adjust as per your routing
  };

  const handleCopyOrder = () => {
    const orderSummary = `Order Finalized!
Here is the summary for your '${finalizedOrder.orderName}' from '${
      finalizedOrder.restaurant
    }'.

Collective Order:
${finalizedOrder.collectiveOrder
  .map(
    (item) =>
      `${item.qty} x ${item.itemName} ($${item.pricePerItem.toFixed(
        2
      )}) = $${item.subtotal.toFixed(2)}`
  )
  .join("\n")}
Grand Total: $${finalizedOrder.grandTotal.toFixed(2)}

Participant Orders:
${finalizedOrder.participantOrders
  .map(
    (participant) => `  ${participant.name}:
    ${participant.items
      .map((item) => `${item.qty} x ${item.itemName}`)
      .join("\n    ")}
    Total: $${participant.total.toFixed(2)}`
  )
  .join("\n\n")}
    `;
    navigator.clipboard
      .writeText(orderSummary)
      .then(() => handleToast("Order summary copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        handleToast("Failed to copy order summary.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 text-base-content">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-primary mb-4">
            Order Finalized!
          </h1>
          <p className="text-xl text-base-content/80">
            Here is the summary for your{" "}
            <span className="font-semibold text-accent">
              '{finalizedOrder.orderName}'
            </span>{" "}
            from{" "}
            <span className="font-semibold text-accent">
              '{finalizedOrder.restaurant}'
            </span>
            .
          </p>
        </div>

        <Container className="w-full p-8 bg-base-200 rounded-xl shadow-2xl border border-base-300">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Collective Order Summary
          </h2>
          <Table headers={collectiveTableHeaders} data={collectiveTableData} />
          <div className="text-right mt-6 text-2xl font-bold text-primary">
            Grand Total:{" "}
            <span className="text-accent">
              ${finalizedOrder.grandTotal.toFixed(2)}
            </span>
          </div>
        </Container>

        <Container className="w-full p-8 bg-base-200 rounded-xl shadow-2xl border border-base-300">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Participant Breakdowns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalizedOrder.participantOrders.map((participant, index) => (
              <div
                key={index}
                className="flex flex-col items-start p-6 bg-base-100 rounded-lg shadow-lg border border-base-300 transition-transform transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <Avatar
                    title={participant.initials}
                    className="mr-4 flex-shrink-0 text-2xl w-12 h-12"
                  />
                  <h3 className="text-2xl font-semibold text-secondary">
                    {participant.name}
                  </h3>
                </div>
                <ul className="list-none pl-0 mt-1 w-full">
                  {participant.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex justify-between items-center py-1 border-b border-base-200 last:border-b-0"
                    >
                      <span className="text-base-content">
                        {item.qty} x {item.itemName}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xl font-bold text-primary mt-4 self-end">
                  Total:{" "}
                  <span className="text-accent">
                    ${participant.total.toFixed(2)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Container>

        <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            onClick={handleBackToSpaces}
            className="btn btn-secondary btn-lg flex items-center justify-center"
          >
            {icons.arrowLeft} <span className="ml-2">Back to Spaces</span>
          </Button>
          <Button
            onClick={handleCopyOrder}
            className="btn btn-primary btn-lg flex items-center justify-center"
          >
            {icons.copy} <span className="ml-2">Copy Order to Clipboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalizedOrderPage;

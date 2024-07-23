import { useMutation } from "@apollo/client";
import { UPDATE_PAYMENT_DETAIL_ORDER } from "../src/graphQl/queries/UpdatePaymentDetailOrder";

const useUpdatePaymentDetailOrder = () => {
  const [updatePaymentDetailOrder, { data, loading, error }] = useMutation(
    UPDATE_PAYMENT_DETAIL_ORDER
  );

  const updateOrder = async (paymentDetailResponseId, orderNumber) => {
    try {
      await updatePaymentDetailOrder({
        variables: {
          id: paymentDetailResponseId,
          newOrderNumber: `${paymentDetailResponseId}${orderNumber}`,
        },
      });
    } catch (err) {
      console.error("No es posible actualizar la orden en payment detail", err);
    }
  };

  return {
    updateOrder,
    data,
    loading,
    error,
  };
};

export default useUpdatePaymentDetailOrder;

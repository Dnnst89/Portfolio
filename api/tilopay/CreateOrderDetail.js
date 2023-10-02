import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "@/src/graphQl/queries/createUserOrder";
export const CreateOrderDetail = ({ userId, total }) => {
  const [createOrder] = useMutation(CREATE_ORDER);

  const handleCreateOrder = async () => {
    try {
      const { data } = await createOrder({
        variables: {
          input: {
            total: total,
            status: "Pending",
            userId: userId,
          },
        },
      });
      handleCreateOrder();
      console.log("   dfdfd", data);
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
};

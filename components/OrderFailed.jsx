import Image from "next/image";

const OrderFailed = ({ description }) => {
  return (
    <>
      <div className="flex flex-col items-end justify-center space-y-3">
        <div className="flex flex-col items-center space-y-1 ml-3">
          <h1 className="text-xl bold">
            ¡Lo sentimos no se ha podido realizar el pago!
          </h1>
          <p className="text-sm">{description}</p>
          <p className="text-sm">Intentalo nuevamente</p>
        </div>
        <div className="bg-white w-[250px] p-3 flex flex-col items-center ml-[20px] rounded-md">
          <h2>No te preocupes, tus productos continuan en tu carrito.</h2>
        </div>

        <button
          onClick={() => router.push("/checkout")} // Specify the URL to which you want to navigate
          className="bg-pink-200 text-white rounded-sm p-2 w-[150px]"
        >
          Volver
        </button>
      </div>
    </>
  );
};

export default OrderFailed;

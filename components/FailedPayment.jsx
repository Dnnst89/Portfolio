"use client";
/**
 *
 * @returns when payment has been rejected.
 */
const FailedPayment = () => {
  // Render the component only if isVisible is true
  return (
    <div>
      <div className="flex justify-center items-center rounded-sm w-[500px] h-[100px] z-50 bg-[#ef4444] absolute top-0 left-0 right-0 mx-auto">
        <h2>¡Lo sentimos no se ha podido realizar el pago!</h2>
        <p className="text-white text-2xl font-semibold">
          Por favor inténtalo nuevamente.
        </p>
        <p>
          Si el problema persiste, comunícate con nuestro equipo de soporte.
        </p>
      </div>
    </div>
  );
};

export default FailedPayment;

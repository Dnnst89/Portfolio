import { GET_USER_PAYMENT_INFO } from "@/src/graphQl/queries/getUserPaymentInfo";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_INFORMATION } from "@/src/graphQl/queries/updateUserInformation";
import { UPDATE_ADDRESS } from "@/src/graphQl/queries/updateAddress";
import { CREATE_ADDRESS } from "@/src/graphQl/queries/createAddress";
import { useForm } from "react-hook-form";
import CartDetail from "./CartDetail";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import CheckOutForm2 from "./CheckOutForm2";
import useStorage from "@/hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";
import Map from "./Map";
import { Marker } from "@react-google-maps/api";
import WrappedGiftCheckbox from "./WrappedGiftCheckbox";
import { useSelector } from "react-redux";
import useCartSummary from "@/hooks/useCartSummary";
import ProvinciaDropdown from "./ProvinciaDropdown";
import CantonDropdown from "./CantonDropdown";
import DistritoDropdown from "./DistritoDropdown";
import { PROVINCIAS } from "../api/direcciones/data";
function FormOne() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [inputsEnabled, setInputsEnabled] = useState(false); //enable or disable user information inputs / show or hide the map component
  let [checkedEditInfoVisible, setcheckedEditInfoVisible] = useState(true);

  const [updateUserInformation] = useMutation(UPDATE_USER_INFORMATION);
  const [updateAddress] = useMutation(UPDATE_ADDRESS);
  const [getUserInfo] = useLazyQuery(GET_USER_PAYMENT_INFO);
  const [createAddress] = useMutation(CREATE_ADDRESS);
  const [checkoutForm1Visible, setCheckoutForm1Visible] = useState(false);
  const { user } = useStorage();
  const userId = user?.id;
  const [checkbox, setCheckbox] = useState(false);
  const [fisica, setFisica] = useState(true);
  const [addressId, setAddressId] = useState();
  const [userInfoExist, setUserInfoExist] = useState();
  const isoDate = new Date().toISOString();
  const [province, setProvince] = useState("");
  const [canton, setCanton] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isCheckOut, setIscheckOut] = useState("");
  const [wrappedGiftCheckbox, setWrappedGiftCheckbox] = useState(false);
  // loading wrapped gifts from dropdown
  const { items, sessionId } = useCartSummary({
    userId: userId,
  });
  const [provincia, setProvincia] = useState("");
  const [cantonw, setCantonw] = useState("");
  const [distrito, setDistrito] = useState("");

  const [userInformation, setUserInformation] = useState({
    //campos de formulario
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postCode: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    canton: "",
    idNumber: "",
    idType: "",
    invoiceEmail: "",
  });
  const [deliveryPayment, setDeliveryPayment] = useState(0);

  const handleCheckout = (isCheckOut) => {
    setIscheckOut(isCheckOut);
  };
  const handleProvinciaChange = (provinciaSeleccionada) => {
    setProvincia(provinciaSeleccionada);
    setCantonw(""); // Resetear el cantón cuando cambia la provincia
    setDistrito(""); // Resetear el distrito cuando cambia la provincia
  };

  const handleCantonChange = (cantonSeleccionado) => {
    setCantonw(cantonSeleccionado);
    setDistrito(""); // Resetear el distrito cuando cambia el cantón
    handleCanton();
  };

  const handleDistritoChange = (distritoSeleccionado) => {
    setDistrito(distritoSeleccionado);
    // console.log("handle distrito", distritoSeleccionado);
    setAddress1(distritoSeleccionado);
  };

  const handleDeliveryPayment = (data) => {
    setDeliveryPayment(data);
  };
  const [lat, setLat] = useState(0);
  const handleLat = (data) => {
    setLat(data);
  };

  const [lng, setLng] = useState(0);
  const handleLng = (data) => {
    setLng(data);
  };
  // Asigna los valores a pagar en el carrito
  const [amount, setAmount] = useState({
    total: 0,
    subTotal: 0,
    taxes: 0,
  });

  const handleChange = (data) => {
    setAmount(data);
  };
  const handleProvince = (data, provincias) => {
    setUserInformation((prevUserInformation) => ({
      ...prevUserInformation,
      province: data,
    }));
    const provincia = provincias[data]?.nombre || "";
    setProvince(provincia);
    setCanton("");
    setAddress1("");
    setAddress2("");
  };
  const handleCanton = (cantonNombre) => {
    setUserInformation((prevUserInformation) => ({
      ...prevUserInformation,
      canton: cantonNombre,
    }));

    setCanton(cantonNombre);
    setAddress1("");
    setAddress2("");
  };

  const handleAddress1 = (data) => {
    setUserInformation((prevUserInformation) => ({
      ...prevUserInformation, // Copia todas las propiedades existentes
      addressLine1: data, // Modifica solo la propiedad distrito
    }));
    setAddress1(data);
  };

  const cargaDatos = async () => {
    try {
      setIscheckOut(false);
      const userData = JSON.parse(localStorage.getItem("userData")); //datos de user
      const userDataId = userData.user.id;

      const { data, error, loading } = await getUserInfo({
        variables: { id: userDataId },
        fetchPolicy: "network-only",
      });

      handleShowCheckboxEditInfo(data);

      if (error)
        return toast.error(
          "Lo sentimos, ha ocurrido un error al cargar los datos",
          {
            autoClose: 5000,
          }
        );

      if (data && data.usersPermissionsUser) {
        if (data.usersPermissionsUser.data.attributes.users_address.data) {
          setUserInfoExist(true);
          setAddressId(
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.id
          );
          setLat(
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.latitude || ""
          );
          setLng(
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.longitude || ""
          );
        } else {
          setUserInfoExist(false);
        }

        setProvince(
          data?.usersPermissionsUser?.data?.attributes?.users_address?.data
            ?.attributes?.province || ""
        );
        setCanton(
          data?.usersPermissionsUser?.data?.attributes?.users_address?.data
            ?.attributes?.canton || ""
        );
        setAddress1(
          data?.usersPermissionsUser?.data?.attributes?.users_address?.data
            ?.attributes?.addressLine1 || ""
        );
        setAddress2(
          data?.usersPermissionsUser?.data?.attributes?.users_address?.data
            ?.attributes?.addressLine2 || ""
        );

        setUserInformation({
          ...userInformation,
          firstName:
            data?.usersPermissionsUser?.data?.attributes?.firstName || "",
          lastName:
            data?.usersPermissionsUser?.data?.attributes?.lastName || "",
          invoiceEmail:
            data?.usersPermissionsUser?.data?.attributes?.invoiceEmail || "",
          phone:
            data?.usersPermissionsUser?.data?.attributes?.phoneNumber || "",
          postCode:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.postCode || "",
          country:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.country || "",
          addressLine1:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.addressLine1 || "",
          addressLine2:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.addressLine2 || "",
          province:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.province || "",
          canton:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.canton || "",
          idNumber: "",
          idType: "Física",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  };
  const [selectedLat, setSelectedLat] = useState();
  const [selectedLng, setSelectedLng] = useState();
  const handleMarkerChange = (markerPosition) => {
    setSelectedLat(markerPosition.lat);
    setSelectedLng(markerPosition.lng);
  };

  /* const estimationMoovin = () => {
    const estimation = requestEstimation();
    console.log("moovin :", estimation);
  };
*/
  useEffect(() => {
    cargaDatos();

    //console.log("pppp", dataForm.firstName);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset(userInformation);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation]);

  const onSubmit = handleSubmit(async (dataForm) => {
    try {
      setCheckoutForm1Visible(true);

      const {
        data: userData,
        error: userError,
        loading: userLoading,
      } = await updateUserInformation({
        variables: {
          firstName: dataForm.firstName,
          lastName: dataForm.lastName,
          invoiceEmail:
            dataForm.invoiceEmail == "" ? null : dataForm.invoiceEmail,
          phone: parseInt(dataForm.phone),
          idType: dataForm.idType,
          idNumber: parseInt(dataForm.idNumber),
          id: userId,
        },
      });

      if (userError)
        return toast.error("Error al ingresar la información del usuario", {
          autoClose: 5000,
        });

      if (userInfoExist) {
        const {
          data: addressData,
          error: addressError,
          loading: addressLoading,
        } = await updateAddress({
          variables: {
            country: dataForm.country,
            postCode: dataForm.postCode,
            province: dataForm.province,
            addressLine1: dataForm.addressLine1,
            addressLine2:
              dataForm.addressLine2 == "" ? null : dataForm.addressLine2,
            latitude: selectedLat !== undefined ? selectedLat : lat,
            longitude: selectedLng !== undefined ? selectedLng : lng,
            canton: dataForm.canton,
            id: addressId,
          },
        });

        if (addressError)
          return toast.error("Error al actualizar la dirección", {
            autoClose: 5000,
          });
      } else {
        const {
          data: createAddressData,
          error: createAddressError,
          loading: createAddressLoading,
        } = await createAddress({
          variables: {
            postCode: dataForm.postCode,
            country: dataForm.country,
            addressLine1: dataForm.addressLine1,
            addressLine2: dataForm.addressLine2,
            province: dataForm.province,
            canton: dataForm.canton,
            latitude: selectedLat || lat,
            longitude: selectedLng || lng,
            publishedAt: isoDate,
            id: userId,
          },
        });
        if (createAddressError)
          return toast.error("Error al crear la dirección", {
            autoClose: 5000,
          });

        const newAddress = createAddressData.createUsersAddress.data.id;
        setAddressId(newAddress);
        setUserInfoExist(true);
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  });
  const handleShowCheckboxEditInfo = (data) => {
    const attributes = data.usersPermissionsUser.data.attributes;
    const users_address = attributes.users_address.data?.attributes;

    if (
      !attributes.firstName &&
      !attributes.lastName &&
      !attributes.phoneNumber &&
      !users_address?.postCode &&
      !users_address?.country &&
      !users_address?.province &&
      !users_address?.canton &&
      !users_address?.addressLine1 &&
      !users_address?.addressLine2
    ) {
      setcheckedEditInfoVisible(false);
      setInputsEnabled(true);
    } else {
      setcheckedEditInfoVisible(true);
    }
  };
  const handleCheckboxEditInfoChange = () => {
    inputsEnabled ? setInputsEnabled(false) : setInputsEnabled(true);
  };
  return (
    <div>
      <Toaster />
      <div className="w-full max-w-screen-xl m-auto grid grid-cols-12 mt-10 mb-20">
        <div className="col-span-12 md:col-span-9 md:pr-2">
          <div className="flex  justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200 min-w-3[375px] justify-between">
            <div className="flex justify-center items-center min-w-[375px] max-w-[375px] m-auto justify-between px-3 whitespace-nowrap">
              <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
                1
              </div>
              <h1 className="text-xl min-w-[210px]">Información del pedido</h1>
              {checkoutForm1Visible && (
                <>
                  <div>
                    <button
                      className="ml-8"
                      onClick={() => {
                        setCheckoutForm1Visible(false);
                        setIscheckOut(false);
                      }}
                    >
                      <AiOutlineEdit
                        style={{
                          color: "orange",
                        }}
                        size={35}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {!checkoutForm1Visible ? (
            <form onSubmit={onSubmit}>
              {checkedEditInfoVisible ? (
                <div className="flex ml-14 justify-center w-full">
                  <section className="w-3/4 m-auto mt-10  flex items-center space-x-5">
                    <label htmlFor="idType">Editar información de envío</label>
                    <input
                      className="p-3"
                      type="checkbox"
                      id="CheckboxEditInfo"
                      checked={inputsEnabled}
                      onChange={handleCheckboxEditInfoChange}
                    />
                  </section>
                </div>
              ) : null}

              <div className="mt-[40px] mx-[30px]">
                <main className="flex ">
                  <section className="w-full">
                    <div className="flex justify-center">
                      <section className="md:w-4/6 grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="name">Nombre</label>
                          <input
                            type="text"
                            id="firstName"
                            {...register("firstName", {
                              required: {
                                value: true,
                                message: "El nombre es requerido",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  "La información es insuficiente, por favor pon tu nombre completo",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "El nombre no puede tener más de 30 caracteres",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          />
                          <p className="text-red text-xs">
                            {errors.firstName?.message}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="lastName">Apellidos</label>
                          <input
                            type="text"
                            id="lastName"
                            {...register("lastName", {
                              required: {
                                value: true,
                                message: "El apellido es requerido",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  "La información es insuficiente, por favor pon tu apellido completo",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "El apellido no puede tener más de 50 caracteres",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          />
                          <p className="text-red text-xs">
                            {errors.lastName?.message}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="phone">Teléfono</label>
                          <input
                            type="text"
                            id="phone"
                            {...register("phone", {
                              required: {
                                value: true,
                                message: "El teléfono es requerido",
                              },
                              minLength: {
                                value: 8,
                                message:
                                  "El teléfono no puede tener menos de 8 dígitos",
                              },
                              maxLength: {
                                value: 8,
                                message:
                                  "El teléfono no puede tener más de 8 dígitos",
                              },
                              pattern: {
                                value: /^[0-9]*$/, // Expresión regular que solo permite números
                                message: "Ingresa solo números",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          />
                          <p className="text-red text-xs">
                            {errors.phone?.message}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid content-baseline bg-gray-500">
                          <label htmlFor="country">País</label>
                          <input
                            type="text"
                            id="country"
                            value={"Costa Rica"}
                            readOnly
                            {...register("country", {
                              required: {
                                value: true,
                                message: "El país es requerido",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  "El país no puede tener menos de 2 letras",
                              },
                              maxLength: {
                                value: 20,
                                message:
                                  "El país postal no puede tener más de 20 letras",
                              },
                              pattern: {
                                value: /^[^0-9]*$/, // Expresión regular que no permite números
                                message: "No se permiten números en este campo",
                              },
                            })}
                            className="bg-grey-400"
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          />
                          <p className="text-red text-xs">
                            {errors.country?.message}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="province">Provincia</label>
                          <input
                            type="text"
                            id="province"
                            {...register("province", {
                              onChange: (e) => {
                                setProvince(e.target.value);
                                //handleInputBlur(provincia);
                              },
                              required: {
                                value: true,
                                message: "La provincia es requerida",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  "La provincia no puede tener menos de 2 letras",
                              },
                              maxLength: {
                                value: 20,
                                message:
                                  "La provincia no puede tener más de 20 letras",
                              },
                              pattern: {
                                value: /^[^0-9]*$/, // Expresión regular que no permite números
                                message: "No se permiten números en este campo",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          ></input>
                          <p className="text-red text-xs">
                            {errors.province?.message}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="canton">Cantón</label>
                          <input
                            type="text"
                            id="canton"
                            {...register("canton", {
                              onChange: (e) => {
                                setCanton(e.target.value);
                              },

                              required: {
                                value: true,
                                message: "El cantón es requerido",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  "El cantón no puede tener menos de 2 letras",
                              },
                              maxLength: {
                                value: 20,
                                message:
                                  "El cantón no puede tener más de 20 letras",
                              },
                              pattern: {
                                value: /^[^0-9]*$/, // Expresión regular que no permite números
                                message: "No se permiten números en este campo",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          ></input>
                          <p className="text-red text-xs">
                            {errors.canton?.message}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="addressLine1">Distrito</label>
                          <input
                            type="text"
                            id="addressLine1"
                            {...register("addressLine1", {
                              onChange: (e) => {
                                setAddress1(e.target.value);
                              },
                              required: {
                                value: true,
                                message: "La dirreción es requerida",
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "La dirección es muy corta, por favor se más específico",
                              },
                              maxLength: {
                                value: 100,
                                message:
                                  "La información es muy grande, por favor utiliza la segunda linea",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          ></input>
                          <p className="text-red text-xs">
                            {errors.addressLine1?.message}
                          </p>
                        </div>
                        {/*/}
                       
                       
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <ProvinciaDropdown
                            provincias={PROVINCIAS}
                            onProvinciaChange={handleProvinciaChange}
                            defaultValue={userInformation.province || ""}
                            disable={inputsEnabled}
                            handleProvince={handleProvince}
                          />
                        </div>
                        {console.log("canton", userInformation.canton)}
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <CantonDropdown
                            provincias={PROVINCIAS}
                            provinciaSeleccionada={provincia}
                            onCantonChange={handleCantonChange}
                            defaultValue={userInformation.canton || ""}
                            disable={inputsEnabled}
                            handleCanton={handleCanton}
                          />
                        </div>
                       
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <DistritoDropdown
                            provincias={PROVINCIAS}
                            provinciaSeleccionada={provincia}
                            cantonSeleccionado={cantonw}
                            onDistritoChange={handleDistritoChange}
                            defaultValue={userInformation.addressLine1 || ""}
                            disable={inputsEnabled}
                            handleAddress1={handleAddress1}
                          />
                        </div>
                        {*/}
                        <div className="col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="postCode">Código Postal</label>
                          <input
                            type="text"
                            id="postCode"
                            {...register("postCode", {
                              required: {
                                value: true,
                                message: "El código postal es requerido",
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "El código postal no puede tener menos de 5 dígitos",
                              },
                              maxLength: {
                                value: 5,
                                message:
                                  "El código postal no puede tener más de 5 dígitos",
                              },
                              pattern: {
                                value: /^[0-9]*$/, // Expresión regular que solo permite números
                                message: "Ingresa solo números",
                              },
                            })}
                            className={`bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          />
                          <p className="text-red text-xs">
                            {errors.postCode?.message}
                          </p>
                        </div>
                        {/*Otras señas*/}
                        <div className=" col-span-12 md:col-span-6 grid content-baseline">
                          <label htmlFor="addressLine2">Otras señas</label>
                          <textarea
                            //type="text"
                            id="addressLine2"
                            {...register("addressLine2", {
                              onChange: (e) => {
                                setAddress2(e.target.value);
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "La dirección es muy corta, por favor ser más específico",
                              },
                              maxLength: {
                                value: 100,
                                message:
                                  "La información es muy grande, intenta reducirla",
                              },
                            })}
                            className={`h-20 resize-none bg-${
                              inputsEnabled ? "white" : "grey-400"
                            } `}
                            disabled={!inputsEnabled} // Disable input if inputsEnabled is false
                          />
                          <p className="text-red text-xs">
                            {errors.addressLine2?.message}
                          </p>
                        </div>

                        {inputsEnabled ? (
                          <div className="col-span-12 md:col-span-6 mt-6 grid content-baseline">
                            <Map
                              zoom={15}
                              onMarkerChange={handleMarkerChange}
                              province={province}
                              canton={canton}
                              address1={address1}
                              address2={address2}
                              handleLat={handleLat}
                              handleLng={handleLng}
                            />
                          </div>
                        ) : null}
                      </section>
                    </div>
                    {/*
                  Se adiciona componente que permite seleccionar los regalos 
                  a envolver por el cliente. 
                        */}
                    <div className="flex flex-col min-h-[100px]">
                      <h4 className="w-3/4 m-auto mt-5 mb-3 flex items-center space-x-5">
                        Seleccione los artículos a envolver 🎁:
                      </h4>
                      <WrappedGiftCheckbox />
                    </div>
                    {/*
                    <div className="inline-block justify-center w-full">
                      <section className="w-3/4 m-auto mt-10 mb-3 flex items-center space-x-5">
                        <label htmlFor="idType">Factura Electrónica</label>
                        <input
                          className="p-3"
                          type="checkbox"
                          id="checkbox"
                          {...register("checkbox", {
                            onChange: (e) => {
                              if (e.target.checked) {
                                setCheckbox(true);
                              } else {
                                setCheckbox(false);
                              }
                            },
                          })}
                        ></input>
                      </section>
                    </div>
                    {checkbox && (
                      <>
                        <div className="flex justify-center">
                          <section className="md:w-4/6 grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6 grid">
                              <label htmlFor="idType">Tipo De Cédula</label>
                              <select
                                {...register("idType", {
                                  onChange: (e) => {
                                    const selectedValue = e.target.value;
                                    if (selectedValue === "Física") {
                                      setFisica(true);
                                    } else {
                                      setFisica(false);
                                    }
                                  },
                                })}
                              >
                                <option value={"Física"}>Física</option>
                                <option value={"Jurídica"}>Jurídica</option>
                              </select>
                            </div>
                            {fisica ? (
                              <div className="col-span-12 md:col-span-6 grid">
                                <label htmlFor="idNumber">Cédula</label>
                                <input
                                  type="text"
                                  id="idNumber"
                                  {...register("idNumber", {
                                    required: {
                                      value: true,
                                      message: "La cédula es requerida",
                                    },
                                    minLength: {
                                      value: 9,
                                      message:
                                        "La cédula física no puede tener menos de 9 dígitos",
                                    },
                                    maxLength: {
                                      value: 9,
                                      message:
                                        "La cédula física no puede tener más de 9 dígitos",
                                    },
                                    pattern: {
                                      value: /^[0-9]*$/, // Expresión regular que solo permite números
                                      message: "Ingresa solo números",
                                    },
                                  })}
                                ></input>
                                <p className="text-red text-xs">
                                  {errors.idNumber?.message}
                                </p>
                              </div>
                            ) : (
                              <div className="col-span-6 grid">
                                <label htmlFor="idNumber">Cédula</label>
                                <input
                                  type="text"
                                  id="idNumber"
                                  {...register("idNumber", {
                                    required: {
                                      value: true,
                                      message: "La cédula es requerida",
                                    },
                                    minLength: {
                                      value: 10,
                                      message:
                                        "La cédula jurídica no puede tener menos de 10 dígitos",
                                    },
                                    maxLength: {
                                      value: 10,
                                      message:
                                        "La cédula jurídica no puede tener más de 10 dígitos",
                                    },
                                    pattern: {
                                      value: /^[0-9]*$/, // Expresión regular que solo permite números
                                      message: "Ingresa solo números",
                                    },
                                  })}
                                ></input>
                                <p className="text-red text-xs">
                                  {errors.idNumber?.message}
                                </p>
                              </div>
                            )}
                          </section>
                        </div>
                        <section className="flex justify-center">
                          <section className="md:w-4/6 grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6 grid">
                              <label
                                className="whitespace-nowrap  w-full pt-4"
                                htmlFor="invoiceEmail"
                              >
                                Correo electrónico para factura
                              </label>
                              <input
                                type="text"
                                id="invoiceEmail"
                                {...register("invoiceEmail", {
                                  required: {
                                    value: true,
                                    message: "El correo es requerido",
                                  },
                                  pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                      "Ingresa una dirección de correo electrónico válida",
                                  },
                                })}
                              ></input>
                              <p className="text-red text-xs">
                                {errors.invoiceEmail?.message}
                              </p>
                            </div>
                          </section>
                        </section>
                      </>
                    )} */}
                  </section>
                </main>
                <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
                  <input
                    className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
                    type="submit"
                    value={"Continuar"}
                  ></input>
                </div>
              </div>
            </form>
          ) : (
            <CheckOutForm2
              amount={amount}
              checkbox={checkbox}
              handleDeliveryPayment={handleDeliveryPayment}
              setAmount={handleChange}
              lat={lat}
              lng={lng}
              handleCheckout={handleCheckout}
            />
          )}
        </div>
        <div className=" bg-resene rounded-sm col-span-12 md:col-span-3 h-fit  border-l-4 border-lightblue order-1 sticky top-0 z-10">
          <div className="flex flex-col space-y-3 ">
            <CartDetail
              detailTitle={"Detalle del carrito"}
              isCheckout
              onChange={handleChange}
              deliveryPayment={deliveryPayment}
              showDeliveryPayment={isCheckOut}
            />
          </div>
          <div>
            {" "}
            <div className="flex w-full">
              <section className="w-3/4 ml-4 mt-10 mb-5 flex space-x-5">
                <label htmlFor="idType">Factura Electrónica</label>
                <input
                  className="p-3"
                  type="checkbox"
                  id="checkbox"
                  {...register("checkbox", {
                    onChange: (e) => {
                      if (e.target.checked) {
                        setCheckbox(true);
                      } else {
                        setCheckbox(false);
                      }
                    },
                  })}
                ></input>
              </section>
            </div>
            <div>
              {checkbox && (
                <>
                  <div className=" mx-4">
                    <section className="">
                      <div className="col-span-12 md:col-span-6 grid">
                        <label className="whitespace-nowrap" htmlFor="idType">
                          Tipo De Cédula
                        </label>
                        <select
                          className="w-full py-2 px-3 border border-gray-300 rounded-md mt-2"
                          {...register("idType", {
                            onChange: (e) => {
                              const selectedValue = e.target.value;
                              if (selectedValue === "Física") {
                                setFisica(true);
                              } else {
                                setFisica(false);
                              }
                            },
                          })}
                        >
                          <option value={"Física"}>Física</option>
                          <option value={"Jurídica"}>Jurídica</option>
                        </select>
                      </div>
                      <div className="col-span-12 mt-5 md:w-full">
                        <label htmlFor="idNumber" className="block">
                          Cédula
                        </label>
                        <input
                          className="w-full  border border-gray-300 rounded-md mt-2"
                          type="text"
                          id="idNumber"
                          {...register("idNumber", {
                            required: {
                              value: true,
                              message: "La cédula es requerida",
                            },
                            minLength: {
                              value: fisica ? 9 : 10,
                              message: fisica
                                ? "La cédula física no puede tener menos de 9 dígitos"
                                : "La cédula jurídica no puede tener menos de 10 dígitos",
                            },
                            maxLength: {
                              value: fisica ? 9 : 10,
                              message: fisica
                                ? "La cédula física no puede tener más de 9 dígitos"
                                : "La cédula jurídica no puede tener más de 10 dígitos",
                            },
                            pattern: {
                              value: /^[0-9]*$/, // Expresión regular que solo permite números
                              message: "Ingresa solo números",
                            },
                          })}
                        />
                        <p className="text-red text-xs">
                          {errors.idNumber?.message}
                        </p>
                      </div>
                    </section>
                  </div>
                  <div className=" mx-4 w-full">
                    <section className=" mr-8">
                      <div className="col-span-12 md:col-span-6 grid mb-4">
                        <label
                          className="whitespace-nowrap w-full pt-4"
                          htmlFor="invoiceEmail"
                        >
                          Correo electrónico para factura
                        </label>
                        <input
                          className="mt-2"
                          type="text"
                          id="invoiceEmail"
                          {...register("invoiceEmail", {
                            required: {
                              value: true,
                              message: "El correo es requerido",
                            },
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message:
                                "Ingresa una dirección de correo electrónico válida",
                            },
                          })}
                        ></input>
                        <p className="text-red text-xs">
                          {errors.invoiceEmail?.message}
                        </p>
                      </div>
                    </section>
                  </div>
                </>
              )}
            </div>
            {/* 
            <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
              <input
                className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
                type="submit"
                value={"Continuar"}
              ></input>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormOne;

"use client"
import { GET_USER_PAYMENT_INFO } from "@/src/graphQl/queries/getUserPaymentInfo";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";
import { UPDATE_BASIC_ADDRESS } from "@/src/graphQl/queries/updateBasicAddress";
import { CREATE_BASIC_ADDRESS } from "@/src/graphQl/queries/createBasicAddress"

export default function Edit() {

  const redirect = () => {
    window.location.href = `/address`
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [getUserInfo] = useLazyQuery(GET_USER_PAYMENT_INFO);
  const [updateAddress] = useMutation(UPDATE_BASIC_ADDRESS);
  const [createNewAddres] = useMutation(CREATE_BASIC_ADDRESS)
  const { user } = useStorage();
  const userId = user?.id;
  const [addressId, setAddressId] = useState();
  const [userInfoExist, setUserInfoExist] = useState();
  const isoDate = new Date().toISOString();

  const [userInformation, setUserInformation] = useState({
    //campos de formulario
    country: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    canton: "",
    postCode: ""
  });

  const cargaDatos = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData")); //datos de user
      const userDataId = userData.user.id;

      const { data, error, loading } = await getUserInfo({
        variables: { id: userDataId },
      });

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
        } else {
          setUserInfoExist(false);
        }
        setUserInformation({
          ...userInformation,
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
          postCode:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.postCode || "",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    cargaDatos();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    reset(userInformation);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation]);

  const onSubmit = handleSubmit(async (dataForm) => {
    if (userInfoExist) {
      const { data, error, loading } = await updateAddress({
        variables: {
          country: dataForm.country,
          province: dataForm.province,
          addressLine1: dataForm.addressLine1,
          addressLine2: dataForm.addressLine2,
          canton: dataForm.canton,
          postCode: dataForm.postCode,
          id: addressId,
        },
      });
      if (error) {
        toast.error("Lo sentimos, ha ocurrido un error al actualizar la información", {
          autoClose: 5000
        })
      } else {
        toast.success("La infomación se ha actualizado con éxito", {
          autoClose: 5000
        })
        setTimeout(() => {
          redirect();
        }, 2000);
      }
    } else {
      const { data, error, loading } = await createNewAddres({
        variables: {
          country: dataForm.country,
          addressLine1: dataForm.addressLine1,
          addressLine2: dataForm.addressLine2,
          province: dataForm.province,
          canton: dataForm.canton,
          postCode: dataForm.postCode,
          publishedAt: isoDate,
          id: userId,
        },
      });
      if (error) {
        toast.error("Lo sentimos, ha ocurrido un error al actualizar la información", {
          autoClose: 5000
        })
      } else {
        toast.success("La infomación se ha actualizado con éxito", {
          autoClose: 5000
        })
        const newAddress = data.createUsersAddress.data.id;
        setAddressId(newAddress)
        setUserInfoExist(true)
        setTimeout(() => {
          redirect();
        }, 2000);
      }

    }
  });
  return (
    <div>
      <div className="w-full max-w-screen-xl m-auto grid grid-cols-8 mt-10">
        <div className="col-span-9 md:pr-2">
          <h1 class="text-xl mx-auto text-center font-bold">Edita tu dirección</h1>
          <form onSubmit={onSubmit}>
            <div className="mt-[40px] mx-[30px]">
              <main className="flex ">
                <section className="w-full">
                  <div className="flex justify-center">
                    <section className="md:w-4/6 grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-6 grid content-baseline">
                        <label htmlFor="country">País</label>
                        <input
                          type="text"
                          id="country"
                          {...register("country", {
                            required: {
                              value: true,
                              message: "El país es requerido",
                            },
                            minLength: {
                              value: 2,
                              message:
                                "El país  no puede tener menos de 2 letras",
                            },
                            maxLength: {
                              value: 20,
                              message:
                                "El país  no puede tener más de 20 letras",
                            },
                            pattern: {
                              value: /^[^0-9]*$/, // Expresión regular que no permite números
                              message: "No se permiten números en este campo",
                            },
                          })}
                        ></input>
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
                        ></input>
                        <p className="text-red text-xs">
                          {errors.province?.message}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6 grid content-baseline">
                        <label htmlFor="canton">Cantón</label>
                        <input
                          className="max-h-[40px]"
                          type="text"
                          id="canton"
                          {...register("canton", {
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
                        ></input>
                        <p className="text-red text-xs">
                          {errors.canton?.message}
                        </p>
                      </div>
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
                        ></input>
                        <p className="text-red text-xs">
                          {errors.postCode?.message}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6 grid content-baseline">
                        <label htmlFor="addressLine1">Direccion 1</label>
                        <textarea
                          // type="text"
                          id="addressLine1"
                          {...register("addressLine1", {
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
                          className="h-20 resize-none"
                        ></textarea>
                        <p className="text-red text-xs">
                          {errors.addressLine1?.message}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6 grid content-baseline">
                        <label htmlFor="addressLine2">Direccion 2</label>
                        <textarea
                          //type="text"
                          id="addressLine2"
                          {...register("addressLine2", {
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
                          className="h-20 resize-none"
                        ></textarea>
                        <p className="text-red text-xs">
                          {errors.addressLine2?.message}
                        </p>
                      </div>
                    </section>
                  </div>
                </section>
              </main>
              <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
                <input className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap" type="submit" value={"Guardar"}></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

"use client";
import GET_USER_ORDERS from "@/src/graphQl/queries/getUserOrders";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import Pagination from "./Pagination";
import AgePagination from "./AgePagination";
import Spinner from "@/components/Spinner";
export default function OrderDetail() {


  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const pageSize = 3;
  const [userData, setUserData] = useState({
    user: {
      firstName: "",
      lastName: "",
    },
    address: {
      province: "",
      canton: "",
    },
    order: [
      {
        ref: 0,
        total: 0,
        subTotal: 0,
        taxes: 0,
        status: "",
      },
    ],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [getOrders] = useLazyQuery(GET_USER_ORDERS, {
    fetchPolicy: "network-only", // Forzar la consulta directa al servidor
  });
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("userData"));
    const userId = userStorage?.user?.id;
    const getOrdersInfo = async (id, page, pageSize) => {

      try {
        //me trae las ordenes e informacion del usuario
        setLoading(true);
        const { data } = await getOrders({
          //llamo la query para traer la shopping session
          variables: {
            userId: id,
            page,
            pageSize,
          },
        });
        if (data) {

          const pagination = data?.orderDetails?.meta.pagination //es un objeto con la informacion de paginacion
          setNbPages(pagination.pageCount)
          const info = data.orderDetails?.data
          const userInfo = info[0]?.attributes?.users_permissions_user?.data?.attributes //solo guardo los datos del user con el primer dato del array
          setUserData((prev) => ({
            ...prev,
            user: {
              firstName: userInfo?.firstName,
              lastName: userInfo?.lastName,
            },
            address: {
              province: userInfo?.users_address?.data?.attributes?.province,
              canton: userInfo?.users_address?.data?.attributes?.canton,
            },
            order: info.map((item) => {
              return {
                ref: item?.id,
                status: item?.attributes?.status,
                subTotal: item?.attributes?.payment_detail?.data?.attributes?.subTotal,
                taxes: item?.attributes?.payment_detail?.data?.attributes?.taxes,
                total: item?.attributes?.payment_detail?.data?.attributes?.total,
              };
            }),
          }));
        }

      } catch (error) {
        console.log("ERROR: ", error)
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (userStorage) {
      getOrdersInfo(userId, page, pageSize);
    }


    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  //estados de ordenes pending,cancelled, approved
  const transformState = (state) => {
    const STATES = {
      P: "Pending",
      C: "Rejected",
      A: "Approved",
    }
    const STATE_DEFAULT = "Approved"
    let option = STATES[state] || STATE_DEFAULT
    return option
  }

  if (loading) {
    return <div className="  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-8">
      <h1 className="flex justify-center mt-3 text-xl  md:col-span-12">Cargando</h1>
      <Spinner />
    </div>;
  }

  return (
    <div className="bg-resene  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-8">

      <h1 className="flex justify-center mt-3 text-xl  md:col-span-12">Tus pedidos</h1>
      <div className="p-4 h-auto grid grid-cols-12 gap-4 pt-5 w-full">
        {userData.order.length > 0 ? userData.order.map((order) => (
          <div key={order.ref} className="bg-resene col-span-4 w-full ">
            <section
              className="bg-floralwhite flex flex-col items-center border-2 border-dashed 
            border-grey-200 rounded-2xl h-[250px] w-full px-2 col-span-3"
            >
              <h2 className="font-semibold mt-8">N° {order.ref}</h2>
              <div className="text-sm space-y-2 pt-3 text-center">
                <div className="">
                  {userData.user.firstName} {userData.user.lastName}
                </div>
                <div>Provincia: {userData.address.province}</div>
                <div>Ciudad: {userData.address.canton}</div>
                <div>Estado: {transformState(order.status)}</div>
              </div>
              <Link
                href={{
                  pathname: `/order/orderViewDetail`,
                  query: { orderId: order.ref },
                }}
              >
                <button className="bg-aquamarine text-white p-2 sm:p-1 md:p-2 md:text-sm rounded-sm mt-5">
                  Ver detalle
                </button>
              </Link>
            </section>
          </div>
        )) :
          <h1 className="flex justify-center mt-3 text-xl  md:col-span-12">No tienes ordenes, realiza tu primera compra</h1>}
      </div>
      <div className="col-span-12">
        <AgePagination
          nbPages={nbPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>

    </div>
  );
}

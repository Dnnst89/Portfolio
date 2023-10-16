"use client";
import GET_USER_ORDERS from "@/src/graphQl/queries/getUserOrders";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [getOrders] = useLazyQuery(GET_USER_ORDERS);
  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem("userData"));

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
          const pagination = data.orderDetails.meta.pagination //es un objeto con la informacion de paginacion
          setNbPages(pagination.pageCount)
          const info = data.orderDetails.data
          const userInfo = info[0].attributes.users_permissions_user.data.attributes //solo guardo los datos del user con el primer dato del array
          setUserData((prev) => ({
            ...prev,
            user: {
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
            },
            address: {
              province: userInfo.users_address.data.attributes.province,
              canton: userInfo.users_address.data.attributes.canton,
            },
            order: info.map((item) => {
              return {
                ref: item.id,
                status: item.attributes.status,
                subTotal: item.attributes.subTotal,
                taxes: item.attributes.taxes,
                total: item.attributes.total,
              };
            }),
          }));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      getOrdersInfo(user.id, page, pageSize);
    }
    console.log(userData);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  //estados de ordenes pending,cancelled, approved
  const transformState = (state) => {
    const STATES = {
      P: "Pending",
      C: "Cancelled",
      A: "Approved",
    }
    const STATE_DEFAULT = "Approved"
    let option = STATES[state] || STATE_DEFAULT
    return option
  }

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className="bg-resene  flex flex-col items-center pb-[50px]  mx-3  md:col-span-6">
      <h1 className="flex justify-center mt-3 text-xl  md:col-span-12">Tus pedidos</h1>
      <div className="p-4 h-auto grid grid-cols-12 gap-4 pt-5 w-full">
        {userData.order.map((order) => (
          <div key={order.ref} className="bg-resene col-span-4 w-full ">
            <section
              className="bg-floralwhite flex flex-col items-center border-2 border-dashed 
            border-grey-200 rounded-2xl h-[250px] w-full px-2 col-span-3"
            >
              <h2 className="font-semibold mt-8">N° {order.ref}</h2>
              <div className="text-sm space-y-2 pt-3">
                <div>
                  Nombre: {userData.user.firstName} {userData.user.lastName}
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
                <button className="bg-aquamarine mt-3 p-1 rounded-sm text-floralwhite">
                  Ver detalle
                </button>
              </Link>
            </section>
          </div>
        ))}
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

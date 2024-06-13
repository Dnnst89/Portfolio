import axios from "axios";
const getAccessToken = async () => {
  const body = {
    grant_type: "client_credentials",
    client_id: "detinmarin_client",
    client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
    scope: "openid profile email",
  };
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data?.access_token;
};

const formatTaxData = (items) => {
  if (!items?.length) return [];
  return items?.map((item) => {
    return {
      measurementUnit: "1/m",
      unitaryPrice: item?.attributes?.variant?.data?.attributes?.localCurrencyPrice,
      qty: item?.quantity,
      cabys:
        item?.attributes?.variant?.data?.attributes?.product?.data?.attributes?.cabys?.toString(),
    };
  });
};

const createConsecutiveKey = () => {
  var validateFormat = "00000001";
  const number = Math.round(Math.random() * 100000000);
  const random = parseInt(number);
  if (random < 10 && random > 0) {
    validateFormat = "0000000" + random;
  } else if (random < 100 && random > 9) {
    validateFormat = "000000" + random;
  } else if (random < 1000 && random > 99) {
    validateFormat = "00000" + random;
  } else if (random < 10000 && random > 999) {
    validateFormat = "0000" + random;
  } else if (random < 100000 && random > 9999) {
    validateFormat = "000" + random;
  } else if (number < 1000000 && random > 99999) {
    validateFormat = "00" + random;
  } else if (random < 10000000 && random > 999999) {
    validateFormat = "0" + random;
  } else {
    validateFormat = "" + random;
  }

  if (number != null) {
    return validateFormat;
  } else return "00000001";
};

const createKey = (number, id) => {
  if (number != null) {
    const date = new Date();
    var day = "";
    if (date.getDate() < 10) {
      day = "0" + date.getDate();
    } else {
      day = date.getDate();
    }
    var month = "";
    if (date.getMonth() < 10) {
      //month = "0" + new Date().getMonth();
      month = ("0" + (new Date().getMonth() + 1)).slice(-2);
    } else {
      month = new Date().getMonth();
    }
    const isoDate = new Date().getFullYear().toString();
    const year = isoDate.slice(-2);
    const clave = createConsecutiveKey();
    const consecutive = createConsecutiveNumber(number);
    const situation = "1";
    const refill = "00";
    const key =
      "506" +
      day +
      month +
      year +
      refill +
      id +
      consecutive +
      situation +
      clave;
    //
    //const key = "50611052315582245052100200001010000001158183568230";

    return key;
  }
};
const validateID = (tipo) => {
  if (tipo === "Física") {
    return "01";
  } else return "02";
};
const formatBillSumary = (billSummary, exchangeRate, currencyCode,imp) => {
  return {
    codeTypeCurrency: {
      currencyCode: currencyCode,
      exchangeRate: exchangeRate,
    },

    totalTaxedServices: "" + billSummary?.totalTaxedServices,
    totalExentServices: "" + billSummary?.totalExentServices,
    totalTaxedMerch: "" + billSummary?.totalTaxedMerch,
    totalExentMerch: "" + billSummary?.totalExentMerch,
    totalTaxed: "" + billSummary?.totalTaxed,
    totalExent: "" + billSummary?.totalExent,
    totalSale: "" + billSummary?.totalSale,
    totalDiscount: "" + billSummary?.totalDiscount,
    totalNetSale: "" + billSummary?.totalNetSale,
    totalTax: "" + billSummary?.totalTax,
    totalDocument: "" + billSummary.totalDocument,
  };
};

const createConsecutiveNumber = (param) => {
  const parame = param.slice(-8);
  const number = parseInt(parame) + 1;

  var consecutiveNumber = "0010000101";
  var validateFormat = "0000000001";
  if (number < 10 && number > 0) {
    validateFormat = "000000000" + number;
  } else if (number < 100 && number > 9) {
    validateFormat = "00000000" + number;
  } else if (number < 1000 && number > 99) {
    validateFormat = "0000000" + number;
  } else if (number < 10000 && number > 999) {
    validateFormat = "000000" + number;
  } else if (number < 100000 && number > 9999) {
    validateFormat = "00000" + number;
  } else if (number < 1000000 && number > 99999) {
    validateFormat = "0000" + number;
  } else if (number < 10000000 && number > 999999) {
    validateFormat = "000" + number;
  } else if (number < 100000000 && number > 9999999) {
    validateFormat = "00" + number;
  } else if (number < 1000000000 && number > 99999999) {
    validateFormat = "0" + number;
  } else {
    validateFormat = "" + number;
  }
  if (number != null) {
    return consecutiveNumber + validateFormat;
  } else return "00100001010000000001";
};

const formatItemInvoice = (items, imp) => {
  console.log("resultado index", items);
  console.log("imp index", imp);
  
  if (!items?.length) return [];

  return items?.map((item, index) => {
    const product = item?.attributes?.variant?.data?.attributes?.product?.data?.attributes;
    const variant = item?.attributes?.variant?.data?.attributes;
    const tax = imp[index]?.taxes[0];
    const code = tax?.code < 10 ? `0${tax.code}` : `${tax.code}`;

    const qty = item?.attributes?.quantity;
    const unitaryPrice = variant?.localCurrencyPrice;
    const totalAmount = qty * unitaryPrice;

    return {
      lineNumber: index + 1,
      cabys: "" + product?.cabys?.toString(),
      qty: "" + qty,
      measurementUnit: "1/m",
      commercialMeasurementUnit: "1/m",
      detail: "" + product?.name,
      unitaryPrice: "" + unitaryPrice,
      totalAmount: "" + totalAmount,
      subTotal: "" + totalAmount,
      taxes: [
        {
          code: code,
          codeFee: "" + tax?.codeFee,
          fee: tax?.fee,
          VATFactor: "" + tax?.vatfactor,
          amount: "" + tax?.amount,
        },
      ],
      netTax: "" + imp[index]?.netTax,
      lineTotalAmount: "" + imp[index]?.lineTotalAmount,
    };
  });
};
const InvoiceInformation = (store, client, key, consecutive) => {
  const isoDate = new Date().toISOString();
  return {
    key: key,
    activityCode: store.ActivityCode,
    consecutiveNumber: consecutive,
    issueDate: isoDate,
    issuer: {
      name: store.name,
      id: {
        type: "" + store.IdType,
        number: store.IdNumber,
      },
      commercialName: store.ComercialName,
      address: {
        province: store.province,
        //country: store.country,
        county: store.canton,
        district: store.district,
        neighborhood: store.neighborhood,
        otherSigns: store.otherSigns,
      },
      email: store.email,
    },
    receptor: {
      name: client.name,
      id: {
        type: client.idType,
        number: "" + client.idNumber,
      },
      email: client.email,
    },
    saleCondition: "01",
    creditTerm: "0",
    paymentMethod: ["02"],
  };
};

export {
  getAccessToken,
  formatTaxData,
  formatItemInvoice,
  createConsecutiveNumber,
  createConsecutiveKey,
  createKey,
  InvoiceInformation,
  validateID,
  formatBillSumary,
};

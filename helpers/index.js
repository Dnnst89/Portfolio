import axios from "axios";

const getAccessToken = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET;
  const clientUsername = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_USERNAME;
  const clientPassword = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_PASSWORD;

  if (!apiUrl || !clientId || !clientSecret || !clientUsername || !clientPassword) {
    console.error('Missing required environment variables');
    throw new Error('Missing required environment variables');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', 'openid profile email');
  params.append('username', clientUsername);
  params.append('password', clientPassword);

  try {
    const { data } = await axios.post(apiUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Access Token:', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch access token');
  }
};

export default getAccessToken;

const data = {
  'San Jose': {
    'San Jose': {
      'San Jose': '01'
    }
  },
  'Alajuela': {
    'Alajuela': {
      'Alajuela': '02'
    }
  },
  'Cartago': {
    'Cartago': {
      'Cartago': '03'
    }
  },
  'Heredia': {
    'Heredia': {
      'Heredia': '04'
    }
  },
  'Guanacaste': {
    'Liberia': {
      'Liberia': '05'
    }
  },
  'Puntarenas': {
    'Puntarenas': {
      'Puntarenas': '06'
    }
  },
  'Limon': {
    'Limón': {
      'Limón': '07'
    }
  }
};

const normalizeString = (str) => {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función que recibe el nombre de la provincia y devuelve el código
const getAddress = (provinceName) => {
  if (!provinceName) {
    return 'false'; // Or you can return null, undefined, or any other value you consider appropriate
  }

  console.log("Received province name:", provinceName);
  const normalizedProvinceName = normalizeString(provinceName);
  
  for (const key in data) {
    if (normalizeString(key) === normalizedProvinceName) {
      const cantons = data[key];
      if (cantons) {
        const canton = Object.keys(cantons)[0]; // Take the first canton
        const districts = cantons[canton];
        if (districts) {
          const district = Object.keys(districts)[0]; // Take the first district
          const code = cantons[canton][district];
          const provinceCode = code.replace(/^0+/, ''); // Remove leading zeros to ensure it's a single digit
          return {
            address: {
              province: provinceCode,
              county: code,
              district: code,
              neighborhood: code,
              otherSigns: provinceName
            }
          };
        }
      }
    }
  }
  
  return 'false';
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
    const code = tax?.code;

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
          VATFactor: "" + tax?.VATFactor,
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
  console.log("que me llega", client);

  const invoice = {
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
        // country: store.country,
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
      address: {
        province: client.address.address.province,
        district: client.address.address.district,
        neighborhood: client.address.address.neighborhood,
        otherSigns: client.address.address.otherSigns,
        county: client.address.address.county,
      },
      email: client.email,
    },
    saleCondition: "01",
    creditTerm: "0",
    paymentMethod: ["02"],
  };

  console.log("Invoice object:", invoice); // Imprime el objeto resultante

  return invoice;
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
  getAddress
};

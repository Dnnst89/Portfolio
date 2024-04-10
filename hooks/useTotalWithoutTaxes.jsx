import { useState, useEffect } from 'react';

const useTotalWithoutTaxes = (items, quantity, subTotal) => {
    const [data, setData] = useState({});

    useEffect(() => {
        console.log("Items, Quantity, Subtotal:", items, quantity, subTotal);
        
        setData(subTotal);
    }, [items, quantity, subTotal]);

    return  data;
};

export default useTotalWithoutTaxes;
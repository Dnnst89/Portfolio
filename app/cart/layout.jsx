'use client';

import BodyComponent from '@/components/BodyComponent';
import React from 'react';
const CartLayout = ({ children }) => {
    return (
        <>
          
      <BodyComponent>
        <main>{children}</main>
      </BodyComponent>
 
        </>
    );
};

export default CartLayout;

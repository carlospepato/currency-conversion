import React from "react";
import InputMask from "react-input-mask";


export const CurrencyInput = () => {
  return (
    <InputMask
      mask={"9.999.999,99"}
    >
    </InputMask>
  );
};

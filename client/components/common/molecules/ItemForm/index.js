import React from "react";
import InputComponent from "../../atoms/Input";
import ButtonComponent from "../../atoms/Button";

export default ({ value, onChange }) => (
  <div>
    <InputComponent value={ value.item } />
    <ButtonComponent
      value="Delete"
      onChange={() => onChange(value.id)}
    />
  </div>
)

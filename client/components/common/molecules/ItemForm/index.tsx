import React from "react";
import InputComponent from "../../atoms/Input";
import ButtonComponent from "../../atoms/Button";
import { ItemFormProps } from "../../../../interfaces/components"

export default (props: ItemFormProps) => (
  <div>
    <InputComponent value={ props.value.item } />
    <ButtonComponent
      value="Delete"
      onChange={() => props.onChange(props.value.id)}
    />
  </div>
)

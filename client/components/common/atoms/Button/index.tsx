import React from "react";
import { ButtonProps } from "../../../../interfaces/components";

const SFCComponent = (props: ButtonProps) => (
  <div>
    <input
      type="button"
      value={props.value}
      onChange={props.onChange}
    />
  </div>
)

export default React.memo(SFCComponent)

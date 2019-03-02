import React from "react"
import { InputProps } from "../../../../interfaces/components"

const SFCComponent = ({ value }: InputProps) => (
  <div>
    <input value={value} />
  </div>
)

export default React.memo(SFCComponent)

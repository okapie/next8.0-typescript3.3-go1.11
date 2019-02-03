import React from "react"

const SFCComponent = ({ value }) => (
  <div>
    <input value={value} />
  </div>
)

export default React.memo(SFCComponent)

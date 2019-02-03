import React from "react";

const SFCComponent = ({ value, onChange }) => (
  <div>
    <input
      type="button"
      value={value}
      onChange={onChange}
    />
  </div>
)

export default React.memo(SFCComponent)

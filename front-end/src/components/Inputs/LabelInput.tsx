import React from "react";

interface labelInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  styleOnLabel?: string;
}

export const LabelInput = (props: labelInput) => {
  const { styleOnLabel, ...rest } = props;
  return (
    <label className={styleOnLabel}>
      <input {...rest} />
    </label>
  );
};

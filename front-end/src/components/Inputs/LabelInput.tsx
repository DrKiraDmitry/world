import React from "react";

interface labelInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  styleOnLabel?: string;
  text?: string;
}

export const LabelInput = (props: labelInput) => {
  const { styleOnLabel, text, ...rest } = props;
  return (
    <label className={styleOnLabel}>
      <div>{text}</div>
      <input {...rest} />
    </label>
  );
};

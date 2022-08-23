import React from "react";

interface labelInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  styleOnLabel?: string;
  text?: string;
}

export const LabelInput = (props: labelInput) => {
  const { styleOnLabel, title, ...rest } = props;
  return (
    <label className={styleOnLabel}>
      <div>{title}</div>
      <input {...rest} title={props.value?.toString()} />
    </label>
  );
};

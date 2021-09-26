/* eslint-disable linebreak-style */
import React from 'react';
import { useController } from 'react-hook-form';

function Input({
  control, name, type, placeholder, id,
}) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: '',
  });
    // console.log(field);
    // console.log(fieldState);

  return (
    <div>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
      />
      <p>{invalid ? 'invalid' : 'valid'}</p>
      <p>{isTouched && 'Touched'}</p>
      <p>{isDirty && 'Dirty'}</p>
    </div>
  );
}

export default Input;

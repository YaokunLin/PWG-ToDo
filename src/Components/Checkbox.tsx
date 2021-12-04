import { FC, ChangeEvent, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { boolean } from 'yup/lib/locale';

interface Props {
  name: any;
  label: String;
  legend: String;
}

const CheckboxWrapper = ({
  name,
  label,
  legend,

}: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange
  };

  meta.touched = true
  const configFormControl = { error: false };
  if (meta && meta.touched && meta.error) {
    (configFormControl.error) = !configFormControl.error;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
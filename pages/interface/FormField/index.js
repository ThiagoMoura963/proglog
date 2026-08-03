import { FormControl, TextInput } from "@primer/react";

export default function FormField({ label, ...props }) {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>

      <TextInput block {...props} />
    </FormControl>
  );
}

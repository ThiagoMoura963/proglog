import { FormControl, TextInput } from "@primer/react";

export default function FormField({ label, error, ...props }) {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <TextInput
        block
        validationStatus={error ? "error" : undefined}
        {...props}
      />
      {error && (
        <FormControl.Validation variant="error">{error}</FormControl.Validation>
      )}
    </FormControl>
  );
}

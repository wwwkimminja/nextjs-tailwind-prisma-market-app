import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface FormInputProps {
  name: string;
  errors?: string[];
  defaultValue?: string;
}

function _FormInput({
  name,
  errors,
  defaultValue,
  ...props
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>,ref:ForwardedRef<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        className="bg-transparent rounded-md w-full h-10 p-2 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none  placeholder:text-neutral-400"
        name={name}
        defaultValue={defaultValue}
        {...props}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}

export default forwardRef(_FormInput);

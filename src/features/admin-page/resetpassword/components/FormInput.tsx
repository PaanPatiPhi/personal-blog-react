interface Props {
  label: string;
  placeholder?: string;
  type?: string;
}

export default function FormInput({
  label,
  placeholder,
  type = "text",
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-neutral-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full h-11 px-4
          text-sm
          border border-neutral-300
          rounded-md
          placeholder-neutral-400
          focus:outline-none
          focus:ring-1
          focus:ring-neutral-400
        "
      />
    </div>
  );
}

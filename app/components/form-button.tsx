interface FormButtonProps {
  text: string;
  type: 'submit' | 'button';
  loading: boolean;
}

export default function FormButton({ text, type, loading }: FormButtonProps) {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-200 disabled:cursor-not-allowed"
      type={type}
      disabled={loading}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}

export default function Avatar({ title = "G" }) {
  const initialChar = title[0].toUpperCase();
  return (
    <div className="size-10 bg-[var(--color-base-content)] text-[var(--color-base-200)] font-semibold text-lg text-center leading-10 mt-10 ml-10 rounded-full">
      {initialChar}
    </div>
  );
}

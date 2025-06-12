export default function Avatar({ title = "G" }) {
  const initialChar = title[0].toUpperCase();
  return (
    <div className="size-10 bg-base-content/75 text-base-200 font-semibold text-lg text-center leading-10 rounded-full">
      {initialChar}
    </div>
  );
}

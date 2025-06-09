export default function TextField({name="test",type="text"}) {
  return (
    <div className="flex gap-4 items-center">
      <label htmlFor={name.toLowerCase()}>{name}:</label>
      <input
        type="text"
        placeholder="Type here"
        className="input font-semibold"
        id={name.toLowerCase()}
      />
    </div>
  );
}

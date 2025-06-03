export default function RecentOrder({
  idx = 1,
  id = 242424,
  date = "2025/6/2",
  total = 672,
}) {
  return (
    <tr className="font-semibold">
      <th>{idx}</th>
      <td>{id}</td>
      <td>{date}</td>
      <td>$ {total}</td>
    </tr>
  );
}

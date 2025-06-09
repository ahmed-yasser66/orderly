import { useNavigate } from "react-router";
export default function RecentOrder({
  idx = 1,
  id = 242424,
  date = "2025/6/2",
  total = 672,
}) {
  const navigate = useNavigate();
  return (
    <tr className="font-semibold" onClick={() => navigate(`/space/${id}`)}>
      <th>{idx}</th>
      <td>{id}</td>
      <td>{date}</td>
      <td>$ {total}</td>
    </tr>
  );
}

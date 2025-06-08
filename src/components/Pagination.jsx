import { useState } from "react";

export default function Pagination({ page = 1, limit = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const data = [];
  const start = (page - 1) * limit;
  const end = start + limit;
  const final = data.slice(start, end);
  const nextPage = () => setCurrentPage((page) => page + 1);
  const prevPage = () => setCurrentPage((page) => (page == 1 ? 1 : page - 1));
  return (
    <div className="join ">
      <button className="join-item btn" onClick={prevPage}>«</button>
      <button className="join-item btn tabular-nums">Page {currentPage}</button>
      <button className="join-item btn" onClick={nextPage}>»</button>
    </div>
  );
}

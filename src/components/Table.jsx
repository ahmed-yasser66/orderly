import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto rounded-box shadow-md border border-base-300 max-w-6xl mx-auto p-4">
      <table className="table w-full text-base text-base-content text-center">
        <thead className="bg-base-200 text-base-content">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 font-semibold tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-base-100 text-base-content">
          {data.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-base-100" : "bg-base-200"}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

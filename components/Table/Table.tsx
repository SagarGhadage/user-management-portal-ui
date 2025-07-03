import React, { useState } from "react";
// import Form from "../Form/Form";

interface TableProps {
  list: any[];
  // setList: React.Dispatch<React.SetStateAction<any[]>>;
  deleteItem: (id: any) => void;
  // itemDetail: (item: any) => void;
  // editItem: (id: any, item: any) => void;
  caption?: string;
  isActions: boolean;
}

export default function Table({
  list,
  // setList,
  deleteItem,
  // itemDetail,
  // editItem,
  caption,
  isActions,
}: TableProps) {
  const item = Array.isArray(list) && list.length ? Object.keys(list[0]) : [];
  // console.log(list, list[0], item);
  // const item=Object.keys(list[0])
  const columns: any = [];
  for (let i = 0; i < item?.length; i++) {
    if(item[i]=='_id'){
      continue
    }
    columns.push({ id: i, label: `${item[i]}` });
  }

  return (
    <table className="table-auto rounded-lg hover:border-collapse w-full mt-3 border-collapse border border-slate-500">
      <caption className="table-caption">{caption}</caption>
      <thead className="text-center p-2 bg-blue-100 dark:bg-gray-600">
        <tr className="border border-slate-300">
          {columns.map((col: any) => (
            <th className="border border-slate-700 p-2" key={col.id}>
              {col.label}
            </th>
          ))}
          {isActions && (
            <th className="border border-slate-700 p-2">Actions</th>
          )}
          {isActions && <th className="border border-slate-700">Edit</th>}
          {isActions && <th className="border border-slate-700">View</th>}
        </tr>
      </thead>
      <tbody className="text-center">
        {Array.isArray(list) &&
          list?.map((s, idx) => (
            <tr
              className={`${
                idx % 2 == 0
                  ? "bg-gray-100 dark:bg-gray-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
              key={s?._id || s?.email + "row"}
            >
              {columns.map((col: any, index: any) => {
                // console.log(col?.label)
                return (
                  <td className="border border-slate-500 p-2" key={index}>
                    {s[col?.label]}
                  </td>
                );
              })}
              {/* 
              <td>{s.first_name} </td>
              <td>{s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td> */}
              {isActions && (
                <td className="border border-slate-500 w-min-[10]">
                  <button id={s?._id}
                    className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                    onClick={(e)=>deleteItem(e.target.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
              {isActions && (
                <td className="border border-slate-500 p-2">
                  <button
                    className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                    onClick={() => {
                      console.log(s.id, s);
                    }}
                  >
                    Edit
                  </button>
                </td>
              )}
              {isActions && (
                <td className="border border-slate-500 p-3">
                  <button
                    className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                    onClick={() => console.log(s)}
                  >
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

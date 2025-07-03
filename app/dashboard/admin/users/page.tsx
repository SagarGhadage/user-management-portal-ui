"use client";
import { getUsers } from "@/api/users";
import Table from "@/components/Table/Table";
import { useAuth } from "@/context/AuthContext";
import { exportJsonToExcel } from "@/utils/jsonToExcel";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [sortBy, setSortBy] = useState("");
  const [isRev, setIsRev] = useState(true);
  const [filterBy, setFilterBy] = useState("status");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(users.length);
  const limit = 5;

  const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (user && user?.role!="Admin") {
        router.replace(`/dashboard/${user?.role?.toLowerCase()||""}`);
      }
      console.log(user)
    }, [user]);

  const fetchUsers = async () => {
    try {
         const result = await getUsers();
    const users = result.map((user) => {
      return {
        // firstName: user?.firstName,
        // lastName: user?.lastName,
        fullName:user?.firstName+" "+user?.lastName,
        email: user?.email,
        role: user?.role,
        createdAt: user?.createdAt,
        status: user?.status,
        mobile: user?.mobile,
      };
    });
    setUsers(users);
    setTotal(users.length);
    setFiltered(users);
    setSearch("Registered");
    } catch (error) {
      console.error(error)
    }
 
  };

  const filterUsers = () => {
    const filteredUsers = users.filter((u) =>
      u[filterBy || "email"]?.startsWith(search)
    );
    console.table(filteredUsers);
    console.log(filterBy, search);
    setFiltered(filteredUsers);
    setTotal(filteredUsers.length);
  };
  // const pagination = (page: any, limit: any) => {
  //   setPaginated(users.slice(page*limit-limit,page*limit));
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(filterUsers, [filterBy, search]);
  // useEffect(()=>{
  //   sortUsers()
  // }, [filterBy, search, sortBy]);

  return (
    <div className="h-full rounded-lg my-2 bg-gray-100 dark:bg-gray-900 p-1">
      <div className="flex flex-row items-center justify-between mb-4 gap-4 flex-wrap p-2">
        <div className="w-fit md:w-auto w-min-44">
          <label
            onClick={() => {
              setIsRev((p) => !p);
            }}
            htmlFor="sortBy"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sort By {isRev ? "DESC" : "ASC"}
          </label>
          <select
            name="sortBy"
            className="px-2 py-2 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded border"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value={""}>--Not Selected--</option>
            <option value={"firstName"}>First Name</option>
            <option value={"email"}>Email</option>
            <option value={"status"}>Status</option>
            <option value={"role"}>Role</option>
            <option value={"lastName"}>Last Name</option>
          </select>
        </div>
        <div className="w-fit">
          <label
            htmlFor="sortBy"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Filter By
          </label>
          <select
            name="sortBy"
            className="px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded border"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value={""}>--Not Selected--</option>
            <option value={"firstName"}>First Name</option>
            <option value={"email"}>Email</option>
            <option value={"status"}>Status</option>
            <option value={"role"}>Role</option>
            <option value={"Mobile"}>Mobile</option>
            <option value={"lastName"}>Last Name</option>
          </select>
        </div>
        <div className="">
          <label
            htmlFor={"search"}
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Enter {filterBy}
          </label>
          {!(filterBy == "status" || filterBy == "role") && (
            <input
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
          )}
          {filterBy == "mobile" && (
            <input
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Mob No"
            ></input>
          )}
          {filterBy == "status" && (
            <select
              name="status"
              className="px-2 py-2 rounded border text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option value={""}>--Not Selected--</option>
              <option value={"Registered"}>Registered</option>
              <option value={"PendingVerification"}>PendingVerification</option>
              <option value={"Verified"}>Verified</option>
            </select>
          )}
          {filterBy == "role" && (
            <select
              name="role"
              className="px-2 py-2 rounded border text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option value={""}>--Not Selected--</option>
              <option value={"Admin"}>Admin</option>
              <option value={"User"}>User</option>
              <option value={"Manager"}>Manager</option>
            </select>
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          isActions={true}
          list={filtered
            .sort((a, b) => {
              const key = sortBy || "email";
              if (!a[key] || !b[key]) return 0;
              if (typeof a[key] === "string" && typeof b[key] === "string") {
                if (isRev) {
                  return b[key].localeCompare(a[key]);
                }
                return a[key].localeCompare(b[key]);
              }
              if (isRev) {
                return b[key] - a[key];
              }
              return a[key] - b[key];
            })
            .slice(page * limit - limit, page * limit)}
        />
      </div>
      <div className="flex justify-between items-center m-2 flex-wrap gap-3">
        <button
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          disabled={page * limit >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        <span>Per Page {limit}</span>
        <button onClick={() => exportJsonToExcel(filtered)} className="px-3 py-1 w-full sm:w-fit text-sm text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800">
          Export Excel
        </button>
      </div>
    </div>
  );
}

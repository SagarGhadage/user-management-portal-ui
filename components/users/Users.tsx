'use client'
import React from 'react'

export default function User() {
  const user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{}
  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 border border-gray-200">
      <img
        className="w-24 h-24 rounded-full border-4 border-blue-400 mb-4"
        src={'/favicon.ico'}
        alt="User avatar"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{user?.firstName} {user?.lastName}</h2>
      <p className="text-gray-500 mb-1">{user?.email}</p>
      <p className="text-gray-500 mb-1">Mob: {user?.mobile}</p>
      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Role: {user?.role}</span>
    </div>
  )
}

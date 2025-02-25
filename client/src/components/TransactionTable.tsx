import React from 'react'
import { FaTrash } from 'react-icons/fa'

const TransactionTable: React.FunctionComponent = () => {
  return (
    <>
        <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="font-bold">№</td>
                        <td className="font-bold">Title</td>
                        <td className="font-bold">Amount($)</td>
                        <td className="font-bold">Category</td>
                        <td className="font-bold">Date</td>
                        <td className="text-right">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>April</td>
                        <td>300</td>
                        <td>Salary</td>
                        <td>Date</td>
                        <td>
                            <button className='btn btn-red-hover ml-auto cursor-pointer'><FaTrash /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

export default TransactionTable
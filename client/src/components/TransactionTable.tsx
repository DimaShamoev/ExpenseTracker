import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../Types/types'
import { formatDate } from '../helpers/date.helper'
import { CurrencyFormat } from '../helpers/currency.helper'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate';

interface ITransactionTable {
    limit: number
}

const TransactionTable: React.FunctionComponent<ITransactionTable> = ({ limit = 3 }) => {

    const { transactions } = useLoaderData() as IResponseTransactionLoader

    const [data, setData] = React.useState<ITransaction[]>([])
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [totalPages, setTotalPages] = React.useState<number>(0)

    const fetchTransactions = async (page: number) => {
        const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`)
        setData(response.data)
        setTotalPages(Math.ceil(transactions.length / limit))
    }

    const handlePageChange = (selectedItem: {selected: number}) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    React.useEffect(() => {
        fetchTransactions(currentPage)
    }, [currentPage, transactions])

    return (
        <>
            <ReactPaginate
                className='flex gap-3 justify-end mt-3 items-center'
                activeClassName='bg-blue-600 rounded-sm py-1 cursor-pointer'
                pageLinkClassName='text-white text-xs py-3 px-3 rounded-sm cursor-pointer'
                previousClassName='text-white py-1 px-3 bg-slate-800 rounded-sm text-xs cursor-pointer'
                nextClassName='text-white py-1 px-3 bg-slate-800 rounded-sm text-xs cursor-pointer'
                disabledClassName='text-white/50 cursor-not-allowed'
                disabledLinkClassName='text-slate-600 cursor-not-allowed'
                pageCount={totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
            />
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
                        {data.map((transaction, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.title}</td>
                                <td className={transaction.type == 'income' ? 'text-green-500' : 'text-red-500'}>{transaction.type == 'income' ? `+ ${CurrencyFormat.format(transaction.amount)}` : `- ${CurrencyFormat.format(transaction.amount)}`}</td>
                                <td>{transaction.category?.title || 'Other'}</td>
                                <td>{formatDate(transaction.createdAt)}</td>
                                <td>
                                    <Form method='delete' action='/transactions'>
                                        <input type="hidden" name='id' value={transaction.id} />

                                        <button className='btn btn-red-hover ml-auto cursor-pointer'>
                                            <FaTrash />
                                        </button>
                                    </Form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionTable
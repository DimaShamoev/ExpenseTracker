import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../Types/types'
import CategoryModal from './modals/CategoryModal'

const TransactionForm: React.FunctionComponent = () => {
    const { categories } = useLoaderData() as IResponseTransactionLoader
    const [visibleModal, setVisibleModal] = React.useState<boolean>(false)

    return (
        <div className='rounded-md bg-slate-800 p-4'>
            <Form
                className='grid gap-4'
                method='post'
                action='/transactions'
            >

                <label className='grid' htmlFor="title">
                    <span>Title</span>
                    <input 
                        className='input'
                        type="text"
                        placeholder='Enter Title'
                        name='title'
                        required
                    />
                </label>
                <label className='grid' htmlFor="amount">
                    <span>Amount</span>
                    <input 
                        className='input'
                        type="number"
                        placeholder='Enter Amount'
                        name='amount'
                        required
                    />
                </label>

                {categories.length ? (
                    <label htmlFor="category" className='grid'>
                        <span>Category</span>
                        <select className='input' name="category" required>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <h1 className='mt-1 text-red-600'>To Continue Create Category</h1>
                )}
                

                {/* Add Category */}
                <button
                    onClick={() => setVisibleModal(true)} 
                    className="cursor-pointer mt-2 max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
                >
                    <FaPlus />
                    <span>Manage Categories</span>
                </button>

                {/* Radio Buttons */}
                <div className="flex gap-4 items-center">
                    <label className='flex cursor-pointer items-center gap-2' htmlFor="type">
                        <input
                            type="radio" 
                            name='type'
                            value={'income'}
                            className='form-radio text-blue-600'
                        />
                        <span>Income</span>
                    </label>
                    <label className='flex cursor-pointer items-center gap-2' htmlFor="type">
                        <input
                            type="radio" 
                            name='type'
                            value={'expense'}
                            className='form-radio text-blue-600'
                        />
                        <span>expense</span>
                    </label>
                </div>

                {/* Submit btn */}
                <div
                >
                    <button
                        type="submit"
                        className="btn btn-green flex text-center items-center justify-center cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
                
            </Form>

            {visibleModal && (
                <CategoryModal type='post' setVisibleModal={setVisibleModal} />
            )}

        </div>
    )
}

export default TransactionForm

import React, { useState } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/modals/CategoryModal";
import { instance } from "../api/axios.api";
import { ICategory } from "../Types/types";

export const categoriesAction = async ({request}: any) => {
    switch(request.method) {
        case 'POST': {
            const formData = await request.formData()
            const title = {
                title: formData.get('title')
            }
            await instance.post('/categories', title)
            return null;
        }
        case 'PATCH': {
            const formData = await request.formData()
            const category = {
                id: formData.get('id'),
                title: formData.get('title')
            }
            await instance.patch(`/categories/category/${category.id}`, category)

            return null;
        }
        case 'DELETE': {
            const formData = await request.formData()
            const categoryId = formData.get('id')
            await instance.delete(`/categories/category/${categoryId}`)

            return null;
        }
    }
}

export const categoryLoader = async () => {
    const {data} = await instance.get<ICategory[]>('/categories')
    return data;
}

const Categories: React.FunctionComponent = () => {

    const [visibleModal, setVisibleModal] = React.useState<boolean>(false)
    const categories = useLoaderData() as ICategory[]
    const [categoryId, setCategoryId] = React.useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    return (
        <>
            <div className="mt-10 p-4 rounded-md bg-slate-800">
                <h1>Your Category List</h1>
                {/* Category List */}
                <div className="flex mt-2 items-center gap-2 flex-wrap">
                    {categories.map((category, index) => (
                        <div key={index} className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
                            {category.title}
                            <div className="absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/80 hidden items-center justify-between group-hover:flex">
                                <button
                                    onClick={() => {
                                        setCategoryId(category.id)
                                        setVisibleModal(true)
                                        setIsEdit(true)
                                    }}
                                    className="cursor-pointer"
                                >
                                    <AiFillEdit />
                                </button>

                                <Form className="flex" method="delete" action="/categories">
                                    <input type="hidden" name="id" value={category.id} />
                                    <button className="cursor-pointer" type="submit"><AiFillCloseCircle /></button>
                                </Form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Category */}
            <button onClick={() => setVisibleModal(true)} className="cursor-pointer mt-5 max-w-fit flex items-center gap-2 text-white/50 hover:text-white">
                <FaPlus />
                <span>Create A New Category</span>
            </button>

            {visibleModal && (
                <CategoryModal type="post" setVisibleModal={setVisibleModal} />
            )}

            {visibleModal && isEdit && (
                <CategoryModal type="patch" id={categoryId} setVisibleModal={setVisibleModal} />
            )}
        </>
    );
};

export default Categories;

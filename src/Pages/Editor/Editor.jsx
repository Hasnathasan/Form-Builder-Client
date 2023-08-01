import { useForm } from "react-hook-form";
import { useState } from "react";
const Editor = () => {
    const [categories, setCategories] = useState([]);
    console.log(categories);
    const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data)
    const {category1, category2, category3, category4} = data;
    const newCategories = [category1, category2, category3, category4];
    console.log(newCategories);
    setCategories(newCategories)
  };
  return (
    <div>
      <h1 className="text-4xl font-bold">Edit Your Form With EDFORM</h1>
      <form className=" max-w-6xl mx-auto" onChange={handleSubmit(onSubmit)}>
        {/* {Categorized Questions} */}
        <div className="border-2 p-6 rounded-lg border-blue-500">
          <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 1
          </h3>
          <div className="flex gap-5">
          <div className="">
            <h4 className="text-lg mb-2">Category</h4>
            <div className=" flex flex-col gap-2">
                <input
                {...register("category1", { required: true })}
                  name="category1" 
                  id="category1"
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Category 1"
                />
                <input
                {...register("category2", { required: true })} 
                name="category2" 
                  id="category2"
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Category 1"
                />
                <input
                {...register("category3", { required: false })} 
                name="category3" 
                id="category3"
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Category 1"
                />
                <input
                {...register("category4", { required: false })} 
                name="category4" 
                  id="category4"
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Category 1"
                />
                
        <input type="submit"  value="Submit"/>
            </div>
          </div>
          <div className="">
            <h4 className="text-lg mb-2">Item</h4>
            <div className=" flex flex-col gap-2">
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Items 1"
                />
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Items 1"
                />
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Items 1"
                />
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Items 1"
                />
            </div>
          </div>
          <div className="">
            <h4 className="text-lg mb-2">Item</h4>
            <div className=" flex flex-col gap-2">
                <select>
                    {
                        categories.map(category => {
                            if(category != ""){
                                <option value={category}>{category}</option>
                            }
                        })
                    }
                </select>
            </div>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editor;

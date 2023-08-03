import { useForm } from "react-hook-form";
import { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
const Editor = () => {
  const [categories, setCategories] = useState([]);
  const [sentence, setSentence] = useState("");
  const [previewSentence, setPreviewSentence] = useState("")
  const [selectedWords, setSelectedWords] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { category1, category2, category3, category4 } = data;
    const newCategories = [category1, category2, category3, category4];
    setCategories(newCategories);
  };

  const handleSelection = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setSelectedWords([...selectedWords, selectedText]);
      setSentence(sentence.replace(selectedText, `<<${selectedText}>>`));
      setPreviewSentence(previewSentence.replace(selectedText, "_____"))
      
    }
    console.log(previewSentence);
  };
  const handleInputChange = (e) => {
    const newSentence = e.target.value;
    setSentence(newSentence);
    setSelectedWords([]); 
    setPreviewSentence(newSentence)
    // Clear selected words when input changes
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Edit Your Form With EDFORM</h1>
      <form
        className=" max-w-6xl mx-auto border-2 p-6 rounded-lg border-blue-500"
        onSelect={handleSubmit(onSubmit)}
      >
        {/* {Categorized Questions} */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 1
          </h3>
          <div className="flex gap-40">
            <div className="">
              <h4 className="text-lg mb-2">Category</h4>
              <div className=" flex flex-col gap-2">
                <input
                  {...register("category1", { required: false })}
                  name="category1"
                  id="category1"
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Category 1"
                />
                <input
                  {...register("category2", { required: false })}
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
              </div>
            </div>
            <div className="">
              <h4 className="text-lg mb-2">Item ------------------------------------------ Belongs to</h4>
              <div className=" flex flex-col gap-2">
                {categories.length === 0 ? (
                  <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Item1"
                />
                ) : (
                  categories.map((category, index) => {
                    if (category !== "") {
                      return (
                        <div
                          className="flex gap-20 justify-between items-start"
                          key={index}
                        >
                          <input
                            {...register(`item${index + 1}`, {
                              required: false,
                            })}
                            className=" outline-none border border-gray-400 p-2 rounded"
                            type="text"
                            placeholder={"Item" + (index + 1)}
                          />
                          <select
                            {...register(`cateSelected${index + 1}`, {
                              required: false,
                            })}
                            className=" flex flex-col gap-2 border border-gray-300 p-3 rounded text-gray-600 outline-none"
                          >
                            <option>Select Category</option>
                            {categories.map((category, index) => {
                              if (category !== "") {
                                return (
                                  <option key={index} value={category}>
                                    {category}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      );
                    }
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* {Cloze Questions} */}
        <div>
          <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 2
          </h3>
          <div>
            <h4 className="">Preview</h4>
            <input
              className=" outline-none border border-gray-400 p-2 rounded"
              type="text"
              value={previewSentence}
            />
            <h4 className="mt-5">
              Sentence -select a word to make it as a fill up word
            </h4>
            <textarea
            cols={50}
            rows={1}
              className=" outline-none border border-gray-400 p-2 rounded"
              type="text"
              value={sentence}
              onChange={handleInputChange}
              onMouseUp={handleSelection}
            />
          </div>
          <ul>
            {selectedWords.length !== 0 ? selectedWords.map((word, index) => (
              <li key={index}>
                <Checkbox defaultChecked id="ripple-off" ripple={false} disabled={true}/>{" "}
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  value={word}
                  readOnly
                />
              </li> 
            )): <><Checkbox defaultChecked id="ripple-off" ripple={false} disabled={true}/>{" "}
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Option 1"
                  readOnly
                /></>}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Editor;

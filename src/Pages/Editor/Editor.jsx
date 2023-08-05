import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
const Editor = ({setFormId}) => {
  const [categories, setCategories] = useState([]);
  const [sentence, setSentence] = useState("");
  const [numOfMcqQuestions, setNumOfMcqQuestions] = useState([1]);
  const [previewSentence, setPreviewSentence] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSelect = (data) => {
    console.log(data, "ONSELECT");
    const { category1, category2, category3, category4 } = data;
    const newCategories = [category1, category2, category3, category4];
    setCategories(newCategories);
  };





  const onSubmit = async (data) => {
    try {
      console.log(data);
      data.Q2PreviewSentence = previewSentence;
      const response = await fetch("http://localhost:5000/form", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      setFormId(responseData.insertedId);
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };
  










  const handleSelection = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setSelectedWords([...selectedWords, selectedText]);
      setSentence(sentence.replace(selectedText, `<<${selectedText}>>`));
      setPreviewSentence(previewSentence.replace(selectedText, "_____"));
    }
    console.log(previewSentence);
  };
  const handleInputChange = (e) => {
    const newSentence = e.target.value;
    setSentence(newSentence);
    setSelectedWords([]);
    setPreviewSentence(newSentence);
    // Clear selected words when input changes
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-5">Edit Your Form With EDFORM</h1>
      <form
        className=" max-w-6xl mx-auto border-2 p-6 rounded-lg border-blue-500"
        onSelect={handleSubmit(onSelect)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button color="green" type="submit" className=" float-right btn">Save Changes</Button>
        {/* {Categorized Questions} */}

    
        <div className="mb-20 bg-gray-200 p-9 rounded-lg">
          <div className="flex gap-2">
            <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 1
          </h3>
          <Tooltip
      content={
        <div className="w-80">
          <Typography color="white" className="font-medium">
            Material Tailwind
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="font-normal opacity-80"
          >
            Material Tailwind is an easy to use components library for Tailwind
            CSS and Material Design.
          </Typography>
        </div>
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 cursor-pointer text-blue-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
          </div>
          
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
              <h4 className="text-lg mb-2">
                Item ------------------------------------------ Belongs to
              </h4>
              <div className=" flex flex-col gap-2">
                {categories.length === 0 ? (
                  <div className="flex gap-20 justify-between items-start">
                    <input
                      className=" outline-none border border-gray-400 p-2 rounded"
                      type="text"
                      placeholder="Item1"
                    />
                    <select className="border border-gray-300 p-3 rounded text-gray-600 outline-none">
                      <option value="">Select Category</option>
                      <option value="">Demo1</option>
                      <option value="">Demo2</option>
                      <option value="">Demo3</option>
                    </select>
                  </div>
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
                            className="border border-gray-300 p-3 rounded text-gray-600 outline-none"
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
        <div className="bg-gray-200 p-9 rounded-lg">
        <div className="flex gap-2">
            <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 2
          </h3>
          <Tooltip
      content={
        <div className="w-80">
          <Typography color="white" className="font-medium">
            Material Tailwind
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="font-normal opacity-80"
          >
            Material Tailwind is an easy to use components library for Tailwind
            CSS and Material Design.
          </Typography>
        </div>
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 cursor-pointer text-blue-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
          </div>
          <div>
            <h4 className="">Preview</h4>
            <input
              className=" outline-none border border-gray-400 p-2 rounded"
              {...register("realPreviewSentence", { required: false })}
              type="text"
              value={previewSentence}
            />
            <h4 className="mt-5">
              Sentence -select a word to make it as a fill up word
            </h4>
            <textarea
              cols={50}
              rows={1}
              className="outline-none border border-gray-400 p-2 rounded"
              {...register("Q2Question", { required: false })}
              type="text"
              value={sentence}
              onChange={handleInputChange}
              onMouseUp={handleSelection}
            />
          </div>
          <ul>
            {selectedWords.length !== 0 ? (
              selectedWords.map((word, index) => (
                <li key={index}>
                  <Checkbox
                    defaultChecked
                    id="ripple-off"
                    ripple={false}
                    disabled={true}
                  />{" "}
                  <input
                    className=" outline-none border border-gray-400 p-2 rounded"
                    type="text"
                    {...register(`Q2Ans${index + 1}`, { required: false })}
                    value={word}
                    readOnly
                  />
                </li>
              ))
            ) : (
              <>
                <Checkbox
                  defaultChecked
                  id="ripple-off"
                  ripple={false}
                  disabled={true}
                />{" "}
                <input
                  className=" outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Option 1"
                  readOnly
                />
              </>
            )}
          </ul>
        </div>











        {/* {MCQ questions} */}
        <div className="mt-20 relative bg-gray-200 p-9 rounded-lg" >
        <div className="flex gap-2">
            <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 3
          </h3>
          <Tooltip
      content={
        <div className="w-80">
          <Typography color="white" className="font-medium">
            Material Tailwind
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="font-normal opacity-80"
          >
            Material Tailwind is an easy to use components library for Tailwind
            CSS and Material Design.
          </Typography>
        </div>
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 cursor-pointer text-blue-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
          </div>

          <h4>Your Passage:</h4>
          <span
            className=" absolute right-8 top-44"
            
          >
            <Tooltip
              content="Add 1 more question"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <IconButton onClick={() => setNumOfMcqQuestions([...numOfMcqQuestions, 1])}>
                <FaPlus></FaPlus>
              </IconButton>
            </Tooltip>
          </span>
          <textarea
            className=" outline-none border border-gray-500 p-4 rounded"
            name=""
            id=""
            cols="60"
            rows="5"
            placeholder="Your passage here"
          ></textarea>
          <div  className="grid grid-cols-2 gap-11">
            {numOfMcqQuestions.map((num, index) => {
            return (
              <div key={index} className="mt-10 bg-gray-300 p-9 rounded-lg">
                <h4 className=" text-lg">MCQ question number: {index + 1}</h4>
                <input
                  className="w-[400px] outline-none border border-gray-400 p-2 rounded"
                  type="text"
                  placeholder="Write your Question"
                />
                <ul>
                  <li>
                    <Checkbox
                      defaultChecked
                      id="ripple-off"
                      ripple={false}
                      disabled={true}
                    />
                    <input
                      className=" outline-none border border-gray-400 p-2 rounded ms-1"
                      type="text"
                      placeholder="Option1"
                    />
                  </li>
                  <li>
                    <Checkbox
                      defaultChecked
                      id="ripple-off"
                      ripple={false}
                      disabled={true}
                    />
                    <input
                      className=" outline-none border border-gray-400 p-2 rounded ms-1"
                      type="text"
                      placeholder="Option2"
                    />
                  </li>
                  <li>
                    <Checkbox
                      defaultChecked
                      id="ripple-off"
                      ripple={false}
                      disabled={true}
                    />
                    <input
                      className=" outline-none border border-gray-400 p-2 rounded ms-1"
                      type="text"
                      placeholder="Option3"
                    />
                  </li>
                  <li>
                    <Checkbox
                      defaultChecked
                      id="ripple-off"
                      ripple={false}
                      disabled={true}
                    />
                    <input
                      className=" outline-none border border-gray-400 p-2 rounded ms-1"
                      type="text"
                      placeholder="Option4"
                    />
                  </li>
                </ul>
              </div>
            );
          })}
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default Editor;



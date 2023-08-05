import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./preview.css";
import { Button, Card, CardBody } from "@material-tailwind/react";

const ItemType = "ITEM";

const Item = ({ item, index }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid black",
        textAlign: "center",
        borderRadius: "2px",
        padding: "8px",
        margin: "8px",
        width: "150px",
      }}
    >
      {item}
    </div>
  );
};

const Category = ({ category, items, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => onDrop(category, draggedItem.index),
  });

  return (
    <div
      style={{
        backgroundColor: "#9fd4ff",
        borderRadius: "10px",
        padding: "16px",
        margin: "16px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      ref={drop}
    >
      <h2 className="text-xl font-bold  text-gray-700 text-center">
        {category}
      </h2>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            borderRadius: "8px",
            textAlign: "center",
            padding: "8px",
            margin: "8px",
            width: "150px",
            backgroundColor: "#53adf7",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const Preview = ({ formId }) => {
  const [formData, setFormData] = useState();
  const [formStatus, setFormStatus] = useState("notSubmited")
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [categories, setCategories] = useState([]);
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [mcqPassage, setMcqPassage] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [extractedWords, setExtractedWords] = useState(["Hi", "By"]);
  const [sentenceParts, setSentenceParts] = useState([
    "____",
    "Hello",
    "Chole",
    "____",
  ]);
  

  useEffect(() => {
    fetch(`https://form-builder-server-flame.vercel.app/eachform/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        const {
          item1,
          item2,
          item3,
          item4,
          cateSelected1,
          cateSelected2,
          cateSelected3,
          cateSelected4,
          Q2PreviewSentence,
          Q2Ans1,
          Q2Ans2,
          Q2Ans3,
          Q2Ans4,
          Q2Ans5,
          Q2Ans6,
          PassageOfMcQ,
          Mcq1,
          Mcq2,
          Mcq3,
          Mcq4,
          Mcq5,
          AnsAOfMcq1,
          AnsAOfMcq2,
          AnsAOfMcq3,
          AnsAOfMcq4,
          AnsAOfMcq5,
          AnsBOfMcq1,
          AnsBOfMcq2,
          AnsBOfMcq3,
          AnsBOfMcq4,
          AnsBOfMcq5,
          AnsCOfMcq1,
          AnsCOfMcq2,
          AnsCOfMcq3,
          AnsCOfMcq4,
          AnsCOfMcq5,
          AnsDOfMcq1,
          AnsDOfMcq2,
          AnsDOfMcq3,
          AnsDOfMcq4,
          AnsDOfMcq5,
        } = data;

        const fetchedItems = [item1, item2, item3, item4].filter(Boolean);
        const fetchedCategories = [
          cateSelected1,
          cateSelected2,
          cateSelected3,
          cateSelected4,
        ].filter(Boolean);
        const newCategories = fetchedCategories.map((category) => ({
          name: category,
          items: [],
        }));
        const newQ2Ans = [
          Q2Ans1,
          Q2Ans2,
          Q2Ans3,
          Q2Ans4,
          Q2Ans5,
          Q2Ans6,
        ].filter(Boolean);
        const sentenceParts = Q2PreviewSentence.split(" ");
        const extractedWords = newQ2Ans;
        const McqNum1 = {
          question: Mcq1,
          answers: [AnsAOfMcq1, AnsBOfMcq1, AnsCOfMcq1, AnsDOfMcq1]
        }
        const McqNum2 = {
          question: Mcq2,
          answers: [AnsAOfMcq2, AnsBOfMcq2, AnsCOfMcq2, AnsDOfMcq2]
        }
        const McqNum3 = {
          question: Mcq3,
          answers: [AnsAOfMcq3, AnsBOfMcq3, AnsCOfMcq3, AnsDOfMcq3]
        }
        const McqNum4 = {
          question: Mcq4,
          answers: [AnsAOfMcq4, AnsBOfMcq4, AnsCOfMcq4, AnsDOfMcq4]
        }
        const McqNum5 = {
          question: Mcq5,
          answers: [AnsAOfMcq5, AnsBOfMcq5, AnsCOfMcq5, AnsDOfMcq5]
        }




        setItems(fetchedItems);
        setCategories(newCategories);
        setFormData(data);
        setSentenceParts(sentenceParts);
        setExtractedWords(extractedWords);
        setMcqQuestions([McqNum1, McqNum2, McqNum3, McqNum4, McqNum5])
        setMcqPassage(PassageOfMcQ)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error as needed (e.g., show an error message to the user)
      });
  }, [formId]);

  const handleDrop = (category, itemIndex) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) => {
        if (
          cat.name === category &&
          cat.items.indexOf(items[itemIndex]) === -1
        ) {
          cat.items.push(items[itemIndex]);
        }
        return cat;
      });

      setItems((prevItems) =>
        prevItems.filter((_, index) => index !== itemIndex)
      );

      return updatedCategories;
    });
  };

  const handleWordDrop = (word) => {
    const newWords = extractedWords.filter((w) => w !== word);
    setExtractedWords(newWords);

    const nextBlankIndex = sentenceParts.findIndex((part) => part === "_____");
    if (nextBlankIndex !== -1) {
      const updatedSentenceParts = [...sentenceParts];
      updatedSentenceParts[nextBlankIndex] = word;
      setSentenceParts(updatedSentenceParts);
    }
  };


  const handleAnswerSelect = (index, selectedAnswer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const Word = ({ word }) => {
    const [, drag] = useDrag({
      type: "WORD",
      item: { word },
    });

    return (
      <div className="word" ref={drag} onClick={() => handleWordDrop(word)}>
        {word}
      </div>
    );
  };

  const Sentence = () => {
    const [, drop] = useDrop({
      accept: "WORD",
      drop: (item) => handleWordDrop(item.word),
    });

    return (
      <div className="sentence-container">
        <div className="sentence" ref={drop}>
          {sentenceParts?.map((part, index) => (
            <span key={index}>
              {part === "__" ? (
                <span className="word-slot"></span>
              ) : (
                <span>{part}</span>
              )}
              {index !== sentenceParts.length - 1 && (
                <span className="word-gap"></span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {
        formStatus === "notSubmited" ? <form  className=" max-w-6xl mx-auto border-2 border-blue-500 rounded-lg p-12">
      <DndProvider backend={HTML5Backend}>
        <div className="mb-20">
        <h3 className="text-xl font-semibold text-blue-700 uppercase mb-3">
            Question 1:
        </h3>
        <h4>You can Drop an item into container once. So be carefull.</h4>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyItems: "center",
            }}
          >
            {items.map((item, index) =>
              item ? <Item key={index} index={index} item={item} /> : ""
            )}
          </div>
          <div style={{ display: "flex" }}>
            {categories.map((category, index) => (
              <Category
                key={index}
                category={category.name}
                items={category.items}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
        <div className="App">
        <h3 className="text-xl text-left font-semibold text-blue-700 uppercase mb-3">
            Question 2:
          </h3>
          <h1 className="text-left">Drag and Drop Words into the Sentence</h1>
          <DndProvider backend={HTML5Backend}>
            <div className="sentence-preview">
              <Sentence />
            </div>
            <div className="word-list">
              {extractedWords.map((word, index) => (
                <Word key={index} word={word} />
              ))}
            </div>
          </DndProvider>
        </div>
      </DndProvider>
      <div className="mcq-container mt-16">
      <h3 className="text-xl text-left font-semibold text-blue-700 uppercase mb-3">
            Question 3: 
          </h3>
          <h4 className="text-lg mb-10"><span className="text-black ">Passage:</span> {mcqPassage}</h4>
      {mcqQuestions.map((mcq, index) => (
        
          mcq.question ? <Card key={index} className="mcq-question">
            <CardBody>
          <p className="question">{index + 1}) {mcq.question}</p>
          <div className="answers">
            {mcq.answers.map((answer, ansIndex) => (
              <span
                key={ansIndex}
                className={`answer-button ${selectedAnswers[index] === answer ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index, answer)}
              >
                {answer}
              </span>
            ))}
          </div></CardBody>
        </Card>: ""
        
      ))}
    </div>
    <div className="mb-10">
      <Button onClick={() => setFormStatus("submited")} className="btn float-right" color="green">Submit</Button>
    </div>
    
    </form>: ""
      }
    </div>
    
  );
};

export default Preview;

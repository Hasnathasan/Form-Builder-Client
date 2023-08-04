import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const ItemType = 'ITEM';
import './Preview.css'


const Item = ({ item, index }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  return (
    <div
      ref={ref}
      style={{
        border: '1px solid black',
        padding: '8px',
        margin: '8px',
        width: '150px',
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
        backgroundColor: "#8ec9f9",
        borderRadius: '10px',
        padding: '16px',
        margin: '16px',
        width: '300px',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
      }}
      ref={drop}
    >
      <h2 className='text-xl font-bold  text-gray-700 text-center'>{category}</h2>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            borderRadius: "8px",
            textAlign: "center",
            padding: '8px',
            margin: '8px',
            width: '150px',
            backgroundColor: '#53adf7'
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const Preview = ({formId}) => {
  const [formData, setFormData] = useState();
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [categories, setCategories] = useState([]);
  const [extractedWords, setExtractedWords] = useState([]);
  const [sentenceParts, setSentenceParts] = useState([]);



  useEffect(() => {
    fetch(`http://localhost:5000/eachform/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        const { item1, item2, item3, item4, cateSelected1, cateSelected2, cateSelected3, cateSelected4, Q2PreviewSentence, Q2Ans1, Q2Ans2, Q2Ans3, Q2Ans4, Q2Ans5, Q2Ans6 } = data;
        const fetchedItems = [item1, item2, item3, item4].filter(Boolean); 
        const fetchedCategories = [cateSelected1, cateSelected2, cateSelected3, cateSelected4].filter(Boolean);
        const newCategories = fetchedCategories.map(category => { return { name: category, items: [] }});
        const newQ2Ans = [Q2Ans1, Q2Ans2, Q2Ans3, Q2Ans4, Q2Ans5, Q2Ans6].filter(Boolean);
        setExtractedWords(newQ2Ans);
        setSentenceParts(Q2PreviewSentence.split(" "));
        console.log(sentenceParts, extractedWords); 
        setItems(fetchedItems);
        setCategories(newCategories)
        setFormData(data);
      });
  }, [formId]);
  
    
  const handleDrop = (category, itemIndex) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) => {
        if (cat.name === category && cat.items.indexOf(items[itemIndex]) === -1) {
          cat.items.push(items[itemIndex]);
        }
        return cat;
      });

      setItems((prevItems) => prevItems.filter((_, index) => index !== itemIndex));

      return updatedCategories;
    });
  };

  

  
  const Sentence = () => {
    const [, drop] = useDrop({
      accept: 'WORD',
      drop: (item) => {
        const newWords = extractedWords.filter(word => word !== item.word);
        setExtractedWords(newWords);

        const nextBlankIndex = sentenceParts.findIndex(part => part === '__');
        if (nextBlankIndex !== -1) {
          const updatedSentenceParts = [...sentenceParts];
          updatedSentenceParts[nextBlankIndex] = item.word;
          setSentenceParts(updatedSentenceParts);
        }
      }
    });

    return (
      <div className="sentence-container">
        <div className="sentence" ref={drop}>
          {sentenceParts.map((part, index) => (
            <span key={index}>
              {part === '__' ? <span className="word-slot"></span> : part}
              {index !== sentenceParts.length - 1 && <span className="word-gap"></span>}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const Word = ({ word }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'WORD',
      item: { word },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        className={`word ${isDragging ? 'dragging' : ''}`}
        ref={drag}
      >
        {word}
      </div>
    );
  };




  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ marginBottom: '16px', display: 'flex' }}>
          {items.map((item, index) => (
            item ? <Item key={index} index={index} item={item} /> : ""
          ))}
        </div>
        <div style={{ display: 'flex' }}>
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
      <h1>Drag and Drop Words into the Sentence</h1>
        <Sentence />
        <div className="word-list">
          {extractedWords.map((word, index) => (
            <Word key={index} word={word} />
          ))}
        </div>
    </div>
    </DndProvider>
    </div>
    
  );
};

export default Preview;

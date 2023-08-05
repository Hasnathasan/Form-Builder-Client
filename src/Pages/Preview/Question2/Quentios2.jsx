import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Question2.css';

function Question2({ words, splitedSentence }) {
  const [extractedWords, setExtractedWords] = useState(['Hasnat', 'I']);
  const [sentenceParts, setSentenceParts] = useState([
    'Hi', '__', 'am', '__', 'Hasan'
  ]);

  useEffect(() => {
    setExtractedWords(words);
    setSentenceParts(splitedSentence);
  }, [words, splitedSentence]);

  const handleWordDrop = (word, index) => {
    const newWords = extractedWords.filter(w => w !== word);
    setExtractedWords(newWords);

    const updatedSentenceParts = [...sentenceParts];
    const nextBlankIndex = updatedSentenceParts.findIndex(part => part === '__');
    
    if (nextBlankIndex !== -1) {
      updatedSentenceParts[nextBlankIndex] = word;
      setSentenceParts(updatedSentenceParts);
    }
  };

  const Word = ({ word }) => {
    const [, drag] = useDrag({
      type: 'WORD',
      item: { word },
    });

    return (
      <div
        className="word"
        ref={drag}
        onClick={() => handleWordDrop(word)}
      >
        {word}
      </div>
    );
  };

  const Sentence = () => {
    const [, drop] = useDrop({
      accept: 'WORD',
      drop: (item) => handleWordDrop(item.word),
    });

    return (
      <div className="sentence-container">
        <div className="sentence" ref={drop}>
          {sentenceParts.map((part, index) => (
            <span key={index}>
              {part === '__' ? (
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
    <div className="App">
      <h1>Drag and Drop Words into the Sentence</h1>
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
  );
}

export default Question2;

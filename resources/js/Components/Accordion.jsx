import React, { useState } from 'react';
import ArrowUp from './ArrowUp';
import ArrowDown from './ArrowDown';

const Accordion = ({ title, content, opened=false, style, contentStyle }) => {
  const [isOpen, setIsOpen] = useState(opened);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${style}`}>
      <button
        onClick={toggleAccordion}
        className="w-full text-left"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span>{isOpen ? <ArrowUp /> : <ArrowDown />}</span>
        </div>
      </button>
      {isOpen && (
        <div className={`py-2 ${contentStyle}`}>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;

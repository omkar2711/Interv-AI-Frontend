import React, { useState } from "react";

interface AccordionProps {
  question: string;
  children: React.ReactNode;
  num: number;
}

const Accordion: React.FC<AccordionProps> = ({ question, children, num }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b last:border-none">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none hover:bg-gray-200 transition-colors duration-300"
        onClick={toggleAccordion}
      >
        <span className="font-semibold text-gray-800">
          <span className="mr-4">{num}. </span>
          {question}
        </span>

        <span className="text-gray-600">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;

import React from "react";
import Accordion from "@/components/report/Accordion";
import { useUserContext } from "@/context/UserAuth";
const Report: React.FC = () => {
  const { intervData } = useUserContext();

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-300">
          Feedback Of Interview
        </h1>
      </div>
      {intervData.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          {intervData.map((q: any, index: number) => (
            <Accordion
              key={q.feedback.question_id}
              question={q.feedback.question}
              num={index + 1}
            >
              {
                <div className="space-y-4">
                  <div>
                    <h2 className="font-semibold text-gray-700 pb-2">
                      Your Answer:
                    </h2>
                    <p className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                      {q.feedback.user_answer}
                    </p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-700 pb-2">
                      Feedback:
                    </h2>
                    <p className="bg-red-100 p-3 rounded-lg border border-red-200 text-red-800">
                      {q.feedback.feedback}
                    </p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-700 pb-2">
                      Target Answer:
                    </h2>
                    <p className="bg-green-100 p-3 rounded-lg border border-green-200 text-green-800">
                      {q.feedback.target_answer}
                    </p>
                  </div>
                </div>
              }
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">No Feedback Generated Yet</div>
      )}
    </div>
  );
};

export default Report;

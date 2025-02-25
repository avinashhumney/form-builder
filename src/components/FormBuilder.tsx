import { useState } from "react";
import { Question } from "../types/questionSchema";

export default function FormBuilder() {
  const [questionType, setQuestionType] = useState<
    "text" | "number" | "dropdown"
  >("text");
  const [questions, setQuestions] = useState<number[]>([]);
  const [textType, setTextType] = useState<"shortAnswer" | "paragraph">();
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [characterLimit, setCharacterLimit] = useState<number>(0);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const [savedQues, setSavedQues] = useState<Array<Object>>([]);

  const selectQuesType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(e.target.value as "text" | "number" | "dropdown");
  };
  const addQuestion = () => {
    setQuestions((prev) => [...prev, prev.length + 1]);
  };
  const selectTextType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextType(() => {
      return e.target.value as "shortAnswer" | "paragraph";
    });
  };
  const saveQuestion = (question: number) => {
    const Question: Question = {
      id: question,
      title: questionTitle,
      type: questionType,
      required: isRequired,
      textType: textType,
      characterLimit: characterLimit,
      helperText: helperText,
    };
    setSavedQues((prev) => [
      ...prev,
      {
        Question,
      },
    ]);
    console.log(savedQues);
  };
  return (
    <>
      <button onClick={addQuestion}>Add+</button>
      {questions?.map((ques: number) => (
        <form
          key={ques}
          action=""
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="question-title">Question Title*</label>
            <input
              type="text"
              name="question"
              id="question"
              onChange={(e) => {
                setQuestionTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="question-type">Question Type*</label>
            <select
              name="question_type"
              id="question_type"
              value={questionType}
              onChange={selectQuesType}
            >
              <option value="" disabled>
                Select question type
              </option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>
          {/* If user selects text */}
          {questionType == "text" && (
            <div>
              <label htmlFor="text-type">Text Type</label>
              <select
                name="text-type"
                id="text-type"
                value={textType}
                onChange={selectTextType}
              >
                <option value="shortAnswer">Short Answer</option>
                <option value="paragraph">Paragraph</option>
              </select>
              {/* If the user selects character limit/helper text show him the below filed */}
              {textType == "paragraph" && (
                <div>
                  <label htmlFor="charLimit">Character limit</label>
                  <input
                    onChange={(e) => setCharacterLimit(Number(e.target.value))}
                    type="number"
                    placeholder="Enter char limit"
                    name="charLimit"
                    id="charLimit"
                  />
                </div>
              )}
              <div>
                <label htmlFor="helper">Helper Text</label>
                <input
                  onChange={(e) => setHelperText(e.target.value)}
                  type="text"
                  placeholder="Enter helper text"
                  name="helperText"
                  id="helperText"
                />
              </div>
            </div>
          )}
          {/*  If the user selects number type */}
          {questionType == "number" && (
            <div>
              <label htmlFor="number-type">Number Type</label>
              <select name="numberType" id="numberType">
                <option value="age">Age</option>
                <option value="salary">Salary</option>
                <option value="year">Years</option>
                <option value="percentage">Percentage</option>
              </select>
              {/* If user selects any field */}
              <input type="text" name="min" id="min" placeholder="Min" />
              <input type="text" name="max" id="max" placeholder="Max" />
              {/* If user selects salary */}
              <select name="currency" id="currency">
                <option value="ruppee">Rs</option>
                <option value="dollar">$</option>
              </select>
            </div>
          )}
          {/* If user selects dropdown option */}
          {questionType == "dropdown" && (
            <>
              <label htmlFor="option">Option</label>
              <input type="text" name="option" id="option" />
              <button>Add</button>
              <label htmlFor="multiple">
                <input type="checkbox" name="multiple" id="multiple" />
                Mutiselect
              </label>
              {/* Select type. If he selects any of the option it should frefill the options fields and show him */}
              <div>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <label htmlFor="department">Department</label>
                <select name="department" id="department">
                  <option value="HR">HR</option>
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                </select>
                <label htmlFor="employmentType">Employement Type</label>
                <select name="employementType" id="employementType">
                  <option value="Fulltime">Fulltime</option>
                  <option value="parttime">Parttime</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
                <label htmlFor="jobRole">Job Role</label>
                <select name="jobRole" id="jobRole">
                  <option value="frontendEngineer">Frontend Engineer</option>
                  <option value="softwareEngineer">Software Engineer</option>
                  <option value="productManager">Product Manager</option>
                  <option value="designer">Designer</option>
                </select>
                <label htmlFor="location">Location</label>
                <select name="location" id="location">
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label htmlFor="required">
              <input
                onChange={() => {
                  setIsRequired(!isRequired);
                }}
                type="checkbox"
                name="required"
                id="required"
              />
              Required
            </label>
          </div>
          <button
            onClick={() => {
              saveQuestion(ques);
              console.log(questionTitle);
              console.log(questionType);
              console.log(textType);
              console.log(helperText);
              console.log(characterLimit);
              console.log(isRequired);
            }}
          >
            Save
          </button>
        </form>
      ))}
    </>
  );
}

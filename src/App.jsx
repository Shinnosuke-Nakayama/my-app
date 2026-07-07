import { use, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [reqData, setReqdata] = useState({});
  const refText = useRef("");

  useEffect(() => {
    console.log(reqData);
  }, [reqData]);

  const get = async () => {
    setText((t) => "");
    const res = await fetch("http://98.94.91.91:8080/datasummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minutes: refText.current.value }),
    });
    const data = await res.text();
    const cleaned = data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parse = JSON.parse(cleaned);

    const req = {
      product: {
        issuesWho: parse.issues.Who,
        issuesWhat: parse.issues.What,
        issuesWhen: parse.issues.When,
        issuesWhere: parse.issues.Where,
        issuesWhy: parse.issues.Why,
        issuesHow: parse.issues.How,
        issuesWhat_Why: parse.issues.What_Why,
        providedWho: parse.provided.Who,
        providedWhat: parse.provided.What,
        providedOutcome: parse.provided.Outcome,
      },
      department: parse.department,
      classification: parse.classification,
    };

    setReqdata((r) => req);
    setText((t) => data);
  };

  const post = async () => {
    const res = await fetch("/projectdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    });
    console.log(res);
  };

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => {
            get();
          }}
        >
          要約実施
        </button>
        {/* <button
          type="button"
          className="counter"
          onClick={() => {
            // post();
          }}
        >
          保存実施 column
        </button> */}
        <textarea name="" id="" ref={refText} rows={30} cols={120}></textarea>
        <p>{text}</p>
      </section>
    </>
  );
}

export default App;

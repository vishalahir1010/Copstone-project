import AiQuoteGenerator from "./components/AiQuoteGenerator";
import ResumeSummaryForm from "./components/ResumeSummaryForm";

function App() {
  return (
    <div className="app">
      <header>
        <h1>AI Developer Tools</h1>

        <p>
          Hugging Face + OpenAI API Practice
        </p>
      </header>

      <main>
        <AiQuoteGenerator />

        <ResumeSummaryForm />
      </main>
    </div>
  );
}

export default App;
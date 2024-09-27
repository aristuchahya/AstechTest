import "./App.css";
import { DiagramIncome } from "./components/Dashbboard/diagram";
import { DiagramOutcome } from "./components/Dashbboard/diagram-outcome";
import { CardForm } from "./components/Dashbboard/form";
import TransactionCard from "./components/Dashbboard/transaction-card";

function App() {
  return (
    <>
      <div>
        <CardForm />
        <TransactionCard />

        <div className="flex justify-between">
          <DiagramIncome />
          <DiagramOutcome />
        </div>
      </div>
    </>
  );
}

export default App;

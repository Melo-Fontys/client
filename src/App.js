import './App.css';
import RecommendationCreate from "./components/RecommendationCreate";
import RecommendationList from "./components/RecommendationList";

function App() {
    return (
        <div className="container">
            <h1>Create Recommendations</h1>
            <RecommendationCreate />
            <hr />
            <h1>Recommendations</h1>
            <RecommendationList />
        </div>
    );
}

export default App;

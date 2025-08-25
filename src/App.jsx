import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import Card from "./components/Card";

const API_BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  // Create a state in the main app, then pass it as a prop to the Search component. Only mutate state with setter function.
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [plantList, setPlantList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchPlants = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/breeds?limit=10&page=0${encodeURIComponent(query)}` //sample endpoint for search functionality
        : `${API_BASE_URL}/breeds?limit=10&page=0`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch plants.");
      }

      const data = await response.json();

      if (data === "False") {
        setErrorMessage(data.Error || "Failed to fetch plants");
        setPlantList([]);
        return;
      }
      console.log(data);

      setPlantList(data || []);
    } catch (error) {
      console.error(`Error fetching cats: ${error}`);
      setErrorMessage("Error fetching plants. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/src/assets/hero.png" alt="Hero Banner" />
          <h1>
            <span className="text-gradient">Find plants</span>
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Plants</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {plantList.map((plant) => (
                <Card key={plant.id} plant={plant} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;

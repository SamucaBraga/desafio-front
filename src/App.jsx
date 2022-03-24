import React, { useState } from "react";
import api from "./services/api";
import TablePlanets from "./components/TablePlanets";
import TablePeoples from "./components/TablePeoples";
import Spinner from "./components/Spinner";

export default function App() {
  const [selected, setSelected] = useState("SWAPI");
  const [planets, setPlanets] = useState([]);
  const [people, setpeople] = useState([]);

  const show = (endpoint, setState) => {
    api
      .get(`/${endpoint}`)
      .then((response) => setState(response.data.results))
      .catch((error) => {
        console.error(error);
      });
    setSelected(endpoint);
  };

  
  return (
    <>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <a
            href="#"
            onClick={() => setSelected("SWAPI")}
            className={`${
              selected === "SWAPI" && "border-primary border-b-2"
            }  transition-colors duration-200 transform dark:text-gray-200 mx-1.5 sm:mx-6`}
          >
            SWAPI
          </a>

          <a
            href="#"
            onClick={() => show("planets", setPlanets)}
            className={`${
              selected === "planets" && "border-primary border-b-2"
            }  transition-colors duration-200 transform dark:text-gray-200 mx-1.5 sm:mx-6`}
          >
            Planetas
          </a>

          <a
            href="#"
            onClick={() => show("people", setpeople)}
            className={`${
              selected === "people" && "border-primary border-b-2"
            }  transition-colors duration-200 transform dark:text-gray-200 mx-1.5 sm:mx-6`}
          >
            Pessoas
          </a>
        </div>
      </nav>

      {
        selected === "SWAPI" ? (
          <h1 className="flex items-center justify-center py-10 text-2xl font-semibold text-gray-800 lg:text-3xl">
            Selecione uma das opções do{" "}
            <span className="text-primary border-b-2 border-gray-800 ml-2">
              Menu
            </span>
          </h1>
        ) : selected === "planets" ? (
          <div className="p-10 flex items-center justify-center">
            {planets.length > 0 ? <TablePlanets planets={planets} /> : <Spinner />}
          </div>
        ) : (
          <div className="p-10 flex items-center justify-center">
            {people.length > 0 ? <TablePeoples peoples={people} /> : <Spinner />}
          </div>
        )
      }
    </>
  );
}

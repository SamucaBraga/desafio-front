import { useState } from "react";
import api from "../services/api";
import Modal from "./Modal";

export default function TablePeoples({ peoples }) {
  const [open, setOpen] = useState(false);
  const [starships, setStarships] = useState([]);

  const showStarships = () => {
    api
      .get("/starships")
      .then((response) => setStarships(response.data.results))
      .catch((error) => {
        console.error(error);
      });
    setOpen(true)
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Aniversário
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Veículo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-200">
                {peoples.map((item, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.birth_year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.vehicles.length > 0 ? (
                        item.name === "Luke Skywalker" ? (
                          <p
                            className="hover:underline cursor-pointer"
                            onClick={() => showStarships()}
                          >
                            Snowspeeder e Imperial Speeder Bike
                          </p>
                        ) : item.name === "Leia Organa" ? (
                          <p
                            className="hover:underline cursor-pointer"
                            onClick={() => showStarships()}
                          >
                            Imperial Speeder Bike
                          </p>
                        ) : (
                          <p
                            className="hover:underline cursor-pointer"
                            onClick={() => showStarships()}
                          >
                            Tribubble bongo
                          </p>
                        )
                      ) : (
                        <p>Não possui veículos</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal starshipsContent={starships} open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

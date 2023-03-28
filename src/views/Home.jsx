import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddNewLinkMutation,
  useGetGamesQuery,
} from "../redux/slices/localApi";
import axios from "axios";

export default function Home() {
  const { data, error } = useGetCategoriesQuery("");
  const { data: gamesData, isFetching, refetch } = useGetGamesQuery("");
  const [trigger, { isError, isSuccess }] = useAddNewLinkMutation();
  const [dataCategory, setDataCategory] = useState({
    link: "",
    category: "",
  });
  const [disable, setDisable] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (dataCategory.link !== "" && dataCategory.category !== "") {
      trigger(dataCategory);
      setDataCategory({});
    } else {
      alert("Debe llenar todos los campos");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDataCategory({
      ...dataCategory,
      [name]: value,
    });
  }
  async function handleRefresh() {
    setDisable(true)
    const refresh = await axios('http://localhost:3000/api/scrap')
    if (refresh.status === 200) {
      refetch()
    } else {
      alert('Refresh error: ' + refresh.status)
    }
    setDisable(false)
  }

  function currencyFormatter({ currency, value}) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency
    }) 
    return formatter.format(value)
  }

  return (
    <div className="h-full">
      {isError && (
        <p className="bg-red-500 p-2 text-center text-white rounded block my-4">
          El juego ya se encuentra ingresado!
        </p>
      )}
      {isSuccess && (
        <p className="bg-blue-500 p-2 text-center text-white rounded block my-4">
          El juego ha sido agregado satisfactoriamente!
        </p>
      )}
      <form className="grid grid-cols-12" onSubmit={handleSubmit}>
        <div className="col-span-6 flex items-center gap-10">
          <input
            type="text"
            placeholder="Ingresa tu link aqui..."
            className="border-b-4 p-2 w-full outline-none text-md"
            name="link"
            id="link"
            onChange={handleChange}
          />
          <div className="w-full">
            <label htmlFor="category" className="text-lg mr-4 font-bo">
              Categoria:
            </label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              className="outline-none border p-1"
            >
              <option value="0">--Seleccionar--</option>
              {data?.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-6 text-end space-x-2">
            <button type="button" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded disabled:bg-gray-300" disabled={disable} onClick={handleRefresh}>
            ↻ Actualizar
            </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded">
            + Agregar
          </button>
        </div>
      </form>
      <table className="border w-7/12 mt-5 text-center">
        <tbody>
          <tr className="border-b">
            <th>Proveedor</th>
            <th>Nombre del juego</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Categoria</th>
            <th>Actualizado</th>
          </tr>
          {!isFetching ? (
            gamesData?.map(
              ({ _id, title, category, price, url, updatedAt, discount, provider }) => (
                <tr key={_id} className="border">
                  <td className="bg-yellow-500 italic">
                    {provider.replace(".com", "")}
                  </td>
                  <td>
                    <a
                      href={url}
                      target="_blank"
                      className="hover:border-b border-black"
                    >
                      {title}
                    </a>
                  </td>
                  <td>{currencyFormatter({currency: "CLP", value: price})}</td>
                  <td
                    className={`text-white ${
                      Number(discount.replace(/\-|%/g, "")) > 30
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {discount.replace("-", "")}
                  </td>
                  <td>{category.name}</td>
                  <td>
                    {updatedAt.substring(0, 10)} - {updatedAt.substring(11, 19)}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={5} className="text-center ">
                Cargando...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

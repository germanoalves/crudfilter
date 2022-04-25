/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
//import firebase from "../firebase";
//import { useLocation, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/pt-br";
//import Button from "@mui/material/Button";
//import CurrencyFormat from "react-currency-format";
import { Despesa } from "./Despesa";
import { Receita } from "./Receita";
import { Total } from "./Total";
import { Chart } from "react-google-charts";


export const Home = () => {
  moment.locale("pt-br");

  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [style, setStyle] = useState("show");

  const [bla, setBla] = useState({
    despesa: undefined,
    receita: undefined,
  });

  useEffect(() => {
    document.title = "($) Minhas Finanças ($)";
    filterData(cat.rec);
  }, []);

  // let x = 0;
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  // const [desp, setDesp] = useState("Despesa");
  // const [rec, setRec] = useState("Receita");
  const [cat, setCat] = useState({
    rec: "Receita",
    desp: "Despesa",
  });

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
    //   let result = [];

    //   Object.keys(data).map((id, index) => {
    //     result.push(parseInt(data[id].valor));
    //     setX(result.reduce((p, a) => p + a, 0));
    //   });
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Tem certeque que quer apagar isso?")) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Conta excluída com sucesso!");
        }
      });
    }
  };

  /*const handleChange = (e) => {
        setSort(true);
        fireDb.child("contacts").orderByChild(`${e.target.value}`).on("value",(snapshot) => {
           snapshot.forEach((snap) => {
               sortedData.push(snap.val())
           });
           setSortedData(sortedData);
        })
    };*/
  const handleReset = () => {
    setSort(false);
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
        let codeBlock = "";
        document.getElementById("wrapper").innerHTML = codeBlock;
        setStyle("show");
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

/* ------------------- start filter page */
let dateInitial = new Date();
let firstDay = new Date(dateInitial.getFullYear(), dateInitial.getMonth(), 1);
let lastDay = new Date(
  dateInitial.getFullYear(),
  dateInitial.getMonth() + 1,
  0
);
let defaultValue = new Date(firstDay).toISOString().split("T")[0];
let defaultValueE = new Date(lastDay).toISOString().split("T")[0];

//var fistFullDate = firstDay.getDate() + "-" + ((firstDay.getMonth() + 1)) + "-" + (firstDay.getFullYear());

const [startDate1, setStartDate1] = useState(defaultValue);
const [endDate1, setEndDate1] = useState(defaultValueE);
const filterDate1 = (value) => {
const startDateFilter1 = startDate1;
const endDateFilter1 = endDate1;

  fireDb
    .child("contacts")
    .orderByChild("data")
    .startAt(startDateFilter1)
    .endAt(endDateFilter1)
    .on("value", (snapshot) => {
      if (snapshot.val()) {
        const data1 = snapshot.val();
        setData(data1);
      }
    });
};
useEffect(() => {
  filterDate1();
}, []);

/* ------------------------------------------*/



  /* -----------date fuction--------------*/
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // montar um useEffect com o primeiro e ultimo dia do mes processando a mesma filterDate

  const filterDate = (value) => {
    const startDateFilter = startDate;
    const endDateFilter = endDate;

    fireDb
      .child("contacts")
      .orderByChild("data")
      .startAt(startDateFilter)
      .endAt(endDateFilter)
      .on("value", (snapshot) => {
        if (snapshot.val() == null) {
          const data = [];
          setData(data);
          if (setData(data) !== null) {
            let codeBlock =
              '<div class="content">' +
              "<h1>Sem Valores</h1>" +
              '<p>Clique no botão "Resetar Lista"</p>' +
              "</div>";
            document.getElementById("wrapper").innerHTML = codeBlock;
            setStyle("hiddenTable");
          }
        } else {
          let codeBlock = [];
          const data = snapshot.val();
          setData(data);
        }
      });
    // setStartDate({ startDate: defaultValue });
    // setEndDate({ endDate: defaultValueE });
    //https://levelup.gitconnected.com/different-ways-to-check-if-an-object-is-empty-in-javascript-e1252d1c0b34
    //https://stackoverflow.com/questions/66248378/how-to-map-an-object-keys-array-inside-an-object-keys-in-react-js
    
  };

  

  /* -----------sum fuction list--------------*/

  let b = 0;
  Object.keys(data).map((id, index) => {
    b += parseFloat(data[id].valor);
  });

  let total = b;

  /*--ranger datas campos de filtro */

  // let someDate = new Date();
  // let date = someDate.setDate(someDate.getDate());
  // let defaultValue = new Date(date).toISOString().split("T")[0];
  // /* ------- end date */

  // let someDateE = new Date();
  // let numberOfDaysToAdd = 15;
  // let dateE = someDateE.setDate(someDateE.getDate() + numberOfDaysToAdd);
  // let defaultValueE = new Date(dateE).toISOString().split("T")[0];

  /*-----------dados para o gráfico---------- */
  let dadoNome = [];
  let dadoValor = [];
  Object.keys(data).map((id, index) => {
    dadoNome.push(data[id].name);
    dadoValor.push(parseInt(data[id].valor));
  });

  const tal = [["Nome", "Valor"]];
  for (let i = 0; i < dadoValor.length; i++) {
    tal.push([dadoNome[i], dadoValor[i]]);
  }


 /*------------------------------------- */
 const clearDates = () => {
  document.getElementById('startDate').value='';
  document.getElementById('endDate').value='';
} 

  return (
    <div>
      <div>
        <div className=" bg-gray-300 py-2 flex justify-center">
          <button
            className="px-8 py-3 m-2 bg-blue-500 rounded-md font-semibold hover:bg-blue-400 hover:text-white"
            onClick={() => handleReset()}
          >
            Resetar Lista
          </button>
          <div className="mx-1 ">
            <input
              id="startDate"
              type="date"
              defaultValue={defaultValue}
              className="max-w-xs"
              //value={startDate.startDate}

              // onChange={console.log("vai", someDate)}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mx-1">
            <input
              id="endDate"
              type="date"
              defaultValue={defaultValueE}
              className="max-w-xs"
              //value={endDate.endDate}
              // usar um if pra isso aqui onChange={(e) => setEndDate(e.target.value)}
              //https://pt.stackoverflow.com/questions/226086/como-retornar-o-primeiro-e-%C3%BAltimo-dia-do-m%C3%AAs-corrente-em-javascript
               onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
          <button
            className="px-8 py-3 m-2 bg-yellow-500 rounded-md font-semibold hover:bg-yellow-400 hover:text-white "
            onClick={() => filterDate()}
          >
            Filtrar
          </button>
          <button
            className="px-8 py-3 m-2 bg-purple-500 rounded-md font-semibold hover:bg-purple-400 hover:text-white "
            onClick={() => clearDates()}
          >
            Limpar Datas
          </button>

          <div className="ml-10">
            <button
              className="px-8 py-3 m-2 bg-green-500 rounded-md font-semibold hover:bg-green-400 hover:text-white"
              onClick={() => filterData("Receita")}
            >
              Receitas
            </button>
            <button
              className="px-8 py-3 m-2 bg-red-500 rounded-md font-semibold hover:bg-red-400 hover:text-white"
              onClick={() => filterData("Despesa")}
            >
              Despesas
            </button>
          </div>
        </div>
        <div className="py-4 justify-center">
          
          <span className="inline-grid grid-cols-4 gap-4">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 11l7-7 7 7M5 19l7-7 7 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Total Receitas
                  </h5>
                  <h3 className="font-bold text-3xl" id="rct">
                    <Receita />
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Total Despesas
                  </h5>
                  <span className="font-bold text-3xl" id="dp1">
                    <Despesa />
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Total Balanço
                  </h5>
                  <h3 className="font-bold text-3xl">
                    <Total />{" "}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-pink-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Total Lista
                  </h5>
                  <h3 className="font-bold text-3xl" id="rct">
                    {total.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h3>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
      <br />
      <br />
      <div className="inline-grid grid-cols-2 gap-4">
        <div>
          <div id="wrapper"></div>
          <div className={style}>
            <table className="table-auto m-auto text-base shadow-xl rounded-lg dark:text-white dark:border-white dark:border">
              <thead>
                <tr className=" h-12 text-left border-b-2 border-gray-400 bg-gray-300 dark:text-black">
                  <th style={{ textAlign: "center" }}>Nº</th>
                  <th style={{ textAlign: "center" }}>Nome</th>
                  <th style={{ textAlign: "center" }}>Valor</th>
                  <th style={{ textAlign: "center" }}>Data</th>
                  <th style={{ textAlign: "center" }}>Categoria</th>
                  {!sort && <th style={{ textAlign: "center" }}>Action</th>}
                </tr>
              </thead>
              {!sort && (
                <tbody>
                  {Object.keys(data).map((id, index) => {
                    return (
                      <tr className=" border-b border-gray-300" key={id}>
                        <th className="py-6 px-6" scope="row">
                          {index + 1}
                        </th>
                        <td className="py-6 px-6">{data[id].name}</td>
                        <td className="py-6 px-6" id="valores">
                          {parseFloat(data[id].valor).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td className="py-6 px-6">
                          {moment(data[id].data).format("L")}
                        </td>
                        <td className="py-6 px-6">{data[id].status}</td>
                        <td className="py-6 px-6">
                          <Link to={`/update/${id}`}>
                            <button className="btn btn-edit">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </Link>
                          <button
                            className="btn btn-delete"
                            onClick={() => onDelete(id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <Link to={`/view/${id}`}>
                            <button className="btn btn-view">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
              {/* {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.valor}</td>
                  <td>{item.data}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        )} */}
            </table>
          </div>
        </div>
        <div className="flex justify-center text-center">
          <div className="">
            <p>Gráfico Lista</p>
            <Chart
              width={"600px"}
              height={"80%"}
              chartType="ColumnChart"
              data={tal}
            />
          </div>
        </div>
      </div>

      {/*<label>Sort By:</label>
            <select className="dropdown" name="colValue" onChange={handleChange}>
                <option>Please Select</option>
                <option value="name">Nome</option>
                <option value="valor">Valor</option>
                <option value="data">Data</option>
                <option value="status">Status</option>
            </select>
            <button className="btn btn-reset" onClick={handleReset}>Reset</button>*/}
    </div>
  );
};

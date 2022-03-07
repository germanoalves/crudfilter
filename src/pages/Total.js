import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import firebase from "../firebase";
import { toast } from "react-toastify";

export function Total() {
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});

  const [s, setS] = useState(0); //despesa
  const [t, setT] = useState(0); //receita

  useEffect((despesause) => {
    filterData1("Despesa");
  }, []);

  useEffect((receitause) => {
    filterData2("Receita");
  }, []);

  useEffect(
    (despesause) => {
      let result = [];
      Object.keys(data).map((id, index) => {
        result.push(parseFloat(data[id].valor));
        setS(result.reduce((p, a) => p + a, 0));
      });
    },
    [data]
  );

  useEffect(
    (receitause) => {
      let result = [];
      Object.keys(data1).map((id, index) => {
        result.push(parseFloat(data1[id].valor));
        setT(result.reduce((p, a) => p + a, 0));
      });
    },
    [data1]
  );

  const filterData1 = (value) => {
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo("Despesa")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  const filterData2 = (value) => {
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo("Receita")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data1 = snapshot.val();
          setData1(data1);
        }
      });
  };

  let total = t - s;

  // /---------------------- alerta de gastador ---/
  //s = despesa
  //t = receita

  // console.log(typeof y)
  return (
    <>
      <span style={t > s ? { color: "green" } : { color: "red" }}>
        {parseFloat(total).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </>
  );
}

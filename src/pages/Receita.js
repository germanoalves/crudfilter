import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import firebase from "../firebase";


export function Receita() {
  const [data, setData] = useState({});

  const [bla, setBla] = useState({
    despesa: undefined,
    receita: undefined,
  });

  useEffect(() => {
    document.title = "($) Minhas Finanças ($)";
    filterData(cat.rec);
  }, []);

  const [cat, setCat] = useState({
    rec: "Receita",  
  });

  const [y, setY] = useState(0);
  

  useEffect(() => {
    let result = [];
    Object.keys(data).map((id, index) => {
      result.push(parseFloat(data[id].valor));
      setY(result.reduce((p, a) => p + a, 0));
    });
  }, [data]);

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
  
// console.log(typeof y)
  return <span>{parseFloat(y).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>;
}

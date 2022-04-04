import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import firebase from "../firebase";

export function Despesa() {
  const [data, setData] = useState({});

  useEffect(() => {
    filterData(cat.desp);
  }, []);

  const [cat, setCat] = useState({
    desp: "Despesa",
  });

  const [x, setX] = useState(0);
  

  useEffect(() => {
    let result = [];
    Object.keys(data).map((id, index) => {
      result.push(parseFloat(data[id].valor));
      setX(result.reduce((p, a) => p + a, 0));
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

  const bla = parseFloat(x).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
 
  return <span>{bla}</span>;
}

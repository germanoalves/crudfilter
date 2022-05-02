import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

const initialState = {
  name: "",
  valor: "",
  data: "",
  status: "",
};

export const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, valor, status } = state;

  const navegate = useNavigate();

  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !valor || !status) {
      toast.error("Prestenção que tem campo vazio! Preecha tudo!");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contato adicionado com sucesso!");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contato atualiado com sucesso!");
          }
        });
      }

      setTimeout(() => navegate("/"), 500);
    }
  };

  return (
    <div>
      <div className="bg-green-400 flex w-full mt-5">
        <div className=" py-4 text-green-900 sm:flex sm:flex-wrap sm:items-center sm:mx-auto sm:justify-between md:container">
          <h1 className="flex">
            <WysiwygIcon className="mr-2"></WysiwygIcon> ADD FATURA
          </h1>
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="dark:text-white">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome item..."
            value={name || ""}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="valor" className="dark:text-white">
            Valor
          </label>
          <input
            type="number"
            id="valor"
            name="valor"
            placeholder="Valor R$..."
            value={valor || ""}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="data" className="dark:text-white">
            Data
          </label>
          <input
            type="date"
            id="data"
            name="data"
            onChange={handleInputChange}
          ></input>

          <label htmlFor="status" className="dark:text-white">
            Categoria
          </label>
          {/*<input type="text" id="status" name="status" placeholder="Your status..." value={status || ""} onChange={handleInputChange}></input>*/}
          <select
            id="status"
            name="status"
            placeholder="Your status..."
            value={status || ""}
            onChange={handleInputChange}
          >
            <option>Escolha uma categoria</option>
            <option>Receita</option>
            <option>Despesa</option>
          </select>

          <input type="submit" value={id ? "Update" : "Salvar"}></input>
        </form>
      </div>
    </div>
  );
};

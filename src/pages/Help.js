import React from "react";

export const Help = (props) => {
  return (
    <div className="mt-40">
      <h2 className="dark:text-white">
        {""}
        <h1>Sistema simples de cadastro de contas.</h1>
        <p>Guia de Uso:</p>
        <br/>
        <p>-> O Sistema começa no mês atual.</p>
        <p>-> Caso queira pesquisar um período determinado, utilize antes a opção "Limpar Datas".</p>
        <p>-> Para saber o total de Receitas/Despesas, primeiro filtre o período desejado, depois utilize as opções de "Receita/Despesa".</p>
        
        <h3>{props.title}</h3>
      </h2>
    </div>
  );
};

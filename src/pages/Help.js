import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export const Help = (props) => {
  return (
    <div className="flex justify-center mt-40 text-left">
      <h2 className="dark:text-white">
        {""}
        <h1><strong>Sistema cadastro de contas.</strong></h1>
        <br/>
        <p>Guia de Uso:</p>
        <br/>
        <p><ArrowRightIcon></ArrowRightIcon> O Sistema começa no mês atual.</p>
        <p><ArrowRightIcon></ArrowRightIcon> Caso queira pesquisar um período determinado, utilize antes a opção "Limpar Datas".</p>
        <p><ArrowRightIcon></ArrowRightIcon> Para saber o total de Receitas/Despesas, primeiro filtre o período desejado, depois utilize as opções de "Receita/Despesa".</p>
        <p><ArrowRightIcon></ArrowRightIcon> O gráfico irá será montado com os dados da lista em exibição.</p>
        <p><ArrowRightIcon></ArrowRightIcon> Os marcados "Total Despesa" e "Total Receita" mostra o somatório de todos os itens pertinentes à categoria, independente do filtro de data.</p>
        <h3>{props.title}</h3>
      </h2>
    </div>
  );
};

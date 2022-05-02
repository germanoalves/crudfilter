import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';


export const Help = (props) => {
  return (
    <div>
      <div className="bg-green-400 flex w-full mt-5">
      <div className=" py-4 text-green-900 sm:flex sm:flex-wrap sm:items-center sm:mx-auto sm:justify-between md:container">
        <h1 className="flex"><WysiwygIcon className="mr-2"></WysiwygIcon>  AJUDA</h1>
      </div>
      </div>
      <div className="flex justify-center mt-20 text-left">      
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
        <p><ArrowRightIcon></ArrowRightIcon> Os marcador "Total Despesa" e "Total Receita" mostra o somatório de todos os itens pertinentes à categoria, independente do filtro de data.</p>
        <p><ArrowRightIcon></ArrowRightIcon> Os marcador "Total Balanço" mostra a diferença entre o total de Receitas menos o total de Despesas</p>
        <p><ArrowRightIcon></ArrowRightIcon> Os marcador "Total Lista" mostra o somatório dos itens montados na lista</p>
        <p><ArrowRightIcon></ArrowRightIcon> Arraste para a tabela para o lado para ver todo seu conteúdo.</p>
        <h3>{props.title}</h3>
      </h2>
    </div>
    </div>
  );
};

import React, {useState, useEffect} from "react";
import { useLocation, Link} from "react-router-dom";
import fireDb from "../firebase";
import "./Search.css";
import moment from 'moment';
import 'moment/locale/pt-br';

export const Search = () => {
    moment.locale('pt-br');
    
    const [data, setData] =  useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get("name");
    

    useEffect(() => {
     searchData();
    }, [search])

    const searchData = () => {
        fireDb.child("contacts").orderByChild("name").equalTo(search).on("value", (snapshot) => {
            if(snapshot.val()) {
                const data = snapshot.val();
                setData(data);
            }
        });
    };
    return (
        <>
         <div style={{marginTop:"100px"}}>
              <Link to="/">
                        <button className="btn btn-edit">Go Back</button>
              </Link>
             {Object.keys(data).length === 0 ? (
                 <h2>Sem resultados de pesquisa para : {query.get("name")}</h2>
             ): (
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>Nº</th>
                            <th style={{textAlign: "center"}}>Name</th>
                            <th style={{textAlign: "center"}}>Email</th>
                            <th style={{textAlign: "center"}}>Contact</th>
                            <th style={{textAlign: "center"}}>Valor</th>
                            <th style={{textAlign: "center"}}>Data</th>
                            <th style={{textAlign: "center"}}>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].contact}</td>
                                    <td>{data[id].valor}</td>
                                    <td>{moment(data[id].data).format('L')}</td>
                                    <td>{data[id].status}</td>
                                    
                                </tr>
                            );
                        })}
                    </tbody>
            </table>
             )}
            
        </div>
        </>
    )
}

import React, {useState, useEffect} from "react";
import fireDb from "../firebase";
import {Link, useParams} from "react-router-dom";
import './View.css';
import moment from 'moment';
import 'moment/locale/pt-br';

export const View = () => {

    moment.locale('pt-br');

    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        fireDb.child(`contacts/${id}`).get().then((snapshot) => {
            if(snapshot.exists()) {
                setUser({...snapshot.val()})
            } else {
                setUser({});
            }
        })
    }, [id]);
    return (
        <div className="mt-40 dark:text-white">
            <div className="w-96 flex flex-col border border-green-600 text-center m-auto">
                <div className=" h-9 pt-2 mb-4 bg-green-700 text-white text-center font-bold">
                    <p>Detalhe Conta</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br/>
                    <br/>                    
                    <strong>Valor: R$ </strong>
                    <span>{user.valor}</span>
                    <br/>
                    <br/>
                    <strong>Data </strong>
                    <span>{moment(user.data).format('L')}</span>
                    <br/>
                    <br/>
                    <strong>Status: </strong>
                    <span>{user.status}</span>
                    <br/>
                    <br/>
                    <Link to="/">
                        <button className="btn btn-back">Voltar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

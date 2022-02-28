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
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
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
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br/>
                    <br/>
                    <strong>Contact: </strong>
                    <span>{user.contact}</span>
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
                        <button className="btn btn-back">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

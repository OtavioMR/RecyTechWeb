import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Teste() {
    const [usuarios, setUsuarios] = useState<any[]>([]);

    useEffect(() => {
        api.get("usuario/todos")
            .then(res => setUsuarios(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        <p>Nome: <b>{usuario.nomeCompleto}</b></p>
                        <p>Nome de usuário: <b>{usuario.nomeUsuario}</b></p>
                        <p>Email: <b>{usuario.email}</b></p>
                        <p>Senha: <b>{usuario.senha}</b></p>
                        <br /><br />
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

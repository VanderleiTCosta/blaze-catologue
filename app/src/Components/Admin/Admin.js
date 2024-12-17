import React, { useEffect, useState } from "react";
import * as S from "./AdminStyle";
import { db, auth } from "../../database/firebaseConfig";
import { getDocs, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loading from "../Loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

async function fetchClientes() {
    const clientesCol = collection(db, "CLIENTES");
    const clientesSnapshot = await getDocs(clientesCol);
    return clientesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export default function Admin() {
    const { clientInfo } = useAuth();
    const [clientConnected, setClientConnected] = useState(false);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState("NAO");
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [formData, setFormData] = useState({ NOME: "", EMAIL: "", CONTATO: "", ENDERECO: "", CIDADE: "", CEP: "", SENHA: "", CONFIRMACAOSENHA: "" });
    const [navOption, setNavOption] = useState(1);
    const [status, setStatus] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [clientesPerPage, setClientesPerPage] = useState(5);
    const lastClientIndex = currentPage * clientesPerPage;
    const firstClientIndex = lastClientIndex - clientesPerPage;
    
    // Filtered clients based on search term
    const filteredClientes = clientes.filter(cliente => 
        cliente.NOME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.EMAIL.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Current clients for the current page
    const currentClientes = filteredClientes.slice(firstClientIndex, lastClientIndex);

    useEffect(() => {
        if (clientInfo) {
            setClientConnected(clientInfo.isAdmin);

            if (!clientInfo.isAdmin) {
                navigate("/home");
            }
        } else {
            setClientConnected(false);
        }
    }, [clientInfo]);

    const loadClientes = async () => {
        setStatus(true);
        try {
            const clientesData = await fetchClientes();
            setClientes(clientesData);
        } catch (error) {
            alert("Erro ao carregar clientes.");
        } finally {
            setStatus(false);
        }
    };

    useEffect(() => {
        loadClientes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { NOME, EMAIL, CONTATO, ENDERECO, CIDADE, CEP, SENHA, CONFIRMACAOSENHA } = formData;
        if (!NOME || !EMAIL || !CONTATO || !ENDERECO || !CIDADE || !CEP || !SENHA) {
            alert("Todos os campos devem ser preenchidos.");
            return false;
        }
        if (SENHA !== CONFIRMACAOSENHA) {
            alert("As senhas não coincidem.");
            return false;
        }
        return true;
    };

    const handleCreateClient = async () => {
        setStatus(true);
        if (!validateForm()) {
            setStatus(false);
            return;
        }
    
        const { NOME, EMAIL, CONTATO, ENDERECO, CIDADE, CEP, SENHA } = formData;
        const clientDataUpper = {
            NOME,
            EMAIL,
            CONTATO,
            ENDEREÇO: ENDERECO,
            CIDADE,
            CEP,
            isAdmin: isAdmin === "SIM"
        };
    
        const clientRef = doc(db, "CLIENTES", EMAIL);
        try {
            await setDoc(clientRef, clientDataUpper, { merge: true });
            await createUserWithEmailAndPassword(auth, EMAIL, SENHA);
            alert("Cliente criado e autenticado com sucesso!");
            loadClientes();
        } catch (error) {
            console.error("Erro ao criar usuário de autenticação:", error);
            // Tratamento específico para erros
            if (error.code === "auth/weak-password") {
                alert("A senha deve ter pelo menos 6 caracteres.");
            } else {
                alert("Erro ao criar usuário de autenticação. Tente novamente.");
            }
        } finally {
            setFormData({ NOME: "", EMAIL: "", CONTATO: "", ENDERECO: "", CIDADE: "", CEP: "", SENHA: "", CONFIRMACAOSENHA: "" });
            setIsAdmin("NAO");
            setStatus(false);
        }
    };

    const handleDeleteClient = async (email) => {
        setStatus(true);
        try {
            const clientRef = doc(db, "CLIENTES", email);
            await deleteDoc(clientRef);
            alert("Cliente excluído com sucesso!");
            loadClientes();
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente.");
        } finally {
            setStatus(false);
        }
    };

    // Pagination controls
    const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <S.ContainerContent>
            <Loading status={status} />
            <h1 className="Title">PLATAFORMA ADMIN</h1>

            <S.Lista>
                <div className="nav-options">
                    <h1 className={`nomeTabela ${navOption === 1 && "selected"}`} onClick={() => setNavOption(1)}>
                        LISTA DE CLIENTES
                    </h1>
                    <h1 className={`nomeTabela ${navOption === 2 && "selected"}`} onClick={() => setNavOption(2)}>
                        CADASTRAR CLIENTE
                    </h1>
                </div>

                {navOption === 1 && (
                    <>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Pesquisar clientes por nome ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <S.TabelaClientes>
                            <S.TabelaColumns>
                                <div className="item">Nome</div>
                                <div className="item">Contato</div>
                                <div className="item">Email</div>
                                <div className="item">Opções</div>
                            </S.TabelaColumns>
                            <S.TableResultsBox>
                                {currentClientes.map((cliente) => (
                                    <S.TableResults key={cliente.id}>
                                        <div className="item">{cliente.NOME}</div>
                                        <div className="item">{cliente.CONTATO}</div>
                                        <div className="item">{cliente.EMAIL}</div>
                                        <button onClick={() => handleDeleteClient(cliente.EMAIL)}>Excluir</button>
                                    </S.TableResults>
                                ))}
                            </S.TableResultsBox>
                            
                            {/* Pagination controls */}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </S.TabelaClientes>
                    </>
                )}

                {navOption === 2 && (
                    <S.ContainerCadastro>
                        {Object.keys(formData).map((key) => (
                            key !== "SENHA" && key !== "CONFIRMACAOSENHA" &&
                            <div className="item" key={key}>
                                <p>{key.charAt(0) + key.slice(1).toLowerCase()}</p>
                                <input
                                    name={key}
                                    type={key.includes("EMAIL") ? "email" : "text"}
                                    maxLength={40}
                                    placeholder={`Digite ${key.toLowerCase()}`}
                                    value={formData[key]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <div className="item">
                            <p>ADMIN</p>
                            <select value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
                                <option value="SIM">SIM</option>
                                <option value="NAO">NÃO</option>
                            </select>
                        </div>
                        <div className="item">
                            <p>Senha</p>
                            <input
                                name="SENHA"
                                type="password"
                                placeholder="Digite a senha"
                                value={formData.SENHA}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="item">
                        <p>Confirmação de Senha</p>
                            <input
                                name="CONFIRMACAOSENHA"
                                type="password"
                                placeholder="Confirme a senha"
                                value={formData.CONFIRMACAOSENHA}
                                onChange={handleChange}
                            />
                        </div>
                        <button onClick={handleCreateClient}>
                            CRIAR
                        </button>
                    </S.ContainerCadastro>
                )}
            </S.Lista>
        </S.ContainerContent>
    );
}
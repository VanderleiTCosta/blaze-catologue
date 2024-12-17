import React, { useState, useEffect } from "react";
import * as S from "./BarraLateralStyle";
import helpers from "../../../helpers";
import { useBlaze } from "../../../../context/BlazeContext";
import { useNavigate } from "react-router-dom";
import Container from "../../../Container/Container";
import Loading from "../../../Loading/Loading";

export default function BarraLateral({ showLateral }) {
    const [selectedNavSection, setSelectedNavSection] = useState(1);
    const [selectedCoresOp, setSelectedCoresOp] = useState(1);
    const { historico, current } = useBlaze();
    const [data, setData] = useState({ History: [], Current: {} });
    const [quantidadePedras, setQuantidadePedras] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (data.History.length === 0 && historico.length > 0) {
                setData({ History: historico, Current: current });
            }
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
        }
    }, [historico, current]);

    const probabilidades = helpers.calcularProbabilidadesPedras(data.History);
    const probabilidades2 = helpers.calcularProbabilidadesPedras2(data.History, quantidadePedras);

    const handleIncrement = () => {
        if (quantidadePedras && quantidadePedras < 8) {
            setQuantidadePedras(quantidadePedras + 1);
        }
    }

    const handleDecrement = () => {
        if (quantidadePedras && quantidadePedras > 1) {
            setQuantidadePedras(quantidadePedras - 1);
        }
    }

    if (!data.History || data.History.length === 0 || !current) {
        <Container>
            <Loading status={true} />
        </Container>
    }

    return (
        <S.Dash1 className={`${showLateral ? "ativo" : "desativo"}`}>
            <S.Conteudo>
                <div className="buttonBack" onClick={() => navigate("/home")}>VOLTAR</div>
                <div className={`nav-section `}>
                    <button
                        onClick={() => { setSelectedNavSection(1) }}
                        className={parseFloat(selectedNavSection) === 1 ? "selected" : ""}>
                        Histórico
                    </button>
                    <button
                        onClick={() => { setSelectedNavSection(2) }}
                        className={parseFloat(selectedNavSection) === 2 ? "selected" : ""}>
                        Estatística
                    </button>
                </div>

                {data.History && data.History.length > 0 && (
                    <>
                        {selectedNavSection === 1 && (
                            <>
                                <div className="infoAbout14x">
                                    <span className="title">Informações do 14x</span>
                                    <div className="whenAbout">
                                        <div className="op">
                                            <img className="icone-14x" alt="imagem di branco 14x" src="14x-icon.png" />
                                            <p className="descrip">
                                                Último foi às <span className="boldaIsso">{helpers.handleObterUltimaCaidaDeBranco(data.History) ? helpers.handleObterUltimaCaidaDeBranco(data.History) : "00:00"} </span>
                                                                                   </p>
                                        </div>
                                        <div className="op">
                                            <img className="icone-14x" alt="imagem di branco 14x" src="14x-icon.png" />
                                            <img className="icone-14x2" alt="imagem di branco 14x2" src="14x-icon.png" />
                                            <p className="descrip ms-4">
                                                Duplo foi às <span className="boldaIsso">{helpers.handleObterUltimaCaidaDe2Brancos(data.History) ? helpers.handleObterUltimaCaidaDe2Brancos(data.History) : "00:00"} </span>
                                                {/* Á <span className="boldaIsso">2</span> rodadas */}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="infoAboutColors">
                                    <span className="title">Cor por horário</span>
                                    <div className="corPorHorarioOp">
                                        <button
                                            onClick={() => setSelectedCoresOp(1)}
                                            className={selectedCoresOp === 1 ? "selected" : ""}>
                                            Quantidade
                                        </button>
                                        <button
                                            onClick={() => setSelectedCoresOp(2)}
                                            className={selectedCoresOp === 2 ? "selected" : ""} >
                                            Porcentagem
                                        </button>
                                    </div>
                                    {selectedCoresOp === 2 && (
                                        <div className="porcentagemPorHora">
                                            {helpers.calcularPorcentagemPorHora(data.History).map((item, index) => (
                                                <span className="itemHour" key={index}>
                                                    <span className="hourTime">{item.time}</span>
                                                    <div className="item-box white">{item.whitePercentage}</div>
                                                    <div className="item-box red">{item.redPercentage}</div>
                                                    <div className="item-box black">{item.blackPercentage}</div>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {selectedCoresOp === 1 && (
                                        <div className="porcentagemPorHora">
                                            {helpers.calcularPorcentagemPorHora(data.History).map((item, index) => (
                                                <span className="itemHour" key={index}>
                                                    <span className="hourTime">{item.time}</span>
                                                    <div className="item-box white">{item.white}</div>
                                                    <div className="item-box red">{item.red}</div>
                                                    <div className="item-box black">{item.black}</div>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {selectedNavSection === 2 && (
                            <>
                                <S.SecondPageDivide>
                                    <S.Devendo>
                                        <p>Jogadas Devendo</p>
                                        <S.TableDevendo>
                                            <S.TableDevendoColumns>
                                                <div className="Column">N</div>
                                                <div className="Column">Devendo</div>
                                                <div className="Column">Hora</div>
                                            </S.TableDevendoColumns>

                                            <S.TableBody>
                                                {data.History.length > 0 && helpers.processaRolls(data.History).map((obj, i) => (
                                                    <S.TableDevendoRows key={i}>
                                                        <div className="Row" style={{ backgroundColor: obj.color === 0 ? "white" : obj.color === 1 ? "red" : "rgba(30, 30, 30, 1)", color: obj.color === 0 ? "black" : "white" }}>{obj.roll}</div>
                                                        <div className="Row">{obj.qtt === 0 ? "PAGO" : obj.qtt}</div>
                                                        <div className="Row">{helpers.formatarHora(obj.created_at)}</div>
                                                    </S.TableDevendoRows>
                                                ))}
                                            </S.TableBody>
                                        </S.TableDevendo>
                                    </S.Devendo>

                                    <S.TabelasInferiores>
                                        <S.Tendencia>
                                            <p>Probabilidades da Próxima Cor</p>
                                            <S.TableTendencia>
                                                <S.TableTendenciaBody>
                                                    {Object.entries(probabilidades).map(([roll, prob]) => (
                                                        <S.TableTendenciaLine key={roll}>
                                                            <div className="item">{roll}</div>
                                                            <div className="item it-1">{(prob.probabilityOfNextIsWhite).toFixed(2)}%</div>
                                                            <div className="item it-2">{(prob.probabilityOfNextIsRed).toFixed(2)}%</div>
                                                            <div className="item it-3">{(prob.probabilityOfNextIsBlack).toFixed(2)}%</div>
                                                        </S.TableTendenciaLine>
                                                    ))}
                                                </S.TableTendenciaBody>
                                            </S.TableTendencia>
                                        </S.Tendencia>

                                        <S.MartinGaleArea>
                                            <S.TabelaPedras>
                                                <p>GESTÃO DE PEDRAS</p>
                                                <S.SelecionarPedras>
                                                    <span>QUANTIDADE:</span>
                                                    <button onClick={handleDecrement}>-</button>
                                                    <div className="quantidadeDePedrasBox">{quantidadePedras}</div>
                                                    <button onClick={handleIncrement}>+</button>
                                                </S.SelecionarPedras>
                                                <S.PedrasSelecionadas>
                                                    {Array.from({ length: quantidadePedras }).map((_, index) => {
                                                        const historyItem = data.History[index];
                                                        return (
                                                            <div key={index} className={`item color-${historyItem && historyItem.color ? historyItem.color : 'default'}`}><span>s</span></div>
                                                        );
                                                    })}
                                                </S.PedrasSelecionadas>
                                                <S.ChanceDaProxima>
                                                    <div className="item color0">
                                                        {probabilidades2 && probabilidades2.probabilityOfNextIsWhite.toFixed(2)}%
                                                    </div>
                                                    <div className="item color1">
                                                        {probabilidades2 && probabilidades2.probabilityOfNextIsRed.toFixed(2)}%
                                                    </div>
                                                    <div className="item color2">
                                                        {probabilidades2 && probabilidades2.probabilityOfNextIsBlack.toFixed(2)}%
                                                    </div>

                                                </S.ChanceDaProxima>
                                            </S.TabelaPedras>

                                            <S.TabelaMartinGale>
                                                <div className="columns">
                                                    <div className="it">Hora</div>
                                                    <div className="it">Giro</div>
                                                    <div className="it color-0" style={{ color: "black" }}>Branco</div>
                                                    <div className="it color-1">Vermelho</div>
                                                    <div className="it color-2">Preto</div>
                                                </div>
                                                <div className="rows">
                                                    {data.History &&
                                                        data.History.length > 0 &&
                                                        helpers.probabilidadeMartinGale(data.History, quantidadePedras).map((row, index) => (
                                                            <div className="row" key={index}>
                                                                <div className="it">
                                                                    {row.createdAt !== "" ? row.createdAt : 'N/A'}
                                                                </div>
                                                                <div className="it">
                                                                    {row.roll !== '' ? row.roll : 'N/A'}
                                                                </div>
                                                                <div className="it" style={{ color: helpers.handleItColor(row.white.trim() ? row.white : 'X') }}>
                                                                    {row.white.trim() ? row.white : 'X'}
                                                                </div>
                                                                <div className="it" style={{ color: helpers.handleItColor(row.red.trim() ? row.red : 'X') }}>
                                                                    {row.red ? row.red : 'X'}
                                                                </div>
                                                                <div className="it" style={{ color: helpers.handleItColor(row.black.trim() ? row.black : 'X') }}>
                                                                    {row.black ? row.black : 'X'}
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </S.TabelaMartinGale>
                                        </S.MartinGaleArea>
                                    </S.TabelasInferiores>
                                </S.SecondPageDivide>
                            </>
                        )}
                    </>

                )}

            </S.Conteudo>
        </S.Dash1>
    );
}

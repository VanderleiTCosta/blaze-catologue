import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import * as S from "./DashStyle";
import { useBlaze } from "../../../context/BlazeContext";
import helpers from "../../helpers";
import MovendoBolinhasblaze from "../../AnimacaoBolinhasGirando/AnimacaoBolinhasBlaze";
import Container from "../../Container/Container";
import Loading from "../../Loading/Loading";
import BarraLateral from "./BarraLateral.js/BarraLateral";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BlazeIframe from "./BlazeIframe/BlazeIframe";
import DonutChart from "../../Graficos/DonutChart/DonutChart";
import blazeHelpers from "./blazeHelpers";

const ITEMS_PER_PAGE = 88;

export default function DashBlaze() {
    const { historico, current } = useBlaze();
    const [data, setData] = useState({ History: [], Current: {} });
    const [porcentagemQueAsCoresVieram, setPorcentagemQueAsCoresVieram] = useState({ black: 0, white: 0, red: 0 });
    const [currentTime, setCurrentTime] = useState("");
    const [selecionadoCorPor, setSelecionadoCorPor] = useState("Minuto");
    const [contagemsurfs, setContagemSurfs] = useState([]);
    const [contagemsurfsBrancos, setContagemSurfsBrancos] = useState([]);
    const [showLateral, setShowLateral] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const { clientInfo } = useAuth();
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        if (!clientInfo) navigate("/login");
    }, [clientInfo, navigate]);

    useEffect(() => {
        blazeHelpers.atualizarHora(setCurrentTime);
        const intervalId = setInterval(() => blazeHelpers.atualizarHora(setCurrentTime), 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        blazeHelpers.handleHistoryEdit(setData, setContagemSurfs, setContagemSurfsBrancos, setPorcentagemQueAsCoresVieram, data, historico, current);
    }, [historico, current]);

    const totalPages = useMemo(() => Math.ceil(data.History.length / ITEMS_PER_PAGE), [data.History]);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = useMemo(() => data.History.slice(startIndex, endIndex), [startIndex, endIndex, data.History]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [currentPage, totalPages]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentPage]);

    const predictionColor = helpers.predictNextColor(data.History)

    if (!data.History.length || !contagemsurfs.length || !contagemsurfsBrancos.length) {
        return (
            <Container>
                <Loading status={true} />
            </Container>
        );
    }

    const contagemCoresResultante = blazeHelpers.contarCores(data.History);
    const totalCores = contagemCoresResultante.branco + contagemCoresResultante.vermelho + contagemCoresResultante.preto;
    const porcentagemBranco = totalCores ? (contagemCoresResultante.branco / totalCores * 100).toFixed(2) : 0;
    const porcentagemVermelho = totalCores ? (contagemCoresResultante.vermelho / totalCores * 100).toFixed(2) : 0;
    const porcentagemPreto = totalCores ? (contagemCoresResultante.preto / totalCores * 100).toFixed(2) : 0;


    return (
        <S.DashboardBlaze>
            <BarraLateral showLateral={showLateral} />
            <BlazeIframe showIframe={showIframe} setShowLateral={setShowLateral} />
            <S.DashContainer>
                <div className="botaoAcionarMobile" onClick={() => setShowLateral(!showLateral)}>
                    <img src={showLateral ? `menosInf.png` : `maisInfo.png`} alt="Toggle Sidebar" />
                </div>

                <div className="botaoMostrarBlaze" onClick={() => setShowIframe(!showIframe)}>
                    <img src={showIframe ? `menosInf.png` : `blaze2.png`} alt="Toggle Blaze" />
                </div>

                <S.DashArea>
                    <S.DashSecond>
                        <div className="dash21">
                            <S.Dash21Union>
                                <div className="dash211Box dash211BoxNone">
                                    <S.VideoBackground>
                                        <S.VideoBackgroundContainer>
                                            <div className="over" />
                                            <video
                                                ref={videoRef}
                                                src="/video.mp4"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                                                frameBorder="0"
                                                allow="autoplay; encrypted-media"
                                                allowFullScreen
                                                title="video"
                                                autoPlay
                                                loop
                                                muted
                                            />
                                        </S.VideoBackgroundContainer>
                                    </S.VideoBackground>
                                    <div className="dash211Box1">
                                        <div className="timerAndProxima">
                                            <div className="Timer">
                                                <span>{currentTime}</span>
                                            </div>
                                            <div className={`proximaJogada color-${predictionColor}`}>
                                                {predictionColor === 2 ? "Jogue no Preto" : "Jogue no Vermelho"}
                                                <div className={`Caixa${predictionColor === 2 ? 'Preta' : 'Vermelha'}`}><h6></h6></div>
                                            </div>
                                        </div>
                                        <div className="apostas-box">
                                            <div className="aposta-box">
                                                <div className="box-icone white">
                                                    <img className="icone-14x" alt="imagem di branco 14x" src="14x-icon.png" />
                                                </div>
                                                <span>{(porcentagemQueAsCoresVieram.white * 100).toFixed(2)}%</span>
                                            </div>
                                            <div className="aposta-box">
                                                <div className="box-icone red"></div>
                                                <span>{(porcentagemQueAsCoresVieram.red * 100).toFixed(2)}%</span>
                                            </div>
                                            <div className="aposta-box">
                                                <div className="box-icone black"></div>
                                                <span>{(porcentagemQueAsCoresVieram.black * 100).toFixed(2)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="dash211Box">
                                    <div className="dash211Box2">
                                        <div className="blazeGirou">
                                            <span>{data.Current && data.Current.status === "complete" ? "Blaze Girou" : ""}</span>
                                            <div className="oqueGirou">
                                                <div className={`boxzinha color-${data.Current?.status === "complete" ? data.Current.color : ""}`}>
                                                    <div className={`circleNumber ${data.Current?.status === "complete" ? "true" : ""}`}>
                                                        {data.Current?.status === "complete" ? data.Current.roll : ""}
                                                        {blazeHelpers.handleImage(data.Current?.roll === 0 && data.Current?.status === "complete" ? 0 : -1)}
                                                    </div>
                                                </div>
                                                <h4 className="time">{(data.Current?.created_at && data.Current.status === "complete") ? helpers.formatarData(data.Current.created_at) : ""}</h4>
                                            </div>
                                            <span className="statusMessage">
                                                {data.Current?.status === "rolling" ? <MovendoBolinhasblaze /> :
                                                    data.Current?.status === "waiting" ? "Aguardando Blaze" : ""}
                                            </span>
                                        </div>

                                        <div className="grafico">
                                            <h4 className="Titulo">CAÍDAS AO DECORRER DO TEMPO</h4>
                                            <DonutChart value1={parseFloat(porcentagemBranco)} value2={parseFloat(porcentagemVermelho)} value3={parseFloat(porcentagemPreto)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="dash211Box">
                                    <S.CoresPorMinContainer>
                                        <h2>CORES POR MINUTO</h2>
                                        <S.CoresPorMinTabela>
                                            <>
                                                {data.History && helpers.calcularPorcentagemPorMinuto(data.History).map((it, index) => (
                                                    <div key={index} className="itemCorPorMin">
                                                        <div className="primeiro">{it.time}</div>
                                                        <div className="red">{((it.red / it.total) * 100).toFixed(2)}%</div>
                                                        <div className="black">{((it.black / it.total) * 100).toFixed(2)}%</div>
                                                        <div className="white">{((it.white / it.total) * 100).toFixed(2)}%</div>
                                                    </div>
                                                ))}
                                            </>

                                        </S.CoresPorMinTabela>

                                        <h2 style={{marginTop: "20px"}}>CORES POR HORA</h2>
                                        <S.CoresPorMinTabela>
                                            <>

                                                {data.History && helpers.calcularPorcentagemPorHora(data.History).reverse().map((it, index) => (
                                                    <div key={index} className="itemCorPorMin">
                                                        <div className="primeiro">{it.time}</div>
                                                        <div className="red">{it.redPercentage}</div>
                                                        <div className="black">{it.blackPercentage}</div>
                                                        <div className="white">{it.whitePercentage}</div>
                                                    </div>
                                                ))}
                                            </>

                                        </S.CoresPorMinTabela>
                                    </S.CoresPorMinContainer>
                                </div>

                                <div className="dash211Box">
                                    <S.CoresPorMinContainer>
                                        <h2>PADRÕES MAIS REPETIDOS</h2>
                                        <S.PadroesRepetidos>
                                            {data.History && helpers.calcularPadroesMaisRepetidos(data.History).reverse().map((it, index) => (
                                                <div key={index} className="itemCorPorMin">
                                                    <div className="primeiro">{index + 1}</div>
                                                    {it.padrao.split('-').map(color => {
                                                        if (color === '0') {
                                                            return <div className="white" key={Math.random()}></div>;
                                                        } else if (color === '1') {
                                                            return <div className="red" key={Math.random()}></div>;
                                                        } else if (color === '2') {
                                                            return <div className="black" key={Math.random()}></div>;
                                                        }
                                                        return null;
                                                    })}
                                                    <div className="primeiro">{it.frequencia}</div>
                                                </div>
                                            ))}
                                        </S.PadroesRepetidos>
                                    </S.CoresPorMinContainer>
                                </div>
                            </S.Dash21Union>
                        </div>

                        <div className="dash22">
                            <S.TipoDeTitulo>CONTAGEM DE SURF</S.TipoDeTitulo>
                            <div className="dash22Box">
                                <div className="divDeBox">
                                    {contagemsurfs.length > 0 && contagemsurfs.map((box, index) => (
                                        <div
                                            key={index}
                                            className="boxContagem"
                                            style={{ backgroundColor: box.color === 0 ? "white" : box.color === 1 ? "rgba(180, 0, 0, 1)" : "black", color: box.color === 2 ? "white" : "black" }}
                                        >
                                            {box.qtt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <S.TipoDeTitulo>INTERVALOS ENTRE BRANCOS</S.TipoDeTitulo>
                            <div className="dash22Box">
                                <div className="divDeBox">
                                    {contagemsurfsBrancos.length > 0 && contagemsurfsBrancos.map((int, index) => (
                                        <div className="boxIntervalo" key={index}>
                                            <span className="qtt">{int.qtt}</span>
                                            <span className="hour">{helpers.handleTime(int.created_at)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <S.DashGiros>
                            <div className="titelAndPagination">
                                <span className="title">GIROS ANTERIORES</span>
                                <div className="pagination">
                                    <button onClick={handlePrevPage} disabled={currentPage === 0}>Anterior</button>
                                    <span>Página {currentPage + 1} de {totalPages}</span>
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Próxima</button>
                                </div>
                            </div>

                            <S.GirosMinutosFinaisContainer>
                                <S.GirosMinutosFinais>
                                    {data.History && Array.isArray(helpers.calcularPorcentagemCoresMinutosFinais(data.History)) &&
                                        helpers.calcularPorcentagemCoresMinutosFinais(data.History).map((item, index) => (
                                            <S.ItemGirosMinFinal key={index}>
                                                <span>{item.minuto}</span>
                                                {item.cores.map((corItem, corIndex) => (
                                                    <div className={`itemBox color-${corItem.cor}`} key={corIndex}>
                                                        {corItem.porcentagem}
                                                    </div>
                                                ))}
                                            </S.ItemGirosMinFinal>
                                        ))}
                                </S.GirosMinutosFinais>
                            </S.GirosMinutosFinaisContainer>
                        </S.DashGiros>
                    </S.DashSecond>

                    <S.BoxRoller>
                        <S.BoxDeDivs>
                            {currentItems && currentItems.length > 0 && currentItems.map((box) => (
                                <div className="boxZinhaPai" key={box.created_at}>
                                    <div
                                        className="boxZinha"
                                        style={{ backgroundColor: blazeHelpers.handleBackColor(box.color), color: blazeHelpers.handleColor(box.roll) }}
                                    >
                                        <span>
                                            {blazeHelpers.handleImage(box.roll)}
                                        </span>
                                    </div>
                                    <div className="time">{helpers.formatarData(box.created_at)}</div>
                                </div>
                            ))}
                        </S.BoxDeDivs>
                    </S.BoxRoller>
                </S.DashArea>
            </S.DashContainer>
        </S.DashboardBlaze>
    );
}
import styled from "styled-components";

export const ContainerContent = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(60deg, rgba(240, 240, 240, 1), rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
    padding: 30px 20px;

    .Title {
        width: 100%;
        text-align: center;
        color: rgba(0,0,0,1);
        margin: 0;
        font-size: 36px;
    }
`;

export const Lista = styled.div`
    width: 100%;
    display: flex;
    margin-top: 100px;
    box-sizing: border-box;
    flex-direction: column;

    .search-container{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;

        input{
            width: 500px;
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            font-size: 18px;
        }
    }

    .nav-options {
        width: 100%;
        display: flex;
        gap: 20px;
        justify-content: center;

        .nomeTabela {
            text-align: center;
            color: rgba(0,0,0,1);
            margin: 0;
            font-weight: 800;
            font-size: 26px;
            border-bottom: 0px solid rgba(200, 0, 0, 1);
            cursor: pointer;
            transition: border .3s;

            &:hover {
                border-bottom: 3px solid rgba(200, 0, 0, 1);
                color: rgba(200, 0, 0, 1);
            }

            &.selected {
                border-bottom: 3px solid rgba(200, 0, 0, 1);
                color: rgba(200, 0, 0, 1);
            }
        }
    }
`;

export const TabelaClientes = styled.div`
    width: 80%;
    max-width: 1000px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    .pagination{
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        justify-content: center;
        button{
            width: 35px;
            height: 35px;
        }
    }
`;

export const TabelaColumns = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 3fr 1fr;
    background-color: #f3f3f3;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;

    .item {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }
`;

export const TableResultsBox = styled.div`
    width: 100%;
`;

export const TableResults = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 3fr 1fr;
    border-bottom: 1px solid #eee;
    padding: 10px 0;

    .item {
        text-align: center;
        font-size: 16px;
        color: #555;
    }

    button {
        padding: 8px 16px;
        border-radius: 4px;
        background: linear-gradient(to right, rgba(180, 0, 0, 1), rgba(240, 0, 0, 1));
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background .3s;

        &:hover {
            background: linear-gradient(to right, rgba(230, 0, 0, 1), rgba(250, 0, 0, 1));
        }
    }
`;

export const ContainerCadastro = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        p {
            margin: 0;
            font-size: 18px;
            color: rgba(0,0,0,0.8);
            font-weight: 800;
        }

        input, select {
            width: 450px;
            height: 35px;
            box-sizing: border-box;
            padding-left: 20px;
            font-size: 16px;
            color: rgba(0,0,0,0.8);
            font-weight: 900;
        }
    }

    button {
        width: 450px;
        height: 35px;
        border: 0;
        box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.4);
        transition: .3s;
        cursor: pointer;
        background: linear-gradient(to right, rgba(0, 200, 0, 1), rgba(100, 255, 0, 1));
        color: white;
        font-size: 22px;
        font-weight: bold;

        &:hover {
            transform: scale(0.97);
        }
    }
`;

import React from "react";
import * as S from "./BlazeIframeStyle"
const URL_BLAZE = "https://blaze1.space/pt/games/double";

export default function BlazeIframe({ showIframe }) {

    if (!showIframe)
        return null;

    return (
        <S.BlazeIframeContainer>
            <iframe
                src={URL_BLAZE}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Exemplo de IFrame"
            ></iframe>
        </S.BlazeIframeContainer>
    )
}
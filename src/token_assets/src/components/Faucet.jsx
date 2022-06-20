import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {
    const [disabled, setDisabled] = useState(false);
    const [resultText, setResultText] = useState("Gimme gimme");
    async function handleClick() {
        setDisabled(true);
        const result = await token.payOut();
        setResultText(result);
    }

    return (
        <div className="blue window">
            <h2>
                <span role="img" aria-label="tap emoji">
                    🚰
                </span>
                Faucet
            </h2>
            <label>
                Get your free DAngela tokens here! Claim 10,000 DANG coins to
                your account.
            </label>
            <p className="trade-buttons">
                <button
                    id="btn-payout"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {resultText}
                </button>
            </p>
        </div>
    );
}

export default Faucet;

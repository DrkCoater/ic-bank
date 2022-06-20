import { Principal } from "@dfinity/principal";
import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Balance() {
    const [tokenInput, setTokenInput] = useState("");
    const [balance, setBalance] = useState("");
    const [symbol, setSymbol] = useState("");
    const [isHidden, setIsHidden] = useState(true);

    async function onGetBalance() {
        const principal = Principal.fromText(tokenInput);
        const balance = await token.balanceOf(principal);
        setBalance(balance.toLocaleString());
        setSymbol(await token.getSymbol());
        setIsHidden(false);
    }

    return (
        <div className="window white">
            <label>Check account token balance:</label>
            <p>
                <input
                    id="balance-principal-id"
                    type="text"
                    placeholder="Enter a Principal ID"
                    value={tokenInput}
                    onChange={(evt) => setTokenInput(evt.target.value)}
                />
            </p>
            <p className="trade-buttons">
                <button id="btn-request-balance" onClick={onGetBalance}>
                    Check Balance
                </button>
            </p>
            <p hidden={isHidden}>This account has a balance of {balance} {symbol}.</p>
        </div>
    );
}

export default Balance;

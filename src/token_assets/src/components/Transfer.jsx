import { Principal } from "@dfinity/principal";
import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Transfer() {
    const [transferTo, setTransferTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [transferDisabled, setTransferDisabled] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackHidden, setFeedbackHidden] = useState(true);

    async function handleClick() {
        setTransferDisabled(true);
        const result = await token.transfer(
            Principal.fromText(transferTo),
            amount
        );
        setFeedback(result);
        setFeedbackHidden(false);
        setTransferDisabled(false);
    }

    function onUpdateTransferTo(val) {
        setTransferTo(val);
    }

    function onUpdateAmount(val) {
        const v = Number(val ? val : 0);
        setAmount(v);
    }

    return (
        <div className="window white">
            <div className="transfer">
                <fieldset>
                    <legend>To Account:</legend>
                    <ul>
                        <li>
                            <input
                                type="text"
                                id="transfer-to-id"
                                onChange={(evt) =>
                                    onUpdateTransferTo(evt.target.value)
                                }
                                value={transferTo}
                            />
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Amount:</legend>
                    <ul>
                        <li>
                            <input
                                type="number"
                                id="amount"
                                onChange={(evt) =>
                                    onUpdateAmount(evt.target.value)
                                }
                                value={amount}
                            />
                        </li>
                    </ul>
                </fieldset>
                <p className="trade-buttons">
                    <button id="btn-transfer" onClick={handleClick} disabled={transferDisabled}>
                        Transfer
                    </button>
                </p>
                <p hidden={feedbackHidden}>{feedback}</p>
            </div>
        </div>
    );
}

export default Transfer;

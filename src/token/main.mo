import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor Bank {
  
    let owner = Principal.fromText("pnwo4-zhvmz-tgioy-lifxy-uwlnk-t7lar-ocrxk-brvdx-bndhz-zxyez-bae");
    let totalSupply = 1000000000;
    let symbol = "JEM";
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal): async Nat {
        let balance: Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public func getBalance(actorId: Text): async Nat {
        let principal = Principal.fromText(actorId);
        let balance = await balanceOf(principal);
        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func payOut(): async Text {
        Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            return await transfer(msg.caller, amount);
        } else {
            return "Already Claimed!";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
        // remember balanceOf is an 'asnyc' functionn
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance >= amount) {
            // subtract from 'from' account
            let newFromBalance: Nat = fromBalance - amount; 
            balances.put(msg.caller, newFromBalance);

            // add to 'to' account
            let toBalance: Nat = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success";
        } else {
            return "Insufficient Funds";
        }
    };

}

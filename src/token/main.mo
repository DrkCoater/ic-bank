// import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor Bank {
  
    let owner = Principal.fromText("pnwo4-zhvmz-tgioy-lifxy-uwlnk-t7lar-ocrxk-brvdx-bndhz-zxyez-bae");
    let totalSupply = 1000000000;
    let symbol = "ivhc";
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal): async Nat {
        let balance: Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };
}

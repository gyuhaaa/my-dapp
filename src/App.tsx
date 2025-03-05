import { useEffect, useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";
import ContractABI from "./ContractABI.json";
import { Contract } from "ethers";

export default function App() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const connectMetamask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const fetchTotalSupply = async () => {
    if (!contract) return;

    try {
      const res = await contract.totalSupply();

      setTotalSupply(Number(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!signer) return;

    setContract(
      new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        ContractABI,
        signer
      )
    );
    console.log(contract);
  }, [signer]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React & Vite + MetaMask 연결 예제</h1>
      {signer ? (
        <div>
          <p>
            Connected: {signer.address.substring(0, 7)}...
            {signer.address.substring(signer.address.length - 5)}
          </p>
          <button onClick={() => setSigner(null)}>Disconnect</button>
          {totalSupply && <p>총 공급량: {totalSupply}</p>}
          <button onClick={fetchTotalSupply}>토큰 총 공급량 조회</button>
        </div>
      ) : (
        <button onClick={connectMetamask}>Connect Metamask</button>
      )}
    </div>
  );
}

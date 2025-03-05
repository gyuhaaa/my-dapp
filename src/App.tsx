import { useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";

export default function App() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

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
        </div>
      ) : (
        <button onClick={connectMetamask}>Connect Metamask</button>
      )}
    </div>
  );
}

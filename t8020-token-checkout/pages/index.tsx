import { ThirdwebProvider, ConnectWallet, useTokenDrop, useClaimToken } from "@thirdweb-dev/react";
import { useState } from "react";

export default function Home() {
  const tokenAddress = "0xB12Cdb5C45fB0c05ad5dB85182015D414D28DDDc";
  const { contract } = useTokenDrop(tokenAddress);
  const { mutateAsync: claim, isLoading } = useClaimToken(contract);
  const [quantity, setQuantity] = useState(1);

  const handleClaim = async () => {
    try {
      await claim({ amount: quantity });
      alert("Tokens claimed successfully!");
    } catch (err) {
      alert("Transaction failed. Check wallet & MATIC balance.");
      console.error(err);
    }
  };

  return (
    <ThirdwebProvider activeChain="polygon">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Buy T8020 Token</h1>
        <ConnectWallet />
        <div className="mt-6">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            className="border p-2 rounded w-32 text-center"
          />
          <button
            onClick={handleClaim}
            className="ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Buy ${quantity} Token(s)`}
          </button>
        </div>
      </div>
    </ThirdwebProvider>
  );
}

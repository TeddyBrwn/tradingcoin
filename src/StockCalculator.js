import React, { useState, useEffect } from "react";
import "./StockCalculator.css";

const StockCalculator = () => {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [totalBuyValue, setTotalBuyValue] = useState(null);
  const [totalSellValue, setTotalSellValue] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [difference, setDifference] = useState(null);
  const [wallet, setWallet] = useState(1406);
  const [coinPrice, setCoinPrice] = useState(24850); // Assuming the coin price is in USDT
  const [vndValue, setVndValue] = useState(null);
  const feeRate = 0.001; // 0.1%

  useEffect(() => {
    calculateTotalBuyValue();
  }, [buyPrice, quantity]);

  useEffect(() => {
    calculateTotalSellValue();
  }, [sellPrice, quantity]);

  useEffect(() => {
    calculateProfitLoss();
  }, [currentPrice, quantity]);

  useEffect(() => {
    calculateDifference();
  }, [totalSellValue, totalBuyValue]);

  useEffect(() => {
    calculateVndValue();
  }, [wallet, coinPrice]);

  const calculateTotalBuyValue = () => {
    const buyValue =
      parseFloat(buyPrice) * parseFloat(quantity) * (1 - feeRate);
    const calculatedBuyValue = isNaN(buyValue) ? 0 : buyValue;
    setTotalBuyValue(calculatedBuyValue.toFixed(5));
  };

  const calculateTotalSellValue = () => {
    const sellValue =
      parseFloat(sellPrice) * parseFloat(quantity) * (1 - feeRate);
    const calculatedSellValue = isNaN(sellValue) ? 0 : sellValue;
    setTotalSellValue(calculatedSellValue.toFixed(5));
  };

  const calculateProfitLoss = () => {
    const parsedCurrentPrice = parseFloat(currentPrice);
    const parsedQuantity = parseFloat(quantity);

    if (isNaN(parsedCurrentPrice) || isNaN(parsedQuantity)) {
      // Handle invalid input
      setProfitLoss(0);
      setWallet(1406); // Reset wallet to initial value
      return;
    }

    const capitalAfterSale = parsedCurrentPrice * parsedQuantity;
    const profitLossValue = capitalAfterSale - 1406;
    const calculatedProfitLoss = isNaN(profitLossValue) ? 0 : profitLossValue;
    setProfitLoss(calculatedProfitLoss.toFixed(5));
    // Update wallet
    setWallet(1406 + calculatedProfitLoss);
  };

  const calculateDifference = () => {
    if (totalSellValue !== null && totalBuyValue !== null) {
      const differenceValue = totalSellValue - totalBuyValue;
      const calculatedDifference = isNaN(differenceValue) ? 0 : differenceValue;
      setDifference(calculatedDifference.toFixed(5));
    }
  };

  const calculateVndValue = () => {
    // Calculate value in VND based on wallet and coin price
    const vnd = wallet * coinPrice;
    setVndValue(vnd.toLocaleString());
  };

  const renderProfitLoss = () => {
    if (profitLoss > 0) {
      return <p className="profit">Profit: {profitLoss}</p>;
    } else if (profitLoss < 0) {
      return <p className="loss">Loss: {Math.abs(profitLoss)}</p>;
    } else {
      return <p>No Profit or Loss</p>;
    }
  };

  return (
    <div className="container">
      <div className="input-group">
        <label>
          Mua / Long:
          <input
            className="buy"
            type="number"
            step="0.001"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </label>

        <label>
          Bán / Short:
          <input
            className="sell"
            type="number"
            step="0.001"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
          />
        </label>
      </div>

      <label>
        Số Lượng:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      <label>
        Giá hiện tại:
        <input
          type="number"
          step="0.001"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
        />
      </label>

      <div>
        <p className="total-buy-value">Mua / Long: {totalBuyValue} USDT</p>
        <p className="total-sell-value">Bán / Short: {totalSellValue} USDT</p>
        {renderProfitLoss().USDT}
        <p className={`difference ${difference > 0 ? "green" : "red"}`}>
          Chênh lệch: {difference} USDT
        </p>
        <label>
          USDT to VND:
          <input
            type="number"
            value={coinPrice}
            onChange={(e) => setCoinPrice(e.target.value)}
          />
        </label>
        <p className={wallet >= 1406 ? "green" : "red"}>
          Wallet: {parseFloat(wallet).toFixed(3)} USDT
        </p>
        <p className={wallet >= 1406 ? "green" : "red"}>
          Wallet VND: {vndValue} VND
        </p>
      </div>
    </div>
  );
};

export default StockCalculator;

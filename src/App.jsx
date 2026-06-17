import { useState } from 'react';
import './index.css'; // Use index.css for all styling

function App() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateGst = () => {
    setError('');
    setResult(null);

    if (!amount || amount.trim() === '') {
      setError('Please enter an amount.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    const gstAmount = (numAmount * parseFloat(gstRate)) / 100;
    const totalAmount = numAmount + gstAmount;

    setResult({
      base: numAmount.toFixed(2),
      gst: gstAmount.toFixed(2),
      total: totalAmount.toFixed(2)
    });
  };

  const handleReset = () => {
    setAmount('');
    setGstRate('18');
    setResult(null);
    setError('');
  };

  return (
    <div className="app-container">
      <div className="calculator-card">
        <header className="card-header">
          <h1>GST Calculator</h1>
          <p>Quick and easy GST calculations</p>
        </header>
        
        <main className="card-body">
          <div className="input-group">
            <label htmlFor="amount">Base Amount (₹)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className={error ? 'input-error' : ''}
              min="0"
              step="any"
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="gstRate">GST Rate (%)</label>
            <select
              id="gstRate"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
            >
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={calculateGst}>
              Calculate
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          {result && (
            <div className="result-container" role="region" aria-label="Calculation Results">
              <div className="result-row">
                <span>Base Amount:</span>
                <span>₹{result.base}</span>
              </div>
              <div className="result-row">
                <span>GST ({gstRate}%):</span>
                <span>₹{result.gst}</span>
              </div>
              <div className="result-divider"></div>
              <div className="result-row total">
                <span>Total Amount:</span>
                <span>₹{result.total}</span>
              </div>
            </div>
          )}
        </main>

        <footer className="card-footer">
          <div className="developer-info">
            <p className="dev-name">Name: Shikshit Khandelwal</p>
            <p className="dev-email">Email: shikshitkhandelwal456@gmail.com</p>
          </div>
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-digital-heroes"
          >
            Built for Digital Heroes
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import './App.css'
import ScanbotSDK from "scanbot-web-sdk/ui";

/**
 * バーコードリーダーの実装方法 下記 URL 参照
 * https://scanbot.io/techblog/react-barcode-reader-tutorial/
 */

function App() {
  const [scanResult, setScanResult] = useState<string>("");

  useEffect(() => {
    async function init(): Promise<void> {
      await ScanbotSDK.initialize({
        licenseKey: "",
        enginePath: "/wasm/"
      });
    };
    init();
  },[]);

  async function startScanner(){
    const config = new ScanbotSDK.UI.Config.BarcodeScannerScreenConfiguration();
    const result = await ScanbotSDK.UI.createBarcodeScanner(config);

    if(result && result.items.length > 0){
      setScanResult(result.items[0].barcode.text);
    }

    return result;
  }

  return (
    <>
      <h1>Barcode Scanner</h1>
      <div className="card">
        <button onClick={startScanner}>
          Start Scanner
        </button>
        <div>
          {scanResult && <h2>{scanResult}</h2>}
        </div>
      </div>
    </>
  )
}

export default App
import { useEffect, useState } from "react";
import ScanbotSDK from "scanbot-web-sdk/ui";

const App = () => {
  const [scanResult, setScanResult] = useState<string>("");
  
  useEffect(() => {
    const init = async () => {
      await ScanbotSDK.initialize({
        licenseKey: "",
        enginePath: "/wasm/"
      });
    };

    init();
  }, []);
  
  const startScanner = async () => {
    const config = new ScanbotSDK.UI.Config.BarcodeScannerScreenConfiguration();
          
    const result = await ScanbotSDK.UI.createBarcodeScanner(config);
        
    if (result && result.items.length > 0) {
      setScanResult(result.items[0].barcode.text);
    }
    
    return result;
  }

  return (
    <div>
      <h1>Barcode Reader</h1>
      <button onClick={startScanner}>Start Scanner</button>
      {scanResult && <div>{scanResult}</div>}
    </div>
  );
};

export default App;
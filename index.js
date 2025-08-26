// index.js
// Wrapper for DYMO Label Framework (browser SDK)

import "./dymo.label.framework.js";

// The DYMO framework attaches itself to the global `dymo` object.
// We wrap it so it can be imported cleanly as an ESM module.

if (typeof window !== "undefined" && window.dymo && window.dymo.label && window.dymo.label.framework) {
  const dymoFramework = window.dymo.label.framework;

  export const getPrinters = () => dymoFramework.getPrinters();
  export const openLabelXml = (xmlString) => dymoFramework.openLabelXml(xmlString);
  export const printLabel = (printerName, labelXml, params = null) => dymoFramework.printLabel(printerName, labelXml, params);

  // Export the whole framework in case advanced functions are needed
  export default dymoFramework;
} else {
  throw new Error("DYMO framework not loaded correctly.");
}

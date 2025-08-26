// index.js
// Wrapper for DYMO Label Framework (browser SDK)

import "./dymo.label.framework.js";

if (!window.dymo || !window.dymo.label || !window.dymo.label.framework) {
  throw new Error("DYMO framework not loaded.");
}

const framework = window.dymo.label.framework;

let selectedPrinter = null;

/**
 * Initialize DYMO printers and select the first connected one.
 */
export function initPrinter() {
  const printers = framework.getPrinters();
  if (!printers || printers.length === 0) {
    throw new Error("No DYMO printers installed.");
  }

  for (const p of printers) {
    if (p.printerType === "LabelWriterPrinter" && p.isConnected) {
      selectedPrinter = p.name;
      return p;
    }
  }
  throw new Error("No connected DYMO LabelWriter printers found.");
}

/**
 * Get all printers.
 */
export function getPrinters() {
  return framework.getPrinters();
}

/**
 * Load label XML from a URL.
 */
export async function loadLabelXmlFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch label XML: ${url}`);
  const xml = await res.text();
  return xml;
}

/**
 * Replace placeholders (e.g. {{name}}, {{date}}) in label XML.
 */
export function fillLabelTemplate(xml, replacements) {
  let output = xml;
  for (const [key, value] of Object.entries(replacements)) {
    output = output.replaceAll(`{{${key}}}`, value);
  }
  return output;
}

/**
 * Open XML into a DYMO label object.
 */
export function openLabel(xml) {
  return framework.openLabelXml(xml);
}

/**
 * Render a label preview as a base64 PNG.
 */
export function renderPreview(label) {
  try {
    const png = label.render();
    return "data:image/png;base64," + png;
  } catch (e) {
    console.error("Preview error:", e);
    return null;
  }
}

/**
 * Print label XML on a given or selected printer.
 */
export function printLabel(xml, printerName = selectedPrinter) {
  if (!printerName) throw new Error("No printer selected.");
  return framework.printLabel(printerName, xml, null);
}

/**
 * Convenience: load, fill, and print in one call.
 */
export function printWithData(printerName, xmlTemplate, replacements) {
  const filled = fillLabelTemplate(xmlTemplate, replacements);
  return printLabel(filled, printerName);
}

// Export the raw framework for advanced usage
export default framework;

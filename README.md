# dymo-printer-framework

Lightweight JavaScript framework for DYMO label printing.

## Installation
You can install directly from GitHub:

```bash
npm install github:kip-dev-design/dymo-printer-framework#v1.0.0
```
✅ Example Usage

### Import (ESM)
```js
import {
  initPrinter,
  getPrinters,
  loadLabelXmlFromUrl,
  fillLabelTemplate,
  openLabel,
  renderPreview,
  printLabel,
  printWithData
} from "dymo-printer-framework";
```

🔹 High-Level Helper API (Recommended)
These are general functions for loading label XML templates, filling in placeholders, and printing.
```js
async function demo() {
  // Initialize and select first connected DYMO printer
  const printer = initPrinter();
  console.log("Using printer:", printer.name);

  // Load label template from URL
  const xmlTemplate = await loadLabelXmlFromUrl(
    "https://raw.githubusercontent.com/kip-dev-design/dymo-printer-framework/main/labels/sample-template.xml"
  );

  // Fill placeholders {{name}}, {{date}}, {{id}} in the template
  const filledXml = fillLabelTemplate(xmlTemplate, {
    name: "John Doe",
    date: new Date().toLocaleString(),
    id: "12345"
  });

  // Open as DYMO label object
  const label = openLabel(filledXml);

  // Render a PNG preview (base64)
  const previewDataUrl = renderPreview(label);
  console.log("Preview:", previewDataUrl);

  // Print the label
  printLabel(filledXml);

  // Or one-liner
  await printWithData(printer.name, xmlTemplate, {
    name: "Jane Smith",
    date: "2025-08-26",
    id: "67890"
  });
}

```
🔹 Low-Level API (Direct DYMO SDK)
You can also use the raw DYMO framework for advanced features:
```js
import dymoFramework, { getPrinters, printLabel } from "dymo-printer-framework";

// List printers
const printers = getPrinters();
console.log(printers);

// Print directly with raw framework
printLabel("<labelXmlHere>", "DYMO LabelWriter 450");
```

API Reference
initPrinter() → Initializes DYMO and selects the first connected LabelWriter printer. Returns the printer object.

getPrinters() → Returns an array of installed printers.

loadLabelXmlFromUrl(url) → Fetches a label XML template from a remote URL.

fillLabelTemplate(xml, replacements) → Replaces placeholders ({{key}}) with provided values.

openLabel(xml) → Converts label XML into a DYMO label object.

renderPreview(label) → Renders a label object as a Base64 PNG data URL.

printLabel(xml, printerName?) → Prints a filled label XML to the given (or selected) printer.

printWithData(printerName, xmlTemplate, replacements) → One-liner: load + fill + print.

Example Template XML
A DYMO Address label (30252) with placeholders:
```xml
<DieCutLabel Version="8.0" Units="twips">
  <PaperOrientation>Landscape</PaperOrientation>
  <Id>Address</Id>
  <PaperName>30252 Address</PaperName>
  <Objects>
    <TextObject>
      <Name>TEXT</Name>
      <Text>{{name}}</Text>
      <Font Family="Arial" Size="10" Bold="True" />
    </TextObject>
    <TextObject>
      <Name>Date</Name>
      <Text>{{date}}</Text>
      <Font Family="Arial" Size="8" />
    </TextObject>
  </Objects>
</DieCutLabel>

```

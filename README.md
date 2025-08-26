# dymo-printer-framework

Lightweight JavaScript framework for DYMO label printing.

## Installation
You can install directly from GitHub:

```bash
npm install github:kip-dev-design/dymo-printer-framework#v1.0.0
```
### Usage (ESM)
```js
import { getPrinters, openLabelXml, printLabel } from "dymo-printer-framework";

// List available printers
const printers = getPrinters();
console.log("Available printers:", printers);

// Load label XML
const labelXml = `
<DieCutLabel Version="8.0" Units="twips">
  <PaperOrientation>Landscape</PaperOrientation>
  <Id>Address</Id>
  <PaperName>30252 Address</PaperName>
  <Objects>
    <TextObject>
      <Name>TEXT</Name>
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
      <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
      <LinkedObjectName></LinkedObjectName>
      <Rotation>Rotation0</Rotation>
      <IsMirrored>False</IsMirrored>
      <IsVariable>True</IsVariable>
      <Text>Hello World</Text>
      <Font Family="Arial" Size="10" Bold="True" Italic="False" Underline="False" Strikeout="False" />
    </TextObject>
  </Objects>
</DieCutLabel>
`;

// Open the label
const label = openLabelXml(labelXml);

// Print it (replace with your actual printer name)
printLabel("DYMO LabelWriter 450", labelXml);
```

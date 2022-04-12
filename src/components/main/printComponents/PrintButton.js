import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const PrintButton = ({id, label, updateTrack}) => (<div className="tc mb4 mt2">
  <div id="myMm" style={{height: "1mm"}} />
  <div
    className="pa2 bw1 b--black bg-blue white-90 br2 dib pointer"
    style={{background: "#1890ff"}}
    onClick={() => {
      updateTrack()
      const input = document.getElementById(id);
      const a4WidthMm = 861;
      const a4HeightMm = 526;
        

        html2canvas(input, {scale: 1}).then(canvas => {
          const imgData = canvas.toDataURL("image/png");
          var pdf = null;
          // Document of a4WidthMm wide and inputHeightMm high
          
          pdf = new jsPDF("p", "px", [a4WidthMm,a4HeightMm]);
          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save(`certificate.pdf`);
        });
      }}
  >
    {label}
  </div>
</div>);

export default PrintButton;
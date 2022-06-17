import React from 'react';

const PdfToText = () => {

    const uploadPdf = async() => {
        const formData = new FormData();
        const pdfData = document.getElementById('inpFile');
        const resultText = document.getElementById('resultText');
        // await console.log(pdfData.files[0]);
        await formData.append("pdfFile", pdfData.files[0])
        await console.log(formData)

        fetch("https://mongo-cv-api.herokuapp.com/extract-text", {
            method : 'POST',
            body: formData
        }).then(response => {
            return response.text();
        }).then(extractedText => {
            resultText.value = extractedText;
        })
    }
 
    return (
        <div>
            <h1 className="text-center ">PDF To Text</h1>
            <input className="form-control" type="file" id="inpFile" accept="application/pdf">
            </input>
            <input className="form-control-btn mt-3 mb-3" type="button" id="btnUpload" value="Convert" onClick={uploadPdf}>
        
            </input>
            <br>
            </br>
            <textarea className="pdf-result" id="resultText" placeholder="Your text appear here..."></textarea>
        </div>
    );
};

export default PdfToText;
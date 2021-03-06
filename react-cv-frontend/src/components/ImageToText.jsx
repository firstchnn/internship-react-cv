import React from 'react';
import Tesseract from 'tesseract.js';


const ImageToText = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [isFiled, setIsFiled] = React.useState(false);

  const handleSubmit = () => {
    if(image != ''){
      setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
    }else{
      alert("please insert file");
    }
  };

  return (
    <div>
        <div className="justify-content-center">
          {true && (
            <h1 className="text-center ">Image To Text</h1>
          )}
          {true && true && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
                disabled={isLoading}
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="form-control-btn mt-3 mb-3"
                disabled={isLoading}
                value="Convert"
              />
            </>
          )}
          {isLoading && (
            <>
              <div className="mt-4">
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
              </div>
            </>
          )}
          {!isLoading && text && (
            <>
              <textarea
                className="pdf-result"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </>
          )}
        </div>
    </div>
  );
};

export default ImageToText;

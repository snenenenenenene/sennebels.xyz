import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Loader from '../../Components/Loader';
import breeds from "../../public/Data/mapping.json";
import Navbar from "../../Components/Navbar"
import Container from "../../Components/Container";
const PetPrediction = () => {
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [imgData, setImgData] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [predictionFinished, setPredictionFinished] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isEmptyPredictions = !predictions || predictions.length === 0;

  const openFilePicker = () => {
    setPredictions({})
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const detectObjectsOnImage = async (imageElement, imgSize) => {
    const model = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/snenenenenenene/pet-prediction/main/models/tfjs/model.json"
    );

    const tensor = tf.browser
    .fromPixels(imageRef.current)
    .div(255)
    .resizeNearestNeighbor([256, 256])
    .expandDims(0)
    .toFloat();

    console.log(model.getWeights()[123])

    let result = await model.predict(tensor).data();
    console.log(result)
    result.map((entry, i) => {
      setPredictions(
        (predictions[
          parseFloat(entry * 100)
            .toFixed(2)
            .replace(/\.?0+$/, "")
        ] = breeds[i])
      );
    });
    setPredictions(
      Object.fromEntries(
        Object.entries(predictions).sort().reverse().slice(0, 3)
      )
    );
    console.log(predictions)

    setPredictionFinished(true);
  };

  const readImage = (file) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e) => {
    setLoading(true);

    const file = e.target.files[0];
    const imgData = await readImage(file);
    setImgData(imgData);

    const imageElement = document.createElement("img");
    imageElement.src = imgData;

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };
      await detectObjectsOnImage(imageElement, imgSize);
      setLoading(false);
    };
  };

  const showPredictions = () => {
    if (predictionFinished === true) {
      return (
        <div className="w-3/4 mx-auto">
          <div className="bg-black sm-text-sm truncate text-white text-center py-6 px-20">
            PREDICTIONS (%)
          </div>
          {Object.keys(predictions).map((keys, index) => {
            if (predictions[keys] < 50)
            {
              return (
              <div key={index} className="prediction-box">

            </div>
            )
            }
            return (
              <div key={index} className="sm:text-xs border-solid border border-gray-200 rounded p-4 text-center">
                <span><p className="text-xs uppercase truncate font-bold">{predictions[keys]}</p><p className="text-sm font-extralight">{keys}</p></span>
              </div>
            );
          })}
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <main>
      <Navbar/>
      <Container className=" w-screen">
      <div className="mt-12 flex justify-around align-middle">
        <div className="w-1/3">
        {showPredictions()}
        </div>
        <div className="w-1/3 flex flex-col justify-center align-middle">
        <div className=" max-h-[700px] mx-auto">
          {imgData && (
            <img className="object-cover rounded-lg shadow-xl w-96 h-96" src={imgData} ref={imageRef} />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onSelectImage}
          className="hidden-input mx-auto"
        />
        <button onClick={openFilePicker}>
          {isLoading ? "Recognising..." : "Select Image"}
        </button>
        </div>
        <div className="w-1/3">
        {isLoading ? <Loader/> : <div/>}
        </div>
      </div>
      </Container>

    </main>
  );
};

export default PetPrediction;

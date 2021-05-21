import React from 'react';
import FlashCard from '../FlashCard/FlashCard';
import step2_1 from '../../assets/imgs/step2_1.png';
import step2_2 from '../../assets/imgs/step2_2.png';

const Algorithm = () => {
    const dataSource = [
        {
          front: {
            text: "A. Tracking Area",
          },
          back: {
            text: "1. Labelling dataset. ",
            text1: "2. Training dataset with yolotiny v3 library. ",
            text2: "3. Cropping area covering plate numbers. ",
          }
        },
        {
          front: {
            text: "B. Seperating Letters",
          },
          back: {
            text: "1. Converting color from BGR to HSV. ",
            text1: "2. Justifying selected area using adaptive threshold. ",
            text2: "3. Using Connected Component Analysis algorithm to split letters. ",
          }
        },
        {
          front: {
            text: "C. Classifying Letters",
          },
          back: {
            text: "1. Covering letters or possible noise with contour. ",
            text1: "2. Creating input for CNN Network by resizing image in (28,28,1) form using aspect ratio, solidity, height ratio. ",
            text2: "3. From 32 classes to be categorized, inserting images into model with various filtering, then classifying letters with a flattern layer and softmax activation from dense. ",
          }
        }
  
      ];

    return(
        <div className="card_page shadow">
            <div className="card_header"> <b>Algorithm</b> 
            </div>
            <FlashCard
                          dataSource={dataSource}
                          voice={"en-EN"}
                          isDisplaySound={true}
                          flipDirection="vertical" 
                          onChange={(step, side) => console.log(step, side)} 
                          onSound={(text) => console.log(text)} 
                          onFinish={() => console.log("Finish!")}
                          backgroundColor={""}
                          barColor={"rgba(255, 255, 255, 0.527)"}
                          cardColor={"rgba(255, 255, 255, 0.527)"}
                          textColor={"black"}
                          dropShadow={true}
                          height={350}
                          width={"100%"}
            />;
        </div>
    );
}
export default Algorithm;
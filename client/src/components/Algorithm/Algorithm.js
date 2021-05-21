import React from 'react';
import FlashCard from '../FlashCard/FlashCard';
import step2_1 from '../../assets/imgs/step2_1.png';
import step2_2 from '../../assets/imgs/step2_2.png';

const Algorithm = () => {
    const dataSource = [
        {
          front: {
            text: "Step 2_1",
            image: step2_1,
          },
          back: {
            text: "Processing Image",
          }
        },
        {
          front: {
            text: "Step 2_2",
            image: step2_2,
          },
          back: {
            text: "Decolor",
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
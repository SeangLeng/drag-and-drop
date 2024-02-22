import React, { useState } from 'react';
import './App.css';
import CanvasComponent from './Retangles';

interface listItem {
  data_url: string
}

export default function App() {
  const [dataDroped, setData] = useState<listItem[]>([]);
  const drop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if (dataDroped.length < 1) {
      setData((prevData: any) => [...prevData, { data_url: data }]);
    }
  }

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const drag = (event: React.DragEvent<HTMLImageElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
  }

  return (
    <React.Fragment>
      <div>
        {/* <h2>Drag and Drop</h2>
        <div id='dev-1' onDrop={drop} onDragOver={allowDrop}>
          <img
            draggable={true}
            onDragStart={drag}
            src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
            alt='images'
          />
        </div>
        <div id='dev-2' onDrop={drop} onDragOver={allowDrop}>
          {
            dataDroped?.map((item, index) => (
              <img draggable={true}
                onDragStart={drag} src={item.data_url} alt='images' key={index} />
            ))
          }
        </div> */}
        <CanvasComponent />
      </div>
    </React.Fragment>
  )
}

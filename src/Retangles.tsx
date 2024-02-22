import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';

const CanvasComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [rectangles, setRectangles] = useState<fabric.Object[]>([]);

    useEffect(() => {
        const newCanvas = new fabric.Canvas('my-canvas', {
            width: 1000,
            height: 1000
        });
        setCanvas(newCanvas);
        return () => {
            newCanvas.dispose(); // clear - rect in canvas
        };
    }, []);

    const addRectangle = (text: string) => {
        if (!canvas) return;
        const rect = new fabric.Textbox(text, {
            left: 100,
            top: 100,
            fill: 'darkblue',
            width: 500,
            height: 100,
            selectable: true,
            hasControls: true
        });
        canvas.add(rect);
        setRectangles(prevRectangles => [...prevRectangles, rect]);
    };

    console.log(rectangles);
    

    return (
        <div>
            <canvas id='my-canvas'></canvas>
            <button style={{ position: 'fixed', top: 0 }} onClick={() => addRectangle('new text')}>
                Add Rectangle
            </button>
        </div>
    );
};

export default CanvasComponent;

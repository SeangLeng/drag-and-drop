import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';

const CanvasComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [rectangles, setRectangles] = useState<fabric.Object[]>([]);
    const [dragOver, setDragOver] = React.useState(false);

    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');

        if (id === 'd1') {
            const dropX = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const dropY = event.clientY - event.currentTarget.getBoundingClientRect().top;

            if (canvas) {
                const rect = new fabric.Rect({
                    left: dropX,
                    top: dropY,
                    fill: 'red',
                    width: 100,
                    height: 50,
                    selectable: true,
                });
                canvas.add(rect);
                setRectangles(prevRectangles => [...prevRectangles, rect]);
            }
        } else if (id === 'd2') {
            const dropX = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const dropY = event.clientY - event.currentTarget.getBoundingClientRect().top;

            if (canvas) {
                const textBox = new fabric.Textbox('New Textbox', {
                    left: dropX,
                    top: dropY,
                    fill: 'darkblue',
                    width: 300,
                    height: 100,
                    selectable: true,
                    hasControls: true,
                    textAlign: 'center',
                    fontSize: 16
                });
                canvas.add(textBox);
                setRectangles(prevRectangles => [...prevRectangles, textBox]);
            }
        }
        setDragOver(false);
    }

    useEffect(() => {
        const newCanvas = new fabric.Canvas('my-canvas', {
            width: 1000,
            height: 1000
        });
        setCanvas(newCanvas);
        return () => {
            newCanvas.dispose();
        };
    }, []);

    const saveButton = () => {
        console.log(rectangles);
    }

    return (
        <div>
            <div style={{ padding: '3rem' }}>
                <div id="d1" draggable="true" onDragStart={handleDragStart}>Retangle</div>
                <div id="d2" draggable="true" onDragStart={handleDragStart}>
                    Add text-box
                </div>
            </div>
            <div style={{ position: 'relative' }}>
                <button onClick={saveButton}>Save</button>

            </div>
            <div
                onDragOver={enableDropping}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
                style={dragOver ? { fontWeight: 'bold', background: 'green', color: 'white' } : {}}
            >
                <canvas id='my-canvas'></canvas>
            </div>
        </div>
    );
};

export default CanvasComponent;

import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './App.css'

import './utils/customizeFabric';
import PdfViewer from './components/react-pdf';

const CanvasComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [rectangles, setRectangles] = useState<fabric.Object[]>([]);
    const [dragOver, setDragOver] = React.useState(false);
    const [originalPosition, setOriginalPosition] = useState<{ left: number; top: number } | null>(null);

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

        if (id === 'd1' || id === 'd2') {
            const dropX = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const dropY = event.clientY - event.currentTarget.getBoundingClientRect().top;

            if (canvas) {
                let newObject: any;
                if (id === 'd1') {
                    newObject = new fabric.Rect({
                        left: dropX,
                        top: dropY,
                        fill: 'red',
                        width: 100,
                        height: 50,
                        cornerSize: 10,
                        selectable: true,
                        transparentCorners: false,
                    });
                } else {
                    newObject = new fabric.Textbox('New Textbox', {
                        left: dropX,
                        top: dropY,
                        fill: 'darkblue',
                        width: 100,
                        height: 100,
                        selectable: true,
                        hasControls: true,
                        textAlign: 'center',
                        fontSize: 16,
                        cornerSize: 10,
                    });
                }

                newObject.on('moving', () => {
                    setOriginalPosition((prev: any) => ({
                        ...prev,
                        left: newObject.left,
                        top: newObject.top
                    }));
                    canvas.renderAll();
                });

                canvas.add(newObject);
                setRectangles(prevRectangles => [...prevRectangles, newObject]);
            }
        }
        setDragOver(false);
    }

    useEffect(() => {
        const newCanvas = new fabric.Canvas('my-canvas', {
            width: 1000,
            height: 500
        });
        setCanvas(newCanvas);

        const savedDraft = localStorage.getItem('canvasDraft');
        if (savedDraft && canvas) {
            canvas.loadFromJSON(savedDraft, () => {
                canvas.renderAll();
            });
        }

        return () => {
            newCanvas.dispose();
        };
    }, []);


    const saveButton = () => {
        console.log(rectangles);
    }

    // work
    const saveDraft = () => {
        if (canvas) {
            const json = JSON.stringify(canvas.toJSON());
            localStorage.setItem('canvasDraft', json);
            console.log('Draft saved.');
        }
    };

    const loadDraft = () => {
        const savedDraft = localStorage.getItem('canvasDraft');
        if (savedDraft && canvas) {
            canvas.loadFromJSON(savedDraft, () => {
                canvas.renderAll();
                console.log('Draft loaded.');
            });
        } else {
            console.log('No draft found.');
        }
    };

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            return;
        } else {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target?.result as string;
                localStorage.setItem('file', fileContent);
            };
            reader.readAsDataURL(file);
        }
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
                <button onClick={saveDraft}>save draft</button>
                <button onClick={loadDraft}>Load Draft</button>
            </div>
            <div
                className='canvas'
                onDragOver={enableDropping}
                onDrop={handleDrop}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
                style={dragOver ? { fontWeight: 'bold', background: 'green', color: 'white' } : {}}
            >                                                                                                                    
                <canvas id='my-canvas' style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}></canvas>
                <PdfViewer />
            </div>
        </div>
    );
};

export default CanvasComponent;

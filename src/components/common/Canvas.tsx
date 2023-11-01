import {Stage, Layer, Rect, Line} from 'react-konva';
import React, {useRef, useState} from "react";
import {IRectangle} from "../../models/IRectangle";
import Konva from "konva";
import Vector2d = Konva.Vector2d;

interface CanvasProps {
    selectedMaterial: Array<string>
}

function Canvas({selectedMaterial}: CanvasProps) {
    const isDrawing = useRef(false)
    const pos = useRef<Vector2d>({x: 0, y: 0})
    const [walls, setWalls] = useState<IRectangle[]>([])
    const [currentWall, setCurrentWall] = useState<IRectangle>()
    const [width, height] = [1200, 800]
    let gridLayer = new Konva.Layer()
    const handleMouseDown = (e: any) => {
        isDrawing.current = true;
        pos.current = e.target.getStage().getPointerPosition();
        setCurrentWall({x: pos.current.x, y: pos.current.y, width: 0, height: 0, fill: selectedMaterial[1], key: "-1"})
    }

    const handleMouseMove = (e: any) => {
        if (isDrawing.current) {
            const {x, y} = e.target.getStage().getPointerPosition();
            const wallX = pos.current.x
            const wallY = pos.current.y
            setCurrentWall({
                x: wallX,
                y: wallY,
                width: Math.abs(wallY - y) < Math.abs(wallX - x) ? x - wallX : 20,
                height: Math.abs(wallY - y) > Math.abs(wallX - x) ? y - wallY : 20,
                fill: selectedMaterial[1],
                key: (walls.length + 1).toString()
            })
        }
    }
    const handleMouseUp = () => {
        if (currentWall) {
            setWalls([...walls, currentWall])
        }
        isDrawing.current = false
    }

    const wallsToDraw = [...walls]
    if (currentWall) {
        wallsToDraw.push(currentWall)
    }

    const drawGrid = () => {

    }

    return (<Stage width={width} height={height} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                   onMouseMove={handleMouseMove}>
        <Layer>
            {wallsToDraw.map(value => {
                return <Rect x={value.x}
                             y={value.y}
                             width={value.width}
                             height={value.height}
                             fill={value.fill}
                             key={value.key}/>
            })}
        </Layer>
        <Layer>

        </Layer>
    </Stage>)
}

export default Canvas;
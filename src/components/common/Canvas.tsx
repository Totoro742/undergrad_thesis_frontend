import {Stage, Layer, Rect, Line, Circle} from 'react-konva';
import React, {ReactElement, useRef, useState} from "react";
import {IRectangle} from "../../models/IRectangle";
import Konva from "konva";
import Vector2d = Konva.Vector2d;
import {Button} from "@mui/material";
import axios, {AxiosRequestConfig} from "axios";
import {IMaterial} from "../../models/IMaterials";
import {createRoot} from "react-dom/client";
import {Image as KonvaImage} from 'react-konva';
interface CanvasProps {
    selectedMaterial: IMaterial | null
}

function Canvas({selectedMaterial}: CanvasProps) {
    const isDrawing = useRef(false)
    const pos = useRef<Vector2d>({x: 0, y: 0})
    const [walls, setWalls] = useState<IRectangle[]>([])
    const [routers, setRouters] = useState<Konva.Circle[]>([])
    const [currentWall, setCurrentWall] = useState<IRectangle>()
    const [heatmap, setHeatmap] = useState<ReactElement | null>(null);
    const [width, height] = [1600, 800]
    const step = 5

    const handleMouseDown = (e: any) => {
        if (selectedMaterial?.name === 'router') {
            console.log(routers)
            setRouters([...routers, new Konva.Circle({
                radius: 10,
                x: e.target.getStage().getPointerPosition().x,
                y: e.target.getStage().getPointerPosition().y,
                fill: selectedMaterial.color
            })])
        }
        isDrawing.current = true;
        const {x, y} = e.target.getStage().getPointerPosition();
        pos.current = {
            x: x - x % (step * 5),
            y: y - y % (step * 5)
        };

        setCurrentWall({
            x: pos.current.x,
            y: pos.current.y,
            x2: pos.current.x,
            y2: pos.current.y,
            material: selectedMaterial === null ? {id: -1, name: '', color: ''} : selectedMaterial,
            key: (walls.length + 1).toString()
        })
    }

    const handleMouseMove = (e: any) => {
        if (selectedMaterial?.name === 'router') {
            return
        }
        if (isDrawing.current) {

            let {x, y} = e.target.getStage().getPointerPosition();
            x = x - x % (step * 5);
            y = y - y % (step * 5);

            const wallX = pos.current.x
            const wallY = pos.current.y

            setCurrentWall({
                x: wallX,
                y: wallY,
                x2: x,
                y2: y,
                material: selectedMaterial === null ? {id: -1, name: '', color: ''} : selectedMaterial,
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

    const gridLines = () => {

        const lines = new Array<Konva.Line>()
        for (let i = 0; i < width; i += step) {
            lines.push(new Konva.Line({
                x: i * step,
                points: [0, 0, 0, height],
                stroke: 'rgba(0,0,0,0.2)',
                strokeWidth: 1
            }))
        }

        for (let i = 0; i < height; i += step) {
            lines.push(new Konva.Line({
                y: i * step,
                points: [0, 0, width, 0],
                stroke: 'rgba(0,0,0,0.2)',
                strokeWidth: 1
            }))
        }
        return lines
    }

    const handleCalculate = () => {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Response-Type': 'image/png'
            }
        }
        const data = {
            walls: walls,
            routers: routers,
            canvas: {
                width: width,
                height: height
            }
        }
        axios.post('http://127.0.0.1:5000', data, config).then(res => {
            const data = res.data
            const image_data = 'data:image/png;charset=utf-8;base64,' + data
            const imageObj = new Image();
            imageObj.src = image_data

            const newHeatmap = <KonvaImage x={0} y={0} image={imageObj} width={width} height={height} />;

            setHeatmap(newHeatmap);

        }).catch(e => {
            console.log(e)
        })
    }

    return (<><Stage width={width} height={height} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}>
        <Layer id={'image'}>
            {heatmap}
        </Layer>
        <Layer id={'grid'}>
            {gridLines().map(line => {
                return <Line x={line.x()}
                             y={line.y()}
                             points={line.points()}
                             stroke={line.stroke()}
                             strokeWidth={line.strokeWidth()}/>
            })
            }
        </Layer>
        <Layer id = {'walls'}>
            {wallsToDraw.map(value => {
                return <Rect x={value.x}
                             y={value.y}
                             width={value.x2 - value.x}
                             height={value.y2 - value.y}
                             fill={value.material.color}
                             key={value.key}/>
            })}
        </Layer>
        <Layer id={'routers'}>
            {routers.map(value => {
                    return <Circle x={value.x()}
                                   y={value.y()}
                                   radius={value.radius()}
                                   fill={value.fill()}
                    />
                }
            )}
        </Layer>
    </Stage>
        <div id={'image'}/>
        <Button variant="contained" onClick={handleCalculate}>Calculate</Button>
    </>)
}

export default Canvas;
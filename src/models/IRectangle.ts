import {IMaterial} from "./IMaterials";

export interface IRectangle {
    x: number,
    y: number,
    x2: number,
    y2: number,
    material: IMaterial,
    key: string
}
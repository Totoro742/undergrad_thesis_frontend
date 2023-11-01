import {IMaterial} from "../../models/IMaterials";

interface MaterialsListProps {
    selectedMaterial: Array<string>,
    setSelectedMaterial: any
}

function MaterialsList(props: MaterialsListProps) {

    //TODO: get materials from database (users can save their own material)
    const materialsList: Array<IMaterial> = [
        {
            id: 0,
            name: "brick",
            color: "orange"
        },
        {
            id: 1,
            name: "concrete",
            color: "grey"
        },
        {
            id: 2,
            name: "wood",
            color: "brown"
        }]

    return (
        <div className="MaterialsList">
            <select value={props.selectedMaterial} onChange={e => props.setSelectedMaterial(e.target.value.split(","))}>
                {materialsList.map((material) => <option key={material.id.toString()}
                                                         value={[material.name, material.color]}>{material.name}</option>)}
            </select>
        </div>
    )

}

export default MaterialsList;
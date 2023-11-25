import {IMaterial} from "../../models/IMaterials";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

interface MaterialsListProps {
    selectedMaterial: IMaterial | null,
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
        },
        {
            id: 3,
            name: "router",
            color: "red"
        }]

    const onMaterialChange = (e: any) => {
        console.log(e.target.value)
        props.setSelectedMaterial(materialsList.find(material => material.name === e.target.value))
        console.log(props.selectedMaterial?.name)
    }

    return (
        <div className="MaterialsList">
            <Box sx={{maxWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Material</InputLabel>
                    <Select labelId="material-id" label={"Material"}
                            onChange={onMaterialChange}>
                        {materialsList.map((material) => <MenuItem key={material.id}
                                                                   value={material.name}>{material.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )

}

export default MaterialsList;
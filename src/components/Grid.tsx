interface GridCardProps {
    name: string
}

export function GridCard ({name} : GridCardProps) {
    return (
        <div className="flex-center border-r-[1px] border-b-[1px] border-dotted">
            <span>{name}</span>
        </div>
    )
}

export default function Grid () {
    return (
        <div className="h-full grid grid-cols-2 grid-rows-5">
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Flat Bench Press"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
            <GridCard name="Dumbell Bicep Curl"/>
        </div>
    )
}
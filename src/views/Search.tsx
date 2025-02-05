import { SearchIcon } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { fetchAllExercises } from "../firebase/db";
import { ExerciseType } from "../utils/types/exercise";
import Skeleton from "react-loading-skeleton";

export function SearchItemSkeleton () {
    return (
        <Skeleton height={"100%"} className="py-4 !rounded-none"/>
    )
}

export function SearchItem ({data} : {data: ExerciseType}) {
    return (
        <div className="p-4 border-b-[1px] last:border-0">
            <h3 className="text-lg">{data.name}</h3>
            <div>
                {
                    data.musclesTargeted.map((item, index) => <span key={index} className="text-sm text-gray-600 after:content-[','] after:pr-1 last:after:content-none">{item.muscle.name}</span>)
                }
            </div>
        </div>
    )
}

export default function Search () {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ExerciseType[]>([]);
    const [filtered, setFiltered] = useState<ExerciseType[]>([]);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchExercises = async () => {
            const res = await fetchAllExercises();
            setData(res);
            setFiltered(res);
            setLoading(false);
        }

        fetchExercises();
    }, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        const filtered = data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFiltered(filtered);
    }

    return (
        <div>
            <div className="flex items-center w-full gap-x-3 px-4 border-b-[1px]">
                <SearchIcon className="w-4 h-4 text-gray-500"/>
                <input type="text" placeholder="Search by exercises..." className="py-4 w-full outline-none text-lg" value={searchText} onChange={handleSearchChange}/>
            </div>
            <div>
                {
                    loading &&
                    Array.from({length: 15}).map((_, index) => <SearchItemSkeleton key={index}/>)
                }
                {
                    !loading &&
                    filtered.map((item, index) => {
                        return <SearchItem key={index} data={item}/>
                    })
                }
            </div>
        </div>
    )
}
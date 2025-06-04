import { useEffect, useState } from "react";
import { PlusIcon } from "../../icons";
import api from "../../services/api";
import CardConvite from "../../components/form/CardConvite";
import Button from "../../components/ui/button/Button";

const Convites = () => {

    const [ invites, setInvites ] = useState([]);

    const fetchInvites = async () => {
        try{
            const { data } = await api.get('convitin/v1/convites');
            setInvites(data);
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchInvites()
    }, [])


    return (
        <div className=" gap-4">
            <div className="flex items-center gap-3">
                <h2>Covites</h2>
                <Button size="sm" className="bg-pink"><PlusIcon /> Novo convite</Button>
            </div>
            <div className="flex flex-col md:flex-row md:grid md:grid-cols-2 gap-4">
                {invites.map((data) => {
                    return <CardConvite data={data}/>

                })}

            </div>
      </div>
    );
  };
  
  export default Convites;  
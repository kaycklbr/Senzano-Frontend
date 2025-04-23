import CardConvite from "../form/CardConvite";
import Button from "../ui/button/Button";

const Convites = () => {
    return (
        <div className=" gap-4">
            <h2>Covites</h2>
            <Button className="bg-pink">Novo convite</Button>
            <div className="flex flex-col md:flex-row gap-4">
                <CardConvite/>
                <CardConvite/>
                <CardConvite/>

            </div>
      </div>
    );
  };
  
  export default Convites;  
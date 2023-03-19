import { useEffect } from "react";

function DeclareCardRadios({btnValues, groupName, setClaimedCardSuitAndValue, suitActual, valueActual}){

    var radioBtnGroupArr = createRadioBtnGroup(btnValues, groupName)

    function createRadioBtnGroup(btnV, groupN){
        let radioBtnGroup = [];
        btnV.forEach((value) => {
            radioBtnGroup.push(
                <div className="radio-btn">
                <input
                    type="radio"
                    id={value}
                    value={value}
                    name={groupN}
                    defaultChecked={isDefaultValue(value)}
                    onChange={() => setClaimedCardSuitAndValue(value)}/>
                <label htmlFor={value}>{value}</label>
            </div>
            );
        });
        return radioBtnGroup;
    }

    function isDefaultValue(radioBtnValue){
        if(radioBtnValue === suitActual || radioBtnValue === valueActual)
        {
            return true;
        }
        else{
            return false;
        }
    }

    return(
        <>
            {radioBtnGroupArr}
        </>
    );
}

export default DeclareCardRadios;
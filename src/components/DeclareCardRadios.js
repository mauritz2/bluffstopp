import { useEffect } from "react";

function DeclareCardRadios({btnValues, groupName, setDeclaredCard, cardActual}){

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
                    onChange={() => setDeclaredCard(value)}/>
                <label htmlFor={value}>{value}</label>
            </div>
            );
        });
        return radioBtnGroup;
    }

    function isDefaultValue(radioBtnValue){
        if(radioBtnValue === cardActual.suit || radioBtnValue === cardActual.value)
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
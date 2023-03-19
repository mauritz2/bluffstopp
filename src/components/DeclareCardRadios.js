import { useEffect } from "react";

function DeclareCardRadios({btnValues, groupName, updateDeclaredCard, cardActual}){

    var radioBtnGroupArr = createRadioBtnGroup(btnValues, groupName)

    function createRadioBtnGroup(btnValues, groupName){
        let radioBtnGroup = [];
        btnValues.forEach((value) => {
            radioBtnGroup.push(
                <div className="radio-btn">
                <input
                    type="radio"
                    id={value}
                    value={value}
                    name={groupName}
                    defaultChecked={isDefaultValue(value)}
                    onChange={() => updateDeclaredCard(value)}/>
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
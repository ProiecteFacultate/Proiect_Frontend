import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function testFunction() {
    const dispatch = useDispatch();
    const[ testVal, setTestVal ] = useState(0);

    const onButtonClick = (event : any) => {
        setTestVal(() => testVal + 1);
    }

    return (
        <>
          <button onClick={onButtonClick}>
            Click
          </button>
        </>
    )
}
import React from "react";

const Quality = ({color, name}) => {
    return (
        <span className={`badge text-light m-1 bg-` + color}>{name}</span>
    )
}

export default Quality;
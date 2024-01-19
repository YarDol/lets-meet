import React from "react";

const SearchStatus = ({length}) => {
    const renderPhrase = (n) => {
        const lastNum = Number(n.toString().slice(-1));
        const phrase = ' зустрітись з тобою'

        if(n > 4 && n < 20) return ' людей хочуть' + phrase
        if([2,3,4].indexOf(lastNum) >= 0) return ' людини хочуть' + phrase
        if(lastNum === 1) return ' людина хоче' + phrase
        
        return ' людини хочуть' + phrase
    }

    return (
        <h2>
            <span className={"badge text-light bg-"+(length > 0 ? 'primary' : 'danger') }>
                {length > 0 ? length + renderPhrase(length) : 'Не сьогодні'}
            </span>
        </h2>
    )
}

export default SearchStatus;

{/* <h2>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {length > 0
                    ? `${length + " " + renderPhrase(length)}   с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2> */}
import React from "react";

export const PagesHeader = (props) => {
    return (
        <p className={`${"text text_type_main-medium"} ${props.classname}`}>
            {props.title}
        </p>
    );
}

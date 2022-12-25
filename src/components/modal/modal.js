import React from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";

import PropTypes from "prop-types";

import { CLOSE_INGREDIENT } from "../../services/actions/currentIngredient";
import { CLOSE_ORDER } from "../../services/actions/order";
import { useDispatch, useSelector } from "react-redux";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
    const ingredientModalVisible = useSelector(store => store.currentIngredient.ingredientModalVisible);
    const orderModalVisible = useSelector(store => store.order.orderModalVisible);

    const {children} = props;
    const dispatch = useDispatch();

    const closeModal = () => {
        if (ingredientModalVisible) {
            dispatch({
                type: CLOSE_INGREDIENT,
            })
        }
        if (orderModalVisible) {
            dispatch({
                type: CLOSE_ORDER,
            })
        }
    };

    React.useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                dispatch({
                    type: CLOSE_INGREDIENT
                });
                dispatch({
                    type: CLOSE_ORDER
                });
            }
        }
        document.addEventListener('keydown', closeByEscape);
    
        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, []);

    return ReactDOM.createPortal(
        <>
            {/* МОДАЛЬНОЕ ОКНО */}
            <div className={`${modalStyles.Modal} ${"pl-10 pr-10 pt-10"}`}>
                {/* ШАПКА МОДАЛЬНОГО ОКНА */}
                <div className={modalStyles.Modal_header}>
                    <div className="text text_type_main-large">
                        {props.title}
                    </div>
                    <button
                        className={modalStyles.button}
                        onClick={closeModal}>
                            <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>

            {/* ОВЕРЛЭЙ */}
            <ModalOverlay closeModal={closeModal} />
        </>, modalRoot
    );
}

Modal.propTypes = {
    handleClick: PropTypes.func,
    children: PropTypes.element.isRequired
};

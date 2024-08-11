import React from 'react';
import ReactDom from 'react-dom';
import classes from './SidePage.module.css';

const SidePageBackDrop = props => <div className={classes.sidePageBackDrop} onClick={props.onClose}></div>;


const SidePageComponent = props => {
    return (
        <div className={`${classes.sidePageWrapper}  ${props.className || ''}`}>
               <div className={classes.sidePageHeader}>
                <h2>{props.title}</h2>

                <svg onClick={props.onClose} width="20" height="20" cursor="pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_31_3076)">
                    <path d="M4.14645 4.14645C4.34171 3.95118 4.65829 3.95118 4.85355 4.14645L9.99999 9.29288L15.1464 4.14645C15.3417 3.95118 15.6583 3.95118 15.8535 4.14645C16.0488 4.34171 16.0488 4.65829 15.8535 4.85355L10.7071 9.99999L15.8535 15.1464C16.0488 15.3417 16.0488 15.6583 15.8535 15.8535C15.6583 16.0488 15.3417 16.0488 15.1464 15.8535L9.99999 10.7071L4.85355 15.8535C4.65829 16.0488 4.34171 16.0488 4.14645 15.8535C3.95118 15.6583 3.95118 15.3417 4.14645 15.1464L9.29288 9.99999L4.14645 4.85355C3.95118 4.65829 3.95118 4.34171 4.14645 4.14645Z" fill="#222222"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_31_3076">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

            </div>
            <div className={classes.sidePageBody}>
                {props.children}
            </div>

            {props.footerContent && 
                <div className={classes.sidePageFooter}>
                    {props.footerContent}
                </div>
            }
        </div>
    )
}

const SidePage = props => {
    return (
        <React.Fragment>
            {ReactDom.createPortal(<SidePageBackDrop onClose={props.onClose} />, document.getElementById('side-page'))}    
            {ReactDom.createPortal(<SidePageComponent 
                title={props.title}
                onClose={props.onClose} 
                footerContent={props.footerContent}
                className={props.className}
            >
                {props.children}
            </SidePageComponent>, document.getElementById('side-page'))}    
        </React.Fragment>
    )
}

export default SidePage;
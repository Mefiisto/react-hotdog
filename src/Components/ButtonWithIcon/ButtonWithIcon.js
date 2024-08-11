import classes from './ButtonWithIcon.module.css';


const ButtonWithIcon = props => {

    return (<button className={`${props.className || ''} ${classes.buttonWithIcon} ${props.isActive ? classes.active : ''}`} onClick={props.onClick}>
        { props.isActive ?<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_21_396)">
            <path d="M1.49979 5.7501C1.49979 8.04532 2.93349 9.00619 7.14753 13.1544C7.61984 13.6193 8.38015 13.6193 8.85246 13.1544C13.0665 9.00619 14.5002 8.04532 14.5002 5.7501C14.5002 3.95512 13.0451 2.5 11.2501 2.5C9.84745 2.5 8.61824 3.38854 8.15401 4.63345C8.11459 4.73917 7.8854 4.73917 7.84597 4.63345C7.38175 3.38854 6.15254 2.5 4.74989 2.5C2.95491 2.5 1.49979 3.95512 1.49979 5.7501Z" fill="#FF5A49" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0.999786 5.7501C0.999786 3.67898 2.67877 2 4.74989 2C6.1106 2 7.32962 2.72551 8 3.81529C8.67037 2.72551 9.88939 2 11.2501 2C13.3212 2 15.0002 3.67898 15.0002 5.7501C15.0002 7.04645 14.5775 7.97082 13.6382 9.08043C13.0121 9.82007 12.1251 10.6768 10.9482 11.8134C10.4247 12.319 9.84392 12.88 9.20322 13.5107C8.5363 14.1672 7.46368 14.1672 6.79677 13.5107C6.15607 12.88 5.57525 12.319 5.05177 11.8134C3.87494 10.6768 2.98791 9.82007 2.36177 9.08043C1.42244 7.97082 0.999786 7.04645 0.999786 5.7501ZM4.74989 3C3.23105 3 1.99979 4.23126 1.99979 5.7501C1.99979 6.74897 2.29398 7.45264 3.12501 8.43431C3.71743 9.13412 4.54817 9.93641 5.69715 11.046C6.22719 11.5579 6.82495 12.1352 7.49829 12.798C7.77599 13.0714 8.224 13.0714 8.5017 12.798C9.17504 12.1352 9.7728 11.5579 10.3028 11.046C11.4518 9.93641 12.2826 9.13412 12.875 8.43431C13.706 7.45264 14.0002 6.74897 14.0002 5.7501C14.0002 4.23126 12.7689 3 11.2501 3C10.0586 3 9.01461 3.75663 8.6225 4.80815C8.55455 4.99038 8.41708 5.09305 8.31042 5.14404C8.20371 5.19504 8.09399 5.21274 7.99999 5.21274C7.906 5.21274 7.79628 5.19504 7.68957 5.14404C7.58291 5.09305 7.44544 4.99038 7.37749 4.80815C6.98537 3.75663 5.94143 3 4.74989 3Z" fill="#FF5A49"/>
            </g>
            <defs>
            <clipPath id="clip0_21_396">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        
        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2002_602)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.999817 5.7501C0.999817 3.67898 2.6788 2 4.74992 2C6.11063 2 7.32965 2.72551 8.00003 3.81529C8.6704 2.72551 9.88942 2 11.2501 2C13.3213 2 15.0002 3.67898 15.0002 5.7501C15.0002 7.04645 14.5776 7.97082 13.6382 9.08043C13.0121 9.82007 12.1251 10.6768 10.9482 11.8134C10.4248 12.319 9.84395 12.88 9.20325 13.5107C8.53633 14.1672 7.46371 14.1672 6.7968 13.5107C6.1561 12.88 5.57528 12.319 5.0518 11.8134C3.87497 10.6768 2.98794 9.82007 2.3618 9.08043C1.42247 7.97082 0.999817 7.04645 0.999817 5.7501ZM4.74992 3C3.23108 3 1.99982 4.23126 1.99982 5.7501C1.99982 6.74897 2.29401 7.45264 3.12504 8.43431C3.71746 9.13412 4.5482 9.93641 5.69718 11.046C6.22722 11.5579 6.82498 12.1352 7.49832 12.798C7.77602 13.0714 8.22403 13.0714 8.50173 12.798C9.17507 12.1352 9.77283 11.5579 10.3029 11.046C11.4519 9.93641 12.2826 9.13412 12.875 8.43431C13.706 7.45264 14.0002 6.74897 14.0002 5.7501C14.0002 4.23126 12.769 3 11.2501 3C10.0586 3 9.01464 3.75663 8.62253 4.80815C8.55458 4.99038 8.41711 5.09305 8.31045 5.14404C8.20374 5.19504 8.09402 5.21274 8.00002 5.21274C7.90603 5.21274 7.79631 5.19504 7.6896 5.14404C7.58294 5.09305 7.44547 4.99038 7.37752 4.80815C6.9854 3.75663 5.94146 3 4.74992 3Z" fill="#FFA236"/>
        </g>
        <defs>
        <clipPath id="clip0_2002_602">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
        </svg> }
    </button>)
}

export default ButtonWithIcon;
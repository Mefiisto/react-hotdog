import logo from '../../../Images/logo.jpg';
import classes from './Info.module.css';

const Info = (props) => 
{
    return <div className={classes.info}><img src={logo} alt='REACT HOTDOG' /> <span>{props.children}</span></div>
}


export default Info;
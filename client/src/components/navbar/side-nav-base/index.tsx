import styles from "./SideNavBase.module.scss";
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineProject } from 'react-icons/ai';
import { LuUsers } from 'react-icons/lu';
import { BsChevronDown } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import Avatar from '../../../assets/Avatar.png';
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/user.context";
import { useContext } from "react";
import { ProjectContext } from "../../../context/project.context";
const MainSideNav = () => {
    const isTablet = useMediaQuery({ maxWidth: 1000 });
    const { userData } = useContext(UserContext);
    const { projects } = useContext(ProjectContext);
    return (
        <section className={`${styles.main_sidenav} ${isTablet ? styles.closed : ""}`}>
            <div className={`${styles.profile_dropdown}`}>
                <div className={`${styles.avatar}`}>
                    <img src={Avatar} alt="" />
                </div>
                <div className={`${styles.content}`}>
                    <div className={`${styles.name}`}>
                        {userData.name}
                    </div>
                    <div className={`${styles.role}`}>
                        {userData.role === 1 ? "Project Manager" : "Team Member"}
                    </div>
                </div>
                <div className={`${styles.arrow_down}`}>
                    <BsChevronDown />
                </div>
            </div>
            <ul>
                <li className={window.location.pathname === "/" ? `${styles.active}` : ""}>
                    <Link to="/">
                        <RxDashboard />
                        <p>Översikt</p>
                    </Link>
                </li>
                {
                    userData.role === 1 ? (
                        <>
                            <li className={window.location.pathname === "/projects" ? `${styles.active}` : ""}>
                                <Link to="/projects">
                                    <AiOutlineProject />
                                    <p>Projects</p>
                                    <div className={`${styles.tag}`}>+{projects.length}</div>
                                </Link>
                            </li>
                            <li className={window.location.pathname === "/employees" ? `${styles.active}` : ""}>
                                <Link to="/employees">
                                    <LuUsers />
                                    <p>Employees</p>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={window.location.pathname === "/tm/projects" ? `${styles.active}` : ""}>
                                <Link to="/tm/projects">
                                    <AiOutlineProject />
                                    <p>Projects</p>
                                    <div className={`${styles.tag}`}>+{projects.length}</div>
                                </Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </section>
    );
}


export default MainSideNav;
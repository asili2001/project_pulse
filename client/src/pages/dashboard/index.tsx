import TopNav from "../../components/navbar/top-nav";
import Logo from "../../assets/logo.png";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import styles from "./Dashboard.module.scss";
import Widget, { WidgetData } from "../../components/widget";
import { MdOutlineConstruction } from 'react-icons/md';

const Dashboard = () => {
    const widgetData: WidgetData[] = [
        {
            headerTitle: "A Widget",
            style: { "gridArea": "1/1" },
            headerItems: <MdOutlineConstruction style={{ color: "#2091e5", fontSize: "2em" }} />,
            content: <>
                <p>Welcome to Project Pulse</p>
                <span style={{ color: "#2091e5" }}>Widgets is under construction</span>
            </>
        },
        {
            headerTitle: "A Widget",
            style: { "gridArea": "1/2" },
            headerItems: <MdOutlineConstruction style={{ color: "#2091e5", fontSize: "2em" }} />,
            content: <>
                <p>Welcome to Project Pulse</p>
                <span style={{ color: "#2091e5" }}>Widgets is under construction</span>
            </>
        }
    ]
    return (
        <>
            <TopNav title="Dashboard" size="large">
                <div className={`${topNavStyles.icon} ${topNavStyles.round} ${topNavStyles.transparent}`}>
                    <img src={Logo} alt="Logo" />
                </div>
            </TopNav>

            <Widget data= {widgetData} style={{ gridTemplateColumns: "1fr 20rem" }}/>
            <div className={`${styles.item} ${styles.inbox}`}>
                item 4
            </div>
        </>
    );
}

export default Dashboard;

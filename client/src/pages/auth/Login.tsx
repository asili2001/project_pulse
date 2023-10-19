import styles from "./Auth.module.scss";
import PulseBannerImg from "../../assets/pulse-banner.svg";
import PulseLogoBig from "../../assets/pulse-logo-big.svg";
import Login from "../../components/forms/Login";

const AuthLogin = ()=> {
    return (
        <section className={styles.container}>
            <div className={styles.banner}>
                <img src={PulseBannerImg} alt="banner" />
                <div className={styles.bannercontent}>
                    <img src={PulseLogoBig} alt="logo" />
                </div>
            </div>
            <div className={styles.content}>
                <Login />
                <img src={PulseLogoBig} alt="logo" />
            </div>
        </section>
    );
}

export default AuthLogin;
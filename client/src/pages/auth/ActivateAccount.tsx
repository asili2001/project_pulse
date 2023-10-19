import styles from "./Auth.module.scss";
import PulseBannerImg from "../../assets/pulse-banner.svg";
import PulseLogoBig from "../../assets/pulse-logo-big.svg";
import ActivateAccount from "../../components/forms/ActivateAccount";

const AuthActivateAccount = ()=> {
    return (
        <section className={styles.container}>
            <div className={styles.banner}>
                <img src={PulseBannerImg} alt="banner" />
                <div className={styles.bannercontent}>
                    <img src={PulseLogoBig} alt="logo" />
                </div>
            </div>
            <div className={styles.content}>
                <ActivateAccount />
                <img src={PulseLogoBig} alt="logo" />
            </div>
        </section>
    );
}

export default AuthActivateAccount;
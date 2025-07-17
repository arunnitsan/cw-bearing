import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const SuccessModal = () => {
  const router = useRouter();
  const {t} = useTranslation(router.locale);
  const { successModal, handleSuccessModal } = useContext(GlobalContext);

  if (successModal.notConfigModal) {
    return (
      <Modal
        className="success-modal"
        show={successModal.isVisible}
        onHide={() => handleSuccessModal({ isVisible: false })}
      >
        <div className="success-modal-wrapper">
          <div className="success-modal-inner">
            {successModal.data && successModal.data.confirmationMessage && (
              <p>{successModal.data.confirmationMessage}</p>
            )}
            <a
              onClick={(e) => {
                e.preventDefault();
                handleSuccessModal({ isVisible: false });
              }}
              style={{
                color: "#85a0c8",
                cursor: "pointer",
              }}
            >
              <span className="icon-in">
                <img src="/images/png/back-lightblue.svg" alt="Back" />
              </span>
              {t('data.goBackText')}
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      className="success-modal"
      show={successModal.isVisible}
      onHide={() => handleSuccessModal({ isVisible: false })}
    >
      <div className="success-modal-wrapper">
        <div className="success-modal-inner">
          <h2>
            {/* {router.locale === "en"
              ? "CW Bearing - Your request"
              : router.locale === "de" ? "CW Bearing - Ihre Anfrage" : "La tua richiesta"} */}
              {t('data.simpleText')}
          </h2>
          <p>
            {/* {router.locale === "de"
              ? "Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden."
              : "Thank you for your inquiry. We will get back to you as soon as possible."} */}
              {t('data.thanksMsg')}
          </p>
          <Link href="/" onClick={() => handleSuccessModal({ isVisible: false })}>
            <span className="icon-in">
              <img src="/images/png/back-lightblue.svg" alt="Back" />
            </span>
            {/* {router.locale === "en" ? "Go Back" : router.locale === "de" ? "Zurückgehen" : "Torna indietro"} */}
            {t('data.goBackText')}
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;

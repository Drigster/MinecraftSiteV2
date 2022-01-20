import styles from '../styles/ContentForm.module.css'


const ContentForm = ({ children }) => {
	return (
    <div className={`mx-lg-5 mx-3 h-auto ${styles.content}`}>
      <div className={`d-flex justify-content-center ${styles.contentForm}`}>
        {children}
      </div>
    </div>
	)
}

export default ContentForm

import React, { useEffect } from 'react'

const CustomToast = ({ onClose, variant, msg }) => {
  const colors = {
    dangerColorTop: '#d14434',
    dangerColorBottom: '#e74c3c',
    infoColorTop: '#318bcc',
    infoColorBottom: '#3498db',
    successColorTop: '#23d9b8',
    successColorBottom: '#28c9ac'
  }

  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, 3000)
  }, [onClose])
  return (
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        position: 'absolute',
        right: '1rem',
        top: '5rem',
        backgroundColor:
          variant === 'info'
            ? colors.infoColorBottom
            : variant === 'success'
            ? colors.successColorBottom
            : colors.dangerColorBottom
      }}
    >
      <div
        className="toast-header"
        style={{
          backgroundColor:
            variant === 'info'
              ? colors.infoColorTop
              : variant === 'success'
              ? colors.successColorTop
              : colors.dangerColorTop
        }}
      >
        <div className=" mr-auto toast-body text-white">{msg}</div>
        <button
          type="button"
          className="ml-2 mb-1 close text-white"
          data-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}

export default CustomToast

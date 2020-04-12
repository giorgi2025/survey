import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import FormBox from '../components/FormBox'

const SubmitStatus = ({ setFormState, form }) => {
  const goPage = page => {
    if(page === "goHome") {
      window.location = "/";
    } else {
      setFormState({ ...form, progress: 0 })
    }
  }

  const { t } = useTranslation('submitStatus')

  const isSuccess = form.isSuccess;

  return (
    <FormBox>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          
          {isSuccess ?
            <>
              <h1>{t('success')}</h1>
              <p className="lead">
                {t('successString')}
              </p>
            </>
            :
            <>
              <h1>{t('unknownError')}</h1>
              <p className="lead">
                {t('unknownErrorString')}
              </p>
            </>
          }
          <hr className="mb-5 mt-5" />
          <p className="mt-5 mt-sm-4">
            <button
              className="btn btn-lg btn-success"
              onClick={() => goPage('goHome')}
            >
              {t('goHome')}
            </button>

            <button
              className="btn btn-lg btn-danger ml-sm-5 mt-sm-0 mt-3 d-block mx-auto d-sm-inline"
              onClick={() => goPage('goSurvey')}
            >
              {t('goSurvey')}
            </button>
          </p>
        </div>
      </div>
    </FormBox>
  )
}

export default SubmitStatus

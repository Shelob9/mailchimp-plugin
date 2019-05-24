import {useEffect} from "@wordpress/element";
import PropTypes from 'prop-types';
import MailChimpSurveyForm from './MailChimpSurveyForm';
import {getForm} from "../http/publicClient";
import useCalderaMailChimpFormConfig from "../hooks/useCalderaMailChimpFormConfig";
import {PacmanLoader} from "react-spinners";

/**
 * Load remote MailChimp sign up mailChimpTestForm via the WordPress REST API
 *
 * @param listId
 * @param apiRoot
 * @param token
 * @param hideOnSubmit
 * @return {*}
 * @constructor
 */
function CalderaMailChimpSurveyForm({listId, apiRoot, token, getForm, initialForm}) {
    const {
        isLoaded,
        setIsLoaded,
        form,
        setForm
    } = useCalderaMailChimpFormConfig(listId, initialForm);
    const Spinner = () => (
        <div><PacmanLoader/></div>
    );

    /**
     * Find the MailChimp processor in form
     * @param form
     */
    function findProcessor(form) {
        return form.processors.find(processor => 'mc-subscribe' === processor.type);
    }

    /**
     * Get the email field from form
     *
     * @param form
     */
    function getEmailField(form) {
        const processor = findProcessor(form);
        const emailFieldId = processor.emailField;
        return form.fields.find(field => emailFieldId === field.fieldId);
    }

    /**
     * Get the group fields
     *
     * @param form
     */
    function getGroupFields(form) {
        const processor = findProcessor(form);
        const groupFieldIds = processor.groupFields;
        const groupFields = form.fields.filter(field => groupFieldIds.includes(field.fieldId));
        return groupFields;
    }

    const submitUrl = `${apiRoot}/subscribe`;
    useEffect(() => {
        if (! isLoaded) {
            getForm({listId, apiRoot, token})
                .then(r => r.json())
                .then(r => {
                    console.log(r);
                    setForm(r);
                    setIsLoaded(true);
                });
        }

    }, [isLoaded, setIsLoaded, listId, token, apiRoot]);
    if (isLoaded) {
        return <MailChimpSurveyForm
            submitUrl={submitUrl}
            listId={listId}
            emailField={getEmailField(form)}
            questions={getGroupFields(form)}
        />
    }
    return <Spinner />;


}


CalderaMailChimpSurveyForm.propTypes = {
    token: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    apiRoot: PropTypes.string,
    hideOnSubmit: PropTypes.bool,
};

CalderaMailChimpSurveyForm.defaultProps = {
    getForm,
    hideOnSubmit: true,
    apiRoot: 'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1'
};
export default CalderaMailChimpSurveyForm;

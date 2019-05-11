import {useRef, useState} from "@wordpress/element";


/**
 * Manages state of MailChimp form configuration
 *
 * @param listId
 * @param initialForm
 * @returns {{form: {fields}, setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>, setForm: React.Dispatch<React.SetStateAction<{fields}>>, isLoaded: boolean, lastListId: React.MutableRefObject<*>}}
 */
export  default  function useCalderaMailChimpFormConfig(listId, initialForm) {
    const lastListId = useRef(listId);
    const [isLoaded, setIsLoaded] = useState('object' === typeof initialForm && initialForm.hasOwnProperty('fields'));
    const [form, setForm] = useState(initialForm);
    return {lastListId, isLoaded, setIsLoaded, form, setForm};
}
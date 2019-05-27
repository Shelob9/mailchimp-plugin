import {Component, Fragment} from "@wordpress/element";
import {Field} from '@calderajs/components';
export class ApiKeySettings extends Component {


    constructor(props) {
        super(props);
        this.state = {
            apiKey: ''
        };
        this.setApiKey = this.setApiKey.bind(this);
        this.onSaveApiKey = this.onSaveApiKey.bind(this);
    }


    setApiKey(apiKey) {
        this.setState({apiKey})
    }

    onSaveApiKey() {
        this.props.adminApiClient.saveApiKey(this.state.apiKey);
        this.setState({apiKey: ''});
    }

    render() {
        const {instanceId} = this.props;
        const {apiKey} = this.state;

        return (

            <Fragment>
                <Field
                    field={{
                        fieldType: 'text',
                        value: apiKey,
                        label: 'New API Key',
                        fieldId: 'caldera-mc-api-key',
                        required: true
                    }}
                    onChange={this.setApiKey}
                    value={apiKey}
                    instanceId={`caldera-mc-select-${instanceId}`}
                />
                <button
                    onClick={this.onSaveApiKey}
                    id={`${instanceId}-mc-add-api-key`}

                    title={'Save API Key'}
                >
                    Save API Key
                </button>

            </Fragment>
        );
    }


}

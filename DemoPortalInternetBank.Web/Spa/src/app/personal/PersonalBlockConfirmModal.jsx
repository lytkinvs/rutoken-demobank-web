import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';

import { formatMoney } from '../utils';

import withOperation from '../withOperation';

import { generateSignatureWithConfirm as signAction } from '../actions/sign';
import saveAction from '../actions/fileActions';

import PersonalSuccessSignModal from './PersonalSuccessSignModal';

import Input from '../controls/Input';
import Button from '../controls/Button';


class PersonalBlockModal extends React.Component {
    state = { pin: null }

    onChange = ({ target: { id, value } }) => {
        this.setState({ [id]: value });
    }

    render() {
        const { pin } = this.state;
        const { modalState, sign, save } = this.props;

        return (
            <div className="personal-payment-info">
                <h2>
                    №&nbsp;
                    {modalState.id}
                </h2>

                <div className="personal-payment-info--description">
                    {`Cчет № ${modalState.id} от ${modalState.account.respondent.name}`}
                </div>

                <div className="personal-payment-info--field mt-3">
                    <div className="personal-payment-info--label">
                        Сумма
                    </div>
                    <div className="personal-payment-info--value">
                        {formatMoney(modalState.amount)}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        Дата
                    </div>
                    <div className="personal-payment-info--value">
                        <FormattedDate
                            value={modalState.paymentDate}
                            day="numeric"
                            month="long"
                            year="numeric"
                        />
                    </div>
                </div>

                {
                    modalState.cms && <div className="personal-signature" />
                }

                <div className="personal-payment-info--field mt-2">
                    <div className="personal-payment-info--label">
                        Банк получателя
                    </div>
                </div>

                <h3>{modalState.account.bank.name}</h3>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        Счет №
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.bank.checkingAccount}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        БИК
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.bank.bik}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-2">
                    <div className="personal-payment-info--label">
                        Получатель
                    </div>
                </div>

                <h3>{modalState.account.respondent.name}</h3>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        Счет №
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.accountNumber}
                    </div>
                </div>

                <div className="personal-payment-info--field mt-1">
                    <div className="personal-payment-info--label">
                        ИНН
                    </div>
                    <div className="personal-payment-info--value">
                        {modalState.account.respondent.inn}
                    </div>
                </div>
                {
                    !modalState.cms && (
                        <div className="personal-payment-info--bottom mt-2">
                            <p>Требующий проверки контрагент</p>
                            <span>Для подтверждения требуется ввести PIN-код</span>
                            <Input type="text" placeholder="Введите PIN-код" id="pin" onChange={(e) => this.onChange(e)} />

                            <Button type="button" className="btn mt-2" onClick={() => sign(pin, modalState)}>
                                Подписать и отправить
                                <small>
                                    платежку на сумму&nbsp;
                                    {formatMoney(modalState.amount)}
                                </small>
                            </Button>
                        </div>
                    )
                }
                {
                    modalState.cms && (
                        <div className="mt-2">
                            <button type="button" className="btn" onClick={() => save(modalState)}>
                                Сохранить CMS
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapActionsToProps = (dispatch) =>
    ({
        sign: (pin, payment) => dispatch(signAction(pin, payment)),
        save: (payment) => dispatch(saveAction(payment.cms, 'signature.cms')),
    });

PersonalBlockModal.propTypes = {
    modalState: PropTypes.shape().isRequired,
    sign: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
};

export default withOperation('sign', connect(null, mapActionsToProps)(PersonalBlockModal), PersonalSuccessSignModal);

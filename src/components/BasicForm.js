import useInput from "../hooks/use-input";

const BasicForm = (props) => {
    const {
        value: enteredFirstName,
        hasError: firstNameInputHasError,
        isValid: enteredFirstNameIsValid,
        valueChangeHandler: firstNameInputChangeHandler,
        inputBlurHandler: firstNameInputBlurHandler,
        reset: resetFirstNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredLastName,
        hasError: lastNameInputHasError,
        isValid: enteredLastNameIsValid,
        valueChangeHandler: lastNameInputChangeHandler,
        inputBlurHandler: lastNameInputBlurHandler,
        reset: resetLastNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        isValid: enteredEmailIsValid,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    let formIsValid = false;
    if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid)
        formIsValid = true;

    const formSubmissionHandler = event => {
        event.preventDefault();
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
    const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='control-group'>
                <div className={firstNameInputClasses}>
                    <label htmlFor='first-name'>First Name</label>
                    <input
                        type='text'
                        id='first-name'
                        onChange={firstNameInputChangeHandler}
                        onBlur={firstNameInputBlurHandler}
                        value={enteredFirstName}
                    />
                    {firstNameInputHasError && (
                        <p className='error-text'>Name must not be empty.</p>
                    )}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor='last-name'>Last Name</label>
                    <input
                        type='text'
                        id='last-name'
                        onChange={lastNameInputChangeHandler}
                        onBlur={lastNameInputBlurHandler}
                        value={enteredLastName}
                    />
                    {lastNameInputHasError && (
                        <p className='error-text'>
                            Last Name must not be empty.
                        </p>
                    )}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>E-Mail Address</label>
                <input
                    type='text'
                    id='email'
                    onBlur={emailInputBlurHandler}
                    onChange={emailInputChangeHandler}
                    value={enteredEmail}
                />
                {emailInputHasError && (
                    <p className='error-text'>
                        Email must not be empty.
                    </p>
              )}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    const {
        value: enteredName,
        hasError: nameInputHasError,
        isValid: enteredNameIsValid,
        valueChangeHandler: nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        isValid: enteredEmailIsValid,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    let formIsValid = false;
    if (enteredNameIsValid && enteredEmailIsValid) formIsValid = true;
    /**
     * React does batching of all state updates at once so order does not really matter...
     * if there are consecutive state updates then React will update in a single render. 
     * useEffect run in the order in which they are defined.
     */
    const formSubmissionHandler = event => {
        event.preventDefault();
        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                { nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
            </div>
            
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail}
                />
                { emailInputHasError && <p className='error-text'>Please enter a valid email.</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;

import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YoutubeForm = () => {
  {
    /* Since we are specifying default values in the useForm hook, there is no need of Typing (<FormValues>) it. But for completeness, the Type can be there. */
  }
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();

      return {
        username: 'Batman',
        email: data.email,
        channel: '',
        social: {
          twitter: '',
          facebook: ''
        },
        phoneNumbers: ['', ''],
        phNumbers: [
          {
            number: ''
          }
        ],
        age: 0,
        dob: new Date()
      };
    }
  });

  const { register, control, handleSubmit, formState, watch, getValues, setValue, reset } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount
  } = formState;

  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  // console.log({ touchedFields, dirtyFields, isDirty, isValid });
  {
    /* isDirty references the state of the form. So, if isDirty is true means at least a form field has been modified (remember: default value(s) in the field(s) doesn't count) */
  }

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  const onerror = (errors: FieldErrors<FormValues>) => {
    console.log('Form Errors: ', errors);
  };

  const handleGetFieldValues = () => {
    // {
    //   /* get value of single field */
    // }
    // console.log('Get values: ', getValues('social.twitter'));
    // {
    //   /* get values of multiple fields */
    // }
    // console.log('Get values: ', getValues(['channel', 'age']));
    {
      /* get values of all form fields */
    }
    console.log('Get values: ', getValues());
  };

  const handleSetFieldValue = () => {
    // setValue('email', 'Pokemon'); // this will set the field value. But it doesn't validate te input OR change the field touched and field dirty status like an user interation would do.
    setValue('email', 'Pokemon', { shouldDirty: true, shouldTouch: true, shouldValidate: true }); // This will do all as if an user interacted with the field.
  };

  // useEffect(() => {
  //   const subscription = watch(value => {
  //     console.log(value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // const watchFields = watch('username'); {/* watching single field */}
  // const watchFields = watch(['username', 'email']); {/* watching multiple fields */}
  // const watchForm = watch(); {/* watching all form fields */}

  renderCount++;

  return (
    <div>
      <h3>Sample Form ({renderCount / 2})</h3>
      {/* why dividing by 2 because in development mode, <React.StrictMode /> rerenders the app/component twice and also re-run the Effects twice to find bugs - https://react.dev/reference/react/StrictMode */}

      {/* <h5>Watched values: {JSON.stringify(watchFields)}</h5> */}

      <form onSubmit={handleSubmit(onSubmit, onerror)} noValidate>
        {/* specifying noValidate prevent browser validation and allow React hook form to takeover the validation */}
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required'
              }
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format'
              },
              validate: {
                notAdmin: fieldValue => {
                  return fieldValue !== 'admin@example.com' || 'Enter a different email address';
                },
                notBlackListed: fieldValue => {
                  return !fieldValue.endsWith('baddomain.com') || 'This domain is not supported';
                }
              }
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel', { required: 'Channel is required' })} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register('social.twitter', { disabled: true, required: 'Twitter is required' })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register('social.facebook', { disabled: watch('channel') === '', required: 'Facebook is required' })}
          />
          {/*Above example 'conditional disabling of an field': The Facebook field will be in disabled state untill the Channel field is empty */}
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register('phoneNumbers.0', { required: 'Primary phone number is required' })}
          />
          {/* You cannot use bracket notation in register - phoneNumbers[0] */}
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register('phoneNumbers.1', { required: 'Secondary phone number is required' })}
          />
          {/* You cannot use bracket notation in register - phoneNumbers[1] */}
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div
                  className="form-control"
                  style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
                  key={field.id}
                >
                  <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: '' })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register('age', { valueAsNumber: true, required: { value: true, message: 'age is required' } })}
          />
          {/* 'valueAsNumber' property makes the submitted value as number. Otherwise it will be a string */}
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register('dob', { valueAsDate: true, required: { value: true, message: 'Date of birth is required' } })}
          />
          {/* 'valueAsDate' property makes the submitted value as date. Otherwise it will be a string */}
          <p className="error">{errors.dob?.message}</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
          <button type="button" onClick={handleGetFieldValues}>
            Get values
          </button>
          <button type="button" onClick={handleSetFieldValue}>
            Set value
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;

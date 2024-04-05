import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const FormWithYupValidation = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      return {
        username: '',
        email: '',
        channel: ''
      };
    }
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  return (
    <div>
      <h3>Sample Form with Yup validation</h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* specifying noValidate prevent browser validation and allow React hook form to takeover the validation */}
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register('username')} />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register('email')} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel')} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormWithYupValidation;

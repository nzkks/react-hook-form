import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  renderCount++;

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      {/* why dividing by 2 because in development mode, <React.StrictMode /> rerenders the app/component twice and also re-run the Effects twice to find bugs - https://react.dev/reference/react/StrictMode */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username')} />

        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email')} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('channel')} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;

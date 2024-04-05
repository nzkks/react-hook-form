import './App.css';
// import FormWithYupValidation from './components/FormWithYupValidation';
import FormWithZodValidation from './components/FormWithZodValidation';

// import YoutubeForm from './components/YoutubeForm';

function App() {
  return (
    <>
      <div>
        {/* <YoutubeForm /> */}
        <FormWithZodValidation />
      </div>
    </>
  );
}

export default App;

import ReactDOM from 'react-dom/client';
import App from './App';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";
import 'dayjs/locale/en-au';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-au"}>
    <App />
  </LocalizationProvider>
);

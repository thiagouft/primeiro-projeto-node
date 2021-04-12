import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const pasrseDate = startOfHour(parseISO(date));
  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(pasrseDate, appointment.date),
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, pasrseDate);

  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;

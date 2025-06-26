export default function ScheduleAppointment({ reason, comments, date, time }) {
  return (
    <div>
      <h2>
        Congrats, your appointment has been scheduled on {date} at {time}
      </h2>
      <p>Reason for appointment: {reason}</p>
      <p>Additional Comments: {comments}</p>
    </div>
  );
}

export function CancelAppointment({ reason, comments }) {
  return (
    <div>
      <p>Your appointment has been cancelled</p>
      <div className="my-2">
        <p>Reason for cancellation:</p>
        <p>{reason}</p>
      </div>
      <div className="my-2">
        <p>Additional Comments:</p>
        <p>{comments}</p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Swal from "sweetalert2";

const AddSchedule = () => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("10:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const patientName = e.target.patientName.value.trim();
      const contactNumber = e.target.contactNumber.value.trim();
      const email = e.target.email.value.trim();
      const reason = e.target.reason.value.trim();

      // Validate fields
      if (
        !patientName ||
        !contactNumber ||
        !email ||
        !reason ||
        !appointmentDate ||
        !appointmentTime
      ) {
        Swal.fire({
          icon: "error",
          title: "Missing Information",
          text: "Please fill out all required fields.",
        });
        setIsSubmitting(false);
        return;
      }

      const patientInfos = {
        patientName,
        contactNumber,
        email,
        reason,
        date: appointmentDate,
        time: appointmentTime,
        isCompleted: false,
      };
      console.log(patientInfos);

      const response = await fetch(
        `http://localhost:3333/patientsAppointmentForm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientInfos),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to schedule the appointment.");
      }

      await response.json();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Appointment successfully scheduled!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Unable to process your request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px]"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Schedule an Appointment
        </h2>

        {/* Patient Name */}
        <div className="form-group mb-4">
          <label
            htmlFor="patientName"
            className="block text-gray-600 font-medium"
          >
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="form-group mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-gray-600 font-medium"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter your contact number"
            className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email Address */}
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Reason for Appointment */}
        <div className="form-group mb-4">
          <label htmlFor="reason" className="block text-gray-600 font-medium">
            Reason for Appointment
          </label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Describe your issue or reason for visit"
            rows="3"
            className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Appointment Date */}
        <div className="form-group mb-4">
          <label htmlFor="date" className="block text-gray-600 font-medium">
            Appointment Date
          </label>
          <DatePicker
            selected={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()} // Prevent past dates
            className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Appointment Time */}
        <div className="form-group mb-4">
          <label htmlFor="time" className="block text-gray-600 font-medium">
            Appointment Time
          </label>
          <TimePicker
            onChange={setAppointmentTime}
            value={appointmentTime}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;

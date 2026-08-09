import {
  createAppointment,
  getAppointmentsByPatient,
  getAppointmentById
} from "../models/appointment.model.js";


// CREATE APPOINTMENT
export const createAppointmentRecord = async (req, res) => {
  try {
    const {
      doctorName,
      appointmentDate,
      reason,
      status
    } = req.body;

    const patientId = req.user.id;


    // Validation
    if (!doctorName || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Doctor name and appointment date are required"
      });
    }


    // Create appointment
    const appointment = await createAppointment({
      patientId,
      doctorName,
      appointmentDate,
      reason,
      status: status || "scheduled"
    });


    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment
    });

  } catch (error) {
    console.error("Create appointment error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// GET ALL APPOINTMENTS OF LOGGED-IN PATIENT
export const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await getAppointmentsByPatient(patientId);


    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments
    });

  } catch (error) {
    console.error("Get appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// GET SINGLE APPOINTMENT
export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id;

    const appointment = await getAppointmentById(id, patientId);


    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }


    return res.status(200).json({
      success: true,
      message: "Appointment fetched successfully",
      appointment
    });

  } catch (error) {
    console.error("Get appointment error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
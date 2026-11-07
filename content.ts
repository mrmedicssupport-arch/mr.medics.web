/**
 * Centralized content repository for Mr Medics marketing portal.
 * NOTE: Sample data is provided for initial launch demonstration.
 * REPLACE WITH REAL DATA before commercial production rollout.
 */

export interface DoctorProfile {
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  hospital: string;
  fee: string;
  available: string;
  isSample: boolean;
}

// REPLACE WITH REAL DATA: Connect to live medical registry or CMS
export const sampleDoctors: DoctorProfile[] = [
  {
    name: "Dr. Anjali Sharma",
    specialty: "Cardiologist",
    qualification: "MBBS, MD - Cardiology (AIIMS)",
    experience: "12 Years Experience",
    hospital: "Apollo Hospital Partner, Noida",
    fee: "₹500",
    available: "Today, 4:00 PM",
    isSample: true,
  },
  {
    name: "Dr. Rajesh Verma",
    specialty: "General Physician",
    qualification: "MBBS, MRCP (UK)",
    experience: "15 Years Experience",
    hospital: "Mr Medics Partner Clinic, Sector 63",
    fee: "₹400",
    available: "Available Now",
    isSample: true,
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Pediatrician",
    qualification: "MBBS, DCH, DNB - Pediatrics",
    experience: "9 Years Experience",
    hospital: "Fortis Healthcare Partner",
    fee: "₹450",
    available: "Tomorrow, 10:00 AM",
    isSample: true,
  },
  {
    name: "Dr. Vikram Malhotra",
    specialty: "Orthopedic",
    qualification: "MBBS, MS - Orthopedics",
    experience: "14 Years Experience",
    hospital: "Max Super Speciality Partner",
    fee: "₹600",
    available: "Today, 6:00 PM",
    isSample: true,
  },
  {
    name: "Dr. Sneha Kulkarni",
    specialty: "Dermatologist",
    qualification: "MBBS, DDVL",
    experience: "8 Years Experience",
    hospital: "Skin & Laser Centre Partner, Noida",
    fee: "₹500",
    available: "Today, 5:30 PM",
    isSample: true,
  },
  {
    name: "Dr. Manish Gupta",
    specialty: "Gynaecologist",
    qualification: "MBBS, MS - Obstetrics & Gynaecology",
    experience: "11 Years Experience",
    hospital: "Kailash Hospital Partner",
    fee: "₹550",
    available: "Tomorrow, 11:30 AM",
    isSample: true,
  }
];

// Verifiable platform statistics
export const platformStats = [
  { value: 50, suffix: "+", label: "Medical Specialties" },
  { value: 500, suffix: "+", label: "Diagnostic Tests" },
  { value: 100, suffix: "%", label: "Verified Credentials" },
  { value: 4, suffix: " hrs", label: "Typical Report Time" },
];

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

// Structured Response Schema for Gemini
const symptomCheckerSchema = {
  type: Type.OBJECT,
  properties: {
    urgencyLevel: {
      type: Type.STRING,
      description: "One of: 'Emergency', 'High', 'Moderate', 'Low'",
    },
    urgencyColor: {
      type: Type.STRING,
      description: "Color token: 'red', 'amber', 'blue', or 'green'",
    },
    summaryAssessment: {
      type: Type.STRING,
      description: "Clear, empathetic clinical triage summary (2-3 sentences)",
    },
    possibleConditions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Condition name" },
          likelihood: { type: Type.STRING, description: "High, Moderate, or Possible" },
          description: { type: Type.STRING, description: "Plain-language medical rationale" },
        },
        required: ["name", "likelihood", "description"],
      },
      description: "2 to 4 potential conditions",
    },
    recommendedSpecialist: {
      type: Type.OBJECT,
      properties: {
        specialty: { type: Type.STRING, description: "e.g. General Physician, Cardiologist, ENT, Pulmonologist, Dermatologist, Orthopedic, Pediatrician, Gynecologist" },
        reason: { type: Type.STRING, description: "Why this doctor should be consulted" },
        bookingLink: { type: Type.STRING, description: "Link to book on HealthPilot" },
      },
      required: ["specialty", "reason"],
    },
    recommendedTests: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          testName: { type: Type.STRING, description: "Diagnostic test name" },
          purpose: { type: Type.STRING, description: "Clinical diagnostic purpose" },
          tat: { type: Type.STRING, description: "Turnaround time like '4 Hours' or '6 Hours'" },
        },
        required: ["testName", "purpose"],
      },
      description: "1 to 3 diagnostic lab tests available on HealthPilot",
    },
    immediateHomeCare: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 to 4 actionable, safe home comfort steps",
    },
    redFlags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Critical red-flag symptoms requiring emergency room",
    },
    clinicalDisclaimer: {
      type: Type.STRING,
      description: "Medical disclaimer statement",
    },
  },
  required: [
    "urgencyLevel",
    "summaryAssessment",
    "possibleConditions",
    "recommendedSpecialist",
    "recommendedTests",
    "immediateHomeCare",
    "redFlags",
  ],
};

function generateClinicalFallback(symptoms: string, duration?: string, severity?: string) {
  const query = symptoms.toLowerCase();
  
  if (query.includes('chest') || query.includes('breath') || query.includes('heart') || query.includes('dil ka')) {
    return {
      urgencyLevel: 'Emergency',
      urgencyColor: 'red',
      summaryAssessment: 'Symptoms involving chest discomfort or breathing irregularity require immediate medical attention to exclude cardiac or acute pulmonary etiologies.',
      possibleConditions: [
        { name: 'Angina / Acute Coronary Syndrome', likelihood: 'Possible', description: 'Requires rapid evaluation to rule out myocardial ischemia or cardiac strain.' },
        { name: 'Gastroesophageal Reflux (GERD) Spasm', likelihood: 'Possible', description: 'Acid reflux can mimic retrosternal chest tightness.' },
        { name: 'Bronchospasm or Respiratory Infection', likelihood: 'Possible', description: 'Inflammation of airways leading to shortness of breath.' }
      ],
      recommendedSpecialist: {
        specialty: 'Cardiologist',
        reason: 'Immediate ECG, cardiac enzymes, and physical evaluation are essential.',
        bookingLink: '/services/doctor-consultation'
      },
      recommendedTests: [
        { testName: 'Cardiac Risk Biomarkers (Troponin / hs-CRP)', purpose: 'Rules out heart muscle injury and vascular inflammation', tat: '4 Hours' },
        { testName: 'Complete Blood Count (CBC)', purpose: 'Evaluates oxygen carrying capacity and detects infection', tat: '4 Hours' }
      ],
      immediateHomeCare: [
        'Sit upright in a comfortable, well-ventilated posture and loosen tight clothing.',
        'Do not engage in physical exertion or drive yourself.',
        'If chest pain radiates to arm, jaw, or is accompanied by sweating, call local emergency services immediately.'
      ],
      redFlags: [
        'Crushing or squeezing chest pain radiating to left arm, back, or neck',
        'Sudden severe shortness of breath or blue lips',
        'Fainting, dizziness, or profuse cold sweats'
      ],
      clinicalDisclaimer: 'This guidance is an educational triage tool. In case of emergency, contact local hospital ambulance services immediately.'
    };
  }

  if (query.includes('fever') || query.includes('bukhar') || query.includes('chills') || query.includes('shivering')) {
    return {
      urgencyLevel: severity === 'Severe' ? 'High' : 'Moderate',
      urgencyColor: 'amber',
      summaryAssessment: 'Fever is the immune system’s natural response to viral or bacterial antigens. Monitoring temperature and hydration is critical.',
      possibleConditions: [
        { name: 'Acute Viral Infection / Flu', likelihood: 'High', description: 'Common viral syndrome accompanied by fatigue, mild headache, and body aches.' },
        { name: 'Typhoid or Dengue Fever', likelihood: 'Moderate', description: 'Vector-borne or food-borne febrile illness common in seasonal transitions.' },
        { name: 'Upper Respiratory Tract Infection', likelihood: 'Possible', description: 'Localized infection in throat, sinuses, or nasal passages.' }
      ],
      recommendedSpecialist: {
        specialty: 'General Physician',
        reason: 'A physician can evaluate temperature spikes, lymph nodes, and prescribe anti-pyretics or antibiotics if required.',
        bookingLink: '/services/doctor-consultation'
      },
      recommendedTests: [
        { testName: 'Complete Blood Count (CBC) with Platelets', purpose: 'Checks total white blood cells, neutrophil/lymphocyte ratio, and platelets', tat: '4 Hours' },
        { testName: 'Widal / Typhoid & Dengue Screening', purpose: 'Identifies specific infectious causes', tat: '6 Hours' },
        { testName: 'Liver Function Test (LFT)', purpose: 'Assesses metabolic enzymes during systemic infection', tat: '4 Hours' }
      ],
      immediateHomeCare: [
        'Stay well-hydrated with oral rehydration solutions (ORS), coconut water, and clean water.',
        'Take adequate rest and sponge the forehead with lukewarm water if temperature exceeds 101°F.',
        'Eat light, freshly prepared meals and monitor temperature every 4 to 6 hours.'
      ],
      redFlags: [
        'Temperature exceeding 103°F not responding to antipyretics',
        'Severe persistent vomiting or inability to retain fluids',
        'Extreme lethargy, confusion, or stiff neck'
      ],
      clinicalDisclaimer: 'Educational triage only. Please consult an NMC-registered doctor for appropriate diagnostic and treatment decisions.'
    };
  }

  if (query.includes('headache') || query.includes('sir dard') || query.includes('migraine')) {
    return {
      urgencyLevel: 'Moderate',
      urgencyColor: 'amber',
      summaryAssessment: 'Headaches are commonly caused by tension, stress, dehydration, sinus congestion, or vascular migraine episodes.',
      possibleConditions: [
        { name: 'Tension-Type Headache', likelihood: 'High', description: 'Band-like pressure around forehead or temples from stress, screen time, or poor posture.' },
        { name: 'Migraine without Aura', likelihood: 'Moderate', description: 'Throbbing unilateral pain often aggravated by light, sound, or physical movement.' },
        { name: 'Cervical or Sinus Strain', likelihood: 'Possible', description: 'Associated with neck stiffness or nasal blockage.' }
      ],
      recommendedSpecialist: {
        specialty: 'General Physician / Neurologist',
        reason: 'Proper diagnosis of headache triggers and preventive management.',
        bookingLink: '/services/doctor-consultation'
      },
      recommendedTests: [
        { testName: 'Complete Blood Count (CBC)', purpose: 'Rules out underlying systemic infection or anemia', tat: '4 Hours' },
        { testName: 'Blood Pressure & Blood Glucose Screen', purpose: 'Screens for hypertension or glycemic fluctuations', tat: 'Instant' }
      ],
      immediateHomeCare: [
        'Rest in a quiet, dark, and cool room away from phone and laptop screens.',
        'Drink 500ml of water to ensure dehydration is not exacerbating symptoms.',
        'Apply a gentle cool or warm compress to forehead or back of the neck.'
      ],
      redFlags: [
        'Sudden explosive "thunderclap" headache reaching peak severity in seconds',
        'Headache accompanied by vision loss, weakness on one side of face/body, or speech difficulty',
        'Headache following a head trauma or with unexplained neck rigidity'
      ],
      clinicalDisclaimer: 'Educational triage tool only. Consult an NMC registered physician for prescription medicines.'
    };
  }

  // Default General Medical Assessment
  return {
    urgencyLevel: severity === 'Severe' ? 'High' : 'Moderate',
    urgencyColor: severity === 'Severe' ? 'amber' : 'blue',
    summaryAssessment: `Based on your reported symptoms ("${symptoms}") over ${duration || 'recent days'}, a clinical consultation is advised to accurately identify the root cause and provide appropriate treatment.`,
    possibleConditions: [
      { name: 'Primary Symptomatic Presentation', likelihood: 'Moderate', description: 'Matches clinical signs described, requiring doctor confirmation.' },
      { name: 'Sub-acute Inflammatory Response', likelihood: 'Possible', description: 'Mild inflammatory response requiring basic diagnostics.' }
    ],
    recommendedSpecialist: {
      specialty: 'General Physician',
      reason: 'A primary care physician can perform comprehensive differential evaluation and direct further specialty care.',
      bookingLink: '/services/doctor-consultation'
    },
    recommendedTests: [
      { testName: 'Complete Blood Count (CBC)', purpose: 'Comprehensive screening for infection, inflammation, and anemia', tat: '4 Hours' },
      { testName: 'Comprehensive Metabolic Panel', purpose: 'Evaluates liver, kidney, and electrolyte balance', tat: '6 Hours' }
    ],
    immediateHomeCare: [
      'Maintain adequate fluid intake and avoid strenuous physical exertion.',
      'Monitor and log any changes in symptoms or discomfort intensity.',
      'Schedule a video consultation or visit a clinic if symptoms do not improve within 24-48 hours.'
    ],
    redFlags: [
      'Sudden severe worsening of pain or discomfort',
      'Difficulty breathing, swallowing, or sudden dizziness',
      'High unexplained fever with altered mental clarity'
    ],
    clinicalDisclaimer: 'HealthPilot AI Symptom Checker is an informational clinical triage guide, not a formal medical diagnosis. Always consult a qualified doctor.'
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini SDK on server-side
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route: AI Symptom Checker (supports both paths)
  app.post(['/api/symptom-checker', '/api/gemini/analyze-symptoms'], async (req, res) => {
    try {
      const { symptoms, duration, severity, ageGroup, gender, existingConditions } = req.body;
      if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
        return res.status(400).json({ error: 'Please describe your symptoms.' });
      }

      if (ai) {
        const prompt = `You are HealthPilot's AI Clinical Triage Assistant, built with top medical guidelines for patient care in India and globally.
Patient Details:
- Reported Symptoms: "${symptoms}"
- Duration of Symptoms: "${duration || '1-3 days'}"
- Severity Level: "${severity || 'Moderate'}"
- Patient Age Group: "${ageGroup || 'Adult (18-60)'}"
- Gender: "${gender || 'Not specified'}"
- Existing Conditions: "${existingConditions || 'None reported'}"

Clinical Instructions:
1. Determine the clinical urgencyLevel: Must be EXACTLY one of 'Emergency', 'High', 'Moderate', 'Low'.
2. Provide a 2-3 sentence empathetic summaryAssessment.
3. List 2 to 3 possibleConditions with plain-language explanation of likelihood.
4. Recommend the exact medical specialty on HealthPilot (e.g., General Physician, Cardiologist, ENT, Dermatologist, Orthopedic, Pediatrician, Gynecologist, Neurologist, Diabetologist).
5. Recommend 1 to 3 diagnostic lab tests available on HealthPilot with purpose and TAT (e.g., Complete Blood Count (CBC), Lipid Profile, Liver Function Test (LFT), Thyroid Profile, HbA1c, etc.).
6. List 3 to 4 actionable, safe immediateHomeCare comfort steps.
7. List 3 to 4 redFlags emergency symptoms that require an immediate ER visit.
8. If the patient input is in Hindi or Hinglish, provide explanations in clear, compassionate Hindi/English mix that is easily understood.`;

        const apiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: symptomCheckerSchema,
            systemInstruction: 'You are HealthPilot AI, an expert, ethical clinical triage assistant following standard healthcare guidelines. Always prioritize patient safety and accuracy.',
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI generation timeout')), 12000)
        );

        const response: any = await Promise.race([apiPromise, timeoutPromise]);

        const jsonText = (response.text ?? '{}').trim();
        const parsed = JSON.parse(jsonText);
        return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
      } else {
        const fallback = generateClinicalFallback(symptoms, duration, severity);
        return res.json({ success: true, data: fallback, engine: 'clinical-heuristics' });
      }
    } catch (error: any) {
      console.error('Gemini symptom checker error:', error?.message || error);
      const fallback = generateClinicalFallback(req.body.symptoms || '', req.body.duration, req.body.severity);
      return res.json({ success: true, data: fallback, engine: 'clinical-heuristics', note: 'Processed via clinical triage fallback.' });
    }
  });

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HealthPilot server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
